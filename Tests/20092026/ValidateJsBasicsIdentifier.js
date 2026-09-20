function isValidJsBasicsIdentifier(name) {
  if (typeof name !== "string") {
    return false;
  }

  name = name.trim();

  if (name.length === 0) {
    return false;
  }

  const reservedWords = [
    "let",
    "const",
    "var",
    "class",
    "function",
    "return"
  ];

  if (reservedWords.includes(name)) {
    return false;
  }

  const firstChar = name[0];

  const firstIsLetter =
    (firstChar >= "a" && firstChar <= "z") ||
    (firstChar >= "A" && firstChar <= "Z");

  if (!firstIsLetter && firstChar !== "_" && firstChar !== "$") {
    return false;
  }

  for (let i = 1; i < name.length; i++) {
    const char = name[i];

    const isLetter =
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z");

    const isDigit = char >= "0" && char <= "9";

    if (!isLetter && !isDigit && char !== "_" && char !== "$") {
      return false;
    }
  }

  return true;
}


console.log(isValidJsBasicsIdentifier("  loginButton  "));
console.log(isValidJsBasicsIdentifier("_test123"));
console.log(isValidJsBasicsIdentifier("$value_2"));
console.log(isValidJsBasicsIdentifier("hello-world"));
console.log(isValidJsBasicsIdentifier("hello world"));
console.log(isValidJsBasicsIdentifier(""));
console.log(isValidJsBasicsIdentifier("   "));
console.log(isValidJsBasicsIdentifier(123));
console.log(isValidJsBasicsIdentifier("const"));
console.log(isValidJsBasicsIdentifier("returnValue"));