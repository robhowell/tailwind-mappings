const replaceAll = require('./replaceAll');

const getArbitraryClass = (decl) =>
  `[${decl.prop}:${replaceAll(
    replaceAll(
      replaceAll(replaceAll(decl.value, ')', ') '), ' ', '_'),
      '\n',
      '_'
    ),
    '\t',
    '_'
  )}]`;

module.exports = getArbitraryClass;
