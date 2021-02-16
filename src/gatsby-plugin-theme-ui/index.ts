import colors from './colors';
import { ThemeColorType } from './colors';

export interface Theme {
  colorModeTransition: string,
  useCustomProperties: boolean,
  initialColorMode: "dark" | "light",
  colors: ThemeColorType,
  fontFamily: {
    default: string,
    mono: string,
  },
  fontSize: {
    [propsName: string]: string,
  },
  fontWeight: {
    [propsName: string]: string,
  },
  letterSpacing: {
    [propsName: string]: string,
  },
  spacing: {
    [propsName: string]: string,
  },
  breakpoints: string[],
};

export const breakpointMap = {
  phone_small: 320,
  phone: 376,
  phablet: 540,
  tablet: 1024,
  desktop: 1070,
  desktop_medium: 1280,
  desktop_large: 1440,
} as const;

export const breakpoints = Object.entries(breakpointMap).map(([key, value]) => [
  key,
  value,
]);

const colorModeTransition =
  'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

const theme: Theme = {
  colorModeTransition,
  useCustomProperties: true,
  initialColorMode: "dark",
  colors,
  fontFamily: {
    default: [
      "Noto Serif SC",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Noto Sans"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(","),
    mono: [
      "Menlo",
      "Monaco",
      "Consolas",
      '"Liberation Mono"',
      '"Courier New"',
      "monospace",
    ].join(","),
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    "semi-bold": "600",
    bold: "700",
    black: "900",
  },
  letterSpacing: {
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  spacing: {
    px: "1px",
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",
  },
  breakpoints: breakpoints.map(b => `${b[1]}px`),
}

export default theme;
