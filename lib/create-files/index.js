const fs = require('fs');

const getFileContents = (template) => new Promise((resolve, reject) => {
  fs.readFile(`${__dirname}/templates/${template}.js`, 'utf8', (err, data) => {
    if(err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

exports.create = function create() {
  getFileContents('functional-component-template')
    .then(file => {
      console.log(file.replace(/NamePlaceholder/g, 'ThisIsANewName').replace(/wrapper-class-placeholder/, 'wrapper-class'));
    });
}