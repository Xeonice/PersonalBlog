import * as React from "react"
import styled from '@emotion/styled';
import { ElementProps } from '.';

const Element = styled.span<ElementProps>`
  font-size: ${props => props.theme.fontSize.base};
  color: ${props =>
    props.color ? props.theme.colors[props.color][props.tint] : undefined};
`

const TextBody: React.FunctionComponent<ElementProps> = ({ children, element, color, tint = "default", ...props }) => {
  return (
    <Element as={element || "span"} color={color} tint={tint} {...props}>
      {children}
    </Element>
  )
}

export default TextBody
