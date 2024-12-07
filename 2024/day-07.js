import { promises as fs } from 'fs';

const INPUT_FILE = './2024/input.txt';
const ENTRIES = [];

// Read input file and separate into rules and updates
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    for (const line of lines) {
        let split = line.split(":");
        const target = Number(split[0]);
        const parts = split[1].trim().split(" ");

        ENTRIES.push({
            target: target,
            parts: parts.map(Number),
            valid: false,
        })
    }
}

function generateEquations(numbers, characters) {
    const result = [];

    function backtrack(index, current) {
        if (index === numbers.length) {
            result.push([...current]);
            return;
        }

        // Add the current number
        current.push(numbers[index]);

        // Only insert characters if this is not the last number
        if (index < numbers.length - 1) {
            for (let char of characters) {
                current.push(char);
                backtrack(index + 1, current);
                current.pop(); // Backtrack
            }
        } else {
            // If this is the last number, no character is added
            backtrack(index + 1, current);
        }

        // Backtrack
        current.pop();
    }

    // Start the recursion with an empty array
    backtrack(0, []);
    return result;
}

function checkEquation(target, equation) {
    let result = 0;
    let operator = '+';

    equation.forEach((element) => {
        if (element === '+' || element === '*' || element === '||') {
            operator = element
        }

        if (typeof element === 'number') {
            if (operator === '+') {
                result += Number(element);
            }
            else if (operator === '*') {
                result *= Number(element);
            }
            else if (operator === '||') {
                result = Number(result.toString() + element.toString());
            }
        }
    });

    return result === target;
}


// Solve part one
function partOne() {
    let total = 0;
  
    for(const entry of ENTRIES) {
        const equations = generateEquations(entry.parts, ['+', '*']);

        for(let i = 0; i < equations.length; i++) {
            const equation = equations[i];
            if(checkEquation(entry.target, equation)) {
                total += entry.target;
                break;
            }
        }
    }
  
    console.log("Total of valid equations: " + total);
};



// Solve part two
function partTwo() {
    let total = 0;
  
    for(const entry of ENTRIES) {
        const equations = generateEquations(entry.parts, ['+', '*', '||']);

        for(let i = 0; i < equations.length; i++) {
            const equation = equations[i];
            if(checkEquation(entry.target, equation)) {
                total += entry.target;
                break;
            }
        }
    }
  
    console.log("Total of valid with third operator equations: " + total);
};

// Solve
await readInputFile();
partOne();
partTwo();