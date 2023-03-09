// These CSS properties are not currently supported by Tailwind. Any CSS
// properties added to this array will be converted to an arbitrary class, such
// as [background-image:url('https://example.com/image.png')]
const arbitraryProperties = [
  '--apple-pay-button-width',
  '--apple-pay-button-height',
  '--apple-pay-button-border-radius',
  '--apple-pay-button-padding',
  '--color-brand',
  '--tooltipwidth',
  '--push-across-sidebar-open-width',
  '--visible-promotion-banner-height',
  '-webkit-box-shadow',
  '-webkit-text-fill-color',
  'animation-delay',
  'animation-duration',
  'animation-iteration-count',
  'animation-name',
  'animation-timing-function',
  'animation',
  'backface-visibility',
  'background-image',
  'border-bottom-style',
  'border-bottom',
  'border-image',
  'border-left-style',
  'border-left',
  'border-right-style',
  'border-right',
  'border-top-style',
  'border-top',
  'column-gap',
  'content',
  'filter',
  'flex-flow',
  'grid-area',
  'grid-auto-rows',
  'grid-template-areas',
  'overflow-anchor',
  'row-gap',
  'scrollbar-width',
  'text-rendering',
  'text-shadow',
  'transform-style',
  'transition-property',
];

module.exports = arbitraryProperties;
