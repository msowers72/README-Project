const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
   
   return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the project?',
    },
    {
      type: 'input',
      name: 'table of content',
      message: 'Provide a table of contents?',
    },
    {
      type: 'input',
      name: 'username',
      message: 'Input your user name?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project?',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Explain the installation process?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'How will this application be used?',
    },

    {
      type: 'input',
      name: 'licenses',
      message: 'Provide the required licenses for this project?',
    },

  ]);
}

function generateMarkdown(response) {
    return `
    # ${response.title}
    
  
    # Table of Contents
    -[description](#description)
    -[installation](#installation)
    -[usage](#usage)
    -[licenses](#licenses)
    -[username](#username)
  
    ${response.username}
    ##username
  
    ${response.description}
    ##description:
  
    ${response.installation}
    ##installation
  
    ${response.usage}
    ##usage
  
    ${response.licenses}
    ##licenses 
  
  `;
  }

  async function init() {
      try {
          const response = await promptUser();
          const readMe = generateMarkdown(response);
          await writeFileAsync("README.md", readMe);
          console.log("Success!");
      } catch (err) {
          console.log(err);
      }
  }

  init();