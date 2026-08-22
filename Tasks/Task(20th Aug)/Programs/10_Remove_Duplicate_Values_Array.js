function removeDuplicates(arr) {
    return [...new Set(arr)];
}

console.log(removeDuplicates([3, 5, 7, 3, 5, 1]));