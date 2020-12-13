const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const { PassThrough } = require("stream");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const writeFileAsync = util.promisify(fs.writeFile);
const licenseKeys = [
  "no licence",
  "afl-3.0",
  "apache-2.0",
  "artistic-2.0",
  "bsl-1.0",
  "bsd-2-clause",
  "bsd-3-clause",
  "bsd-3-clause-clear",
  "cc",
  "cc0-1.0",
  "cc-by-4.0",
  "cc-by-sa-4.0",
  "zlib",
  "ecl-2.0",
  "epl-1.0",
  "epl-2.0",
  "eupl-1.1",
  "agpl-3.0",
  "gpl",
  "gpl-2.0",
  "gpl-3.0",
  "lgpl",
  "lgpl-2.1",
  "lgpl-3.0",
  "isc",
  "lppl-1.3c",
  "ms-pl",
  "mit",
  "mpl-2.0",
  "osl-3.0",
  "postgresql",
  "ofl-1.1",
  "ncsa",
  "unlicense",
];
const licenses = [
  "no licence",
  "Academic Free License v3.0	",
  "Apache license 2.0",
  "Artistic license 2.0	",
  "Boost Software License 1.0	",
  "BSD 2-clause 'Simplified' license	",
  "BSD 3-clause 'New' or 'Revised' license	",
  "BSD 3-clause Clear license",
  "Creative Commons license family	",
  "Creative Commons Zero v1.0 Universal	",
  "Creative Commons Attribution 4.0	",
  "Creative Commons Attribution Share Alike 4.0	",
  "zLib License	",
  "Educational Community License v2.0",
  "Eclipse Public License 1.0	",
  "Eclipse Public License 2.0	",
  "European Union Public License 1.1	",
  "GNU Affero General Public License v3.0	",
  "GNU General Public License family	",
  "GNU General Public License v2.0	",
  "GNU General Public License v3.0	",
  "GNU Lesser General Public License family	",
  "GNU Lesser General Public License v2.1	",
  "GNU Lesser General Public License v3.0	",
  "ISC	",
  "LaTeX Project Public License v1.3c	",
  "Microsoft Public License	",
  "MIT	",
  "Mozilla Public License 2.0	",
  "Open Software License 3.0	",
  "PostgreSQL License	",
  "SIL Open Font License 1.1	",
  "University of Illinois/NCSA Open Source License	",
  "The Unlicense",
];
console.log(licenseKeys.length, licenses.length);

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
      name: "title",
      message: "What is your project title?",
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
      name: "licenseNum",
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
        "33. Without license\n\n" +
        "From the list above, enter the number of the licence that you prefer?",
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
  ]);

const generateREADME = (answers) => {
  var titleSection,
    licenseSection,
    descriptionSection,
    installationSection,
    usageSection,
    contributeSection,
    testsSection,
    questionsSection,
    gitHubProfileSection,
    emailSection,
    tableOfContentsSection;
  var tableOfContentsList = [];
  //Check for the title input
  if (answers.title !== "") {
    titleSection = `#${answers.title}\n`;
  } else {
    titleSection = "";
  }
  //License section
  if (parseInt(answers.licenseNum) > 0 && parseInt(answers.licenseNum) < 34) {
    licenseSection = `## License
[${
      licenses[parseInt(answers.licenseNum)]
    }](https://choosealicense.com/licenses/${
      licenseKeys[parseInt(answers.licenseNum)]
    }/)\n`;
    tableOfContentsList.push(`[Licence](#licence)`);
  } else {
    licenseSection = "";
  }
  // Description of the project section
  if (answers.description !== "") {
    descriptionSection = `##Description
${answers.description}\n`;
    tableOfContentsList.push(`[Description](#description)`);
  } else {
    descriptionSection = "";
  }
  //Installation of the project section
  if (answers.installation !== "") {
    installationSection = `##Installation
${answers.installation}\n`;
    tableOfContentsList.push(`[Installation](#installation)`);
  } else {
    installationSection = "";
  }
  // Usage section
  if (answers.usage !== "") {
    usageSection = `##Usage
${answers.usage}\n`;
    tableOfContentsList.push(`[Usage](#usage)`);
  } else {
    usageSection = "";
  }
  //Contribution section
  if (answers.contribute !== "") {
    contributeSection = `##Contribution
${answers.contribute}\n`;
    tableOfContentsList.push(`[Contribution](#Contribution)`);
  } else {
    contributeSection = "";
  }
  //Tests section
  if (answers.tests !== "") {
    testsSection = `##Tests
${answers.tests}\n`;
    tableOfContentsList.push(`[Tests](#tests)`);
  } else {
    testsSection = "";
  }
  // Question Section
  if (answers.gitHubProfileSection !== "" || answers.email !== "") {
    questionsSection = `##Questions\n`;
    tableOfContentsList.push(`[Question](#question)`);
  } else {
    questionsSection = "";
  }
  //GitHub Line
  if (answers.gitHubUserName !== "") {
    gitHubProfileSection = `My GitHub profile: [github.com/${answers.gitHubUserName}](github.com/${answers.gitHubUserName}).\n`;
  } else {
    gitHubProfileSection = "";
  }
  //Email line
  if (answers.email !== "") {
    emailSection = `My email address: ${answers.email}`;
  } else {
    gitHubProfileSection = "";
  }
  // Creating the table of contents sections
  function createTableOfContent(arr) {
    var contentSection = "Table Of Content\n";
    for (let i = 0; i < arr.length; i++) {
      contentSection += arr[i];
    }
    return contentSection;
  }
  tableOfContentsSection = createTableOfContent(tableOfContentsList);
  // setting sections in the order they should display
  var readmeContent = `${titleSection}${tableOfContentsSection}${licenseSection}${descriptionSection}${installationSection}${contributeSection}${testsSection}${questionsSection}${gitHubProfileSection}${emailSection}`;
  return readmeContent;
};

promptUser()
  .then((answers) => {
    writeFileAsync("../generated-readme/README.md", generateREADME(answers));
  })
  .then(() => console.log("Successfully wrote to index.html"))
  .catch((err) => console.error(err));
