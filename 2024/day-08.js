import { promises as fs } from 'fs';

const INPUT_FILE = './2024/input.txt';
let MATRIX;

// Read input file
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);
    MATRIX = lines.map(line => line.split(''))
}

// Solve part one
function partOne() {
    const antinodes = new Set()
    const uniqueSymbols = findUniqueSymbols(MATRIX)

    uniqueSymbols.forEach((symbol) => {
        const coords = findSymbol(MATRIX, symbol)
        const allLines = getAllLines(coords)

        allLines.forEach((line) => {
            const [left, right] = calculateCollinearPoints(line[0], line[1])
            
            if (left[0] >= 0 && left[0] < MATRIX.length && left[1] >= 0 && left[1] < MATRIX.length) {
                antinodes.add(JSON.stringify(left))
            }

            if (right[0] >= 0 && right[0] < MATRIX.length && right[1] >= 0 && right[1] < MATRIX.length) {
                antinodes.add(JSON.stringify(right))
            }
        })
    })

    console.log("Part 1 antinode count is: " + antinodes.size);
}

// Solve part two
function partTwo() {
    const antinodes = new Set()
    const uniqueSymbols = findUniqueSymbols(MATRIX)

    uniqueSymbols.forEach((symbol) => {
        const coords = findSymbol(MATRIX, symbol)
        const allLines = getAllLines(coords)

        allLines.forEach((line) => {
            const collinearPoints = calculateAllCollinearPoints(line[0], line[1], MATRIX.length)
            collinearPoints.forEach(point => antinodes.add(JSON.stringify(point)))
        })
    })

    console.log("Part 2 antinode count is: " + antinodes.size)
}

function calculateCollinearPoints(A, B) {
    const [x1, y1] = A;
    const [x2, y2] = B;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const C = [x1 - dx, y1 - dy];
    const D = [x2 + dx, y2 + dy];

    return [C, D];
}

function calculateAllCollinearPoints(A, B, matrixSize) {
    const [x1, y1] = A;
    const [x2, y2] = B;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const points = [];

    for (let x = 0; x < matrixSize; x++) {
        for (let y = 0; y < matrixSize; y++) {
            if ((y - y1) * dx === (x - x1) * dy) {
                points.push([x, y]);
            }
        }
    }

    return points;
}

function findSymbol(matrix, symbol) {
    let coords = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === symbol) {
                coords.push([i, j]);
            }
        }
    }
    return coords;
}


function getAllLines(points) {
    const combinations = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            combinations.push([points[i], points[j]]);
        }
    }
    return combinations;
}

function findUniqueSymbols(matrix) {
    const symbols = new Set()

    matrix.forEach((row) => row.forEach((symbol) => symbol != '.' ? symbols.add(symbol) : null))
    return Array.from(symbols)
}

// Solve
await readInputFile();
partOne();
partTwo();