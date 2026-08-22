console.log("Enter the number to find factorial");
const data = require('fs').readFileSync(0, 'utf8');

function factorial(num) {
    let fact = 1
    if (num < 0) {
        return "Factorial is not defined for negative numbers";
    } 
    else if (num === 0) {
        return 1;
    }
    else {
        for (let i = 1; i <= num; i++) {
        fact = fact * i ;
    }   
    return fact;
    }
}

console.log(factorial(parseInt(data)));