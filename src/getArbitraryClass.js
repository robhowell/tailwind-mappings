const replaceAll = require('./replaceAll');

const getArbitraryClass = (decl, isTailwindClass = false) => {
  const cssValue = replaceAll(
    replaceAll(
      replaceAll(replaceAll(decl.value.trim(), ')', ') '), ' ', '_'),
      '\n',
      '_'
    ),
    '\t',
    '_'
  );

  if (isTailwindClass) {
    return `${decl.prop}-[${cssValue}]`;
  }

  return `[${decl.prop}:${cssValue}]`;
};

module.exports = getArbitraryClass;
