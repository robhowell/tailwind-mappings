const csstree = require('css-tree');

const getClassesInSelector = require('./getClassesInSelector');
const getMediaQueryPrefixesForAtRule = require('./getMediaQueryPrefixesForAtRule');

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

      let prefixes = [];

      // Call this.function recursively to find any instances of
      // PseudoClassSelector and PseudoElementSelector - collect the names and
      // then return an array of them.

      // if (this.function) {
      //   console.log('this.function', this.function);
      // }

      const mediaQueryClasses = getMediaQueryPrefixesForAtRule(atRule);

      prefixes = [...prefixes, ...mediaQueryClasses];

      if (prefixes.length > 0) {
        console.log('prefixes', prefixes);
      }

      // TODO: Add support for @media queries
      // sm:m-1

      // TODO: Add support for non-standard @media queries such as @media (min-width: 768px) and @media (max-width: 1024px):
      // [@media(any-hover:hover)]:m-1

      // TODO: Add support for pseudo selectors
      // hover:m-1

      // TODO: Add support for pseudo elements
      // before:m-1

      // TODO: Optional extra because only use it once: add support for
      // @supports queries, but it is literally just used once

      const selectorString = csstree.generate(node);

      // TODO: Update this to add prefixes to the selector string, by returning
      // an object instead of a string
      selectors.push(selectorString);
    }
  });

  console.log(
    'Total number of selectors in CSS for website:',
    selectors.length
  );

  // Extract classes from each selector
  const selectorsWithClasses = selectors.map((selector) => ({
    selector,
    classes: getClassesInSelector(selector),
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
