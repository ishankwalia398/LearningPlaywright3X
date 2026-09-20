function countPassingJsBasicsChecks(results) {
  let count = 0;

  for (const result of results) {
    const text = String(result).toLowerCase();

    if (text.includes("pass")) {
      count++;
    }
  }

  return count;
}


console.log(countPassingJsBasicsChecks(["login-pass","api-fail","logout-pass"]));
console.log(countPassingJsBasicsChecks(["SETUP PASS","CONFIG PASS"]));
console.log(countPassingJsBasicsChecks(["one-fail","two-skip"]));