const { pseudoAttributeRegex } = require('./regex');

const getPseudoVariants = (selector) => {
  const variants = [...selector.matchAll(pseudoAttributeRegex)].flat(10);

  if (!variants.length) {
    return [];
  }

  return variants;
};

module.exports = getPseudoVariants;
