// Remove nesting, e.g. convert ".cart__affirm>.ca-promotional-widget.Cta" to
// [".cart__affirm", ".ca-promotional-widget.Cta"]
const getNestedSelectors = (selector) =>
  selector
    .split(' ')
    .map((subSelector) => subSelector.split('>'))
    .flat(10)
    .map((subSelector) => subSelector.split('+'))
    .flat(10)
    .map((subSelector) => subSelector.split('~'))
    .flat(10);

module.exports = getNestedSelectors;
