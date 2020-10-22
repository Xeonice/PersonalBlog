import * as React from "react"
import styled from '@emotion/styled';

import { Box } from "../Box"

const OrderedListWrapper = styled(Box)`
  list-style-position: outside;
  list-style-image: none;
  list-style: disc;

  > li:not(:last-child) {
    margin: 0 0 ${props => props.theme.spacing[4]} 0;
  }
  > li {
    font-size: ${props => props.theme.fontSize.base};
    line-height: 1.7;
    color: ${props => props.theme.colors.silver.darker};
  }

  p {
    margin: 0;
    font-size: ${props => props.theme.fontSize.base};
    line-height: 1.45;
    color: ${props => props.theme.colors.silver.darker};
  }
`

const OrderedList = ({ children, ...props }) => (
  <OrderedListWrapper
    element="ul"
    marginTop={8}
    marginBottom={8}
    padding={6}
    paddingLeft={10}
    textColor="silver"
    textTint="darker"
    fontSize="sm"
    {...props}
  >
    {children}
  </OrderedListWrapper>
)

export default OrderedList
