const classNameRegex = /\.[a-zA-Z\d_-]+/g;
const firstSubSelectorRegex =
  /^(?:[.#]?[a-zA-Z0-9_-]+)(?::{1,2}[a-zA-Z0-9_-]*(?:\([:.a-zA-Z0-9_-]*\))*)*/g;
const pseudoAttributeRegex = /::?[a-zA-Z0-9_-]*(?:\([a-zA-Z0-9:.+ *_-]*\))?/g;
const subSelectorRegex =
  /(?:[.#]?[a-zA-Z0-9_-]+)(?::{1,2}[a-zA-Z0-9_-]*(?:\([:.a-zA-Z0-9_-]*\))*)*/g;

module.exports = {
  classNameRegex,
  firstSubSelectorRegex,
  pseudoAttributeRegex,
  subSelectorRegex,
};
