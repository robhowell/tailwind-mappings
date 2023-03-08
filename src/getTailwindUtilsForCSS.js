const csstree = require('css-tree');

const getTailwindUtils = require('./tailwind-utils');
const removeRedundantCrossBrowserProperties = require('./removeRedundantCrossBrowserProperties');
const getCssRule = require('./getCssRule');
const getArrayFromList = require('./getArrayFromList');
const extractTextClasses = require('./extractTextClasses');

const getTailwindUtilsForCSS = (css) => {
  const ast = csstree.parse(css);
  let tailwindClassesArray = [];

  csstree.walk(ast, function nodeFunction(node) {
    if (node.type === 'Selector') {
      const selectorString = csstree.generate(node);

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

      const currentNodeClasses = {
        selector: selectorString,
        // TODO: Add support for prefixes here, because we can't match the
        // results of this function with the other results otherwise.
        classes: [
          ...textClassesForSelector,
          ...tailwindClassesForSelector,
        ].join(' '),
      };

      tailwindClassesArray.push(currentNodeClasses);
    }
  });

  return tailwindClassesArray;
};

module.exports = getTailwindUtilsForCSS;
