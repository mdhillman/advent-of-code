import { promises as fs } from 'fs';

const INPUT_FILE = './2024/input.txt';
const LEFT_LOCATIONS = [];
const RIGHT_LOCATIONS = [];

// Read input file and split into left & right parts
async function readInputFile() {
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    for (const line of lines) {
        const elements = line.split(/[ ]+/);
        LEFT_LOCATIONS.push(Number(elements[0]));
        RIGHT_LOCATIONS.push(Number(elements[1]));
    }
}

// Solve part one
function partOne() {
    LEFT_LOCATIONS.sort();
    RIGHT_LOCATIONS.sort();
    
    let totalDistance = 0;
    for(let i = 0; i < LEFT_LOCATIONS.length; i++) {
        totalDistance += Math.abs(RIGHT_LOCATIONS[i] - LEFT_LOCATIONS[i]);
    }
    console.log("Total distance is: " + totalDistance);
}

// Solve part two
function partTwo() {
    let similarityScore = 0;
    for(let i = 0; i < LEFT_LOCATIONS.length; i++) {
        const dupes = RIGHT_LOCATIONS.filter(value => value === LEFT_LOCATIONS[i]);
        similarityScore += LEFT_LOCATIONS[i] * dupes.length;
    }

    console.log("Similarity score is: " + similarityScore);
}

// Start
await readInputFile();
partOne();
partTwo();