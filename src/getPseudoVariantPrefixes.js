const getPseudoVariants = require('./getPseudoVariants');
const pseudoVariantMappings = require('./pseudoVariantMappings');

const getTailwindPrefixForVariant = (variant) =>
  pseudoVariantMappings[variant.replace(':', '').replace(':', '')] ??
  `[&${variant}]`;

// TODO: Only get pseudo variants from the last sub-selector that includes only
// one class
const getPseudoVariantPrefixes = (selector) => {
  const variants = getPseudoVariants(selector);

  // if (selector.includes(':hover')) {
  //   console.log('Selector with hover', selector);
  //   console.log('variants for selector', variants);
  // }

  if (selector && !variants.length) {
    return [];
  }

  const prefixArray = variants.map(
    (variant) => `${getTailwindPrefixForVariant(variant)}:`
  );

  return prefixArray;
};

module.exports = getPseudoVariantPrefixes;
