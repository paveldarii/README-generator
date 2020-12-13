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
      message:
        "1. Academic Free License v3.0\n" +
        "2. Apache license 2.0\n" +
        "3. Artistic license 2.0\n" +
        "4. Boost Software License 1.0	\n" +
        "5. BSD 2-clause 'Simplified' license	\n" +
        "6. BSD 3-clause 'New' or 'Revised' \n" +
        "7. BSD 3-clause Clear license\n" +
        "8. Creative Commons license family	\n" +
        "9. Creative Commons Zero v1.0 Universal\n" +
        "10. Creative Commons Attribution 4.0\n" +
        "11. Creative Commons Attribution Share Alike 4.0\n" +
        "12. zLib License\n" +
        "13. Educational Community License v2.0\n" +
        "14. Eclipse Public License 1.0\n" +
        "15. Eclipse Public License 2.0\n" +
        "16. European Union Public License 1.1\n" +
        "17. GNU Affero General Public License\n" +
        "18. GNU General Public License family\n" +
        "19. GNU General Public License v2.0\n" +
        "20. GNU General Public License v3.0\n" +
        "21. GNU Lesser General Public License family\n" +
        "22. GNU Lesser General Public License v2.1	\n" +
        "23. GNU Lesser General Public License	\n" +
        "24. ISC\n" +
        "25. LaTeX Project Public License v1.3c	\n" +
        "26. Microsoft Public License\n" +
        "27. MIT\n" +
        "28. Mozilla Public License 2.0	\n" +
        "29. Open Software License 3.0	\n" +
        "30. PostgreSQL License	\n" +
        "31. SIL Open Font License 1.1	\n" +
        "32. University of Illinois/NCSA Open Source License\n" +
        "33. The Unlicense\n" +
        "Enter the number of the licence that you prefer from the list above?",
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
