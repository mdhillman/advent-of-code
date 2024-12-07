import { promises as fs } from 'fs';

const INPUT_FILE = './2024/input.txt';
const GRID = [];

// Read input file and separate into rules and updates
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    for (const line of lines) {
        let split = line.split("");
        split = split.map(cell => ({
            value: cell,
            visitCount: 0,
        }));
        GRID.push(split);
    }
}

// Solve part one
function partOne() {
    let guard = null;

    for (let row = 0; row < GRID.length; row++) {
        for (let col = 0; col < GRID[row].length; col++) {

            if (GRID[row][col].value === "^") {

                GRID[row][col].value = ".";
                GRID[row][col].visitCount++;

                guard = {
                    row,
                    col,
                    dir: "N",
                };
            }
        }
    }

    let guardInGrid = true;
    while (guardInGrid) {

        if (
            guard.row <= 0 ||
            guard.row >= GRID.length - 1 ||
            guard.col <= 0 ||
            guard.col >= GRID[0].length - 1
        ) {
            guardInGrid = false;
            continue;
        }

        let newRow = guard.row + rowMap[guard.dir];
        let newCol = guard.col + colMap[guard.dir];

        if (GRID[newRow][newCol].value !== ".") {
            guard.dir = dirMap[guard.dir];
        } else {
            guard.row = newRow;
            guard.col = newCol;
            GRID[newRow][newCol].visitCount++;
        }
    }

    let count = 0;
    for (let row = 0; row < GRID.length; row++) {
        for (let col = 0; col < GRID[row].length; col++) {
            if (GRID[row][col].visitCount > 0) {
                count++;
            }
        }
    }

    console.log("Guard visited tiles: " + count);
};

// Solve part two
function partTwo() {
    let startRow = null;
    let startCol = null;

    for (let row = 0; row < GRID.length; row++) {
        for (let col = 0; col < GRID[row].length; col++) {

            if (GRID[row][col].value === "^") {
                GRID[row][col].value = ".";
                startRow = row;
                startCol = col;
            }
        }
    }

    let count = 0;
    for (let row = 0; row < GRID.length; row++) {
        for (let col = 0; col < GRID[row].length; col++) {

            if (
                (row !== startRow || col !== startCol) &&
                GRID[row][col].value === "."
            ) {
                count += tryPosition(startRow, startCol, row, col);
            }
        }
    }

    console.log("Possible obstacle locations: " + count);
};

function tryPosition(guardRow, guardCol, obsR, obsC) {
    let visited = new Map();
    let guardDir = "N";
    let guardInGrid = true;
    
    while (guardInGrid) {
        if (
            guardRow <= 0 ||
            guardRow >= GRID.length - 1 ||
            guardCol <= 0 ||
            guardCol >= GRID[0].length - 1
        ) {
            guardInGrid = false;
            return 0;
        }

        const key = `${guardRow},${guardCol},${guardDir}`;
        if (visited.has(key)) {
            return 1;
        }

        visited.set(key, true);
        let newRow = guardRow + rowMap[guardDir];
        let newCol = guardCol + colMap[guardDir];

        if (
            GRID[newRow][newCol].value !== "." ||
            (newRow === obsR && newCol === obsC)
        ) {
            guardDir = dirMap[guardDir];
        } else {
            guardRow = newRow;
            guardCol = newCol;
        }
    }
};

const rowMap = {
    N: -1,
    E: 0,
    S: 1,
    W: 0,
};

const colMap = {
    N: 0,
    E: 1,
    S: 0,
    W: -1,
};

const dirMap = {
    N: "E",
    E: "S",
    S: "W",
    W: "N",
};

// Solve
await readInputFile();
partOne();
await readInputFile();
partTwo();