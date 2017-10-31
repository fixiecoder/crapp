const createApp = require('./create-app');
const createFiles = require('./create-files');
const program = require('commander');
const chalk = require('chalk');
const version = require('../package.json').version;

const optionConfig = {
  a: {
    title: 'Create application',
    description: 'Create an empty application.',
    arg: 'crap a <application-name>',
    options: [
      
    ]
  },
  f: {
    title: 'Add file(s)',
    description: 'Create a file or files inside your application. You can add components, container, actions and reducers.',
    arg: 'crap f [options] <file-name>',
    options: [
      { def: '-c, --component', param: 'component', desc: 'add class component file' },
      { def: '-f, --functional-component', param: 'functionalComponent', desc: 'add functional component file' },
      { def: '-C, --container', param: 'container', desc: 'Add container file' },
      { def: '-s, --style', param: 'style', desc: 'Add scss file for component' },
      // { def: '-a, --action', param: 'action', desc: 'Add action file' },
      // { def: '-r, --reducer', param: 'reducer', desc: 'Add reducer file' },
      { def: '-p, --path <value>', param: 'path', desc: 'provide component/container path' },
    ]
  }
};

function help() {
  console.log('');
  console.log(' ', chalk.bold.underline('Create a react application or files within one.'));
  console.log('');
  const columnTwoStart = 30;
  Object.keys(optionConfig).forEach(arg => {
    const argOptions = optionConfig[arg].options;
    console.log(' ', chalk.bold(optionConfig[arg].title));
    console.log('');
    console.log('   ', optionConfig[arg].description);
    console.log('');
    console.log('   ', chalk.bold(optionConfig[arg].arg))
    console.log('');
    for(let i = 0; i < argOptions.length; i += 1) {
      const option = argOptions[i];
      const whitespacePaddingCount = columnTwoStart - option.def.length;
      const paddingSpaces = Array(whitespacePaddingCount).fill(' ').join('');
      console.log(`    ${option.def}${paddingSpaces}${option.desc}`)
    }
  });
  console.log('');
}


function run() {
  program
    .version(version)
    .arguments('<type>')
    .usage('f [options]')

  Object.keys(optionConfig).forEach(arg => {
    const argOptions = optionConfig[arg].options;
    for(let i = 0; i < argOptions.length; i += 1) {
      const option = argOptions[i];
      program.option(option.def, option.desc);
    }
  });

  program.parse(process.argv);

  if(program.args.length === 0) {
    help();
    process.exit(0);
  }


  switch(program.args[0]) {
    case 'a':
      if(program.args[1]) {
        createApp(program.args[1]);
      } else {
        console.log(chalk.yellow('You must provide a package name as the second argument'));
        process.exit(1);
      }
      break;

    case 'f':
     if(program.args[1]) {
        const options = optionConfig.f.options
          .filter(option => program[option.param] === true)
          .map(option => option.param);
        const path = program.path || '';
        createFiles(program.args[1], options, path);
      } else {
        console.log(chalk.yellow('You must provide a file name as the second argument'));
        process.exit(1);
      }
      break;

    default:
      console.log(chalk.yellow('Only a or f are valid first arguments'));
      process.exit(1);
  }
}

exports.run = run;
