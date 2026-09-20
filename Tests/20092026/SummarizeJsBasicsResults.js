function summarizeJsBasicsResults(results) {
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const result of results) {
    const text = String(result).toLowerCase();

    if (text.includes("pass")) {
      passed++;
    }

    if (text.includes("fail")) {
      failed++;
    }

    if (text.includes("skip")) {
      skipped++;
    }
  }

  return {
    total: results.length,
    passed: passed,
    failed: failed,
    skipped: skipped
  };
}


console.log(summarizeJsBasicsResults(["login-pass","api-fail","profile-skip"]));
console.log(summarizeJsBasicsResults([]));
console.log(summarizeJsBasicsResults(["a-pass","b-pass"]));