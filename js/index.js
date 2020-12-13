const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "gitHubUserName",
      message: "What is you GitHub username?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
    },
    {
      type: "input",
      name: "description",
      message: "How would you describe your project?",
    },
    {
      type: "input",
      name: "installation",
      message: "How to install your program?",
    },
    {
      type: "input",
      name: "usage",
      message: "How to use your program?",
    },
    {
      type: "input",
      name: "licence",
      message: "Chose the licence that you prefer?",
    },
    {
      type: "input",
      name: "contribute",
      message: "How to contribute to your project?",
    },
    {
      type: "input",
      name: "tests",
      message: "Explain testing procedures?",
    },
    {
      type: "input",
      name: "questions",
      message: "Explain testing procedures?",
    },
  ]);

const generateREADME = (answers) =>
  `
  Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
  
`;

promptUser()
  .then((answers) =>
    writeFileAsync("../generated-readme/README.md", generateREADME(answers))
  )
  .then(() => console.log("Successfully wrote to index.html"))
  .catch((err) => console.error(err));
