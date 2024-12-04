import { promises as fs } from 'fs';

const INPUT_FILE = './2024/03/input.txt';
var INPUT_STRING = "";

// Read input file
async function readInputFile() {
    INPUT_STRING = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
}

// Solve part one
function partOne() {
    const digitPattern = /\d{1,3}/g;
    const mulPattern = /mul\(\d{1,3},\d{1,3}\)/g;

    const muls = INPUT_STRING.match(mulPattern);

    var total = 0;
    for(const mul of muls) {
        const digits = mul.match(digitPattern);
        total += Number(digits[0]) * Number(digits[1]);
    }

    console.log("Result of multiplications: " + total);
}

// Solve part two
function partTwo() {
    const digitPattern = /\d{1,3}/g;
    const mulPattern = /(do\(\))|(don't\(\))|(mul\(\d{1,3},\d{1,3}\))/g;

    const matches = INPUT_STRING.match(mulPattern);

    var total = 0;
    var enabled = true;

    for(const token of matches) {
        if(token === 'do()') {
            enabled = true;
        } else if(token === "don't()") {
            enabled = false;
        } else if(enabled) {
            const digits = token.match(digitPattern);
            total += Number(digits[0]) * Number(digits[1]);
        }
    }

    console.log("Result of gated multiplications: " + total);
}

// Start
await readInputFile();
partOne();
partTwo();