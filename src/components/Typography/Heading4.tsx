import * as React from "react";
import styled from '@emotion/styled';
import { ElementProps } from ".";

const Element = styled.h4<ElementProps>`
  font-size: ${props => props.theme.fontSize.xs};
  font-weight: ${props => props.theme.fontWeight["regular"]};
  line-height: 2.5;
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.letterSpacing.widest};
  props.color: ${props =>
    props.color
      ? props.theme.colors[props.color][props.tint]
      : props.theme.colors.white.default};
`

const Heading4: React.FunctionComponent<ElementProps>= ({ children, element, color, tint = "default", ...props }) => (
  <Element as={element || "h4"} color={color} tint={tint} {...props}>
    {children}
  </Element>
)

export default Heading4
