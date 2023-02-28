const csstree = require('css-tree');

const getTailwindUtils = require('./tailwind-utils');
const removeRedundantCrossBrowserProperties = require('./removeRedundantCrossBrowserProperties');
const getCssRule = require('./getCssRule');

const getTailwindUtilsForCSS = (css) => {
  const ast = csstree.parse(css);

  let tailwindClassesArray = [];

  csstree.walk(ast, function nodeFunction(node) {
    if (node.type === 'Selector') {
      const selectorString = csstree.generate(node);
      const cssRules = this.rule.block.children.map(getCssRule);

      const tailwindClassesArray = [...cssRules]
        .filter(removeRedundantCrossBrowserProperties)
        .map((cssRule) => getTailwindUtils(cssRule));

      const currentNodeClasses = {
        selector: selectorString,
        classes: tailwindClassesArray.join(' '),
      };

      tailwindClassesArray.push(currentNodeClasses);
    }
  });

  return tailwindClassesArray;
};

module.exports = getTailwindUtilsForCSS;
