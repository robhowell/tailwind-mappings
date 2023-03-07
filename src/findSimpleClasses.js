const csstree = require('css-tree');

const { uniq } = require('lodash');
const getMediaQueryPrefixesForAtRule = require('./getMediaQueryPrefixesForAtRule');
const getPseudoVariantPrefix = require('./getPseudoVariantPrefix');
const getSubSelectors = require('./getSubSelectors');
const removeDuplicates = require('./removeDuplicates');

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

      const fullSelector = csstree.generate(node);

      const prefix = removeDuplicates(prefixes)
        .sort()
        .map((item) => `${item}:`)
        .join('');

      const selectorWithPrefix = {
        fullSelector,
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
    ({ fullSelector, prefix }) => {
      const selectors = getSubSelectors(fullSelector);

      // Create array of class selectors (e.g. ".Cta:hover") and remove any
      // pseudo selectors (e.g. ":hover") or pseudo elements (e.g. "::before")
      const classes = selectors
        .filter((item) => item.startsWith('.'))
        .map((className) => className.split(':')[0]);

      return {
        classes,
        fullSelector,
        prefix,
        selectors,
      };
    }
  );

  // Only include selectors that have exactly one class
  const selectorsWithOneClass = selectorsWithSubSelectors
    .filter(
      ({ selectors }) => selectors.length === 1 && selectors[0].startsWith('.')
    )
    .map((item) => ({
      ...item,
      className: item.classes[0],
    }));

  console.log(
    'Total number of selectors with just one class',
    selectorsWithOneClass.length
  );

  const selectorsWithPseudoVariants = selectorsWithOneClass.map((item) => ({
    ...item,
    prefix: `${item.prefix}${getPseudoVariantPrefix(item.fullSelector)}`,
  }));

  const simpleSelectors =
    // Exclude any classes if they are also used within complex selectors
    selectorsWithPseudoVariants.filter((item) => {
      const { className } = item;

      const otherSelectorsWithThisClass = selectorsWithSubSelectors.filter(
        (otherItem) => otherItem.classes.includes(className)
      );

      return otherSelectorsWithThisClass.every(
        (otherItem) => otherItem.selectors.length === 1
      );
    });

  console.log(
    'Total number of simple selectors that can be automatically converted:',
    simpleSelectors.length
  );

  const uniqueSimpleSelectors = uniq(
    simpleSelectors,
    ({ className, prefix }) => `${prefix}${className}`
  );

  console.log(
    'Total number of unique simple classes that can be automatically converted:',
    uniqueSimpleSelectors.length
  );

  // Uncomment to see the list of simple classes found
  console.log(
    'Unique simple selectors with prefixes:',
    uniqueSimpleSelectors
      .filter(({ prefix }) => !!prefix)
      .map(({ fullSelector, prefix }) => ({
        fullSelector,
        prefix,
      }))
  );

  // TODO: Return array of objects instead of array of strings

  return uniqueSimpleSelectors.map(({ fullSelector }) => fullSelector);
};

module.exports = findSimpleClasses;

// Regex to find simple classes with modifier suffixes such as :hover
// /\.[a-zA-Z-_0-9]+(:[a-z\-]+)+/g
