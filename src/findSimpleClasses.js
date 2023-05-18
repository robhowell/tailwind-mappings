const csstree = require('css-tree');

const getMediaQueryPrefixesForAtRule = require('./getMediaQueryPrefixesForAtRule');
const getPseudoVariantPrefixes = require('./getPseudoVariantPrefixes');
const removeDuplicates = require('./removeDuplicates');
const getClassesFromSelector = require('./getClassesFromSelector');
const getTailwindUtils = require('./tailwind-utils');
const removeRedundantCrossBrowserProperties = require('./removeRedundantCrossBrowserProperties');
const getCssRule = require('./getCssRule');
const getArrayFromList = require('./getArrayFromList');
const extractTextClasses = require('./extractTextClasses');
const getNestedSelectors = require('./getNestedSelectors');
const getSimplifiedSelectors = require('./getSimplifiedSelectors');
const filterFinalTailwindClass = require('./filterFinalTailwindClass');
const addPrefixForNestedSelectors = require('./addPrefixForNestedSelectors');
const addMissingAllElementSelectors = require('./addMissingAllElementSelectors');
const stripHoverMediaQueryFromPrefix = require('./stripHoverMediaQueryFromPrefix');

// This function finds simple class-based selectors in the provided CSS. Simple
// selectors should include only one class, and that class should match the
// selector exactly. This will exclude nested selectors (e.g.
// ".Cta .Cta__text"), selectors that include pseudo-selectors (e.g.
// ".Cta:hover") and descendent selectors (e.g. ".Cta > .Cta__text").
const findSimpleClasses = (css) => {
  const ast = csstree.parse(css);

  let selectorsWithPrefixes = [];

  csstree.walk(ast, function nodeFunction(node) {
    if (node.type === 'Selector') {
      const atRule = this.atrule;

      const inputSelector = addMissingAllElementSelectors(
        csstree.generate(node)
      );

      const mediaQueryPrefixes = getMediaQueryPrefixesForAtRule(atRule).map(
        (prefix) => `${prefix}:`
      );
      const pseudoVariantPrefixes = getPseudoVariantPrefixes(inputSelector);

      const prefixes = [...mediaQueryPrefixes, ...pseudoVariantPrefixes];

      // If "[@media(hover:hover)]" and "hover" are both in the prefixes array,
      // then remove "[@media(hover:hover)]" from the array because it is
      // redundant in Tailwind CSS.
      const prefixesWithoutUnnecessaryHover =
        prefixes.includes('[@media(hover:hover)]:') &&
        prefixes.includes('hover:')
          ? prefixes.filter((prefix) => prefix !== '[@media(hover:hover)]:')
          : prefixes;

      const outputPrefix = removeDuplicates(prefixesWithoutUnnecessaryHover)
        .sort()
        .filter((item) => !!item)
        .join('');

      const cssRulesList = this.rule.block.children.map(getCssRule);
      const cssRules = getArrayFromList(cssRulesList);

      const filteredCssRules = cssRules.filter(
        removeRedundantCrossBrowserProperties
      );

      const [nonTextCssRules, textClassesForSelector] =
        extractTextClasses(filteredCssRules);

      const tailwindClassesForSelector = nonTextCssRules.map((cssRule) =>
        getTailwindUtils(cssRule)
      );

      const classesArray = [
        ...textClassesForSelector,
        ...tailwindClassesForSelector,
      ];

      const selectorWithPrefix = {
        outputClassName: classesArray.join(' '),
        inputSelector,
        outputPrefix,
      };

      // if (selectorWithPrefix.prefix) {
      //   console.log('selectorWithPrefix', selectorWithPrefix);
      // }

      selectorsWithPrefixes.push(selectorWithPrefix);
    }
  });

  console.log(
    'Total number of selectors in CSS for website:',
    selectorsWithPrefixes.length
  );

  // Extract classes from each selector
  const selectorsWithSubSelectors = selectorsWithPrefixes.map(
    ({ inputSelector, outputClassName, outputPrefix }) => {
      const inputNestedSelectors = getNestedSelectors(inputSelector);
      // Get all classes, e.g. ".Cta .VisuallyHidden:not(:focus):not(:active)" becomes [".Cta", ".VisuallyHidden"]
      const inputClasses = getClassesFromSelector(inputSelector);

      return {
        inputClasses,
        inputNestedSelectors,
        inputSelector,
        outputClassName,
        outputPrefix,
      };
    }
  );

  const simplifiedSelectors = getSimplifiedSelectors(selectorsWithSubSelectors);

  console.log(
    'Total of complex selectors that can be simplified',
    simplifiedSelectors.filter((item) => !!item.inputFullSelector).length
  );

  // Only include selectors that include exactly one class, while including
  // selectors that also include other sub-selectors, e.g. ".Cta span"
  const selectorsWithOneClass = simplifiedSelectors
    .filter(({ inputClasses }) => inputClasses.length === 1)
    .map((item) => ({
      ...item,
      inputClassName: item.inputClasses[0],
    }));

  console.log(
    'Total number of selectors with just one class',
    selectorsWithOneClass.length
  );

  const simpleSelectors =
    // Exclude any classes if they are also used within complex selectors
    selectorsWithOneClass.filter((item) => {
      const { inputClassName } = item;

      const otherSelectorsWithThisClass = simplifiedSelectors.filter(
        (otherItem) => otherItem.inputClasses.includes(inputClassName)
      );

      return otherSelectorsWithThisClass.every(
        (otherItem) => otherItem.inputClasses.length === 1
      );
    });

  console.log(
    'Total number of simple selectors that can be automatically converted:',
    simpleSelectors.length
  );

  const simpleSelectorsWithFullPrefix = simpleSelectors
    .map(addPrefixForNestedSelectors)
    .map(({ outputClassName, outputPrefix = '', ...selectorItem }) => {
      const finalOutputPrefix = stripHoverMediaQueryFromPrefix(outputPrefix);

      return {
        ...selectorItem,
        outputPrefix: finalOutputPrefix,
        outputClassName: outputClassName
          .split(' ')
          // Add the prefix to each sub-selector
          .map((subSelector) => `${finalOutputPrefix}${subSelector}`)
          .map(filterFinalTailwindClass)
          .join(' '),
      };
    });

  return simpleSelectorsWithFullPrefix;
};

module.exports = findSimpleClasses;
