const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?",
    },
    {
      type: "input",
      name: "hobby",
      message: "What is your favorite hobby?",
    },
    {
      type: "input",
      name: "food",
      message: "What is your favorite food?",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username",
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL.",
    },
  ]);

const generateREADME = (answers) =>
  `
`;

promptUser()
  .then((answers) =>
    writeFileAsync("../generated-readme/README.md", generateREADME(answers))
  )
  .then(() => console.log("Successfully wrote to index.html"))
  .catch((err) => console.error(err));
