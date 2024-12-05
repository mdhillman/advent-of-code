/**
 * Generate all n-length permutations from the input array.
 * 
 * @param {array} inputArray array of inputs
 * @param {number} n permutation length
 * @param {boolean} unique should permutations of unique elements (regardless of order)
 * 
 * @returns 2D array of permutations
 */
export function generatePermutations(inputArray, n, unique = false) {
    const result = [];
    const seen = new Set();

    function permute(tempArray) {
        if (tempArray.length === n) {
            if (unique) {
                const sortedPermutation = [...tempArray].sort().join(',');
                if (!seen.has(sortedPermutation)) {
                    seen.add(sortedPermutation);
                    result.push([...tempArray]);
                }
            } else {
                result.push([...tempArray]);
            }
            return;
        }

        for (let i = 0; i < inputArray.length; i++) {
            tempArray.push(inputArray[i]);
            permute(tempArray);
            tempArray.pop();
        }
    }

    permute([]);
    return result;
}

/**
 * Given a string, returns an array of each digit character found within.
 * 
 * @param {string} inputString 
 * 
 * @returns array of extracted digits
 */
export function extractDigits(inputString) {
    const digitMatches = inputString.match(/\d/g);
    return digitMatches ? digitMatches.map(Number) : [];
}