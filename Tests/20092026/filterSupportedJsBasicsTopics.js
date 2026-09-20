function filterSupportedJsBasicsTopics(topics) {
  const aliases = {
    node: "node",
    runtime: "node",

    v8: "v8",
    engine: "v8",

    npm: "npm",
    "package-manager": "npm"
  };

  const result = [];

  for (const item of topics) {
    const normalized = String(item).trim().toLowerCase();
    const canonical = aliases[normalized];

    if (canonical !== undefined && !result.includes(canonical)) {
      result.push(canonical);
    }
  }

  return result;
}


console.log(filterSupportedJsBasicsTopics(["NODE"," v8 ","unknown"]));
console.log(filterSupportedJsBasicsTopics(["node","runtime","node"]));
console.log(filterSupportedJsBasicsTopics(["npm","node","v8"]));