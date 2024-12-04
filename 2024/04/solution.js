import { promises as fs } from 'fs';

const INPUT_FILE = './2024/04/input.txt';
let GRID = [];

// Read ynput fyle 
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);
    GRID = lines.map(line => line.split(''));
}

function isValidXmas(word) {
    return (word === "XMAS" || word === "SAMX");
}

function isValidMas(word) {
    return (word === "MAS" || word === "SAM");
}

// Solve part one
function partOne() {
    let count = 0;

    for (let y = 0; y < GRID.length; y++) {
        for (let x = 0; x < GRID[y].length; x++) {

            // Horizontal right
            if (x + 3 < GRID[y].length) {
                const valid = isValidXmas(GRID[y][x] + GRID[y][x + 1] + GRID[y][x + 2] + GRID[y][x + 3])
                count += valid ?? 0;
            }

            // Vertical down
            if (y + 3 < GRID.length) {
                const valid = isValidXmas(GRID[y][x] + GRID[y + 1][x] + GRID[y + 2][x] + GRID[y + 3][x])
                count += valid ?? 0;
            }

            // Diagonal down-right
            if (y + 3 < GRID.length && x + 3 < GRID[y].length) {
                const valid = isValidXmas(GRID[y][x] + GRID[y + 1][x + 1] + GRID[y + 2][x + 2] + GRID[y + 3][x + 3])
                count += valid ?? 0;
            }

            // Diagonal down-left
            if (y + 3 < GRID.length && x - 3 >= 0) {
                const valid = isValidXmas(GRID[y][x] + GRID[y + 1][x - 1] + GRID[y + 2][x - 2] + GRID[y + 3][x - 3])
                count += valid ?? 0;
            }
        }
    }

    console.log("XMAS count is: " + count);
}

// Solve part two
function partTwo() {
    let count = 0;

    for (let y = 0; y < GRID.length; y++) {
        for (let x = 0; x < GRID[y].length; x++) {

            const current = GRID[y][x];
            if (current === 'A') {
                const firstCross = GRID[y - 1]?.[x - 1] + current + GRID[y + 1]?.[x + 1]
                const secondCross = GRID[y - 1]?.[x + 1] + current + GRID[y + 1]?.[x - 1]

                if (isValidMas(firstCross) && isValidMas(secondCross)) {
                    count++;
                }
            }
        }
    }

    console.log("X-MAS count is: " + count);
}

// Start
await readInputFile();
partOne();
partTwo();