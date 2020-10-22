import * as React from "react"
import styled from '@emotion/styled';
import { ElementProps } from '.';

const Element = styled.code<ElementProps>`
  font-size: ${props => props.theme.fontSize["base"]};
  margin-bottom: ${props => props.theme.spacing[8]};
  background-color: ${props => props.theme.colors.black.lighter};
  color: ${props => props.theme.colors.blue.default};
`

const InlineCode = ({ children, element, color, tint = "default", ...props }) => (
  <Element as={element || "code"} color={color} tint={tint} {...props}>
    {children}
  </Element>
)

export default InlineCode
