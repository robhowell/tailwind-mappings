const csstree = require('css-tree');

const getTailwindUtils = require('./tailwind-utils');

const redundantCrossBrowserProperties = [
  '-moz-animation',
  '-moz-animation-duration',
  '-moz-animation-fill-mode',
  '-moz-animation-iteration-count',
  '-moz-animation-name',
  '-moz-animation-timing-function',
  '-moz-appearance',
  '-moz-transition',
  '-moz-user-select',
  '-ms-transform',
  '-ms-user-select',
  '-o-animation',
  '-o-animation-duration',
  '-o-animation-fill-mode',
  '-o-animation-iteration-count',
  '-o-animation-name',
  '-o-animation-timing-function',
  '-o-object-fit',
  '-webkit-animation',
  '-webkit-animation-delay',
  '-webkit-animation-duration',
  '-webkit-animation-fill-mode',
  '-webkit-animation-iteration-count',
  '-webkit-animation-name',
  '-webkit-animation-timing-function',
  '-webkit-appearance',
  '-webkit-filter',
  '-webkit-transform',
  '-webkit-transition',
  '-webkit-transition-duration',
  '-webkit-user-select',
];

const removeRedundantCrossBrowserProperties = (rule) =>
  !redundantCrossBrowserProperties.includes(rule.prop);

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

      const cssRuleStrings = this.rule.block.children;

      const cssRules = cssRuleStrings.map((cssRuleString) => {
        const [prop, value] = csstree.generate(cssRuleString).split(':');

        return {
          prop,
          value,
        };
      });

      cssRules
        .filter(removeRedundantCrossBrowserProperties)
        .forEach((cssRule) => {
          currentClassesArray.push(getTailwindUtils(cssRule));
        });

      currentNodeClasses.classes = currentClassesArray.join(' ');
    }
  });

  return tailwindClassesArray;
};

module.exports = getTailwindUtilsForCSS;
