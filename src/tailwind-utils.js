'use strict';

const TAILWIND_CLASSES = require('./constants');
const getSpacingUtils = require('./spacing-utils');
const debug = require('debug')('tailwind-mappings');

const { getBorderUtils, getBorderColorUtils } = require('./border-utils');

const getBorderRadiusUtils = require('./border-radius-utils');
const getColorUtils = require('./color-utils');

const getValueBetweenBrackets = (value) => {
  const openBracket = value.indexOf('(');
  const closeBracket = value.indexOf(')');
  return value.substring(openBracket + 1, closeBracket);
};

const getArbitraryClass = (prop, value) => {
  if (prop === 'transform' && value.includes('scaleX'))
    return `scale-x-[${getValueBetweenBrackets(value)}]`;

  if (prop === 'transform' && value.includes('scaleY'))
    return `scale-y-[${getValueBetweenBrackets(value)}]`;

  if (prop === 'transform' && value.includes('scale'))
    return `scale-[${getValueBetweenBrackets(value)}]`;

  console.error(`Unknown value: ${prop}: ${value}`);

  return '';
};

function getTailwindUtils(decl) {
  const prop = TAILWIND_CLASSES[decl.prop];
  debug('prop = ', decl.prop);
  debug('value = ', decl.value);
  // remove !important from values
  const val = decl.value.replace(' !important', '');
  let output = '';
  switch (decl.prop) {
    case 'margin':
    case 'margin-left':
    case 'margin-right':
    case 'margin-top':
    case 'margin-bottom':
    case 'padding':
    case 'padding-left':
    case 'padding-right':
    case 'padding-top':
    case 'padding-bottom':
      output = getSpacingUtils(decl, decl.prop);
      break;

    case 'border':
      output = getBorderUtils(decl);
      break;

    case 'color':
    case 'background-color':
    case 'background':
      if (decl.value !== 'inherit' && !decl.value.includes('var')) {
        output = getColorUtils(decl);
      }
      break;

    case 'border-radius':
      output = getBorderRadiusUtils(decl);
      break;

    case 'border-color':
      output = getBorderColorUtils(decl);
      break;

    case 'opacity':
      if (decl.value.startsWith('.')) {
        decl.value = '0' + decl.value;
      }
      output = prop[decl.value] || '';
      break;

    default:
      if (prop && prop[val]) {
        output = prop[val] || '';
      } else if (prop) {
        output = getArbitraryClass(decl.prop, val);
      } else {
        console.error('Unknown prop: ', decl.prop);
      }
  }

  return output;
}

module.exports = getTailwindUtils;
