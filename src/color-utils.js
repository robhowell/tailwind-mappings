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

const stripDefault = (string) => {
  return string.replace('-DEFAULT', '');
};

function getProximateColor(decl) {
  const twColors = Object.keys(colors)
    .map((c) => {
      const shades = colors[c];

      if (typeof shades === 'object') {
        const palette = Object.keys(shades).map((s) => {
          return {
            'background-color': stripDefault(`bg-${c}-${s}`),
            background: stripDefault(`bg-${c}-${s}`),
            color: stripDefault(`text-${c}-${s}`),
            border: stripDefault(`border-${c}-${s}`),
            'border-color': stripDefault(`border-${c}-${s}`),
            hex: shades[s],
          };
        });

        return palette;
      }

      const s = shades;

      return {
        'background-color': stripDefault(`bg-${c}-${s}`),
        background: stripDefault(`bg-${c}-${s}`),
        color: stripDefault(`text-${c}-${s}`),
        border: stripDefault(`border-${c}-${s}`),
        'border-color': stripDefault(`border-${c}-${s}`),
        hex: s,
      };
    })
    .flat();

  if (decl.value === 'transparent') {
    return twColors.find((item) => item.hex === 'transparent')[decl.prop];
  }

  if (decl.value === 'unset') {
    return twColors.find((item) => item.hex === 'unset')[decl.prop];
  }

  if (decl.value === 'initial') {
    return twColors.find((item) => item.hex === 'initial')[decl.prop];
  }

  const sorted = twColors
    .filter(
      (item) =>
        item.hex !== 'transparent' &&
        item.hex !== 'unset' &&
        item.hex !== 'initial'
    )
    .map((c) => {
      let _val = decl.value;
      if (decl.prop === 'border') {
        const borderValues = decl.value.split(' ');
        if (borderValues.length > 2) {
          const [, , ...colorValues] = borderValues;
          _val = colorValues.join('');
        }
      }
      _val = _val.replace(' !important', '');

      const diff = deltaRgb(chroma(_val).rgb(), chroma(c.hex).rgb());
      return { ...c, diff };
    })
    .sort((a, b) => a.diff - b.diff);

  return sorted[0][decl.prop];
}

function getColorUtils(decl) {
  // TODO: Add support for linear-gradients, or throw an error
  if (decl.value.includes('linear-gradient') || decl.value.includes('url')) {
    return getArbitraryClass(decl);
  }

  const hash = TAILWIND_CLASSES[decl.prop];

  return hash
    ? hash[decl.value] || getProximateColor(decl)
    : getProximateColor(decl);
}

module.exports = getColorUtils;
