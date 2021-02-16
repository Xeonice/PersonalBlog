import * as React from "react"
import styled from '@emotion/styled';
import TextBody from "./TextBody"
import { ElementProps } from "."

const Element = styled(TextBody)<ElementProps>`
  font-weight: ${props => props.theme.fontWeight["regular"]};
  line-height: 2.2;
  color: ${props =>
    props.color
      ? props.theme.colors[props.color][props.tint]
      : props.theme.colors.silver.default};
  margin-top: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[6]};
`

const Paragraph: React.FunctionComponent<ElementProps> = ({ children, color, tint = "default", ...props }) => (
  <Element as="p" color={color} tint={tint} {...props}>
    {children}
  </Element>
)

export default Paragraph
