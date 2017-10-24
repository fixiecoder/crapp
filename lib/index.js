const program = require('commander');
const chalk = require('chalk');


function run() {
  program
    .version('0.0.1')
    .arguments('<type>')
    .usage('f [options]')
    .option('-c, --component', 'add class component file')
    .option('-f, --functional-component', 'add functional component file')
    .option('-C, --container', 'Add container file')
    .option('-a, --action', 'Add action file')
    .option('-r, --reducer', 'Add reducer file');

  const helpResourceApp = `

  ${chalk.underline.bold('Create an entire app')}
  
  ${chalk('Usage: create-app a <project-name>')}
  
  `;
  const helpResourceFile = `  ${chalk.underline.bold('Create files in your project')}`;


  function help() {
    console.log(helpResourceApp);
    console.log(helpResourceFile);
    program.help((e) => {
      console.log(e)
      return `
`;
    });
  }

  program.parse(process.argv);

  if(program.args.length === 0) {
    return help();
  }
}

exports.run = run;


// const fc = require('./create');
// const packageJson = require('./packageJson');
// const readline = require('readline');
// const ncp = require('ncp').ncp;
// const path = require('path');
// const fs = require('fs');

// fc.create();


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const getInput = (question) => new Promise((resolve, reject) => {
//   rl.question(`${question}: `, (answer) => {
//     resolve(answer)
//   });
// });

// const copyFiles = (source, destination) => new Promise((resolve, reject) => {
//   ncp(source, destination, function (err) {
//     if (err) {
//       return reject(err);
//     } else {
//       resolve(destination);
//     }
//   });
// });

// const writePackageJsonFile = (name, description, destination) => new Promise((resolve, reject) => {
//   fs.writeFile(`${destination}/package.json`, createPackageJson.create(name, description), err => {
//     if(err) {
//       reject(err);
//     } else {
//       resolve();
//     }
//   });
// });

// function start() {
//   console.log(process.cwd());
//   ncp.limit = 16;
//   const source = path.resolve(__dirname, 'app-template');


//   let name = `react-app-${new Date().toISOString()}`;
//   let description = 'React app from empty template';

//   getInput('Application name')
//     .then(answer => {
//       // add name validation here
//       name = answer || name
//     })
//     .then(() => getInput('Description'))
//     .then(answer => description = answer || description)
//     .then(() => rl.close())
//     .then(() => {
//       const destination = path.resolve(process.cwd(), name);
//       return copyFiles(source, destination)
//     })
//     .then(destination => {
//       return writePackageJsonFile(name, description, destination);
//     })
//     .then(() => {
//       console.log("ALL DONE");
//     })
//     .catch('error creating app');
// }

// exports.start = start;
