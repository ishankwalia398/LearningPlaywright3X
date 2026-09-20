function summarizeJsBasicsMatrix(matrix) {
  let total = 0;
  let passed = 0;
  let failed = 0;
  const failedCases = [];

  for (const row of matrix) {
    for (const result of row) {
      total++;

      const text = String(result).toLowerCase();

      if (text.includes("pass")) {
        passed++;
      }

      if (text.includes("fail")) {
        failed++;
        failedCases.push(result);
      }
    }
  }

  return {
    total: total,
    passed: passed,
    failed: failed,
    failedCases: failedCases
  };
}

console.log(summarizeJsBasicsMatrix([["login-pass"],["checkout-fail"]]));
console.log(summarizeJsBasicsMatrix([["a-pass", "b-pass"],["c-pass"]]));