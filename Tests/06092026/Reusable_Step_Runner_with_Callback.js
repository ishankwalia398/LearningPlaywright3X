function questionName(input) {
  function runStep(stepName, actionFn) {
    try {
      const message = actionFn();

      return {
        stepName: stepName,
        passed: true,
        message: message
      };
    } catch (error) {
      return {
        stepName: stepName,
        passed: false,
        message: error.message
      };
    }
  }

  const answer = runStep(input.stepName, input.actionFn);

  return answer;
}


const input = {
  stepName: "open dashboard",
  actionFn: () => "Page loaded"
};

console.log(questionName(input));