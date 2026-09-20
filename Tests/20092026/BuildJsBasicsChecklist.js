function buildJsBasicsChecklist(items) {
  const result = [];
  let count = 1;

  for (const item of items) {
    const task = String(item).trim();

    if (task !== "") {
      result.push(count + ". " + task + " - TODO");
      count++;
    }
  }

  return result;
}

console.log(buildJsBasicsChecklist(["Install Node", "Create GitHub repo"]));
console.log(buildJsBasicsChecklist(["Practice switch", " ", "Push code"]));