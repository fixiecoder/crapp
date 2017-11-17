const { isNameValid } = require('../shared');
const createPackageJson = require('./packageJson');
const readline = require('readline');
const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getInput = (question) => new Promise((resolve, reject) => {
  rl.question(`${question}: `, (answer) => {
    resolve(answer)
  });
});

const copyFiles = (source, destination) => new Promise((resolve, reject) => {
  ncp(source, destination, function (err) {
    if(err) {
      console.log('here is the error', err)
      return reject(err);
    } else {
      resolve(destination);
    }
  });
});

const writePackageJsonFile = (name, description, destination) => new Promise((resolve, reject) => {
  fs.writeFile(`${destination}/package.json`, createPackageJson(name, description), err => {
    if(err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

function createApp(programName) {
  if(isNameValid(programName) === false) {
    console.log(chalk.red('Invalid package name'));
    process.exit(1);
  }

  ncp.limit = 16;
  const source = path.resolve(__dirname, 'template');
  let description = 'React app from empty template';

  const destination = path.resolve(process.cwd(), programName);
  return copyFiles(source, destination)
    .then(destination => {
      return writePackageJsonFile(programName, description, destination);
    })
    .then(() => {
      console.log(chalk.green('Success:'), `Your application ${chalk.yellow.bold(programName)} has been created.`);
      process.exit(0);
    })
    .catch(e => {
      console.log(chalk.red(e.message));
      process.exit(1);
    });
}

module.exports = createApp;
