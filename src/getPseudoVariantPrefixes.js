const getPseudoVariants = require('./getPseudoVariants');
const pseudoVariantMappings = require('./pseudoVariantMappings');
const getPrimaryNestedSelector = require('./getPrimaryNestedSelector');
const replaceAll = require('./replaceAll');

const getTailwindPrefixForVariant = (variant) =>
  replaceAll(
    pseudoVariantMappings[variant.replace(':', '').replace(':', '')] ??
      `[&${variant}]`,
    ' ',
    '_'
  );

// TODO: Only get pseudo variants from the last sub-selector that includes at
// least one class
const getPseudoVariantPrefixes = (selector = '') => {
  const primaryNestedSelector = getPrimaryNestedSelector(selector);

  if (!primaryNestedSelector) {
    return [];
  }

  const variants = getPseudoVariants(selector);

  if (!variants.length) {
    return [];
  }

  const prefixArray = variants.map(
    (variant) => `${getTailwindPrefixForVariant(variant)}:`
  );

  return prefixArray;
};

module.exports = getPseudoVariantPrefixes;
