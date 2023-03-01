'use strict';

const TAILWIND_CLASSES = require('./constants');
const convertPxtoRem = require('./convertPxtoRem');

function getBorderRadiusUtils(decl) {
  const hash = TAILWIND_CLASSES['border-radius'];

  const remValue = decl.value.includes('px')
    ? convertPxtoRem(decl.value)
    : null;

  return hash[remValue] || hash[decl.value] || `rounded-[${decl.value}]`;
}

module.exports = getBorderRadiusUtils;
