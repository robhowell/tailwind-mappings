const csstree = require('css-tree');

const getClassesInSelector = require('./getClassesInSelector');

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
      const selectorString = csstree.generate(node);
      selectors.push(selectorString);
    }
  });

  // Extract classes from each selector
  const selectorsWithClasses = selectors.map((selector) => ({
    selector,
    classes: getClassesInSelector(selector),
  }));

  // Only include selectors that have exactly one class
  const selectorsWithOneClass = selectorsWithClasses.filter(
    (item) => item.classes.length === 1 && item.selector === item.classes[0]
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
          otherItem.classes.length === 1 && item.selector === item.classes[0]
      );
    });

  const simpleClasses = simpleSelectors.map((item) => item.selector);

  return simpleClasses;
};

module.exports = findSimpleClasses;
