const classNameRegex = /\.[a-zA-Z\d_-]+/g;
const pseudoAttributeRegex = /:{1,2}[a-zA-Z0-9_-]*[.()a-zA-Z0-9_-]*/g;
const subSelectorRegex =
  /(?:[.#]?[a-zA-Z0-9_-]+)(?::{1,2}[a-zA-Z0-9_-]*[.()a-zA-Z0-9_-]*)*/g;

module.exports = {
  classNameRegex,
  pseudoAttributeRegex,
  subSelectorRegex,
};
