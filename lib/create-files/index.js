const fs = require('fs');
const { isNameValid, camelCaseify } = require('../shared');

const getFileContents = (template) => new Promise((resolve, reject) => {
  if(!template) {
    return resolve();
  }
  fs.readFile(`${__dirname}/templates/${template}.js`, 'utf8', (err, data) => {
    if(err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

function createContainer(CamelName) {
  return getFileContents(templateMap.container.template)
    .then(file => {
      if(!file) {
        console.log('no file for', option);
      } else {
        console.log(file.replace(/NamePlaceholder/g, CamelName.component).replace(/wrapper-class-placeholder/, 'wrapper-class'));
      }
    });
}

function createFunctionalComponent(CamelName) {
  return getFileContents(templateMap.component.template)
    .then(file => {
      if(!file) {
        console.log('no file for', option);
      } else {
        console.log(file.replace(/NamePlaceholder/g, CamelName.component).replace(/wrapper-class-placeholder/, 'wrapper-class'));
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
  console.log(CamelName)

  const promises = [];

  options.forEach((option, i) => {
    if(!templateMap[option]) {
      return;
    }
    promises.push(templateMap[option].method(CamelName));
  });

  Promise.all(promises)
    .then(() => {
      process.exit(0);
    });

}