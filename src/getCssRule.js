const csstree = require('css-tree');

const getCssRule = (cssRuleString) => {
  const [prop, ...valueArray] = csstree.generate(cssRuleString).split(':');

  const value = valueArray.join(':');

  return {
    prop,
    value,
  };
};

module.exports = getCssRule;
