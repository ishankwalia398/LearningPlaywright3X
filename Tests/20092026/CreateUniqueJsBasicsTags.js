function createUniqueJsBasicsTags(tags) {
  const result = [];

  for (const tag of tags) {
    const normalized = String(tag).trim().toLowerCase();

    if (normalized !== "" && !result.includes(normalized)) {
      result.push(normalized);
    }
  }

  return result;
}


console.log(createUniqueJsBasicsTags([" Smoke ", "smoke", "Regression"]));
console.log(createUniqueJsBasicsTags(["", " API ", " ", "api"]));
console.log(createUniqueJsBasicsTags([" Smoke ", "smoke", "Regression"]));
console.log(createUniqueJsBasicsTags(["", " API ", " ", "api"]));