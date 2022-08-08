'use strict';

const TAILWIND_CLASSES = require('./src/constants');
const getSpacingUtils = require('./src/spacing-utils');

const { getBorderUtils, getBorderRadiusUtils } = require('./src/border-utils');
const getColorUtils = require('./src/color-utils');
const getTailwindUtils = require('./src/tailwind-utils');
const getTailwindUtilsForCSS = require('./src/getTailwindUtilsForCSS');
const findSimpleClasses = require('./src/findSimpleClasses');

module.exports = {
  TAILWIND_CLASSES,
  findSimpleClasses,
  getBorderRadiusUtils,
  getBorderUtils,
  getColorUtils,
  getSpacingUtils,
  getTailwindUtils,
  getTailwindUtilsForCSS,
};
