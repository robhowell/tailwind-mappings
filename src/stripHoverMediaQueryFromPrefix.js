const stripHoverMediaQueryFromPrefix = (prefix) =>
  prefix.replace(/\[@media\(hover:hover\)\]:(?!focus:)/g, 'hover:');

module.exports = stripHoverMediaQueryFromPrefix;
