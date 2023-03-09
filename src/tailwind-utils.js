'use strict';

const TAILWIND_CLASSES = require('./constants');
const getSpacingUtils = require('./spacing-utils');
const debug = require('debug')('tailwind-mappings');

const { getBorderUtils, getBorderColorUtils } = require('./border-utils');
const getBorderRadiusUtils = require('./border-radius-utils');
const getColorUtils = require('./color-utils');
const getArbitraryClass = require('./getArbitraryClass');
const prefixMap = require('./prefixMap');

// These CSS properties are not currently supported by Tailwind. Any CSS
// properties added to this array will be converted to an arbitrary class, such
// as [background-image:url('https://example.com/image.png')]
const arbitraryProperties = [
  '--apple-pay-button-width',
  '--apple-pay-button-height',
  '--apple-pay-button-border-radius',
  '--apple-pay-button-padding',
  '--color-brand',
  '--tooltipwidth',
  '--push-across-sidebar-open-width',
  '--visible-promotion-banner-height',
  '-webkit-box-shadow',
  '-webkit-text-fill-color',
  'animation-delay',
  'animation-duration',
  'animation-iteration-count',
  'animation-name',
  'animation-timing-function',
  'animation',
  'backface-visibility',
  'background-image',
  'border-bottom-style',
  'border-bottom',
  'border-image',
  'border-left-style',
  'border-left',
  'border-right-style',
  'border-right',
  'border-top-style',
  'border-top',
  'column-gap',
  'content',
  'filter',
  'flex-flow',
  'grid-area',
  'grid-auto-rows',
  'grid-template-areas',
  'overflow-anchor',
  'row-gap',
  'scrollbar-width',
  'text-rendering',
  'text-shadow',
  'transform-style',
  'transition-property',
];

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

    // TODO: Add support for unknown opacity values
    return prop[decl.value] || '';
  }

  if (prop && prop[val]) {
    return prop[val] || '';
  } else if (Object.keys(prefixMap).includes(decl.prop)) {
    return getArbitraryClass(decl);
  } else if (prop) {
    return getUnknownClass(decl.prop, val);
  }

  console.error('Unknown prop: ', decl.prop);

  return '';
}

module.exports = getTailwindUtils;
