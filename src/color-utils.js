'use strict';

const chroma = require('chroma-js');
// const colors = require('tailwindcss/colors');
const getArbitraryClass = require('./getArbitraryClass');

const colors = {
  brand: {
    darker: '#0a545f',
    dark: '#016a78',
    DEFAULT: '#107c8c',
    light: '#cff0fc',
    lighter: '#eaf3f4',
    lightest: '#f2f8f9',
  },
  white: '#ffffff',
  whiteOverlay: 'rgba(255, 255, 255, 0.6)',
  black: '#000000',
  blackOverlay: 'rgba(0, 0, 0, 0.6)',
  gray: {
    dark: '#262626',
    DEFAULT: '#424242',
    light1: '#5a5a5a',
    light2: '#737373',
    light3: '#919191',
    light4: '#cccccc',
    light5: '#e5e5e5',
    light6: '#f1f1f1',
    light7: '#f6f6f6',
    light8: '#fafafa',
  },
  grayOverlay: 'rgba(38, 38, 38, 0.4)',
  red: {
    dark: '#832829',
    DEFAULT: '#b85455',
    light: '#f7f1f2',
  },
  yellow: {
    dark: '#ab8d40',
    DEFAULT: '#e4c272',
    light: '#f7f2e8',
  },
  facebook: '#1977f2',
  transparent: 'transparent',
  unset: 'unset',
  initial: 'initial',
};

const TAILWIND_CLASSES = require('./constants');
// https://gist.github.com/ryancat/9972419b2a78f329ce3aebb7f1a09152

/**
 * Compare color difference in RGB
 * @param {Array} rgb1 First RGB color in array
 * @param {Array} rgb2 Second RGB color in array
 */
function deltaRgb(rgb1, rgb2) {
  const [r1, g1, b1] = rgb1,
    [r2, g2, b2] = rgb2,
    drp2 = Math.pow(r1 - r2, 2),
    dgp2 = Math.pow(g1 - g2, 2),
    dbp2 = Math.pow(b1 - b2, 2),
    t = (r1 + r2) / 2;

  return Math.sqrt(2 * drp2 + 4 * dgp2 + 3 * dbp2 + (t * (drp2 - dbp2)) / 256);
}

function getColorUtils(decl) {
  if (decl.value.includes('linear-gradient') || decl.value.includes('url')) {
    return getArbitraryClass(decl);
  }

  const hash = TAILWIND_CLASSES[decl.prop];

  return (hash && hash[decl.value]) || getArbitraryClass(decl);
}

module.exports = getColorUtils;
