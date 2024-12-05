import { promises as fs } from 'fs';

const INPUT_FILE = './2024/input.txt';
const RULES = [];
const UPDATES = [];

// Read input file and separate into rules and updates
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    for (const line of lines) {
       if(line && line.includes("|")) {
            RULES.push(line);
       } else if(line) {
            UPDATES.push(line.split(",").map(Number));
       }
    }
}

// Custom comparator
function compare(a, b) {
    const enabledRules = [`${a}|${b}`, `${b}|${a}`];
  
    if (RULES.includes(enabledRules[0])) {
        return -1;
    } else if (RULES.includes(enabledRules[1])) {
        return 1;
    }
    return 0;
};

// Solve both parts
function bothParts() {
    let validUpdateSum = 0;
    let correctedUpdateSum = 0;
  
    UPDATES.forEach((update) => {
        const sorted = update.toSorted(compare);
        
        if (update.toString() === sorted.toString()) {
            validUpdateSum += sorted[Math.floor(sorted.length / 2)];
        } else {
            correctedUpdateSum += sorted[Math.floor(sorted.length / 2)];
        }
    });
  
    console.table({
        validUpdateSum,
        correctedUpdateSum,
    });
};

// Start
await readInputFile();
bothParts();