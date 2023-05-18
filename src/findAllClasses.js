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
const filterFinalTailwindClass = require('./filterFinalTailwindClass');
const addPrefixForNestedSelectors = require('./addPrefixForNestedSelectors');
const addMissingAllElementSelectors = require('./addMissingAllElementSelectors');
const stripHoverMediaQueryFromPrefix = require('./stripHoverMediaQueryFromPrefix');

// This function finds all class-based selectors in the provided CSS.
const findAllClasses = (css) => {
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

      // console.log(
      //   'pseudoVariantPrefixes:',
      //   JSON.stringify(pseudoVariantPrefixes, null, 2)
      // );

      const prefixes = [...mediaQueryPrefixes, ...pseudoVariantPrefixes];

      // If "[@media(hover:hover)]" and "hover" are both in the prefixes array,
      // then remove "[@media(hover:hover)]" from the array because it is
      // redundant in Tailwind CSS.
      const prefixesWithoutUnnecessaryHover =
        prefixes.includes('[@media(hover:hover)]:') &&
        prefixes.includes('hover:')
          ? prefixes.filter((prefix) => prefix !== '[@media(hover:hover)]:')
          : prefixes;

      const hasComplexNesting =
        prefixesWithoutUnnecessaryHover.some((prefix) =>
          prefix.includes('not(.')
        ) ?? undefined;

      const outputPrefix = removeDuplicates(
        prefixesWithoutUnnecessaryHover.filter(
          (prefix) => !prefix.includes('not(.')
        )
      )
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

      // console.log(
      //   'tailwindClassesForSelector:',
      //   JSON.stringify(tailwindClassesForSelector, null, 2)
      // );

      const classesArray = [
        ...textClassesForSelector,
        ...tailwindClassesForSelector,
      ];

      const selectorWithPrefix = {
        outputClassName: classesArray.join(' '),
        inputSelector,
        outputPrefix,
        hasComplexNesting,
      };

      // console.log(
      //   'selectorWithPrefix:',
      //   JSON.stringify(selectorWithPrefix, null, 2)
      // );

      selectorsWithPrefixes.push(selectorWithPrefix);
    }
  });

  console.log(
    'Total number of selectors in CSS for website:',
    selectorsWithPrefixes.length
  );

  // Extract classes from each selector
  const selectorsWithSubSelectors = selectorsWithPrefixes.map(
    ({ hasComplexNesting, inputSelector, outputClassName, outputPrefix }) => {
      const inputNestedSelectors = getNestedSelectors(inputSelector);
      // Get all classes, e.g. ".Cta .VisuallyHidden:not(:focus):not(:active)" becomes [".Cta", ".VisuallyHidden"]
      const inputClasses = getClassesFromSelector(inputSelector);

      return {
        hasComplexNesting,
        inputClasses,
        inputNestedSelectors,
        inputSelector,
        outputClassName,
        outputPrefix,
      };
    }
  );

  const selectorsWithFullPrefix = selectorsWithSubSelectors
    .map(addPrefixForNestedSelectors)
    .map(({ outputClassName, outputPrefix = '', ...selectorItem }) => ({
      ...selectorItem,
      outputPrefix: stripHoverMediaQueryFromPrefix(outputPrefix),
      outputClassName: outputClassName
        .split(' ')
        // Add the prefix to each sub-selector
        .map(
          (subSelector) =>
            `${stripHoverMediaQueryFromPrefix(outputPrefix)}${subSelector}`
        )
        .map(filterFinalTailwindClass)
        .join(' '),
    }));

  return selectorsWithFullPrefix;
};

module.exports = findAllClasses;
