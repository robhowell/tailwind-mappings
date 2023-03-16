const textSizes = require('./textSizes');

// Extract properies that match to standard text sizes (e.g. "text-xs") but
// if they don't match, add them to the cssRules array to be treated like the
// rest of the css rules.
const extractTextClasses = (cssRules) => {
  const { cssRules: updatedCssRules, textClasses } = textSizes.reduce(
    ({ cssRules: cssRulesAcc, textClasses: textClassesAcc }, textSize) => {
      const { className, properties } = textSize;

      // If all matching properties are found, add the class to the textClasses
      // array and remove it from the cssRules array

      if (
        cssRulesAcc.find(
          (cssRule) =>
            cssRule.prop === 'font-size' &&
            cssRule.value.replace('0.', '.') === properties['font-size']
        ) &&
        cssRulesAcc.find(
          (cssRule) =>
            cssRule.prop === 'line-height' &&
            cssRule.value.replace('0.', '.') === properties['line-height']
        ) &&
        cssRulesAcc.find(
          (cssRule) =>
            cssRule.prop === 'letter-spacing' &&
            cssRule.value.replace('0.', '.') === properties['letter-spacing']
        )
      ) {
        return {
          cssRules: cssRulesAcc.filter(
            (cssRule) =>
              !(
                cssRule.prop === 'font-size' &&
                cssRule.value.replace('0.', '.') === properties['font-size']
              ) &&
              !(
                cssRule.prop === 'line-height' &&
                cssRule.value.replace('0.', '.') === properties['line-height']
              ) &&
              !(
                cssRule.prop === 'letter-spacing' &&
                cssRule.value.replace('0.', '.') ===
                  properties['letter-spacing']
              )
          ),
          textClasses: [...textClassesAcc, className],
        };
      }

      return { cssRules: cssRulesAcc, textClasses: textClassesAcc };
    },
    { cssRules, textClasses: [] }
  );

  return [updatedCssRules, textClasses];
};

module.exports = extractTextClasses;
