function calculateMaxPathSum(matrix) {
    const rowCount = matrix.length;
    const columnCount = matrix[0].length;

    const dpTable = Array.from({ length: rowCount }, () => Array(columnCount).fill(0));

    // Initialize first row
    for (let col = 0; col < columnCount; col++) {
        dpTable[0][col] = matrix[0][col];
    }

    for (let row = 1; row < rowCount; row++) {
        for (let col = 0; col < columnCount; col++) {
            const upValue = dpTable[row - 1][col];
            const leftDiagonalValue = col > 0 ? dpTable[row - 1][col - 1] : 0;
            const rightDiagonalValue = col < columnCount - 1 ? dpTable[row - 1][col + 1] : 0;

            dpTable[row][col] = matrix[row][col] + Math.max(upValue, leftDiagonalValue, rightDiagonalValue);
        }
    }

    return Math.max(...dpTable[rowCount - 1]);
}

// Example Usage
const exampleMatrix = [
    [12, 22, 5, 0, 20, 18],
    [0, 2, 5, 25, 18, 17],
    [12, 10, 5, 4, 2, 1],
    [3, 8, 2, 20, 10, 8]
];

console.log(calculateMaxPathSum(exampleMatrix)); // Output: 70