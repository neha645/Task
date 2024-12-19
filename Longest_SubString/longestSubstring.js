function lengthOfLongestSubstring(s) {
    let charMap = new Map();
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        // If character is repeated, move start pointer
        if (charMap.has(s[end]) && charMap.get(s[end]) >= start) {
            start = charMap.get(s[end]) + 1;
        } else {
            // Update max length if current substring is longer
            maxLength = Math.max(maxLength, end - start + 1);
        }
        // Update last seen position of current character
        charMap.set(s[end], end);
    }
    
    return maxLength;
}

// Test cases
console.log(lengthOfLongestSubstring("ABCBC")); // Output: 3
console.log(lengthOfLongestSubstring("AAA"));   // Output: 1