// Some selectors may be missing the "all" (*) element selector but it is
// implied due to the use of :first-child or :last-child, for example:
// .DesktopHeader>:first-child which should be .DesktopHeader>*:first-child

const addMissingAllElementSelectors = (selector) => {
  const newSelector = selector.replace(/>(:first-child|:last-child)/g, '>*$1');
  return newSelector;
};

module.exports = addMissingAllElementSelectors;
