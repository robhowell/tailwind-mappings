const csstree = require('css-tree');

const { findLast, uniq } = require('lodash');
const getMediaQueryPrefixesForAtRule = require('./getMediaQueryPrefixesForAtRule');
const getPseudoVariantPrefixes = require('./getPseudoVariantPrefixes');
const getSubSelectors = require('./getSubSelectors');
const removeDuplicates = require('./removeDuplicates');
const getClassesFromSelector = require('./getClassesFromSelector');
const getTailwindUtils = require('./tailwind-utils');
const removeRedundantCrossBrowserProperties = require('./removeRedundantCrossBrowserProperties');
const getCssRule = require('./getCssRule');
const getArrayFromList = require('./getArrayFromList');
const extractTextClasses = require('./extractTextClasses');
const getNestedSelectors = require('./getNestedSelectors');
const { firstSubSelectorRegex, subSelectorRegex } = require('./regex');

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

      const inputSelector = csstree.generate(node);

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

      const prefix = removeDuplicates(prefixesWithoutUnnecessaryHover)
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
        prefix,
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
    ({ inputSelector, outputClassName, prefix }) => {
      const inputNestedSelectors = getNestedSelectors(inputSelector);
      // Get all sub-selectors, e.g. ".Cta .VisuallyHidden:not(:focus):not
      // (:active)" becomes [".Cta", ".VisuallyHidden:not(:focus):not(:active)"]
      const inputSelectors = getSubSelectors(inputNestedSelectors);
      // Get all classes, e.g. ".Cta .VisuallyHidden:not(:focus):not(:active)" becomes [".Cta", ".VisuallyHidden"]
      const inputClasses = getClassesFromSelector(inputSelector);

      return {
        inputClasses,
        inputNestedSelectors,
        inputSelector,
        inputSelectors,
        outputClassName,
        prefix,
      };
    }
  );

  const simplifiedSelectors = selectorsWithSubSelectors.map((selectorItem) => {
    const { inputClasses, inputNestedSelectors, inputSelector } = selectorItem;

    if (inputClasses.length > 1) {
      const lastSelectorContainingClass = findLast(
        inputNestedSelectors,
        (nestedSelector) => getClassesFromSelector(nestedSelector)[0]
      );

      if (
        lastSelectorContainingClass &&
        getClassesFromSelector(lastSelectorContainingClass).length === 1
      ) {
        const classInLastSelector = getClassesFromSelector(
          lastSelectorContainingClass
        )[0];

        const inputSelectorSplit = inputSelector.split(classInLastSelector);

        if (inputSelectorSplit.length > 2) {
          // If the selector contains more than one instance of the class, then
          // it is a more complex selector that cannot be easily converted.
          return selectorItem;
        }

        const ancestorPrefix = inputSelectorSplit[0];
        const classWithAncestorPrefix = `${ancestorPrefix}${classInLastSelector}`;

        // Get all selectors with this class
        const allSelectorsWithThisClass = selectorsWithSubSelectors.filter(
          (otherSelector) =>
            otherSelector.inputClasses.includes(classInLastSelector)
        );

        if (
          allSelectorsWithThisClass.every(({ inputSelector }) =>
            inputSelector.startsWith(classWithAncestorPrefix)
          )
        ) {
          const inputSimpleSelector = inputSelector.replace(
            classWithAncestorPrefix,
            classInLastSelector
          );

          // console.log('inputSelector', inputSelector);
          // console.log('inputSimpleSelector', inputSimpleSelector);

          return {
            ...selectorItem,
            // Include full selector and full classes in case we need them later
            // in the process
            inputFullClasses: inputClasses,
            inputFullSelector: inputSelector,
            inputSelector: inputSimpleSelector,
            inputClasses: getClassesFromSelector(inputSimpleSelector),
          };
        }
      }
    }

    return selectorItem;
  });

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
    .map((selectorItem) => {
      const { inputSelector, prefix } = selectorItem;

      const selectorWithAmpersand = inputSelector.replace(
        firstSubSelectorRegex,
        '&'
      );

      const otherSubSelectors =
        selectorWithAmpersand.matchAll(subSelectorRegex);
      const numberOfOtherSubSelectors = [...otherSubSelectors].length;

      if (numberOfOtherSubSelectors > 0) {
        const generalPrefixForSelector = selectorWithAmpersand.replaceAll(
          ' ',
          '_'
        );

        return {
          ...selectorItem,
          prefix: `[${generalPrefixForSelector}]:${prefix}`,
        };
      }

      return selectorItem;
    })
    .map(({ outputClassName, prefix = '', ...selectorItem }) => ({
      ...selectorItem,
      prefix,
      outputClassName: outputClassName
        .split(' ')
        .map((subSelector) => `${prefix}${subSelector}`)
        .join(' '),
    }));

  const uniqueSimpleSelectors = uniq(
    simpleSelectorsWithFullPrefix,
    ({ inputClassName, prefix }) => `${prefix}${inputClassName}`
  );

  console.log(
    'Total number of unique simple classes that can be automatically converted:',
    uniqueSimpleSelectors.length
  );

  // Uncomment to see the list of simple classes found
  // console.log(
  //   'Unique simple selectors with prefixes:',
  //   uniqueSimpleSelectors
  //     .filter(({ prefix }) => !!prefix)
  //     .map(({ inputSelector, prefix }) => ({
  //       inputSelector,
  //       prefix,
  //     }))
  // );

  // TODO: Return array of objects instead of array of strings

  return (
    uniqueSimpleSelectors
      // TODO: Remove this filter once support for more complex selectors is
      // added, e.g. ".Cta span"
      .filter(
        ({ inputSelector }) =>
          !inputSelector.includes(' ') && !inputSelector.includes('>')
      )
  );
};

module.exports = findSimpleClasses;
