function buildJsBasicsRunLabel(suiteName, environment, buildNumber) {
  const suite = String(suiteName).trim();
  const env = String(environment).trim().toLowerCase();
  const build = "build-" + buildNumber;

  return suite + " | " + env + " | " + build;
}


console.log(buildJsBasicsRunLabel(" Smoke Suite ", " STAGING ", 42));
console.log(buildJsBasicsRunLabel("Regression", "PROD", 7));