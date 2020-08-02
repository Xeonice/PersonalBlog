import styled from "styled-components"
import React from "react"
import TextSmall from '../Typography/TextSmall';

const Container = styled.span`
  background: ${props => props.theme.colors.black.lighter};
  color: ${props => props.theme.colors.silver.darkest};
  margin: ${props => props.theme.spacing[2]};
  padding: 0px;
  cursor: default;
  display: inline-block;
  height: 20px;
  line-height: 1;
  border-radius: 3px;
  overflow: initial;
`

const Content = styled(TextSmall)`
    margin-left: 4px;
    margin-right: 4px;
    max-width: 180px;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 2px 0px;
    overflow: hidden;
`;


const Tag = ({ children, element, color, ...props }) => (
  <Container as={element || "span"} color={color} {...props}>
    <Content>
      {children}
    </Content>
  </Container>
)

export default Tag;
