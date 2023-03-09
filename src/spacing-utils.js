'use strict';

const TAILWIND_CLASSES = require('./constants');
const convertPxtoRem = require('./convertPxtoRem');
const getArbitraryClass = require('./getArbitraryClass');

const spacingProps = {
  margin: {
    top: 'margin-top',
    right: 'margin-right',
    bottom: 'margin-bottom',
    left: 'margin-left',
  },
  padding: {
    top: 'padding-top',
    right: 'padding-right',
    bottom: 'padding-bottom',
    left: 'padding-left',
  },
};

const getSizeClass = (propertyName, currentValue) => {
  const currentValueString = `${currentValue}`;
  const value = currentValueString.startsWith('.')
    ? currentValueString.replace('.', '0.')
    : currentValueString;
  const isNegative = value.startsWith('-');
  const positiveValue = isNegative ? value.substring(1) : value;

  const hash = TAILWIND_CLASSES[propertyName];

  const positiveRemValue = positiveValue.includes('px')
    ? convertPxtoRem(positiveValue)
    : null;

  const positiveOutputValue = hash[positiveValue] || hash[positiveRemValue];

  if (positiveOutputValue) {
    // If a matching value is found then return it, prefixed with minus sign if
    // necessary
    return isNegative ? `-${positiveOutputValue}` : positiveOutputValue;
  }

  // If no matching value is found then return the original value using an
  // arbitary class
  return getArbitraryClass({
    prop: propertyName,
    value: currentValue,
  });
};

const replaceIfNotArbitraryValue = (value, original, replacement) => {
  if (value.includes('[')) return value;

  return value.replace(original, replacement);
};

function getSpacingUtils(decl) {
  // Add support for var and calc in getSpacingUtils
  if (decl.value.includes('var') || decl.value.includes('calc')) return '';
  const propName = decl.prop;
  const values = decl.value.split(' ');
  let output = '';

  // padding: 0;
  // padding-left / padding-right / padding-top / padding-bottom
  if (values.length === 1) {
    output = getSizeClass(decl.prop, values[0]);
  }

  // padding: topBottom leftRight;
  if (values.length === 2) {
    const [topBottom, leftRight] = values;

    const px = getSizeClass(spacingProps[propName].left, leftRight);
    const py = getSizeClass(spacingProps[propName].top, topBottom);

    output =
      replaceIfNotArbitraryValue(px, 'l', 'x') +
      ' ' +
      replaceIfNotArbitraryValue(py, 't', 'y');
  }

  // padding: top leftRight bottom;
  if (values.length === 3) {
    const [top, leftRight, bottom] = values;

    const pt = getSizeClass(spacingProps[propName].top, top);
    const px = getSizeClass(spacingProps[propName].left, leftRight);
    const pb = getSizeClass(spacingProps[propName].bottom, bottom);

    output = pt + ' ' + replaceIfNotArbitraryValue(px, 'l', 'x') + ' ' + pb;
  }

  // padding: top right bottom left;
  if (values.length === 4) {
    const [top, right, bottom, left] = values;

    const pl = getSizeClass(spacingProps[propName].left, left);
    const pr = getSizeClass(spacingProps[propName].right, right);
    const pt = getSizeClass(spacingProps[propName].top, top);
    const pb = getSizeClass(spacingProps[propName].bottom, bottom);

    output = pt + ' ' + pr + ' ' + pb + ' ' + pl;
  }

  return output;
}

module.exports = getSpacingUtils;
