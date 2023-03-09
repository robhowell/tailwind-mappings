'use strict';

const TAILWIND_CLASSES = require('./constants');

const chroma = require('chroma-js');
const getColorUtils = require('./color-utils');
const getArbitraryClass = require('./getArbitraryClass');

// Get the nearest matching Tailwind value
function getClosestKey(valueHash, value) {
  const values = Object.keys(valueHash);

  let distance = Math.abs(values[0] - value);
  let idx = 0;
  for (let c = 1; c < values.length; c++) {
    const cdistance = Math.abs(values[c] - value);
    if (cdistance < distance) {
      idx = c;
      distance = cdistance;
    }
  }
  return values[idx];
}

function getBorderUtils(decl) {
  if (decl.value === 'none') return 'border-0';
  if (decl.value === 'transparent') return 'border-transparent';
  if (decl.value === '0') return 'border-0';

  const borderValues = decl.value.split(' ');

  /* width */

  /* width | style | color */
  if (
    decl.value.includes('#') ||
    decl.value.includes('rgb') ||
    decl.value.includes('transparent')
  ) {
    const [width, style, ...colorValue] = borderValues;
    const color = colorValue.join(' ');

    const borderWidth = TAILWIND_CLASSES['border-width'];
    const borderStyle = TAILWIND_CLASSES['border-style'];
    const borderColor = TAILWIND_CLASSES['border-color'];

    const widthClass =
      borderWidth[width] ||
      getArbitraryClass({
        prop: 'border-width',
        value: width,
      });

    const styleClass =
      borderStyle[style] ||
      getArbitraryClass({
        prop: 'border-style',
        value: style,
      });

    const colorClass =
      borderColor[color] ||
      getArbitraryClass({
        prop: 'border-color',
        value: color,
      });

    return `${widthClass} ${styleClass} ${colorClass}`;
  }

  if (borderValues.length === 1) {
    const [width] = borderValues;

    const borderWidth = TAILWIND_CLASSES['border-width'];

    const widthClass =
      borderWidth[width] ||
      getArbitraryClass({
        prop: 'border-width',
        value: width,
      });

    return widthClass;
  }

  /* width | style (CSS allow "style | color" but we don't use that) */
  if (borderValues.length === 2) {
    const [width, style] = borderValues;

    const borderWidth = TAILWIND_CLASSES['border-width'];
    const borderStyle = TAILWIND_CLASSES['border-style'];

    const widthClass =
      borderWidth[width] ||
      getArbitraryClass({
        prop: 'border-width',
        value: width,
      });

    const styleClass =
      borderStyle[style] ||
      getArbitraryClass({
        prop: 'border-style',
        value: style,
      });

    return `${widthClass} ${styleClass}`;
  }

  console.log(
    'Unable to convert border value, must be manually converted',
    decl
  );
}

function getBorderColorUtils(decl) {
  const borderColor = TAILWIND_CLASSES['border-color'];
  const borderOpacity = TAILWIND_CLASSES['border-opacity'];

  const color = decl.value;
  const borderValues = color.split(' ');

  if (borderValues.length === 2) {
    /* top and bottom | left and right */
    const borderClassY = TAILWIND_CLASSES['border-y-color'][borderValues[0]];
    const borderClassX = TAILWIND_CLASSES['border-x-color'][borderValues[1]];

    if (!borderClassY || !borderClassX) {
      console.log(
        'Matching border values not found, must be manually converted',
        decl
      );
      return '';
    }

    return `${borderClassY} ${borderClassX}`;
  } else if (borderValues.length === 3) {
    /* top | left and right | bottom */
    const borderClassTop =
      TAILWIND_CLASSES['border-top-color'][borderValues[0]];
    const borderClassX = TAILWIND_CLASSES['border-x-color'][borderValues[1]];
    const borderClassBottom =
      TAILWIND_CLASSES['border-bottom-color'][borderValues[2]];

    if (!borderClassTop || !borderClassX || !borderClassBottom) {
      console.log(
        'Matching border values not found, must be manually converted',
        decl
      );
      return '';
    }

    return `${borderClassTop} ${borderClassX} ${borderClassBottom}`;
  } else if (borderValues.length === 4) {
    /* top | right | bottom | left */
    const borderClassTop =
      TAILWIND_CLASSES['border-top-color'][borderValues[0]];
    const borderClassRight =
      TAILWIND_CLASSES['border-right-color'][borderValues[1]];
    const borderClassBottom =
      TAILWIND_CLASSES['border-bottom-color'][borderValues[2]];
    const borderClassLeft =
      TAILWIND_CLASSES['border-left-color'][borderValues[3]];

    if (
      !borderClassTop ||
      !borderClassRight ||
      !borderClassBottom ||
      !borderClassLeft
    ) {
      console.log(
        'Matching border values not found, must be manually converted',
        decl
      );
      return '';
    }

    return `${borderClassTop} ${borderClassLeft} ${borderClassBottom} ${borderClassRight}`;
  }

  const _color = borderColor[color] || getColorUtils(decl);
  let result = _color;

  if (color.includes('rgba')) {
    const [, , , opacity] = chroma(color)._rgb;
    const closestKey = getClosestKey(borderOpacity, opacity);
    const _opacity = borderOpacity[opacity] || borderOpacity[closestKey];
    result += ' ' + _opacity;
  }

  return result;
}

module.exports = {
  getBorderUtils,
  getBorderColorUtils,
};
