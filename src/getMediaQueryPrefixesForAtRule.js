const getArrayFromList = require('./getArrayFromList');
const breakpoints = require('./breakpoints');

// Ignore "screen" and "and" in media query, they are not necessary in this app.
const mediaQueryItemsToIgnore = ['only', 'screen', 'and'];

const getMediaQueryPrefixForItem = (item) => {
  if (item.name === 'print') {
    return 'print';
  }

  if (item.name === 'orientation' && item.value.name === 'portrait') {
    return 'portrait';
  }

  if (item.name === 'orientation' && item.value.name === 'landscape') {
    return 'landscape';
  }

  if (
    item.name === 'min-width' &&
    item.value.unit === 'px' &&
    breakpoints[item.value.value]
  ) {
    return breakpoints[item.value.value];
  }

  // If there is no value (e.g. hover:hover) then use value.name instead
  const valueWithUnit = item?.value?.value
    ? `${item?.value?.value}${item?.value?.unit ?? ''}`
    : `${item?.value?.name}`;

  if (!valueWithUnit) {
    console.log(
      `DEBUG: getMediaQueryPrefixForItem: No valueWithUnit found for item:`,
      item
    );
  }

  if (item.name === 'min-width') {
    return `min-w-[${valueWithUnit}]`;
  }

  if (item.name === 'max-width') {
    return `max-w-[${valueWithUnit}]`;
  }

  return `[@media(${item.name}:${valueWithUnit})]`;
};

const getMediaQueryPrefixesForAtRule = (atRule) => {
  const mediaQueryChildren =
    atRule?.prelude?.children?.first?.children?.first?.children;

  if (!mediaQueryChildren) {
    return [];
  }

  const mediaQueryChildrenArray = getArrayFromList(mediaQueryChildren);

  const mediaQueryItems = mediaQueryChildrenArray.filter(
    (item) => !mediaQueryItemsToIgnore.includes(item.name)
  );

  const prefixes = mediaQueryItems
    .map(getMediaQueryPrefixForItem)
    .filter((item) => !!item);

  return prefixes;
};

module.exports = getMediaQueryPrefixesForAtRule;
