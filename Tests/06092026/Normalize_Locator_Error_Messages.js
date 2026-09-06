//Given a raw Playwright error message string, write a function that trims extra spaces, converts the message to lowercase, 
// collapses multiple spaces into a single space, and prints a category. 
// Use `TIMEOUT` if the normalized message contains `"timeout"`, `LOCATOR` if it contains `"locator"`, otherwise `GENERAL`.


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