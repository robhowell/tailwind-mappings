const replaceAll = require('./replaceAll');
const prefixMap = require('./prefixMap');

const getArbitraryClass = (decl) => {
  const propertyName = prefixMap[decl.prop];

  const cssValue = replaceAll(
    replaceAll(
      replaceAll(replaceAll(decl.value.trim(), ')', ') '), ' ', '_'),
      '\n',
      '_'
    ),
    '\t',
    '_'
  );

  // If we have a Tailwind prefix for this property, then use it instead of the
  // long property name
  if (propertyName) {
    return `${propertyName}-[${cssValue}]`;
  }

  return `[${decl.prop}:${cssValue}]`;
};

module.exports = getArbitraryClass;
