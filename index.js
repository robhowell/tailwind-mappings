'use strict';

const TAILWIND_CLASSES = require('./src/constants');
const getSpacingUtils = require('./src/spacing-utils');

const { getBorderUtils, getBorderRadiusUtils } = require('./src/border-utils');
const getColorUtils = require('./src/color-utils');
const getTailwindUtils = require('./src/tailwind-utils');
const getTailwindUtilsForCSS = require('./src/getTailwindUtilsForCSS');

module.exports = {
  TAILWIND_CLASSES,
  getSpacingUtils,
  getBorderRadiusUtils,
  getBorderUtils,
  getColorUtils,
  getTailwindUtils,
  getTailwindUtilsForCSS,
};
