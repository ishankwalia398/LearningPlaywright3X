//You receive an array of Playwright step result objects in the format `{ name, status, durationMs }`,
//where status can be `"passed"`, `"failed"`, or `"skipped"`. 
// Write a JavaScript function that prints a summary report with total steps, passed count, failed count,
// skipped count, total duration, and a comma-separated list of failed step names.

function questionName(input) {
  const totalSteps = input.length;
  const passedCount = input.filter(step => step.status === "passed").length;
  const failedCount = input.filter(step => step.status === "failed").length;
  const skippedCount = input.filter(step => step.status === "skipped").length;

  const totalDuration = input.reduce(
    (total, step) => total + step.durationMs,
    0
  );

  const failedStepNames = input
    .filter(step => step.status === "failed")
    .map(step => step.name)
    .join(", ");

  const answer = `Total Steps: ${totalSteps}
Passed: ${passedCount}
Failed: ${failedCount}
Skipped: ${skippedCount}
Total Duration: ${totalDuration} ms
Failed Steps: ${failedStepNames}`;

  return answer;
}

const input = [
  { name: "Open Login Page", status: "passed", durationMs: 500 },
  { name: "Enter Username", status: "passed", durationMs: 300 },
  { name: "Click Login", status: "failed", durationMs: 700 },
  { name: "Verify Dashboard", status: "skipped", durationMs: 0 }
];

console.log(questionName(input));