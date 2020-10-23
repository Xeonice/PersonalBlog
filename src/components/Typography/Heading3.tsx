import * as React from "react"
import styled from '@emotion/styled';
import { ElementProps } from '.';

const Element = styled.h3<ElementProps>`
  font-size: ${props => props.theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.45;
  color: ${props =>
    props.color
      ? props.theme.colors[props.color][props.tint]
      : props.theme.colors.white.default};
  margin-top: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[6]};
`

const Heading3: React.FunctionComponent<ElementProps> = ({ children, element, color, tint = "default", ...props }) => (
  <Element as={element || "h3"} color={color} tint={tint} {...props}>
    {children}
  </Element>
)

export default Heading3
