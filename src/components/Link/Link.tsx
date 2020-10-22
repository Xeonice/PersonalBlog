import * as React from "react"
import styled from '@emotion/styled';

import { LinkProps } from "./index"

const StyledLink = styled.a<LinkProps>`
  color: ${props =>
    props.color ? props.theme.colors[props.color][props.tint] : undefined};
  text-decoration: ${props => (props.underlined ? "underline" : "none")};
`

const Link: React.FunctionComponent<LinkProps> = ({
  children,
  element,
  color,
  tint = "default",
  underlined,
  ...props
}) => {
  return (
    <StyledLink
      as={element || "a"}
      color={color}
      tint={tint}
      underlined={underlined}
      {...props}
    >
      {children}
    </StyledLink>
  )
}

export default Link
