'use strict';

const TAILWIND_CLASSES = require('./constants');
const getSpacingUtils = require('./spacing-utils');
const debug = require('debug')('tailwind-mappings');

const { getBorderUtils, getBorderColorUtils } = require('./border-utils');
const getBorderRadiusUtils = require('./border-radius-utils');
const getColorUtils = require('./color-utils');
const replaceAll = require('./replaceAll');

const getValueBetweenBrackets = (value) => {
  const openBracket = value.indexOf('(');
  const closeBracket = value.indexOf(')');
  return value.substring(openBracket + 1, closeBracket);
};

const getUnknownClass = (prop, value) => {
  if (prop === 'transform') {
    if (value.includes('scaleX'))
      return `scale-x-[${getValueBetweenBrackets(value)}]`;

    if (value.includes('scaleY'))
      return `scale-y-[${getValueBetweenBrackets(value)}]`;

    if (value.includes('scale'))
      return `scale-[${getValueBetweenBrackets(value)}]`;
  }

  console.error(`Unknown value: ${prop}: ${value}`);

  return '';
};

function getTailwindUtils(incomingDecl) {
  const prop = TAILWIND_CLASSES[incomingDecl.prop];
  debug('prop = ', incomingDecl.prop);
  debug('value = ', incomingDecl.value);

  // remove !important from values
  const val = incomingDecl.value
    .replace(' !important', '')
    .replace('!important', '');

  const decl = {
    ...incomingDecl,
    value: val,
  };

  if (['animation'].includes(decl.prop)) {
    return `[${decl.prop}:${replaceAll(
      replaceAll(decl.value, ' ', '_'),
      '\n',
      '_'
    )}]`;
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
    ].includes(decl.prop)
  ) {
    return getSpacingUtils(decl, decl.prop);
  }

  if (decl.prop === 'border') {
    return getBorderUtils(decl);
  }

  if (['color', 'background-color', 'background'].includes(decl.prop)) {
    if (decl.value !== 'inherit' && !decl.value.includes('var')) {
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

    // TODO: Add support for unknown opacity values
    return prop[decl.value] || '';
  }

  if (prop && prop[val]) {
    return prop[val] || '';
  } else if (prop) {
    return getUnknownClass(decl.prop, val);
  }

  console.error('Unknown prop: ', decl.prop);

  return '';
}

module.exports = getTailwindUtils;
