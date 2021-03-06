import * as React from "react"
import styled from '@emotion/styled';
import { ElementProps } from '.';

const Element = styled.h1<ElementProps>`
  font-size: ${props => props.theme.fontSize["3xl"]};
  font-weight: ${props => props.theme.fontWeight["black"]};
  line-height: 1.1;
  margin-top: ${props => props.theme.spacing[16]};
  margin-bottom: ${props => props.theme.spacing[8]};
  color: ${props =>
    props.color
      ? props.theme.colors[props.color][props.tint]
      : props.theme.colors.white.default};
`


const Heading1: React.FunctionComponent<ElementProps> = ({ children, element, color, tint = "default", ...props }) => (
  <Element as={element || "h1"} color={color} tint={tint} {...props}>
    {children}
  </Element>
)

export default Heading1
