import React from "react"

import { Box } from "../Box"
import styled from '@emotion/styled';

const QuoteContainer = styled(Box)`
  position: relative;
  width: 100%;
  p {
    color: ${props => props.theme.colors.cyan.default};
    font-size: ${props => props.theme.fontSize["lg"]};
    line-height: 1.8;
    overflow-wrap: break-word;
  }
  &:after {
    content: "\\201D";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 18px;
    height: 34px;
    text-indent: -9999px;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAzNCI+CiAgPHBhdGggZmlsbD0iIzk1REFFNCIgZD0iTTEwOTEsODI2IEwxMTA5LDgyNiBMMTEwOSw3OTIgQzExMDksNzkyIDExMDYuMDA2NjcsNzkyLjAwMzAwMSAxMTA2LDc5MiBDMTEwNi4wMDY2Nyw3OTIuMDAzMDAxIDExMDYuMDA2NjcsODIzLjAwOTM4NCAxMTA2LDgyMyBDMTEwNi4wMDY2Nyw4MjMuMDA5Mzg0IDEwOTEsODIzLjAwOTM4NCAxMDkxLDgyMyBDMTA5MSw4MjMuMDA5Mzg0IDEwOTEuMDA2LDgyNiAxMDkxLDgyNiBMMTA5MSw4MjYgWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwOTEgLTc5MikiLz4KPC9zdmc+Cg==) no-repeat;
  }
`

const Quote = ({ children }) => (
  <QuoteContainer
    element="blockquote"
    marginTop={8}
    marginBottom={6}
    padding={4}
    textColor="cyan"
  >
    {children}
  </QuoteContainer>
)

export default Quote
