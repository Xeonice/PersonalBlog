import * as React from "react"
import styled from '@emotion/styled';
import { ElementProps } from '.';

const Element = styled.span<ElementProps>`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props =>
    props.color ? props.theme.colors[props.color][props.tint] : undefined};
`

const TextSmall: React.FunctionComponent<ElementProps> = ({
  children,
  element,
  color,
  tint = "default",
  ...props
}) => (
  <Element as={element || "span"} color={color} tint={tint} {...props}>
    {children}
  </Element>
)

export default TextSmall
