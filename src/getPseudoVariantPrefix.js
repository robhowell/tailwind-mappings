const getPseudoVariantPrefixes = require('./getPseudoVariants');
const pseudoVariantMappings = require('./pseudoVariantMappings');

const getTailwindPrefixForVariant = (variant) =>
  pseudoVariantMappings[variant.replace(':', '').replace(':', '')] ??
  `[&${variant}]`;

const getPseudoVariantPrefix = (selector) => {
  const variants = getPseudoVariantPrefixes(selector);

  if (!variants.length) {
    return '';
  }

  return variants
    .map((variant) => `${getTailwindPrefixForVariant(variant)}:`)
    .join('');
};

module.exports = getPseudoVariantPrefix;
