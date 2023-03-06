const getArrayFromList = require('./getArrayFromList');
const breakpoints = require('./breakpoints');

// Ignore "screen" and "and" in media query, they are not necessary in this app.
const mediaQueryItemsToIgnore = ['only', 'screen', 'and'];

const getMediaQueryPrefixForItem = (item) => {
  if (
    item.type === 'MediaFeature' &&
    item.name === 'min-width' &&
    item.value.unit === 'px' &&
    breakpoints[item.value.value]
  ) {
    return breakpoints[item.value.value];
  }

  return item?.value?.value
    ? `[@media(${item.name}:${item?.value?.value}${item?.value?.unit ?? ''})]`
    : `[@media(${item.name}:${item?.value?.name})]`;
};

const getMediaQueryPrefixesForAtRule = (atRule) => {
  const mediaQueryChildren =
    atRule?.prelude?.children?.first?.children?.first?.children;

  if (!mediaQueryChildren) {
    return [];
  }

  if (mediaQueryChildren) {
    const mediaQueryChildrenArray = getArrayFromList(mediaQueryChildren);

    const mediaQueryItems = mediaQueryChildrenArray.filter(
      (item) => !mediaQueryItemsToIgnore.includes(item.name)
    );

    const prefixes = mediaQueryItems
      .map(getMediaQueryPrefixForItem)
      .filter((item) => !!item);

    return prefixes;
  }

  return [];
};

module.exports = getMediaQueryPrefixesForAtRule;
