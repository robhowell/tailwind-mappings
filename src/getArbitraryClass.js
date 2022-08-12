const replaceAll = require('./replaceAll');

const getArbitraryClass = (decl) => {
  const cssValue = replaceAll(
    replaceAll(
      replaceAll(replaceAll(decl.value.trim(), ')', ') '), ' ', '_'),
      '\n',
      '_'
    ),
    '\t',
    '_'
  );

  return `[${decl.prop}:${cssValue}]`;
};

module.exports = getArbitraryClass;
