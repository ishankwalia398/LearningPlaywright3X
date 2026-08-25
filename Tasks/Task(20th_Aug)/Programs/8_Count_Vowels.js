console.log("Enter the string to count the number of vowels in it");
const data = require('fs').readFileSync(0, 'utf8');

function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    return count;
}


console.log(countVowels(data));