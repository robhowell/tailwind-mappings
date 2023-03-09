const replaceAll = require('./replaceAll');
const prefixMap = require('./prefixMap');

const getArbitraryClass = (decl) => {
  const propertyName = prefixMap[decl.prop];

  // Replace all spaces, newlines, and tabs with underscores
  // TODO: Improve handling of brackets and whitespace - this will result in
  // unnecessary underscore at end in some cases (could be fixed by trimming
  // and only replacing spaces between at the end of the process)
  const cssValue = replaceAll(
    replaceAll(
      replaceAll(replaceAll(decl.value.trim(), ')', ') '), ' ', '_'),
      '\n',
      '_'
    ),
    '\t',
    '_'
  );

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
