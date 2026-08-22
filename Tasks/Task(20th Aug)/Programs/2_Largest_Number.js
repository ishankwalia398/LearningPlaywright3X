function largestNumber(num1, num2, num3) {
    if (num1 >= num2 && num1 >= num3) {
        return num1;
    } else if (num2 >= num1 && num2 >= num3) {
        return num2;
    } else {
        return num3;
    }
}

console.log(largestNumber(10, 20, 30)); 
console.log(largestNumber(50, 20, 30)); 
console.log(largestNumber(10, 60, 30)); 
console.log(largestNumber(10, 20, 70));