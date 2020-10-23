// const accent = {
//   light: '#6166DC',
//   dark: '#E9DAAC',
// };
// const background = {
//   light: '#fefefe',
//   dark: 'rgba(17, 18, 22, 0.95)',
// };

interface ColorType {
  black,
  silver,
  white,
  blue,
  cyan,
}

export interface ThemeColorType extends ColorType {
  modes: {
    dark: ColorType
  }
}

enum black {
  lightest = "#bababa",
  lighter = "#d5d5d5",
  light = "#e9e9e9",
  default = "#eee",
}

enum silver {
  default = "#787878",
  darker = "#989898",
  darkest = "#555",
}

enum white {
  default = "#111",
  darker = "#0A0A0A",
}

enum blue {
  default = 'rgb(51, 51, 51)',
}

enum cyan {
  default = '#2BB6C9',
}

const color: ThemeColorType =  {
  // Set the initial color mode to dark when @media (prefers-color-scheme: dark) matches
  black,
  silver,
  white,
  blue,
  cyan,

  modes: {
    dark: {
      black,
      silver,
      blue,
      white,
      cyan,
    },
  },
};

export default color;
