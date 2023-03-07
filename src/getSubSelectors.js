const { subSelectorRegex } = require('./regex');

const getSubSelectors = (selector) => {
  // Remove nesting, e.g. convert ".cart__affirm>.ca-promotional-widget.Cta" to
  // [".cart__affirm", ".ca-promotional-widget.Cta"]
  const nestedSelectors = selector
    .split(' ')
    .map((subSelector) => subSelector.split('>'))
    .flat(10)
    .map((subSelector) => subSelector.split('+'))
    .flat(10)
    .map((subSelector) => subSelector.split('~'))
    .flat(10);

  // Extract subselectors from each level of nesting, e.g. convert
  // ".ca-promotional-widget.Cta" to [".ca-promotional-widget", ".Cta"]
  const subSelectors = nestedSelectors
    .map((subSelector) => [...subSelector.matchAll(subSelectorRegex)])
    .flat(10);

  return subSelectors.filter((subSelector) => !!subSelector);
};

module.exports = getSubSelectors;
