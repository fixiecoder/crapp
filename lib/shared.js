const fs = require('fs');
const path = require('path');
const componentsPath = path.join(process.cwd(), 'src/js/components');
const containersPath = path.join(process.cwd(), 'src/js/containers');
const stylePath = path.join(process.cwd(), 'src/styles');

const isNameValid = (name) => {
  const regex = /^[^-0-9][a-z0-9-]*$/;
  return regex.test(name);
}

const camelCaseify = (name) => {
  const camelNameList = name.split('-').map(string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`);
  const camelName = camelNameList.join('');
  return {
    file: name,
    component: camelName,
    other: `${camelName.charAt(0).toLowerCase()}${camelName.slice(1)}`,
    display: camelNameList.join(' ')
  }
};

function isDirSync(aPath) {
  try {
    return fs.statSync(aPath).isDirectory();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

function mkDirRecurs(aPath) {
  const subDirs = aPath.split('/').filter(dir => dir.length > 0);
  let currentPath = '/';
  subDirs.forEach(dir => {
    currentPath = path.join(currentPath, dir);
    if(!isDirSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  });
}

const writeFile = (fileData, location) => new Promise((resolve, reject) => {
  fs.writeFile(location, fileData, 'utf8', (err) => {
    if(err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

const getFileContents = (fileLocation) => new Promise((resolve, reject) => {
  if(!fileLocation) {
    return resolve();
  }
  fs.readFile(fileLocation, 'utf8', (err, data) => {
    if(err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

function getRootPath(type) {
  switch(type) {
    case 'functionalComponent':
    case 'component':
      return componentsPath;
    case 'container':
      return containersPath;
    case 'style':
      return stylePath;
  }
}

module.exports = {
  isNameValid,
  camelCaseify,
  isDirSync,
  mkDirRecurs,
  writeFile,
  getFileContents,
  getRootPath
};
