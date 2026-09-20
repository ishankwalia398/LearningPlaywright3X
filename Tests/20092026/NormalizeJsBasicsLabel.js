function normalizeJsBasicsLabel(label) {
  const text = String(label).trim().toLowerCase();

  let result = "";
  let lastWasHyphen = false;

  for (const char of text) {
    const isLetter = char >= "a" && char <= "z";
    const isDigit = char >= "0" && char <= "9";

    if (isLetter || isDigit) {
      result += char;
      lastWasHyphen = false;
    } else if (!lastWasHyphen) {
      result += "-";
      lastWasHyphen = true;
    }
  }

  return "js-basic-" + result;
}


console.log(normalizeJsBasicsLabel("  JavaScript Setup  "));

console.log(normalizeJsBasicsLabel("Identifiers & Literals"));

console.log(normalizeJsBasicsLabel("typeof:    Behavior"));