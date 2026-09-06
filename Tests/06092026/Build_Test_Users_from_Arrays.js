function questionName(input) {
  const names = input.names;
  const roles = input.roles;

  const answer = names.map((name, index) => {
    const username = name.toLowerCase().replaceAll(" ", "_");

    return {
      username: username,
      email: `${username}@playwrightbatch.com`,
      role: roles[index]
    };
  });

  return answer;
}


const input = {
  names: ["John Smith", "Sarah Jones", "Mike Brown"],
  roles: ["admin", "editor", "viewer"]
};

console.log(questionName(input));