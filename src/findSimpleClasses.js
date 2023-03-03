const csstree = require('css-tree');

// This function finds simple classes in the provided CSS: classes which are
// not nested (i.e. not inside of an @rule) and have no other classes in the
// selector and are not used more than once.
const findSimpleClasses = (css) => {
  const ast = csstree.parse(css);

  let selectors = [];

  csstree.walk(ast, function nodeFunction(node) {
    if (node.type === 'Selector') {
      const selectorString = csstree.generate(node);
      selectors.push(selectorString);
    }
  });

  const nonNestedSelectors = selectors
    .filter((selector) => !selector.includes(' ')) // Strip nested rules
    .filter((selector) => !selector.includes('>')) // Stripe descendant rules
    .filter((selector) => !selector.includes(':')) // Strip pseudo-selectors
    .filter(
      (selector) =>
        selector.startsWith('.') && [...selector.matchAll(/\./g)].length === 1
    ); // Only support class-based selectors, that specify one class (i.e. do not support .Cta.Cta--primary)

  // Only include selectors that are not specified in other sepectors that are nested, descendent or feature pseudo-selectors
  const selectorsUsedOnce = nonNestedSelectors.filter((selector) => {
    const allSelectorsThatIncludeThisClass = selectors.filter((s) => {
      const partsOfSelector = s.split(' ');
      const partsWithoutPseudoSelectors = partsOfSelector.map((s) => {
        return s.split(':')[0];
      });

      return partsWithoutPseudoSelectors.includes(selector);
    });

    const areAnyOfTheseSelectorsComplex = allSelectorsThatIncludeThisClass.some(
      (s) =>
        s.includes(' ') ||
        s.includes('>') ||
        s.includes(':') ||
        !s.startsWith('.') ||
        ![...s.matchAll(/\./g)].length === 1
    );

    return !areAnyOfTheseSelectorsComplex;
  });

  return selectorsUsedOnce;
};

module.exports = findSimpleClasses;
