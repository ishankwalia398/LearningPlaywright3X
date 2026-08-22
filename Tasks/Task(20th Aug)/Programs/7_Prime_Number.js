console.log("Enter the number to check if it is prime or not");
const data = parseInt(require('fs').readFileSync(0, 'utf8'));

function prime(num) {
    if (num <= 1) {
        return false;
    }
    if (num === 2) {
        return true;
    }
    if (num % 2 === 0) {
        return false;
    }
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(prime(data));