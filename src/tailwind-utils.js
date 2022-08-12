'use strict';

const TAILWIND_CLASSES = require('./constants');
const getSpacingUtils = require('./spacing-utils');
const debug = require('debug')('tailwind-mappings');

const { getBorderUtils, getBorderColorUtils } = require('./border-utils');
const getBorderRadiusUtils = require('./border-radius-utils');
const getColorUtils = require('./color-utils');
const getArbitraryClass = require('./getArbitraryClass');

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
    [
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-timing-function',
      'backface-visibility',
      'background-image',
      'border-bottom-style',
      'border-top-style',
      'border-left-style',
      'border-right-style',
      'border-image',
      'border-left',
      'border-right',
      'border-top',
      'border-bottom',
      'content',
      'grid-area',
      'grid-template-areas',
      'filter',
    ].includes(decl.prop) ||
    decl.value.includes('url') ||
    decl.value.includes('var')
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
    ].includes(decl.prop)
  ) {
    return getSpacingUtils(decl, decl.prop);
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

  const propMap = {
    'min-height': 'min-h',
    'min-width': 'min-w',
    'max-height': 'max-h',
    'max-width': 'max-w',
    width: 'w',
    height: 'h',
    transition: 'transition',
    'z-index': 'z',
    transform: 'transform',
    'letter-spacing': 'tracking',
    'line-height': 'leading',
    'font-size': 'text',
    top: 'top',
    left: 'left',
    right: 'right',
    bottom: 'bottom',
    gap: 'gap',
    stroke: 'stroke',
    fill: 'fill',
    'grid-template-columns': 'grid-cols',
    'grid-template-rows': 'grid-rows',
    flex: 'flex',
    'box-shadow': 'shadow',
    'flex-basis': 'basis',
  };

  if (prop && prop[val]) {
    return prop[val] || '';
  } else if (Object.keys(propMap).includes(decl.prop)) {
    return getArbitraryClass(
      {
        ...decl,
        prop: propMap[decl.prop],
      },
      true
    );
  } else if (prop) {
    return getUnknownClass(decl.prop, val);
  }

  console.error('Unknown prop: ', decl.prop);

  return '';
}

module.exports = getTailwindUtils;
