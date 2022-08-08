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
    .filter((selector) => !selector.includes('___')) // Strip react-carousel classes
    .filter((selector) => [...selector.matchAll(/\./g)].length === 1); // Strip complex classes (e.g. .Button.Button--primary)

  const selectorsUsedOnce = nonNestedSelectors.filter(
    (selector) => selectors.filter((s) => s.includes(selector)).length === 1
  );

  return selectorsUsedOnce;
};

module.exports = findSimpleClasses;
