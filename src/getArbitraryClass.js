const replaceAll = require('./replaceAll');
const prefixMap = require('./prefixMap');
const { flow } = require('lodash');

const getArbitraryClass = (decl) => {
  const propertyName = prefixMap[decl.prop];

  const cssValue = flow([
    (value) => replaceAll(value, ')', ') '),
    (value) => replaceAll(value, '\n', ' '),
    (value) => replaceAll(value, '\t', ' '),
    (value) => value.trim(),
    (value) => replaceAll(value, ' ', '_'),
  ])(decl.value.trim());

  // Add logging for specific arbitrary values here
  // if (decl.prop === 'top' && decl.value === '3.75rem') {
  //   console.log('top: 3.75rem', {
  //     propertyName,
  //     cssValue,
  //   });
  // }

  // If we have a Tailwind prefix for this property, then use it instead of the
  // long property name
  if (propertyName) {
    return `${propertyName}-[${cssValue}]`;
  }

  return `[${decl.prop}:${cssValue}]`;
};

module.exports = getArbitraryClass;
