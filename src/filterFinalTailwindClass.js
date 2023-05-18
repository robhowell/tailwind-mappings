const { flow } = require('lodash');
const replaceAll = require('./replaceAll');

const filterFinalTailwindClass = flow([
  (value) => replaceAll(value, ':hover]:hover', ']:hover'),
  (value) => replaceAll(value, ':active]:active', ']:active'),
  (value) => replaceAll(value, ':before]:before', ']:before'),
  (value) => replaceAll(value, ':after]:after', ']:after'),
  (value) => replaceAll(value, ':first-child]:first', ']:first'),
  (value) => replaceAll(value, ':last-child]:last', ']:last'),
  (value) =>
    replaceAll(value, ':focus-visible]:focus-visible', ']:focus-visible'),
  (value) => replaceAll(value, ':focus]:focus', ']:focus'),
  (value) => replaceAll(value, ':disabled]:disabled', ']:disabled'),
  (value) => replaceAll(value, '>]', '>*]'),
]);

module.exports = filterFinalTailwindClass;
