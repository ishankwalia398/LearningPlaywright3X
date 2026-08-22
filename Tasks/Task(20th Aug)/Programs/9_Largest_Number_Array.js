
function largestNumber(arr) {
    arr.sort((a, b) => b - a);
    return arr[0];
}

console.log(largestNumber([3, 5, 7, 2, 8, 1]));
console.log(largestNumber([-10, -5, -3, -1]));