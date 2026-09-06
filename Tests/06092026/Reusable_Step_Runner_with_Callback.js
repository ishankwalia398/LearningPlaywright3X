//Write a higher-order function `runStep(stepName, actionFn)` that logs the start of a step, executes the callback,
//  and returns an object in the format `{ stepName, passed, message }`. 
// If the callback throws an error, catch it and return `passed: false` with the error message.


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