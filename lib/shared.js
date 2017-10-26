const isNameValid = (name) => {
  const regex = /^[^-0-9][a-z0-9-]*$/;
  return regex.test(name);
}

const camelCaseify = (name) => {
  const camelName = name.split('-').map(string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`).join('')
  return {
    file: name,
    component: camelName,
    other: `${camelName.charAt(0).toLowerCase()}${camelName.slice(1)}`,
  }
};

module.exports = {
  isNameValid,
  camelCaseify,
};
