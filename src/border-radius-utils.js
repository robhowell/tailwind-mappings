'use strict';

const TAILWIND_CLASSES = require('./constants');

const getClosestKey = require('./getClosestKey');

function getBorderRadiusUtils(decl) {
  const hash = TAILWIND_CLASSES['border-radius'];
  const closestKey = getClosestKey(hash, decl.value);
  return hash[decl.value] || hash[closestKey];
}

module.exports = getBorderRadiusUtils;
