const csstree = require('css-tree');

const { uniq } = require('lodash');
const getMediaQueryPrefixesForAtRule = require('./getMediaQueryPrefixesForAtRule');
const getPseudoVariantPrefix = require('./getPseudoVariantPrefix');
const getSubSelectors = require('./getSubSelectors');
const removeDuplicates = require('./removeDuplicates');
const getClassesFromSelector = require('./getClassesFromSelector');

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

      // Call this.function recursively to find any instances of
      // PseudoClassSelector and PseudoElementSelector - collect the names and
      // then return an array of them.

      // if (this.function) {
      //   console.log('this.function', this.function);
      // }

      const mediaQueryClasses = getMediaQueryPrefixesForAtRule(atRule);

      // TODO: Also spread pseudo selectors & elements into the prefixes array
      const prefixes = [...mediaQueryClasses];

      // If "[@media(hover:hover)]" and "hover" are both in the prefixes array,
      // then remove "[@media(hover:hover)]" from the array because it is
      // redundant in Tailwind CSS.

      // TODO: Add support for pseudo selectors
      // hover:m-1

      // TODO: Add support for pseudo elements
      // before:m-1

      const inputSelector = csstree.generate(node);

      const prefix = removeDuplicates(prefixes)
        .sort()
        .map((item) => `${item}:`)
        .join('');

      const selectorWithPrefix = {
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
    ({ inputSelector, prefix }) => {
      // Get all sub-selectors, e.g. ".Cta .VisuallyHidden:not(:focus):not
      // (:active)" becomes [".Cta", ".VisuallyHidden:not(:focus):not(:active)"]
      const inputSelectors = getSubSelectors(inputSelector);
      // Get all classes, e.g. ".Cta .VisuallyHidden:not(:focus):not(:active)" becomes [".Cta", ".VisuallyHidden"]
      const inputClasses = getClassesFromSelector(inputSelector);

      return {
        inputClasses,
        inputSelector,
        prefix,
        inputSelectors,
      };
    }
  );

  // Only include selectors that include exactly one class, while including
  // selectors that also include other sub-selectors, e.g. ".Cta span"
  const selectorsWithOneClass = selectorsWithSubSelectors
    .filter(({ inputClasses }) => inputClasses.length === 1)
    .map((item) => ({
      ...item,
      inputClassName: item.inputClasses[0],
    }));

  console.log(
    'Total number of selectors with just one class',
    selectorsWithOneClass.length
  );

  const selectorsWithPseudoVariants = selectorsWithOneClass.map((item) => ({
    ...item,
    prefix: `${item.prefix}${getPseudoVariantPrefix(item.inputSelector)}`,
  }));

  const simpleSelectors =
    // Exclude any classes if they are also used within complex selectors
    selectorsWithPseudoVariants.filter((item) => {
      const { inputClassName } = item;

      const otherSelectorsWithThisClass = selectorsWithSubSelectors.filter(
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

  const uniqueSimpleSelectors = uniq(
    simpleSelectors,
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
