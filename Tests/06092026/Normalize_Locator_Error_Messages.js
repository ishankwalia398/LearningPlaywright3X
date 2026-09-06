function questionName(input) {
  const normalizedMessage = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  let category;

  if (normalizedMessage.includes("timeout")) {
    category = "TIMEOUT";
  } else if (normalizedMessage.includes("locator")) {
    category = "LOCATOR";
  } else {
    category = "GENERAL";
  }

  const answer = {
    message: normalizedMessage,
    category: category
  };

  return answer;
}


console.log(questionName("   LOCATOR   not found   after TIMEOUT   "));