const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
const licenseLinks = [
  "http://unlicense.org/",
  "https://opensource.org/licenses/Apache-2.0",
  "https://www.boost.org/LICENSE_1_0.txt",
  "https://opensource.org/licenses/BSD-3-Clause",
  "https://opensource.org/licenses/BSD-2-Clause",
  "http://creativecommons.org/publicdomain/zero/1.0",
  "https://creativecommons.org/licenses/by/4.0/",
  "https://creativecommons.org/licenses/by-sa/4.0/",
  "https://creativecommons.org/licenses/by-nc/4.0/",
  "https://creativecommons.org/licenses/by-nd/4.0/",
  "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  "https://opensource.org/licenses/EPL-1.0",
  "https://www.gnu.org/licenses/gpl-3.0",
  "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",
  "https://www.gnu.org/licenses/agpl-3.0",
  "https://www.gnu.org/licenses/lgpl-3.0",
  "https://www.gnu.org/licenses/fdl-1.3",
  "https://opensource.org/licenses/IPL-1.0",
  "https://opensource.org/licenses/ISC",
  "https://opensource.org/licenses/MIT",
  "https://opensource.org/licenses/MPL-2.0",
  "https://opendatacommons.org/licenses/by/",
  "https://opendatacommons.org/licenses/odbl/",
  "https://opendatacommons.org/licenses/pddl/",
  "https://opensource.org/licenses/Artistic-2.0",
  "https://opensource.org/licenses/Artistic-2.0",
  "https://opensource.org/licenses/OFL-1.1",
  "https://opensource.org/licenses/Zlib",
  "http://unlicense.org/",
];
const badgeLicenseKeys = [
  "no licence",
  "Apache%202.0-blue.svg",
  "Boost%201.0-lightblue.svg",
  "BSD%203--Clause-blue.svg",
  "BSD%202--Clause-orange.svg",
  "CC0%201.0-lightgrey.svg",
  "CC%20BY%204.0-lightgrey.svg",
  "CC%20BY--SA%204.0-lightgrey.svg",
  "CC%20BY--NC%204.0-lightgrey.svg",
  "CC%20BY--ND%204.0-lightgrey.svg",
  "CC%20BY--NC--SA%204.0-lightgrey.svg",
  "CC%20BY--NC--ND%204.0-lightgrey.svg",
  "EPL%201.0-red.svg",
  "GPLv3-blue.svg",
  "GPL%20v2-blue.svg",
  "AGPL%20v3-blue.svg",
  "LGPL%20v3-blue.svg",
  "FDL%20v1.3-blue.svg",
  "IPL%201.0-blue.svg",
  "ISC-blue.svg",
  "MIT-yellow.svg",
  "MPL%202.0-brightgreen.svg",
  "ODC_BY-brightgreen.svg",
  "ODbL-brightgreen.svg",
  "PDDL-brightgreen.svg",
  "Perl-0298c3.svg",
  "Artistic%202.0-0298c3.svg",
  "OFL%201.1-lightgreen.svg",
  "Zlib-lightgrey.svg",
  "Unlicense-blue.svg",
];
const licenses = [
  "The Unlicence",
  "Apache 2.0 License",
  "Boost Software License 1.0",
  "BSD 3-Clause License	",
  "BSD 2-Clause License",
  "CC0",
  "Attribution 4.0 International",
  "Attribution-ShareAlike 4.0 International",
  "Attribution-NonCommercial 4.0 International",
  "Attribution-NoDerivates 4.0 International",
  "Attribution-NonCommmercial-ShareAlike 4.0 International",
  "Creative Commons Attribution Share Alike 4.0	",
  "Attribution-NonCommercial-NoDerivatives 4.0 International",
  "Eclipse Public License 1.0",
  "GNU GPL v3	",
  "GNU GPL v2",
  "GNU AGPL v3",
  "GNU LGPL v3	",
  "GNU FDL v1.3",
  "IBM Public License Version 1.0",
  "ISC License (ISC)",
  "The MIT License",
  "Mozilla Public License 2.0",
  "Attribution License (BY)",
  "Open Database License (ODbL)",
  "Public Domain Dedication and License (PDDL)",
  "The Perl License",
  "The Artistic License 2.0",
  "SIL Open Font License 1.1",
  "Zlib",
  "The Unlicense",
];

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
        "0 no licence\n" +
        "1 Apache 2.0 License\n" +
        "2 Boost Software License 1.0\n" +
        "3 BSD 3-Clause License	\n" +
        "4 BSD 2-Clause License\n" +
        "5 CC0\n" +
        "6 Attribution 4.0 International\n" +
        "7 Attribution-ShareAlike 4.0 International\n" +
        "8 Attribution-NonCommercial 4.0 International\n" +
        "9 Attribution-NoDerivates 4.0 International\n" +
        "10 Attribution-NonCommmercial-ShareAlike 4.0 International\n" +
        "11 Attribution-NonCommercial-NoDerivatives 4.0 International\n" +
        "12 Eclipse Public License 1.0\n" +
        "13 GNU GPL v3	\n" +
        "14 GNU GPL v2\n" +
        "15 GNU AGPL v3\n" +
        "16 GNU LGPL v3	\n" +
        "17 GNU FDL v1.3\n" +
        "18 IBM Public License Version 1.0\n" +
        "19 ISC License (ISC)\n" +
        "20 The MIT License\n" +
        "21 Mozilla Public License 2.0\n" +
        "22 Attribution License (BY)\n" +
        "23 Open Database License (ODbL)\n" +
        "24 Public Domain Dedication and License (PDDL)\n" +
        "25 The Perl License\n" +
        "26 The Artistic License 2.0\n" +
        "27 SIL Open Font License 1.1\n" +
        "28 Zlib\n" +
        "29 The Unlicense\n",
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
    tableOfContentsSection,
    licenseBadge;
  var tableOfContentsList = [];
  //Check for the title input
  if (answers.title !== "") {
    titleSection = `# ${answers.title} `;
  } else {
    titleSection = "";
  }
  //License section
  if (parseInt(answers.licenseNum) > 0 && parseInt(answers.licenseNum) < 30) {
    licenseSection = `## License
[${licenses[parseInt(answers.licenseNum)]}](${
      licenseLinks[parseInt(answers.licenseNum)]
    }/)\n`;
    tableOfContentsList.push(`[License](#license)`);
  } else {
    licenseSection = "";
  }
  //License badge section
  if (parseInt(answers.licenseNum) > 0 && parseInt(answers.licenseNum) < 30) {
    licenseBadge = `[![License: GPL v3](https://img.shields.io/badge/License-${
      badgeLicenseKeys[parseInt(answers.licenseNum)]
    })](${licenseLinks[parseInt(answers.licenseNum)]})\n`;
  } else {
    licenseBadge = "";
  }
  // Description of the project section
  if (answers.description !== "") {
    descriptionSection = `## Description
${answers.description}\n`;
    tableOfContentsList.push(`[Description](#description)`);
  } else {
    descriptionSection = "";
  }
  //Installation of the project section
  if (answers.installation !== "") {
    installationSection = `## Installation
${answers.installation}\n`;
    tableOfContentsList.push(`[Installation](#installation)`);
  } else {
    installationSection = "";
  }
  // Usage section
  if (answers.usage !== "") {
    usageSection = `## Usage
${answers.usage}\n`;
    tableOfContentsList.push(`[Usage](#usage)`);
  } else {
    usageSection = "";
  }
  //Contribution section
  if (answers.contribute !== "") {
    contributeSection = `## Contribution
${answers.contribute}\n`;
    tableOfContentsList.push(`[Contribution](#Contribution)`);
  } else {
    contributeSection = "";
  }
  //Tests section
  if (answers.tests !== "") {
    testsSection = `## Tests
${answers.tests}\n`;
    tableOfContentsList.push(`[Tests](#tests)`);
  } else {
    testsSection = "";
  }
  // Question Section
  if (answers.gitHubProfileSection !== "" || answers.email !== "") {
    questionsSection = `## Questions\n`;
    tableOfContentsList.push(`[Questions](#questions)`);
  } else {
    questionsSection = "";
  }
  //GitHub Line
  if (answers.gitHubUserName !== "") {
    gitHubProfileSection = `My GitHub profile: [https://github.com/${answers.gitHubUserName}](https://github.com/${answers.gitHubUserName}).\n`;
  } else {
    gitHubProfileSection = "";
  }
  //Email line
  if (answers.email !== "") {
    emailSection = `\nMy email address: ${answers.email}\n`;
  } else {
    gitHubProfileSection = "";
  }
  // Creating the table of contents sections
  function createTableOfContent(arr) {
    var contentSection = "## Table Of Contents\n";
    for (let i = 0; i < arr.length; i++) {
      contentSection += "\n" + (i + 1) + ". " + arr[i] + "\n";
    }
    return contentSection;
  }
  tableOfContentsSection = createTableOfContent(tableOfContentsList);

  // setting sections in the order they should display
  var readmeContent = `${titleSection}${licenseBadge}${tableOfContentsSection}${descriptionSection}${installationSection}${usageSection}${contributeSection}${testsSection}${questionsSection}${gitHubProfileSection}${emailSection}${licenseSection}`;
  return readmeContent;
};

promptUser()
  .then((answers) => {
    writeFileAsync("../generated-readme/README.md", generateREADME(answers));
  })
  .then(() =>
    console.log(
      "Successfully created the README.md file.\nOpen the generated-readme folder and you will find the file you just created."
    )
  )
  .catch((err) => console.error(err));
