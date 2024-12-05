import { promises as fs } from 'fs';

const INPUT_FILE = './2024/input.txt';
const REPORTS = [];

// Read input file and split into numerical reports
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    for (const line of lines) {
        const elements = line.split(/[ ]+/);
        REPORTS.push(elements.map(Number));
    }
}

// Is the input report safe?
function isReportSafe(report) {
    if (report.length < 2) return true; 

    const isIncreasing = report[1] > report[0];
    const isDecreasing = report[1] < report[0];

    if (!isIncreasing && !isDecreasing) return false; 

    for (let i = 1; i < report.length; i++) {
        const difference = Math.abs(report[i] - report[i - 1]);
        if (difference < 1 || difference > 3) return false;
        if (isIncreasing && report[i] <= report[i - 1]) return false;
        if (isDecreasing && report[i] >= report[i - 1]) return false;
    }
    return true;
}

// Is the input report safe with damping?
function isReportSafeWithDamping(report) {
    for(let i = 0; i < report.length; i++) {
        var reportCopy = [...report];
        reportCopy.splice(i, 1);

        const safeNow = isReportSafe(reportCopy);
        if(safeNow) return true;
    }
    return false;
}

// Solve part one
function partOne() {
    let safeCount = 0;

    for(const report of REPORTS) {
        const isSafe = isReportSafe(report);
        safeCount += isSafe ? 1 : 0;
    }

    console.log("Number of safe reports is: " + safeCount);
}

// Solve part two
function partTwo() {
    let safeCount = 0;

    for(const report of REPORTS) {
        const isSafe = isReportSafe(report);

        if(isSafe) {
            safeCount++;
        } else {
            const safeWithDamping = isReportSafeWithDamping(report);
            if(safeWithDamping) safeCount++;
        }
    }

    console.log("Number of safe reports with damping is: " + safeCount);
}

// Start
await readInputFile();
partOne();
partTwo();