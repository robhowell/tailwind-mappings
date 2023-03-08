const { subSelectorRegex } = require('./regex');

const getSubSelectors = (nestedSelectors) => {
  // Extract subselectors from each level of nesting, e.g. convert
  // ".ca-promotional-widget.Cta" to [".ca-promotional-widget", ".Cta"]
  const subSelectors = nestedSelectors
    .map((subSelector) => [...subSelector.matchAll(subSelectorRegex)])
    .flat(10);

  return subSelectors.filter((subSelector) => !!subSelector);
};

module.exports = getSubSelectors;
