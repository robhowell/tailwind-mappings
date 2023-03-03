const classNameRegEx = /\.[a-zA-Z\d_-]+/g;

const getClassesInSelector = (selector) =>
  [...selector.matchAll(classNameRegEx)].flat();

module.exports = getClassesInSelector;
