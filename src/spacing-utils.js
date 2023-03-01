'use strict';

const TAILWIND_CLASSES = require('./constants');

const getClosestKey = require('./getClosestKey');

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
  const isNegative = currentValue.startsWith('-');
  const positiveValue = isNegative ? currentValue.substring(1) : currentValue;

  const hash = TAILWIND_CLASSES[propertyName];
  const closestValidValue = getClosestKey(hash, positiveValue);
  const positiveOutputValue = hash[positiveValue] || hash[closestValidValue];

  return isNegative ? `-${positiveOutputValue}` : positiveOutputValue;
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

    output = px.replace('l', 'x') + ' ' + py.replace('t', 'y');
  }

  // padding: top leftRight bottom;
  if (values.length === 3) {
    const [top, leftRight, bottom] = values;

    const pt = getSizeClass(spacingProps[propName].top, top);
    const px = getSizeClass(spacingProps[propName].left, leftRight);
    const pb = getSizeClass(spacingProps[propName].bottom, bottom);

    output = pt + ' ' + px.replace('l', 'x') + ' ' + pb;
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
