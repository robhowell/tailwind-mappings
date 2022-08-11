'use strict';

const TAILWIND_CLASSES = {
  '--push-across-sidebar-open-width': {},
  '--tooltipwidth': {},
  '--visible-promotion-banner-height': {},
  '-moz-osx-font-smoothing': {
    grayscale: '[-moz-osx-font-smoothing:grayscale]',
  },
  '-ms-overflow-style': {
    none: '[-ms-overflow-style:none]',
  },
  '-webkit-box-shadow': {
    '0 0 0 30px white inset': '[-webkit-box-shadow:0 0 0 30px white inset]',
  },
  '-webkit-font-smoothing': {
    antialiased: '[-webkit-font-smoothing:antialiased]',
  },
  '-webkit-tap-highlight-color': {
    transparent: '[-webkit-tap-highlight-color:transparent]',
  },
  '-webkit-text-fill-color': {
    currentcolor: "[-webkit-text-fill-color:theme('colors.gray.DEFAULT')]",
  },
  '-webkit-touch-callout': {
    none: '[-webkit-touch-callout:none]',
  },
  'align-content': {
    center: 'content-center',
    'flex-end': 'content-end',
    'flex-start': 'content-start',
    'space-around': 'content-around',
    'space-between': 'content-between',
    'space-evenly': 'content-evenly',
  },
  'align-items': {
    baseline: 'items-baseline',
    center: 'items-center',
    'flex-end': 'items-end',
    'flex-start': 'items-start',
    stretch: 'items-stretch',
  },
  'align-self': {
    auto: 'self-auto',
    center: 'self-center',
    end: 'self-end',
    start: 'self-start',
    stretch: 'self-stretch',
  },
  animation: {
    none: 'animate-none',
  },
  'animation-delay': {},
  'animation-duration': {},
  'animation-fill-mode': {
    both: '[animation-fill-mode:both]',
    forwards: '[animation-fill-mode:forwards]',
  },
  'animation-iteration-count': {},
  'animation-name': {},
  'animation-timing-function': {},
  appearance: {
    none: 'appearance-none',
  },
  'backface-visibility': {},
  background: {
    '#000': 'bg-black',
    '#000000': 'bg-black',
    '#fff': 'bg-white',
    '#FFF': 'bg-white',
    '#ffffff': 'bg-white',
    '#FFFFFF': 'bg-white',
    '0 0': 'bg-none',
    black: 'bg-black',
    currentColor: 'bg-current',
    none: 'bg-none',
    transparent: 'bg-transparent',
    white: 'bg-white',
  },
  'background-attachment': {
    fixed: 'bg-fixed',
    local: 'bg-local',
    scroll: 'bg-scroll',
  },
  'background-blend-mode': {
    color: 'bg-blend-color',
    'color-burn': 'bg-blend-color-burn',
    'color-dodge': 'bg-blend-color-dodge',
    darken: 'bg-blend-darken',
    difference: 'bg-blend-difference',
    exclusion: 'bg-blend-exclusion',
    'hard-light': 'bg-blend-hard-light',
    hue: 'bg-blend-hue',
    lighten: 'bg-blend-lighten',
    luminosity: 'bg-blend-luminosity',
    multiply: 'bg-blend-multiply',
    normal: 'bg-blend-normal',
    overlay: 'bg-blend-overlay',
    saturation: 'bg-blend-saturation',
    screen: 'bg-blend-screen',
    'soft-light': 'bg-blend-soft-light',
  },
  'background-clip': {
    'border-box': 'bg-clip-border',
    'content-box': 'bg-clip-content',
    'padding-box': 'bg-clip-padding',
    text: 'bg-clip-text',
  },
  'background-color': {
    currentColor: 'bg-current',
    initial: 'bg-[initial]',
    transparent: 'bg-transparent',
    unset: 'bg-[unset]',
  },
  'background-image': {
    none: 'bg-none',
  },
  'background-position': {
    bottom: 'bg-bottom',
    center: 'bg-center',
    left: 'bg-left',
    'left bottom': 'bg-left-bottom',
    'left-top': 'bg-left-top',
    right: 'bg-right',
    'right bottom': 'bg-right-bottom',
    'right top': 'bg-right-top',
    top: 'bg-top',
  },
  'background-repeat': {
    'no-repeat': 'bg-no-repeat',
    repeat: 'bg-repeat',
    'repeat-x': 'bg-repeat-x',
    'repeat-y': 'bg-repeat-y',
    round: 'bg-repeat-round',
    space: 'bg-repeat-space',
  },
  'background-size': {
    auto: 'bg-auto',
    contain: 'bg-contain',
    cover: 'bg-cover',
  },
  'border-bottom': {
    none: 'border-b-0',
  },
  'border-bottom-color': {},
  'border-bottom-left-radius': {
    none: 'rounded-bl-none',
  },
  'border-bottom-right-radius': {
    none: 'rounded-br-none',
  },
  'border-bottom-style': {},
  'border-bottom-width': {
    0: 'border-b-0',
    '1px': 'border-b-[1px]',
  },
  'border-collapse': {
    collapse: 'border-collapse',
    separate: 'border-separate',
  },
  'border-color': {
    '#000': 'border-black',
    '#000000': 'border-black',
    '#fff': 'border-white',
    '#FFF': 'border-white',
    '#ffffff': 'border-white',
    '#FFFFFF': 'border-white',
    black: 'border-black',
    currentColor: 'border-current',
    inherit: ' ',
    initial: ' ',
    transparent: 'border-transparent',
    white: 'border-white',
  },
  'border-image': {},
  'border-left': {
    none: 'border-l-0',
  },
  'border-left-color': {},
  'border-left-width': {
    0: 'border-l-0',
    '1px': 'border-l-[1px]',
  },
  'border-opacity': {
    0: 'border-opacity-0',
    1: 'border-opacity-100',
    0.05: 'border-opacity-5',
    0.1: 'border-opacity-10',
    0.2: 'border-opacity-20',
    0.25: 'border-opacity-25',
    0.3: 'border-opacity-30',
    0.4: 'border-opacity-40',
    0.5: 'border-opacity-50',
    0.6: 'border-opacity-60',
    0.7: 'border-opacity-70',
    0.75: 'border-opacity-75',
    0.8: 'border-opacity-80',
    0.9: 'border-opacity-90',
    0.95: 'border-opacity-95',
  },
  'border-radius': {
    0: 'rounded-none',
    '0.125rem': 'rounded-sm',
    '0.25rem': 'rounded',
    '0.375rem': 'rounded-md',
    '0.5rem': 'rounded-lg',
    '0.75rem': 'rounded-xl',
    '0px': 'rounded-none',
    '1.5rem': 'rounded-3xl',
    '100%': 'rounded-full',
    '1rem': 'rounded-2xl',
    '9999px': 'rounded-full',
  },
  'border-right': {
    none: 'border-r-0',
  },
  'border-right-color': {},
  'border-right-width': {
    0: 'border-r-0',
    '1px': 'border-r-[1px]',
  },
  'border-style': {
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    double: 'border-double',
    none: 'border-none',
    solid: 'border-solid',
  },
  'border-top': {
    none: 'border-t-0',
  },
  'border-top-color': {},
  'border-top-left-radius': {
    none: 'rounded-tl-none',
  },
  'border-top-right-radius': {
    none: 'rounded-tr-none',
  },
  'border-top-width': {
    0: 'border-t-0',
    '1px': 'border-t-[1px]',
  },
  'border-width': {
    '0px': 'border-none',
    '1px': 'border',
    '2px': 'border-2',
    '4px': 'border-4',
    '8px': 'border-8',
  },
  bottom: {
    0: 'bottom-0',
    '0px': 'bottom-0',
    '100%': 'bottom-full',
    '50%': 'bottom-1/2',
  },
  'box-shadow': {
    none: 'shadow-none',
  },
  'box-sizing': {
    'border-box': 'box-border',
    'content-box': 'box-content',
  },
  'break-inside': {
    avoid: 'break-inside-avoid',
  },
  clear: {
    both: 'clear-both',
    left: 'clear-left',
    none: 'clear-none',
    right: 'clear-right',
  },
  clip: {},
  'clip-path': {},
  color: {
    '#fff': 'text-white',
    '#FFF': 'text-white',
    '#ffffff': 'text-white',
    '#FFFFFF': 'text-white',
    currentColor: 'text-current',
    initial: 'text-[initial]',
    transparent: 'text-transparent',
    unset: 'text-[unset]',
    white: 'text-white',
  },
  'column-count': {
    1: '[column-count:1]',
    2: '[column-count:2]',
    3: '[column-count:3]',
  },
  'column-gap': {},
  'contain-intrinsic-size': {
    0: '[contain-intrinsic-size:0]',
  },
  content: {
    '': 'content-none',
  },
  'content-visibility': {
    auto: '[content-visibility:auto]',
  },
  cursor: {
    auto: 'cursor-auto',
    default: 'cursor-default',
    help: 'cursor-help',
    move: 'cursor-move',
    'not-allowed': 'cursor-not-allowed',
    pointer: 'cursor-pointer',
    text: 'cursor-text',
    wait: 'cursor-wait',
  },
  direction: {},
  display: {
    block: 'block',
    contents: 'contents',
    flex: 'flex',
    'flow-root': 'flow-root',
    grid: 'grid',
    inline: 'inline',
    'inline-block': 'inline-block',
    'inline-flex': 'inline-flex',
    'inline-grid': 'inline-grid',
    'inline-table': 'inline-table',
    'list-item': 'list-item',
    none: 'hidden',
    table: 'table',
    'table-caption': 'table-caption',
    'table-cell': 'table-cell',
    'table-column': 'table-column',
    'table-column-group': 'table-column-group',
    'table-footer-group': 'table-footer-group',
    'table-header-group': 'table-header-group',
    'table-row': 'table-row',
    'table-row-group': 'table-row-group',
  },
  fill: {
    currentColor: 'fill-current',
  },
  filter: {},
  flex: {
    '0 1 auto': 'flex-initial',
    '1 1 0%': 'flex-1',
    '1 1 auto': 'flex-auto',
    none: 'flex-none',
  },
  'flex-basis': {
    0: 'basis-0',
  },
  'flex-direction': {
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse',
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
  },
  'flex-flow': {},
  'flex-grow': {
    0: 'flex-grow-0',
    1: 'flex-grow',
  },
  'flex-shrink': {
    0: 'flex-shrink-0',
    1: 'flex-shrink',
  },
  'flex-wrap': {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  },
  float: {
    left: 'float-left',
    none: 'float-none',
    right: 'float-right',
  },
  'font-family': {
    inherit: '[font-family:inherit]',
  },
  'font-size': {
    '.75rem': 'text-xs',
    '.875rem': 'text-sm',
    '1.125rem': 'text-lg',
    '1.25rem': 'text-xl',
    '1.5rem': 'text-2xl',
    '1.875rem': 'text-3xl',
    '1rem': 'text-base',
    '2.25rem': 'text-4xl',
    '3.75rem': 'text-6xl',
    '3rem': 'text-5xl',
    '4.5rem': 'text-7xl',
    '6rem': 'text-8xl',
    '8rem': 'text-9xl',
  },
  'font-style': {
    italic: 'italic',
    normal: 'non-italic',
  },
  'font-weight': {
    100: 'font-thin',
    200: 'font-extralight',
    300: 'font-light',
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
    800: 'font-extrabold',
    900: 'font-black',
  },
  gap: {
    '1rem': 'gap-4',
  },
  'grid-area': {},
  'grid-auto-columns': {
    auto: 'auto-cols-auto',
    'max-content': 'auto-cols-max',
    'min-content': 'auto-cols-min',
    'minmax(0, 1fr)': 'auto-cols-fr',
  },
  'grid-auto-flow': {
    column: 'grid-flow-col',
    'column dense': 'grid-flow-col-dense',
    row: 'grid-flow-row',
    'row dense': 'grid-flow-row-dense',
  },
  'grid-auto-rows': {
    auto: 'auto-rows-auto',
    'max-content': 'auto-rows-max',
    'min-content': 'auto-rows-min',
    'minmax(0, 1fr)': 'auto-rows-fr',
  },
  'grid-column-end': {
    1: 'col-end-1',
    2: 'col-end-2',
    3: 'col-end-3',
    4: 'col-end-4',
    5: 'col-end-5',
    auto: 'col-end-auto',
  },
  'grid-column-start': {
    1: 'col-start-1',
    2: 'col-start-2',
    3: 'col-start-3',
    4: 'col-start-4',
    5: 'col-start-5',
    auto: 'col-start-auto',
  },
  'grid-row-end': {
    1: 'row-end-1',
    2: 'row-end-2',
    3: 'row-end-3',
    4: 'row-end-4',
    5: 'row-end-5',
    auto: 'row-end-auto',
  },
  'grid-row-start': {
    1: 'row-start-1',
    2: 'row-start-2',
    3: 'row-start-3',
    4: 'row-start-4',
    5: 'row-start-5',
    auto: 'row-start-auto',
  },
  'grid-template-areas': {},
  'grid-template-columns': {
    none: 'grid-cols-none',
    'repeat(1, minmax(0, 1fr))': 'grid-cols-1',
    'repeat(10, minmax(0, 1fr))': 'grid-cols-10',
    'repeat(11, minmax(0, 1fr))': 'grid-cols-11',
    'repeat(12, minmax(0, 1fr))': 'grid-cols-12',
    'repeat(2, minmax(0, 1fr))': 'grid-cols-2',
    'repeat(3, minmax(0, 1fr))': 'grid-cols-3',
    'repeat(4, minmax(0, 1fr))': 'grid-cols-4',
    'repeat(5, minmax(0, 1fr))': 'grid-cols-5',
    'repeat(6, minmax(0, 1fr))': 'grid-cols-6',
    'repeat(7, minmax(0, 1fr))': 'grid-cols-7',
    'repeat(8, minmax(0, 1fr))': 'grid-cols-8',
    'repeat(9, minmax(0, 1fr))': 'grid-cols-9',
  },
  'grid-template-rows': {
    none: 'grid-rows-none',
  },
  height: {
    0: 'h-0',
    '0px': 'h-0',
    '100%': 'h-full',
    '100vh': 'h-screen',
    '25%': 'h-1/4',
    '33.333333%': 'h-1/3',
    '50%': 'h-1/2',
    '66.666667%': 'h-2/3',
    '75%': 'h-3/4',
    auto: 'h-auto',
  },
  isolation: {
    auto: 'isolation-auto',
    isolate: 'isolate',
  },
  'justify-content': {
    center: 'justify-center',
    'flex-end': 'justify-end',
    'flex-start': 'justify-start',
    'space-around': 'justify-around',
    'space-between': 'justify-between',
    'space-evenly': 'justify-evenly',
  },
  'justify-items': {
    center: 'justify-items-center',
    end: 'justify-items-end',
    start: 'justify-items-start',
    stretch: 'justify-items-stretch',
  },
  'justify-self': {
    auto: 'justify-self-auto',
    center: 'justify-self-center',
    end: 'justify-self-end',
    start: 'justify-self-start',
    stretch: 'justify-self-stretch',
  },
  left: {
    0: 'left-0',
    '0px': 'left-0',
    '100%': 'left-full',
    '50%': 'left-1/2',
  },
  'letter-spacing': {
    '-0.025em': 'tracking-tight',
    '-0.05em': 'tracking-tighter',
    '0.025em': 'tracking-wide',
    '0.05em': 'tracking-wider',
    '0.1em': 'tracking-widest',
    '0em': 'tracking-normal',
  },
  'line-height': {
    1: 'leading-none',
    2: 'leading-loose',
    1.25: 'leading-tight',
    1.375: 'leading-snug',
    1.5: 'leading-normal',
    1.625: 'leading-relaxed',
  },
  'list-style': {
    none: 'list-none',
  },
  'list-style-position': {
    inside: 'list-inside',
    outside: 'list-outside',
  },
  'list-style-type': {
    decimal: 'list-decimal',
    disc: 'list-disc',
    none: 'list-none',
  },
  margin: {
    0: 'm-0',
    '0.125rem': 'm-0.5',
    '0.25rem': 'm-1',
    '0.375rem': 'm-1.5',
    '0.5rem': 'm-2',
    '0.625rem': 'm-2.5',
    '0.75rem': 'm-3',
    '0.875rem': 'm-3.5',
    '0px': 'm-0',
    '1.25rem': 'm-5',
    '1.5rem': 'm-6',
    '1.75rem': 'm-7',
    '10rem': 'm-40',
    '11rem': 'm-44',
    '12rem': 'm-48',
    '13rem': 'm-52',
    '14rem': 'm-56',
    '15rem': 'm-60',
    '16rem': 'm-64',
    '18rem': 'm-72',
    '1px': 'm-px',
    '1rem': 'm-4',
    '2.25rem': 'm-9',
    '2.5rem': 'm-10',
    '2.75rem': 'm-11',
    '20rem': 'm-80',
    '24rem': 'm-96',
    '2rem': 'm-8',
    '3.5rem': 'm-14',
    '3rem': 'm-12',
    '4rem': 'm-16',
    '5rem': 'm-20',
    '6rem': 'm-24',
    '7rem': 'm-28',
    '8rem': 'm-32',
    '9rem': 'm-36',
  },
  'margin-bottom': {
    0: 'mb-0',
    '0.125rem': 'mb-0.5',
    '0.25rem': 'mb-1',
    '0.375rem': 'mb-1.5',
    '0.5rem': 'mb-2',
    '0.625rem': 'mb-2.5',
    '0.75rem': 'mb-3',
    '0.875rem': 'mb-3.5',
    '0px': 'mb-0',
    '1.25rem': 'mb-5',
    '1.5rem': 'mb-6',
    '1.75rem': 'mb-7',
    '10rem': 'mb-40',
    '11rem': 'mb-44',
    '12rem': 'mb-48',
    '13rem': 'mb-52',
    '14rem': 'mb-56',
    '15rem': 'mb-60',
    '16rem': 'mb-64',
    '18rem': 'mb-72',
    '1px': 'mb-px',
    '1rem': 'mb-4',
    '2.25rem': 'mb-9',
    '2.5rem': 'mb-10',
    '2.75rem': 'mb-11',
    '20rem': 'mb-80',
    '24rem': 'mb-96',
    '2rem': 'mb-8',
    '3.5rem': 'mb-14',
    '3rem': 'mb-12',
    '4rem': 'mb-16',
    '5rem': 'mb-20',
    '6rem': 'mb-24',
    '7rem': 'mb-28',
    '8rem': 'mb-32',
    '9rem': 'mb-36',
  },
  'margin-left': {
    0: 'ml-0',
    '0.125rem': 'ml-0.5',
    '0.25rem': 'ml-1',
    '0.375rem': 'ml-1.5',
    '0.5rem': 'ml-2',
    '0.625rem': 'ml-2.5',
    '0.75rem': 'ml-3',
    '0.875rem': 'ml-3.5',
    '0px': 'ml-0',
    '1.25rem': 'ml-5',
    '1.5rem': 'ml-6',
    '1.75rem': 'ml-7',
    '10rem': 'ml-40',
    '11rem': 'ml-44',
    '12rem': 'ml-48',
    '13rem': 'ml-52',
    '14rem': 'ml-56',
    '15rem': 'ml-60',
    '16rem': 'ml-64',
    '18rem': 'ml-72',
    '1px': 'ml-px',
    '1rem': 'ml-4',
    '2.25rem': 'ml-9',
    '2.5rem': 'ml-10',
    '2.75rem': 'ml-11',
    '20rem': 'ml-80',
    '24rem': 'ml-96',
    '2rem': 'ml-8',
    '3.5rem': 'ml-14',
    '3rem': 'ml-12',
    '4rem': 'ml-16',
    '5rem': 'ml-20',
    '6rem': 'ml-24',
    '7rem': 'ml-28',
    '8rem': 'ml-32',
    '9rem': 'ml-36',
  },
  'margin-right': {
    0: 'mr-0',
    '0.125rem': 'mr-0.5',
    '0.25rem': 'mr-1',
    '0.375rem': 'mr-1.5',
    '0.5rem': 'mr-2',
    '0.625rem': 'mr-2.5',
    '0.75rem': 'mr-3',
    '0.875rem': 'mr-3.5',
    '0px': 'mr-0',
    '1.25rem': 'mr-5',
    '1.5rem': 'mr-6',
    '1.75rem': 'mr-7',
    '10rem': 'mr-40',
    '11rem': 'mr-44',
    '12rem': 'mr-48',
    '13rem': 'mr-52',
    '14rem': 'mr-56',
    '15rem': 'mr-60',
    '16rem': 'mr-64',
    '18rem': 'mr-72',
    '1px': 'mr-px',
    '1rem': 'mr-4',
    '2.25rem': 'mr-9',
    '2.5rem': 'mr-10',
    '2.75rem': 'mr-11',
    '20rem': 'mr-80',
    '24rem': 'mr-96',
    '2rem': 'mr-8',
    '3.5rem': 'mr-14',
    '3rem': 'mr-12',
    '4rem': 'mr-16',
    '5rem': 'mr-20',
    '6rem': 'mr-24',
    '7rem': 'mr-28',
    '8rem': 'mr-32',
    '9rem': 'mr-36',
  },
  'margin-top': {
    0: 'mt-0',
    '0.125rem': 'mt-0.5',
    '0.25rem': 'mt-1',
    '0.375rem': 'mt-1.5',
    '0.5rem': 'mt-2',
    '0.625rem': 'mt-2.5',
    '0.75rem': 'mt-3',
    '0.875rem': 'mt-3.5',
    '0px': 'mt-0',
    '1.25rem': 'mt-5',
    '1.5rem': 'mt-6',
    '1.75rem': 'mt-7',
    '10rem': 'mt-40',
    '11rem': 'mt-44',
    '12rem': 'mt-48',
    '13rem': 'mt-52',
    '14rem': 'mt-56',
    '15rem': 'mt-60',
    '16rem': 'mt-64',
    '18rem': 'mt-72',
    '1px': 'mt-px',
    '1rem': 'mt-4',
    '2.25rem': 'mt-9',
    '2.5rem': 'mt-10',
    '2.75rem': 'mt-11',
    '20rem': 'mt-80',
    '24rem': 'mt-96',
    '2rem': 'mt-8',
    '3.5rem': 'mt-14',
    '3rem': 'mt-12',
    '4rem': 'mt-16',
    '5rem': 'mt-20',
    '6rem': 'mt-24',
    '7rem': 'mt-28',
    '8rem': 'mt-32',
    '9rem': 'mt-36',
  },
  'max-height': {
    '0px': 'max-h-0',
    '100%': 'max-h-full',
    '100vh': 'max-h-screen',
  },
  'max-width': {
    '0rem': 'max-w-0',
    '100%': 'max-w-full',
    '1024px': 'max-w-screen-lg',
    '1280px': 'max-w-screen-xl',
    '1536px': 'max-w-screen-2xl',
    '20rem': 'max-w-xs',
    '24rem': 'max-w-sm',
    '28rem': 'max-w-md',
    '32rem': 'max-w-lg',
    '36rem': 'max-w-xl',
    '42rem': 'max-w-2xl',
    '48rem': 'max-w-3xl',
    '56rem': 'max-w-4xl',
    '640px': 'max-w-screen-sm',
    '64rem': 'max-w-5xl',
    '65ch': 'max-w-prose',
    '72rem': 'max-w-6xl',
    '768px': 'max-w-screen-md',
    '80rem': 'max-w-7xl',
    'max-content': 'max-w-max',
    'min-content': 'max-w-min',
    none: 'max-w-none',
  },
  'min-height': {
    '0px': 'min-h-0',
    '100%': 'min-h-full',
    '100vh': 'min-h-screen',
  },
  'min-width': {
    '0px': 'min-w-0',
    '100%': 'min-w-full',
    'max-content': 'min-w-max',
    'min-content': 'min-w-min',
  },
  'mix-blend-mode': {
    color: 'mix-blend-color',
    'color-burn': 'mix-blend-color-burn',
    'color-dodge': 'mix-blend-color-dodge',
    darken: 'mix-blend-darken',
    difference: 'mix-blend-difference',
    exclusion: 'mix-blend-exclusion',
    'hard-light': 'mix-blend-hard-light',
    hue: 'mix-blend-hue',
    lighten: 'mix-blend-lighten',
    luminosity: 'mix-blend-luminosity',
    multiply: 'mix-blend-multiply',
    normal: 'mix-blend-normal',
    overlay: 'mix-blend-overlay',
    saturation: 'mix-blend-saturation',
    screen: 'mix-blend-screen',
    'soft-light': 'mix-blend-soft-light',
  },
  'object-fit': {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  },
  'object-position': {
    bottom: 'object-bottom',
    center: 'object-center',
    left: 'object-left',
    'left bottom': 'object-left-bottom',
    'left top': 'object-left-top',
    right: 'object-right',
    'right bottom': 'object-right-bottom',
    'right top': 'object-right-top',
    top: 'object-top',
  },
  opacity: {
    0: 'opacity-0',
    1: 'opacity-100',
    0.05: 'opacity-5',
    0.1: 'opacity-10',
    0.2: 'opacity-20',
    0.25: 'opacity-25',
    0.3: 'opacity-30',
    0.4: 'opacity-40',
    0.5: 'opacity-50',
    0.6: 'opacity-60',
    0.7: 'opacity-70',
    0.75: 'opacity-75',
    0.8: 'opacity-80',
    0.9: 'opacity-90',
    0.95: 'opacity-95',
  },
  order: {
    0: 'order-none',
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
    5: 'order-5',
    6: 'order-6',
    7: 'order-7',
    8: 'order-8',
    9: 'order-9',
    10: 'order-10',
    11: 'order-11',
    12: 'order-12',
    9999: 'order-last',
    '-9999': 'order-first',
  },
  outline: {
    none: 'outline-0',
  },
  'outline-color': {},
  'outline-offset': {
    0: 'outline-offset-0',
    '-1px': 'outline-offset-[-1px]',
    '-2px': 'outline-offset-[-2px]',
    '-4px': 'outline-offset-[-4px]',
    '-5px': 'outline-offset-[-5px]',
    '0px': 'outline-offset-0',
    '1px': 'outline-offset-1',
    '2px': 'outline-offset-2',
    '3px': 'outline-offset-[3px]',
    '4px': 'outline-offset-4',
    '5px': 'outline-offset-[5px]',
    '6px': 'outline-offset-[6px]',
    '8px': 'outline-offset-8',
    '9px': 'outline-offset-[9px]',
  },
  'outline-style': {},
  'outline-width': {},
  overflow: {
    auto: 'overflow-auto',
    hidden: 'overflow-hidden',
    scroll: 'overflow-scroll',
    visible: 'overflow-visible',
  },
  'overflow-anchor': {},
  'overflow-wrap': {
    'break-word': 'break-words',
  },
  'overflow-x': {
    auto: 'overflow-x-auto',
    hidden: 'overflow-x-hidden',
    scroll: 'overflow-x-scroll',
    visible: 'overflow-x-visible',
  },
  'overflow-y': {
    auto: 'overflow-y-auto',
    hidden: 'overflow-y-hidden',
    scroll: 'overflow-y-scroll',
    visible: 'overflow-y-visible',
  },
  'overscroll-behavior': {
    auto: 'overscroll-auto',
    contain: 'overscroll-contain',
    none: 'overscroll-none',
  },
  'overscroll-behavior-x': {
    auto: 'overscroll-x-auto',
    contain: 'overscroll-x-contain',
    none: 'overscroll-x-none',
  },
  'overscroll-behaviory': {
    auto: 'overscroll-y-auto',
    contain: 'overscroll-y-contain',
    none: 'overscroll-y-none',
  },
  padding: {
    0: 'p-0',
    '0.125rem': 'p-0.5',
    '0.25rem': 'p-1',
    '0.375rem': 'p-1.5',
    '0.5rem': 'p-2',
    '0.625rem': 'p-2.5',
    '0.75rem': 'p-3',
    '0.875rem': 'p-3.5',
    '0px': 'p-0',
    '1.25rem': 'p-5',
    '1.5rem': 'p-6',
    '1.75rem': 'p-7',
    '10rem': 'p-40',
    '11rem': 'p-44',
    '12rem': 'p-48',
    '13rem': 'p-52',
    '14rem': 'p-56',
    '15rem': 'p-60',
    '16rem': 'p-64',
    '18rem': 'p-72',
    '1px': 'p-px',
    '1rem': 'p-4',
    '2.25rem': 'p-9',
    '2.5rem': 'p-10',
    '2.75rem': 'p-11',
    '20rem': 'p-80',
    '24rem': 'p-96',
    '2rem': 'p-8',
    '3.5rem': 'p-14',
    '3rem': 'p-12',
    '4rem': 'p-16',
    '5rem': 'p-20',
    '6rem': 'p-24',
    '7rem': 'p-28',
    '8rem': 'p-32',
    '9rem': 'p-36',
  },
  'padding-bottom': {
    0: 'pb-0',
    '0.125rem': 'pb-0.5',
    '0.25rem': 'pb-1',
    '0.375rem': 'pb-1.5',
    '0.5rem': 'pb-2',
    '0.625rem': 'pb-2.5',
    '0.75rem': 'pb-3',
    '0.875rem': 'pb-3.5',
    '0px': 'pb-0',
    '1.25rem': 'pb-5',
    '1.5rem': 'pb-6',
    '1.75rem': 'pb-7',
    '10rem': 'pb-40',
    '11rem': 'pb-44',
    '12rem': 'pb-48',
    '13rem': 'pb-52',
    '14rem': 'pb-56',
    '15rem': 'pb-60',
    '16rem': 'pb-64',
    '18rem': 'pb-72',
    '1px': 'pb-px',
    '1rem': 'pb-4',
    '2.25rem': 'pb-9',
    '2.5rem': 'pb-10',
    '2.75rem': 'pb-11',
    '20rem': 'pb-80',
    '24rem': 'pb-96',
    '2rem': 'pb-8',
    '3.5rem': 'pb-14',
    '3rem': 'pb-12',
    '4rem': 'pb-16',
    '5rem': 'pb-20',
    '6rem': 'pb-24',
    '7rem': 'pb-28',
    '8rem': 'pb-32',
    '9rem': 'pb-36',
  },
  'padding-left': {
    0: 'pl-0',
    '0.125rem': 'pl-0.5',
    '0.25rem': 'pl-1',
    '0.375rem': 'pl-1.5',
    '0.5rem': 'pl-2',
    '0.625rem': 'pl-2.5',
    '0.75rem': 'pl-3',
    '0.875rem': 'pl-3.5',
    '0px': 'pl-0',
    '1.25rem': 'pl-5',
    '1.5rem': 'pl-6',
    '1.75rem': 'pl-7',
    '10rem': 'pl-40',
    '11rem': 'pl-44',
    '12rem': 'pl-48',
    '13rem': 'pl-52',
    '14rem': 'pl-56',
    '15rem': 'pl-60',
    '16rem': 'pl-64',
    '18rem': 'pl-72',
    '1px': 'pl-px',
    '1rem': 'pl-4',
    '2.25rem': 'pl-9',
    '2.5rem': 'pl-10',
    '2.75rem': 'pl-11',
    '20rem': 'pl-80',
    '24rem': 'pl-96',
    '2rem': 'pl-8',
    '3.5rem': 'pl-14',
    '3rem': 'pl-12',
    '4rem': 'pl-16',
    '5rem': 'pl-20',
    '6rem': 'pl-24',
    '7rem': 'pl-28',
    '8rem': 'pl-32',
    '9rem': 'pl-36',
  },
  'padding-right': {
    0: 'pr-0',
    '0.125rem': 'pr-0.5',
    '0.25rem': 'pr-1',
    '0.375rem': 'pr-1.5',
    '0.5rem': 'pr-2',
    '0.625rem': 'pr-2.5',
    '0.75rem': 'pr-3',
    '0.875rem': 'pr-3.5',
    '0px': 'pr-0',
    '1.25rem': 'pr-5',
    '1.5rem': 'pr-6',
    '1.75rem': 'pr-7',
    '10rem': 'pr-40',
    '11rem': 'pr-44',
    '12rem': 'pr-48',
    '13rem': 'pr-52',
    '14rem': 'pr-56',
    '15rem': 'pr-60',
    '16rem': 'pr-64',
    '18rem': 'pr-72',
    '1px': 'pr-px',
    '1rem': 'pr-4',
    '2.25rem': 'pr-9',
    '2.5rem': 'pr-10',
    '2.75rem': 'pr-11',
    '20rem': 'pr-80',
    '24rem': 'pr-96',
    '2rem': 'pr-8',
    '3.5rem': 'pr-14',
    '3rem': 'pr-12',
    '4rem': 'pr-16',
    '5rem': 'pr-20',
    '6rem': 'pr-24',
    '7rem': 'pr-28',
    '8rem': 'pr-32',
    '9rem': 'pr-36',
  },
  'padding-top': {
    0: 'pt-0',
    '0.125rem': 'pt-0.5',
    '0.25rem': 'pt-1',
    '0.375rem': 'pt-1.5',
    '0.5rem': 'pt-2',
    '0.625rem': 'pt-2.5',
    '0.75rem': 'pt-3',
    '0.875rem': 'pt-3.5',
    '0px': 'pt-0',
    '1.25rem': 'pt-5',
    '1.5rem': 'pt-6',
    '1.75rem': 'pt-7',
    '10rem': 'pt-40',
    '11rem': 'pt-44',
    '12rem': 'pt-48',
    '13rem': 'pt-52',
    '14rem': 'pt-56',
    '15rem': 'pt-60',
    '16rem': 'pt-64',
    '18rem': 'pt-72',
    '1px': 'pt-px',
    '1rem': 'pt-4',
    '2.25rem': 'pt-9',
    '2.5rem': 'pt-10',
    '2.75rem': 'pt-11',
    '20rem': 'pt-80',
    '24rem': 'pt-96',
    '2rem': 'pt-8',
    '3.5rem': 'pt-14',
    '3rem': 'pt-12',
    '4rem': 'pt-16',
    '5rem': 'pt-20',
    '6rem': 'pt-24',
    '7rem': 'pt-28',
    '8rem': 'pt-32',
    '9rem': 'pt-36',
  },
  'place-content': {
    center: 'place-content-center',
    end: 'place-content-end',
    'space-around': 'place-content-around',
    'space-between': 'place-content-between',
    'space-evenly': 'place-content-evenly',
    start: 'place-content-start',
    stretch: 'place-content-stretch',
  },
  'place-items': {
    center: 'place-items-center',
    end: 'place-items-end',
    start: 'place-items-start',
    stretch: 'place-items-stretch',
  },
  'place-self': {
    auto: 'place-self-auto',
    center: 'place-self-center',
    end: 'place-self-end',
    start: 'place-self-start',
    stretch: 'place-self-stretch',
  },
  'pointer-events': {
    auto: 'pointer-events-auto',
    none: 'pointer-events-none',
  },
  position: {
    absolute: 'absolute',
    fixed: 'fixed',
    relative: 'relative',
    static: 'static',
    sticky: 'sticky',
  },
  resize: {
    both: 'resize',
    horizontal: 'resize-x',
    none: 'resize-none',
    vertical: 'resize-y',
  },
  right: {
    0: 'right-0',
    '0px': 'right-0',
    '100%': 'right-full',
    '50%': 'right-1/2',
  },
  'row-gap': {},
  'scroll-behavior': {},
  'scroll-margin-top': {},
  'scrollbar-color': {},
  'scrollbar-width': {},
  stroke: {
    currentColor: 'stroke-current',
  },
  'stroke-dasharray': {},
  'stroke-dashoffset': {},
  'stroke-linecap': {},
  'stroke-width': {
    0: 'stroke-0',
    1: 'stroke-1',
    2: 'stroke-2',
  },
  'table-layout': {
    auto: 'table-auto',
    fixed: 'table-fixed',
  },
  'text-align': {
    center: 'text-center',
    justify: 'text-justify',
    left: 'text-left',
    right: 'text-right',
  },
  'text-decoration': {
    'line-through': 'line-through',
    none: 'no-underline',
    underline: 'underline',
  },
  'text-indent': {},
  'text-overflow': {
    clip: 'overflow-clip',
    ellipsis: 'overflow-ellipsis',
  },
  'text-rendering': {},
  'text-shadow': {},
  'text-transform': {
    capitalize: 'capitalize',
    lowercase: 'lowercase',
    none: 'normal-case',
    uppercase: 'uppercase',
  },
  top: {
    0: 'top-0',
    '0px': 'top-0',
    '100%': 'top-full',
    '50%': 'top-1/2',
  },
  'touch-action': {
    manipulation: 'touch-manipulation',
  },
  transform: {
    'scale(.5)': 'scale-50',
    'scale(.75)': 'scale-75',
    'scale(.9)': 'scale-90',
    'scale(.95)': 'scale-95',
    'scale(0)': 'scale-0',
    'scale(1.05)': 'scale-105',
    'scale(1.1)': 'scale-110',
    'scale(1.25)': 'scale-125',
    'scale(1.5)': 'scale-150',
    'scale(1)': 'scale-100',
    'scaleX(.5)': 'scale-x-50',
    'scaleX(.75)': 'scale-x-75',
    'scaleX(.9)': 'scale-x-90',
    'scaleX(.95)': 'scale-x-95',
    'scaleX(0)': 'scale-x-0',
    'scaleX(1.05)': 'scale-x-105',
    'scaleX(1.1)': 'scale-x-110',
    'scaleX(1.25)': 'scale-x-125',
    'scaleX(1.5)': 'scale-x-150',
    'scaleX(1)': 'scale-x-100',
    'scaleY(.5)': 'scale-y-50',
    'scaleY(.75)': 'scale-y-75',
    'scaleY(.9)': 'scale-y-90',
    'scaleY(.95)': 'scale-y-95',
    'scaleY(0)': 'scale-y-0',
    'scaleY(1.05)': 'scale-y-105',
    'scaleY(1.1)': 'scale-y-110',
    'scaleY(1.25)': 'scale-y-125',
    'scaleY(1.5)': 'scale-y-150',
    'scaleY(1)': 'scale-y-100',
  },
  'transform-origin': {
    bottom: 'origin-bottom',
    'bottom left': 'origin-bottom-left',
    'bottom right': 'origin-bottom-right',
    center: 'origin-center',
    left: 'origin-left',
    right: 'origin-right',
    top: 'origin-top',
    'top left': 'origin-top-left',
    'top right': 'origin-top-right',
  },
  'transform-style': {},
  transition: {
    none: 'transition-none',
  },
  'transition-delay': {},
  'transition-duration': {},
  'transition-property': {},
  'transition-timing-function': {},
  'user-select': {
    all: 'select-all',
    auto: 'select-auto',
    none: 'select-none',
    text: 'select-text',
  },
  'vertical-align': {
    baseline: 'align-baseline',
    bottom: 'align-bottom',
    middle: 'align-middle',
    'text-bottom': 'align-text-bottom',
    'text-top': 'align-text-top',
    top: 'align-top',
  },
  visibility: {
    hidden: 'invisible',
    visible: 'visible',
  },
  'white-space': {
    normal: 'whitespace-normal',
    nowrap: 'whitespace-nowrap',
    pre: 'whitespace-pre',
    'pre-line': 'whitespace-pre-line',
    'pre-wrap': 'whitespace-pre-wrap',
  },
  width: {
    0: 'w-0',
    '0px': 'w-0',
    '100%': 'w-full',
    '100vw': 'w-screen',
    '25%': 'w-1/4',
    '33.333333%': 'w-1/3',
    '50%': 'w-1/2',
    '66.666667%': 'w-2/3',
    '75%': 'w-3/4',
    auto: 'w-auto',
    'max-content': 'w-max',
    'min-content': 'w-min',
  },
  'word-break': {
    'break-all': 'break-all',
  },
  'z-index': {
    0: 'z-0',
    10: 'z-10',
    20: 'z-20',
    30: 'z-30',
    40: 'z-40',
    50: 'z-50',
    auto: 'z-auto',
  },
};

module.exports = TAILWIND_CLASSES;
