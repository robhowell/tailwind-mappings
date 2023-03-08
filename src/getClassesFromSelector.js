const { classNameRegex } = require('./regex');

const getClassesFromSelector = (selector) => {
  const subSelectors = [...selector.matchAll(classNameRegex)].flat(10);

  return subSelectors.filter((subSelector) => !!subSelector);
};

module.exports = getClassesFromSelector;
