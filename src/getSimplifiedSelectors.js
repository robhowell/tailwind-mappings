const { findLast } = require('lodash');
const getClassesFromSelector = require('./getClassesFromSelector');

// This function finds selectors that can be simplified by removing shared
// ancestor selectors where possible. For example, the selector
// `.ca-promotional-widget .promotional-button` can be simplified to
// `. promotional-button` if all usage of `.promotional-button` in the
// selectors array are always prefixed with the same ancestors.

const getSimplifiedSelectors = (selectors) =>
  selectors.map((selectorItem) => {
    const { inputClasses, inputNestedSelectors, inputSelector } = selectorItem;

    if (inputClasses.length > 1) {
      const lastSelectorContainingClass = findLast(
        inputNestedSelectors,
        (nestedSelector) => getClassesFromSelector(nestedSelector)[0]
      );

      if (
        lastSelectorContainingClass &&
        getClassesFromSelector(lastSelectorContainingClass).length === 1
      ) {
        const classInLastSelector = getClassesFromSelector(
          lastSelectorContainingClass
        )[0];

        const inputSelectorSplit = inputSelector.split(classInLastSelector);

        if (inputSelectorSplit.length > 2) {
          // If the selector contains more than one instance of the class, then
          // it is a more complex selector that cannot be easily converted.
          return selectorItem;
        }

        const ancestorPrefix = inputSelectorSplit[0];
        const classWithAncestorPrefix = `${ancestorPrefix}${classInLastSelector}`;

        // Get all selectors with this class
        const allSelectorsWithThisClass = selectors.filter((otherSelector) =>
          otherSelector.inputClasses.includes(classInLastSelector)
        );

        if (
          allSelectorsWithThisClass.every(({ inputSelector }) =>
            inputSelector.startsWith(classWithAncestorPrefix)
          )
        ) {
          const inputSimpleSelector = inputSelector.replace(
            classWithAncestorPrefix,
            classInLastSelector
          );

          // console.log('inputSelector', inputSelector);
          // console.log('inputSimpleSelector', inputSimpleSelector);

          return {
            ...selectorItem,
            // Include full selector and full classes in case we need them later
            // in the process
            inputClasses: getClassesFromSelector(inputSimpleSelector),
            inputFullClasses: inputClasses,
            inputFullSelector: inputSelector,
            inputSelector: inputSimpleSelector,
          };
        }
      }
    }

    return selectorItem;
  });

module.exports = getSimplifiedSelectors;
