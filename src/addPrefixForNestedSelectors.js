const { firstSubSelectorRegex, subSelectorRegex } = require('./regex');

const thirdPartyPrefixes = [
  '.__react_component_tooltip',
  '.cylindo',
  '.dropzone',
  '.infinite-scroll-component',
  '.Mui',
  '.mxt',
  '.pswp',
  '.react-select',
  '.Select',
  '.wistia',
  '.zoom-mode',
];

const addPrefixForNestedSelectors = (selectorItem) => {
  const { inputSelector, outputPrefix } = selectorItem;

  const allSubSelectors = [...inputSelector.matchAll(subSelectorRegex)];

  // If at least two of the classes that are not external classes are in the
  // selector.
  const hasComplexNesting =
    allSubSelectors
      .map((match) => match[0])
      .filter(
        (selector) =>
          // Exclude third-party classes
          !thirdPartyPrefixes.some((prefix) => selector.startsWith(prefix))
      )
      .filter((selector) => selector.startsWith('.')).length >= 2;

  if (hasComplexNesting) {
    return {
      ...selectorItem,
      hasComplexNesting: true,
    };
  }

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
