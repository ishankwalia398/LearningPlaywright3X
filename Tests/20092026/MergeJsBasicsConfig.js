function mergeJsBasicsConfig(defaultConfig, overrideConfig) {
  const merged = {
    ...defaultConfig,
    ...overrideConfig
  };

  if (merged.retries === undefined) {
    merged.retries = 0;
  }

  return merged;
}


console.log(mergeJsBasicsConfig({"retries":1,"env":"dev"}, {"retries":3}));
console.log(mergeJsBasicsConfig({"env":"qa"}, {"timeout":5000}));
console.log(mergeJsBasicsConfig({"env":"dev","retries":2}, {"env":"stage"}));