import * as React from "react"
import styled from '@emotion/styled';
import { ElementProps } from ".";

const Element = styled.h2<ElementProps>`
  font-size: ${props => props.theme.fontSize["lg"]};
  font-weight: ${props => props.theme.fontWeight["bold"]};
  line-height: 1.66666666666;
  color: ${props =>
    props.color
      ? props.theme.colors[props.color][props.tint]
      : props.theme.colors.white.default};
  margin-top: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[6]};
`

const Heading2: React.FunctionComponent<ElementProps> = ({ children, element, color, tint = "default", ...props }) => (
  <Element as={element || "h2"} color={color} tint={tint} {...props}>
    {children}
  </Element>
)

export default Heading2
