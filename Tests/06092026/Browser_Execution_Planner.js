//You have an array of all supported browsers and another array of temporarily blocked browsers. 
// Write a function that returns the runnable browsers, 
// the blocked browsers, and a printable execution plan string such as `"Run on: chromium, webkit | Skip: firefox"`.


function questionName(input) {
  const allBrowsers = input.allBrowsers;
  const blockedBrowsers = input.blockedBrowsers;

  const runnableBrowsers = allBrowsers.filter(
    browser => !blockedBrowsers.includes(browser)
  );

  const blocked = allBrowsers.filter(
    browser => blockedBrowsers.includes(browser)
  );

  const executionPlan =
    `Run on: ${runnableBrowsers.join(", ")} | Skip: ${blocked.join(", ")}`;

  const answer = {
    runnableBrowsers,
    blockedBrowsers: blocked,
    executionPlan
  };

  return answer;
}


const input = {
  allBrowsers: ["chromium", "firefox", "webkit"],
  blockedBrowsers: ["firefox"]
};


console.log(questionName(input));