/** @jsx jsx */
import * as React from 'react';
import { ReactElement, useEffect } from "react"
import * as PropTypes from "prop-types";
import { useColorMode, jsx } from 'theme-ui';
import { Global } from '@emotion/core';
import styled from "@emotion/styled"

import Navigation from "../Navigation"
import Footer from "../Footer"
import { Box } from "../Box"

import globalStyles from "./global"

const MainContainer = styled(Box)`
  padding: 40px ${(props) => props.theme.spacing["4"]};

  @media (min-width: 768px) {
    padding: 60px 32px;
  }

  @media (min-width: 1200px) {
    padding: 110px 32px;
  }
`

const Layout: React.FunctionComponent = ({ children }) => {
  const [colorMode] = useColorMode();
  const isDark = colorMode === `dark`;

  useEffect(() => {
    window.parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  return typeof isDark === 'boolean' && (
    <React.Fragment>
      <Global styles={globalStyles} />
      <MainContainer
        sx={{
          bg: theme => theme.colors.black.default,
          transition: theme => theme.colorModeTransition,
        }}
        display="flex"
        element="main"
        flexDirection="column"
        fontFamily="default"
        justifyContent="space-between"
        minHeight="100vh"
        textColor="silver"
      >
        <Navigation />
        {children}
        <Footer />
      </MainContainer>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
