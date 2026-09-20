function findFirstCriticalJsBasicsBug(bugs) {
  for (const bug of bugs) {
    if (bug.severity === "critical") {
      return bug.title;
    }
  }

  return "No critical bug";
}


console.log(findFirstCriticalJsBasicsBug([{"title":"Typo","severity":"low"},{"title":"Login crash","severity":"critical"}]));
console.log(findFirstCriticalJsBasicsBug([{"title":"Spacing issue","severity":"low"}]));