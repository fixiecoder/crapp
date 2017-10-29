const fs = require('fs');
const { isNameValid, camelCaseify,isDirSync, mkDirRecurs, writeFile, getFileContents } = require('../shared');
const path = require('path');
const componentsPath = path.join(process.cwd(), 'src/js/components');
const containersPath = path.join(process.cwd(), 'src/js/containers');
const chalk = require('chalk');

function createReactFile(name, type, filePath) {
  console.log(type)
  const fileLocation = `${__dirname}/templates/${templateMap[type].template}.js`;
  return getFileContents(fileLocation)
    .then(file => {
      if(!file) {
        console.log(chalk.red('Error finding contents of file template'));
      } else {

        file  = file
          .replace(/NamePlaceholder/g, name.component)
          .replace(/wrapper-class-placeholder/, `${name.file}-wrapper`)
          .replace(/DisplayName/, name.display);
          
        if(type === 'container') {
          const componentImportPath = path.join('components', filePath, name.file); 
          const componentImport = `import ${name.component} from '${componentImportPath}';`;
          file = file.replace(/\/\* component-import \*\//, componentImport);
        }

        const rootPath = type === 'component' ? componentsPath : containersPath;

        const componentFilePath = path.join(rootPath, filePath, name.file + '.js');
        if(isDirSync(rootPath)) {
          const componentDirectory = path.join(rootPath, filePath);
          // if the sub directory does not exist
          if(!isDirSync(componentDirectory)) {
            mkDirRecurs(componentDirectory);
          }
          return writeFile(file, componentFilePath)
            .then(() => console.log(chalk.white(`Component ${chalk.bold.green(name.component)} created successfully`)));
        } else {
          console.log(chalk.yellow('This does not appear to be the root directory of a compatible create react app project'));
        }
      }
    });
}

const templateMap = {
  component: {
    method: createReactFile,
    template:'class-component-template'
  },
  'functional-component': {
    method: createReactFile,
    template:'functional-component-template'
  },
  container: {
    method: createReactFile,
    template: 'container-template'
  }
};

module.exports = function create(fileName, options, filePath) {
  if(isNameValid(fileName) === false) {
    console.log(chalk.red('Invalid file name'));
    process.exit(1);
  }

  const CamelName = camelCaseify(fileName);
  const promises = [];

  options.forEach((option, i) => {
    if(!templateMap[option]) {
      return;
    }
    promises.push(templateMap[option].method(CamelName, option, filePath));
  });

  Promise.all(promises)
    .then(() => {
      process.exit(0);
    });

}