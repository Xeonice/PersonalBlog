import * as React from 'react';
import styled from '@emotion/styled';

import { BoxProps, ElementProps } from './index';

const Element = styled.div<ElementProps>`
  ${props =>
    props.fontFamily
      ? `font-family: ${props.theme.fontFamily[props.fontFamily]};`
      : undefined};
  ${props =>
    props.fontSize
      ? `font-size: ${props.theme.fontSize[props.fontSize]};`
      : undefined}
  ${props =>
    props.fontWeight ? `font-weight: ${props.theme.fontWeight[props.fontWeight]};` : undefined}
  ${props =>
    props.lineHeight ? `line-Height: ${props.lineHeight};` : undefined}
  ${props =>
    props.textColor
      ? `color: ${props.theme.colors[props.textColor][props.textTint]};`
      : undefined}
  display: ${props =>
    props.displayElement ? `${props.displayElement};` : undefined};
  margin-bottom: ${props => props.theme.spacing[props.marginBottom]};
  margin-top: ${props => props.theme.spacing[props.marginTop]};
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth}` : undefined)};
  ${props => (props.minHeight ? `min-height: ${props.minHeight}` : undefined)};
  padding: ${props => props.theme.spacing[props.padding]};
  padding-left: ${props => props.theme.spacing[props.paddingLeft]};
  ${props =>
    props.flexDirection ? `flex-direction: ${props.flexDirection}` : undefined};
  ${props =>
    props.justifyContent
      ? `justify-content: ${props.justifyContent}`
      : undefined};
  ${props =>
    props.alignItems ? `align-items: ${props.alignItems}` : undefined};
  ${props =>
    props.flex ? `flex: ${props.flex}` : undefined}; 
`

const Box: React.FunctionComponent<BoxProps<string>> = ({
  alignItems,
  backgroundTint = "default",
  children,
  display = "block",
  element,
  fontFamily,
  fontSize,
  fontWeight,
  flexDirection,
  justifyContent,
  lineHeight,
  marginTop,
  marginBottom,
  maxWidth,
  minHeight,
  padding,
  paddingLeft,
  textColor,
  textTint = "default",
  flex,
  ...props
}) => {
  return (
    <Element
      as={element || "div"}
      alignItems={alignItems}
      backgroundTint={backgroundTint}
      displayElement={display}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      flex={flex}
      lineHeight={lineHeight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      maxWidth={maxWidth}
      minHeight={minHeight}
      padding={padding}
      paddingLeft={paddingLeft}
      textColor={textColor}
      textTint={textTint}
      {...props}
    >
      {children}
    </Element>
  )
}

export default Box
