function calculateJsBasicsWeightedScore(passed, failed, skipped) {
  return (passed * 2) - failed;
}

console.log(calculateJsBasicsWeightedScore(5, 2, 1));
console.log(calculateJsBasicsWeightedScore(3, 0, 0));
console.log(calculateJsBasicsWeightedScore(1, 4, 3));