const getPseudoVariants = require('./getPseudoVariants');
const pseudoVariantMappings = require('./pseudoVariantMappings');

const getTailwindPrefixForVariant = (variant) =>
  pseudoVariantMappings[variant.replace(':', '').replace(':', '')] ??
  `[&${variant}]`;

const getPseudoVariantPrefixes = (selector) => {
  const variants = getPseudoVariants(selector);

  if (!variants.length) {
    return [];
  }

  return variants.map((variant) => `${getTailwindPrefixForVariant(variant)}:`);
};

module.exports = getPseudoVariantPrefixes;
