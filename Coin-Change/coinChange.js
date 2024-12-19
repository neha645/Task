const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateCoinChangeCombinations(coinCount, targetAmount, coinDenominations) {
    const combinationCounts = new Array(targetAmount + 1).fill(0);
    combinationCounts[0] = 1; // Base case

    for (let coin of coinDenominations) {
        for (let amount = coin; amount <= targetAmount; amount++) {
            combinationCounts[amount] += combinationCounts[amount - coin];
        }
    }

    return combinationCounts[targetAmount];
}

function solveCoinChangeProblem() {
    rl.question('Enter the number of test cases: ', (testCaseCount) => {
        processTestCases(parseInt(testCaseCount), 0);
    });
}

function processTestCases(totalCases, currentCase) {
    if (currentCase === totalCases) {
        rl.close();
        return;
    }

    rl.question('Enter coin count and target amount: ', (line1) => {
        const [coinCount, targetAmount] = line1.split(' ').map(Number);
        rl.question('Enter coin denominations: ', (line2) => {
            const coinDenominations = line2.split(' ').map(Number);
            const result = calculateCoinChangeCombinations(coinCount, targetAmount, coinDenominations);
            console.log(`Number of combinations: ${result}`);
            processTestCases(totalCases, currentCase + 1);
        });
    });
}

// example input
// Start solving the problem
solveCoinChangeProblem();

// Input:
// Enter the number of test cases: 2
// 
// Test case 1:
// Enter coin count and target amount: 3 4
// Enter coin denominations: 1 2 3
// Output: Number of combinations: 4
// 
// Test case 2:
// Enter coin count and target amount: 4 10
// Enter coin denominations: 2 5 3 6
// Output: Number of combinations: 5
//
// Explanation:
// Test case 1: The combinations are {1,1,1,1}, {1,1,2}, {1,3}, and {2,2}.
// Test case 2: The combinations are {2,2,2,2,2}, {2,2,3,3}, {2,2,6}, {2,3,5}, and {5,5}