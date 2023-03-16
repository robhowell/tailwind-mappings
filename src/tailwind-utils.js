'use strict';

const TAILWIND_CLASSES = require('./constants');
const getSpacingUtils = require('./spacing-utils');
const debug = require('debug')('tailwind-mappings');

const { getBorderUtils, getBorderColorUtils } = require('./border-utils');
const getBorderRadiusUtils = require('./border-radius-utils');
const getColorUtils = require('./color-utils');
const getArbitraryClass = require('./getArbitraryClass');
const prefixMap = require('./prefixMap');
const getUnknownClass = require('./getUnknownClass');
const arbitraryProperties = require('./arbitraryProperties');

const getTailwindUtilsForClassWithoutImportant = (decl) => {
  const prop = TAILWIND_CLASSES[decl.prop];
  debug('prop = ', decl.prop);
  debug('value = ', decl.value);

  if (
    arbitraryProperties.includes(decl.prop) ||
    decl.value.includes('url(') ||
    decl.value.includes('var(') ||
    decl.value.includes('calc(')
  ) {
    return getArbitraryClass(decl);
  }

  if (
    [
      'margin',
      'margin-left',
      'margin-right',
      'margin-top',
      'margin-bottom',
      'padding',
      'padding-left',
      'padding-right',
      'padding-top',
      'padding-bottom',
      'left',
      'right',
      'top',
      'bottom',
      'width',
      'height',
      'min-width',
      'min-height',
      'max-width',
      'max-height',
    ].includes(decl.prop)
  ) {
    return getSpacingUtils(decl, decl.prop) ?? getArbitraryClass(decl);
  }

  if (decl.prop === 'border') {
    return getBorderUtils(decl);
  }

  if (['color', 'background-color', 'background'].includes(decl.prop)) {
    if (decl.value === 'inherit') {
      return getArbitraryClass(decl);
    }

    if (!decl.value.includes('var')) {
      return getColorUtils(decl);
    }

    console.error('Unknown color', decl.value);

    return '';
  }

  if (decl.prop === 'border-radius') {
    return getBorderRadiusUtils(decl);
  }

  if (decl.prop === 'border-color') {
    return getBorderColorUtils(decl);
  }

  if (decl.prop === 'opacity') {
    if (decl.value.startsWith('.')) {
      decl.value = '0' + decl.value;
    }

    return prop[decl.value] || getArbitraryClass(decl);
  }

  if (prop && prop[decl.value]) {
    return prop[decl.value] || '';
  } else if (Object.keys(prefixMap).includes(decl.prop)) {
    return getArbitraryClass(decl);
  } else if (prop) {
    return getUnknownClass(decl.prop, decl.value);
  }

  console.error('Unknown prop: ', decl.prop);

  return '';
};

function getTailwindUtils(incomingDecl) {
  const isImportant = incomingDecl.value.includes('!important');

  // remove !important from values
  const val = incomingDecl.value
    .replace(' !important', '')
    .replace('!important', '')
    .trim();

  const decl = {
    ...incomingDecl,
    value: val,
  };

  const tailwindClasses = getTailwindUtilsForClassWithoutImportant(decl);

  // If the value is important, add ! to start of each class that is returned
  return isImportant
    ? tailwindClasses
        .split(' ')
        .map((className) => `!${className}`)
        .join(' ')
    : tailwindClasses;
}

module.exports = getTailwindUtils;
