console.log("Enter the number to print Fibonacci series");
const data = parseInt(require('fs').readFileSync(0, 'utf8'));

function fibonacci(num) {
    let a = 0, b = 1, c;
    let series = [a, b];
    for (let i = 2; i < num; i++) {
        c = a + b;
        series.push(c);
        a = b;
        b = c;
    }
    return series; 
}

console.log(fibonacci(data));