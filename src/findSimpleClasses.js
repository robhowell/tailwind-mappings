const csstree = require('css-tree');

const getClassesInSelector = require('./getClassesInSelector');
const getMediaQueryPrefixesForAtRule = require('./getMediaQueryPrefixesForAtRule');
const removeDuplicates = require('./removeDuplicates');

// This function finds simple class-based selectors in the provided CSS. Simple
// selectors should include only one class, and that class should match the
// selector exactly. This will exclude nested selectors (e.g.
// ".Cta .Cta__text"), selectors that include pseudo-selectors (e.g.
// ".Cta:hover") and descendent selectors (e.g. ".Cta > .Cta__text").
const findSimpleClasses = (css) => {
  const ast = csstree.parse(css);

  let selectors = [];

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

      const prefixes = [...mediaQueryClasses];

      // If "[@media(hover:hover)]" and "hover" are both in the prefixes array,
      // then remove "[@media(hover:hover)]" from the array because it is
      // redundant in Tailwind CSS.

      // TODO: Add support for pseudo selectors
      // hover:m-1

      // TODO: Add support for pseudo elements
      // before:m-1

      const selectorString = csstree.generate(node);

      const prefix = removeDuplicates(prefixes)
        .sort()
        .map((item) => `${item}:`)
        .join('');

      const selectorWithPrefix = {
        selector: selectorString,
        prefix,
      };

      if (selectorWithPrefix.prefix) {
        console.log('selectorWithPrefix', selectorWithPrefix);
      }

      selectors.push(selectorWithPrefix);
    }
  });

  console.log(
    'Total number of selectors in CSS for website:',
    selectors.length
  );

  // Extract classes from each selector
  const selectorsWithClasses = selectors.map(({ selector, prefix }) => ({
    classes: getClassesInSelector(selector),
    prefix,
    selector,
  }));

  const classWithModifierRegex = /\.[a-zA-Z-_0-9]+(:[a-z\-]+)*/g;

  // Only include selectors that have exactly one class
  const selectorsWithOneClass = selectorsWithClasses.filter(
    (item) =>
      item.classes.length === 1 && !!item.selector.match(classWithModifierRegex)
  );

  const simpleSelectors =
    // Exclude any classes if they are also used within complex selectors
    selectorsWithOneClass.filter((item) => {
      const { selector: classForSelector } = item;
      const otherSelectorsWithThisClass = selectorsWithClasses.filter(
        (otherItem) => otherItem.classes.includes(classForSelector)
      );

      return otherSelectorsWithThisClass.every(
        (otherItem) =>
          otherItem.classes.length === 1 &&
          !!item.selector.match(classWithModifierRegex)
      );
    });

  const simpleClasses = simpleSelectors.map((item) => item.selector);

  console.log(
    'Total number of simple selectors that can be automatically converted:',
    simpleClasses.length
  );

  const uniqueSimpleClasses = [...new Set(simpleClasses)];

  console.log(
    'Total number of unique simple classes that can be automatically converted:',
    uniqueSimpleClasses.length
  );

  // Uncomment to see the list of simple classes found
  console.log('Unique simple classes:', uniqueSimpleClasses);

  return uniqueSimpleClasses;
};

module.exports = findSimpleClasses;

// Regex to find simple classes with modifier suffixes such as :hover
// /\.[a-zA-Z-_0-9]+(:[a-z\-]+)+/g
