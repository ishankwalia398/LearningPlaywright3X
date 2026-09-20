function checkJsBasicsReadinessGate(hasSetup, hasPractice, hasNotes) {
  if (
    hasSetup === true &&
    hasPractice === true &&
    hasNotes === true
  ) {
    return "READY";
  }

  return "BLOCKED";
}

console.log(checkJsBasicsReadinessGate(true, true, true));
console.log(checkJsBasicsReadinessGate(true, false, true));
console.log(checkJsBasicsReadinessGate("true", true, true));