const csstree = require('css-tree');

const getTailwindUtils = require('./tailwind-utils');
const removeRedundantCrossBrowserProperties = require('./removeRedundantCrossBrowserProperties');
const getCssRule = require('./getCssRule');
const getArrayFromList = require('./getArrayFromList');

const getTailwindUtilsForCSS = (css) => {
  const ast = csstree.parse(css);
  let tailwindClassesArray = [];

  csstree.walk(ast, function nodeFunction(node) {
    if (node.type === 'Selector') {
      const selectorString = csstree.generate(node);
      const cssRulesList = this.rule.block.children.map(getCssRule);
      const cssRules = getArrayFromList(cssRulesList);

      // let textClassesForSelector = [];

      const currentClassesForSelector = cssRules
        .filter(removeRedundantCrossBrowserProperties)
        .map((cssRule) => getTailwindUtils(cssRule));

      const currentNodeClasses = {
        selector: selectorString,
        classes: currentClassesForSelector.join(' '),
      };

      tailwindClassesArray.push(currentNodeClasses);
    }
  });

  return tailwindClassesArray;
};

module.exports = getTailwindUtilsForCSS;
