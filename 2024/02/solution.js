import { promises as fs } from 'fs';

const INPUT_FILE = './2024/02/input.txt';
const REPORTS = [];

// Read input file and split into left & right parts
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    for (const line of lines) {
        const elements = line.split(/[ ]+/);
        REPORTS.push(elements);
    }
}

// Is the input report safe?
function isSafe(report) {
    if(report.length <= 1) return false;
    let failCount = 0;

    for(let i = 1; i < report.length; i++) {
        const prev = Number(report[i - 1]);
        const current = Number(report[i]);
        
        if(current == prev || Math.abs(current - prev) > 3) {
            failCount++;
        }

        if(i < (report.length - 1)) {
            const next = Number(report[i + 1]);
            if(prev < current && current > next) {
                failCount++;
            }
            if(prev > current && current < next) {
                failCount++;
            }
        }
    }
    return failCount == 0;
}

// Solve part one
function partOne() {
    let safeCount = 0;

    for(const report of REPORTS) {
        let failCount = isSafe(report);
        safeCount += failCount > 0 ? 1 : 0;
    }

    console.log("Number of safe reports is: " + safeCount);
}

// Is the input report safe?
function isSafeWithDamping(report) {
    let increasing = null;
    let safelyDampedOnce = false;

    for(let i = 1; i < report.length; i++) {
        const prev = Number(report[i - 1]);
        const current = Number(report[i]);
        
        if(!increasing) {
            increasing = current > prev;
        }

        }
    }

    return true;
}

// Solve part two
function partTwo() {
    let safeCount = 0;

    for(const report of REPORTS) {
        let wasSafe = isSafeWithDamping(report);
        safeCount += wasSafe ? 1 : 0;
    }

    console.log("Number of safe reports is: " + safeCount);
}

// Start
await readInputFile();
//partOne();
partTwo();