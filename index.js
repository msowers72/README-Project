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
      name: 'username',
      message: 'Input your github user name?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Input your email?',
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
    {
      type: 'input',
      name: 'video',
      message: 'Readme instructional video',      
    },

  ]);
}

function generateMarkdown(response) {
    return `
# ${response.title}


# Table of Contents
- [username](#username)
- [description](#description)
- [installation](#installation)
- [usage](#usage)
- [licenses](#licenses)


## GitHub Username
${response.username}

## Email
${response.email}

## Description:
${response.description}

## Installation
${response.installation}

## Usage
${response.usage}

## Licenses 
${response.licenses}
![Tux, the Linux mascot](https://img.shields.io/badge/License-MIT-green)

## Video
${response.Video}
  
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