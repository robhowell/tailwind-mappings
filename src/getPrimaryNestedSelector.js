const { findLast } = require('lodash');
const { classNameRegex } = require('./regex');
const getNestedSelectors = require('./getNestedSelectors');

// Find the last sub-selector that includes a class

const getPrimaryNestedSelector = (selector) => {
  const nestedSelectors = getNestedSelectors(selector);

  const primaryNestedSelector = findLast(nestedSelectors, (nestedSelector) =>
    nestedSelector.match(classNameRegex)
  );

  return primaryNestedSelector;
};

module.exports = getPrimaryNestedSelector;
