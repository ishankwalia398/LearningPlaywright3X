function classifyJsBasicsScore(score) {
  if (score >= 90) {
    return "EXCELLENT";
  }

  if (score >= 75) {
    return "GOOD";
  }

  if (score >= 50) {
    return "NEEDS_PRACTICE";
  }

  return "REVISIT";
}


console.log(classifyJsBasicsScore(90));
console.log(classifyJsBasicsScore(89));
console.log(classifyJsBasicsScore(74));
console.log(classifyJsBasicsScore(49));