function convertPxtoRem(value) {
  const a = value.replace('px', '');
  const b = a / 16;
  return b > 0 ? `${b}rem` : '0';
}

module.exports = convertPxtoRem;
