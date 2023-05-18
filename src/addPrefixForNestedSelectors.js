const { firstSubSelectorRegex, subSelectorRegex } = require('./regex');

const addPrefixForNestedSelectors = (selectorItem) => {
  const { inputSelector, outputPrefix } = selectorItem;

  const selectorWithAmpersand = inputSelector.replace(
    firstSubSelectorRegex,
    '&'
  );

  const otherSubSelectors = [
    ...selectorWithAmpersand.matchAll(subSelectorRegex),
  ];
  const numberOfOtherSubSelectors = otherSubSelectors.length;

  if (numberOfOtherSubSelectors > 0) {
    const generalPrefixForSelector = selectorWithAmpersand.replaceAll(' ', '_');

    return {
      ...selectorItem,
      outputPrefix: `[${generalPrefixForSelector}]:${outputPrefix}`,
    };
  }

  return selectorItem;
};

module.exports = addPrefixForNestedSelectors;
