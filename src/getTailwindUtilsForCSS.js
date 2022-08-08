const csstree = require('css-tree');

const getTailwindUtils = require('./tailwind-utils');

const getTailwindUtilsForCSS = (css) => {
  const ast = csstree.parse(css);

  let tailwindClassesArray = [];

  csstree.walk(ast, function nodeFunction(node, item, list) {
    if (node.type === 'Selector') {
      const selectorString = csstree.generate(node);

      const currentNodeClasses = {
        selector: selectorString,
      };

      tailwindClassesArray.push(currentNodeClasses);

      const currentClassesArray = [];

      this.rule.block.children.forEach((cssDeclarationString) => {
        const [prop, value] = csstree.generate(cssDeclarationString).split(':');

        const cssDeclarationObject = {
          prop,
          value,
        };

        currentClassesArray.push(getTailwindUtils(cssDeclarationObject));
      });

      currentNodeClasses.classes = currentClassesArray.join(' ');
    }
  });

  return tailwindClassesArray;
};

module.exports = getTailwindUtilsForCSS;
