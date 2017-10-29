const fs = require('fs');
const { isNameValid, camelCaseify,isDirSync, mkDirRecurs, writeFile, getFileContents } = require('../shared');
const path = require('path');
const componentsPath = path.join(process.cwd(), 'src/js/components');
const containersPath = path.join(process.cwd(), 'src/js/containers');

function createContainer(name, options) {
  const fileLocation = `${__dirname}/templates/${templateMap.container.template}.js`;
  return getFileContents(fileLocation)
    .then(file => {
      if(!file) {
        console.log('no file for', option);
      } else {
        const componentImportPath = path.join('components', options.path, name.file); 
        const containerFilePath = path.join(containersPath, options.path, name.file + '.js'); //path.join('containers', options.path, name.file); 
        const componentImport = `import ${name.component} from '${componentImportPath}';`;
        file = file
          .replace(/NamePlaceholder/g, name.component)
          .replace(/\/\* component-import \*\//, componentImport);

        if(isDirSync(containersPath)) {
          const containerDirectory = path.join(containersPath, options.path);
          // if the sub directory does not exist
          if(!isDirSync(containerDirectory)) {
            mkDirRecurs(containerDirectory);
          }

          return writeFile(file, containerFilePath);
        } else {
          console.log(chalk.yellow('This does not appear to be the root directory of a compatible create react app project'));
        }
      }
    });
}

function createFunctionalComponent(name, options) {
  const fileLocation = `${__dirname}/templates/${templateMap.component.template}.js`;
  return getFileContents(fileLocation)
    .then(file => {
      if(!file) {
        console.log('no file for', option);
      } else {
        file  = file
          .replace(/NamePlaceholder/g, name.component)
          .replace(/wrapper-class-placeholder/, `${name.file}-wrapper`)
          .replace(/DisplayName/, name.display);

        const componentFilePath = path.join(componentsPath, options.path, name.file + '.js'); //path.join('containers', options.path, name.file); 
        if(isDirSync(componentsPath)) {
          const componentDirectory = path.join(componentsPath, options.path);
          // if the sub directory does not exist
          if(!isDirSync(componentDirectory)) {
            mkDirRecurs(componentDirectory);
          }
          return writeFile(file, componentFilePath);
        } else {
          console.log(chalk.yellow('This does not appear to be the root directory of a compatible create react app project'));
        }
      }
    });
}

const templateMap = {
  component: {
    method: createFunctionalComponent,
    template:'functional-component-template'
  },
  container: {
    method: createContainer,
    template: 'container-template'
  }
};

module.exports = function create(fileName, options) {
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
    options.path = '';
    promises.push(templateMap[option].method(CamelName, options));
  });

  Promise.all(promises)
    .then(() => {
      process.exit(0);
    });

}