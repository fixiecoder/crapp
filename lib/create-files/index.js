const fs = require('fs');
const { isNameValid, camelCaseify,isDirSync, mkDirRecurs, writeFile, getFileContents, getRootPath } = require('../shared');
const path = require('path');
const chalk = require('chalk');

function createStyleFile(name, type, filePath) {
  const fileLocation = `${__dirname}/templates/sass-style-template.scss`;
  const rootPath = getRootPath(type);
  const indexScssLocation = path.join(rootPath, 'index.scss');
  let templateFile = '';
  let sassIndexFile = '';

  return getFileContents(fileLocation)
    .then(file => {
      templateFile = file.replace(/wrapper-class-placeholder/, `${name.file}-wrapper`);

      if(isDirSync(rootPath)) {
        const styleDirectory = path.join(rootPath, filePath);
        if(!isDirSync(styleDirectory)) {
          mkDirRecurs(styleDirectory);
        }
        const styleFilePath = path.join(rootPath, filePath, `_${name.file}.scss`);
        return writeFile(templateFile, styleFilePath);
      } else {
        console.log(chalk.yellow('This does not appear to be the root directory of a compatible create react app project'));
      }
    })
    .then(() => {
      console.log(chalk.green('SASS file created successfully'));
      return getFileContents(indexScssLocation);
    })
    .then(indexScssFile => {
      if(!indexScssFile.includes(path.join(filePath, name.file))) {
        fs.appendFileSync(indexScssLocation, `@import '${path.join(filePath, name.file)}';\n`);
      }
      console.log(chalk.white(`${type} ${chalk.bold.green(name.component)} created successfully`));
    })
    .catch(e => console.log(e));
}

function createReactFile(name, type, filePath) {
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

        const rootPath = getRootPath(type);

        if(isDirSync(rootPath)) {
          const componentDirectory = path.join(rootPath, filePath);
          // if the sub directory does not exist
          if(!isDirSync(componentDirectory)) {
            mkDirRecurs(componentDirectory);
          }
          const componentFilePath = path.join(rootPath, filePath, name.file + '.js');
          return writeFile(file, componentFilePath)
            .then(() => console.log(chalk.white(`${type} ${chalk.bold.green(name.component)} created successfully`)));
        } else {
          console.log(chalk.yellow('This does not appear to be the root directory of a compatible create react app project'));
        }
      }
    });
}

const templateMap = {
  style: {
    method: createStyleFile,
    template:'sass-file-template'
  },
  component: {
    method: createReactFile,
    template:'class-component-template'
  },
  functionalComponent: {
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
  const functionalComponentIndex = options.indexOf('functionalComponent');

  // if both types of components are specified only create the class component
  if(options.includes('component') && options.includes('functionalComponent')) {
    options.splice(functionalComponentIndex, 1);
  }

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