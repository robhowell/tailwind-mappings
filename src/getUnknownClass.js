const getArbitraryClass = require('./getArbitraryClass');

const getValueBetweenBrackets = (value) => {
  const openBracket = value.indexOf('(');
  const closeBracket = value.indexOf(')');
  return value.substring(openBracket + 1, closeBracket);
};

const getUnknownClass = (prop, value) => {
  if (prop === 'transform') {
    if (value.includes('scaleX'))
      return `scale-x-[${getValueBetweenBrackets(value)}]`;

    if (value.includes('scaleY'))
      return `scale-y-[${getValueBetweenBrackets(value)}]`;

    if (value.includes('scale'))
      return `scale-[${getValueBetweenBrackets(value)}]`;
  }

  return getArbitraryClass({ prop, value });
};

module.exports = getUnknownClass;
