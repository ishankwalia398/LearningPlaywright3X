function getJsBasicsKeywordMeaning(term) {
  const meanings = {
    node: "runtime",
    v8: "engine",
    npm: "package-manager"
  };

  const normalizedTerm = String(term).trim().toLowerCase();

  if (meanings[normalizedTerm] !== undefined) {
    return meanings[normalizedTerm];
  }

  return "unknown";
}

console.log(getJsBasicsKeywordMeaning("NODE"));
console.log(getJsBasicsKeywordMeaning(" V8 "));
console.log(getJsBasicsKeywordMeaning("npm"));
console.log(getJsBasicsKeywordMeaning("not-a-topic"));