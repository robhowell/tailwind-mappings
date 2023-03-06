// This is a collection of all supported min-width breakpoints. To support
// historical usage of the `sm` breakpoint, we support both `767` and `768`, and
// we will treat them as equivalent. Likewise, we support `1023`, `1024` and
// `1025` as equivalent.

const breakpoints = {
  639: 'sm',
  640: 'sm',
  641: 'sm',
  767: 'md',
  768: 'md',
  769: 'md',
  1023: 'lg',
  1024: 'lg',
  1025: 'lg',
  1279: 'xl',
  1280: 'xl',
  1281: 'xl',
  1535: '2xl',
  1536: '2xl',
  1537: '2xl',
};

module.exports = breakpoints;
