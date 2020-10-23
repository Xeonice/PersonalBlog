import Box from "./Box"
import { Theme } from "../../gatsby-plugin-theme-ui"

export interface BoxProps<ElementProps> {
  as?: string;
  sx?: object;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string | number;
  textColor?: string;
  displayElement?: string;
  textTint?: string;
  marginBottom?: string | number;
  marginTop?: string | number;
  padding?: string | number;
  paddingLeft?: string | number;
  maxWidth?: string;
  minHeight?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  backgroundTint?: string;
  backgroundColor?: string;
  flex?: string | number;
  display?: string;
  element?: ElementProps;
  children: any;
  theme?: Theme;
}

export interface ElementProps extends BoxProps<string> {
  theme: Theme;
}

export { Box }
