import React, { useState } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"

import Navigation from "../Navigation"
import Footer from "../Footer"
import { Box } from "../Box"

import Global from "./global"
import theme from "../../../theme"
import ThemeButton from "../ThemeButton"

const MainContainer = styled(Box)`
  padding: 40px ${props => props.theme.spacing["4"]};

  @media (min-width: 768px) {
    padding: 60px 0 32px 60px;
  }

  @media (min-width: 1200px) {
    padding: 110px 0 32px 110px;
  }
`

const Layout = ({ children }) => {
  debugger;
  const [isDark, setIsDark] = useState(localStorage.getItem('darkMode') === 'true');
  // 如果非暗色模式的话，对其进行反色处理
  const lightModeTheme = isDark ? {} : {
    colors: {
      black: {
        lightest: "#bababa",
        lighter: "#d5d5d5",
        light: "#e9e9e9",
        default: "#fff",
      },
      silver: {
        default: "#787878",
        darker: "#989898",
        darkest: "#555",
      },
      white: {
        default: "#111",
      },
    },
  }
  return (
    <ThemeProvider theme={{
      ...theme,
      ...lightModeTheme,
    }}>
      <Global />
      <MainContainer
        backgroundColor="black"
        display="flex"
        element="main"
        flexDirection="column"
        fontFamily="default"
        justifyContent="space-between"
        minHeight="100vh"
        textColor="silver"
      >
        <ThemeButton
          onChange={setIsDark}
        />
        <Navigation />
        {children}
        <Footer />
      </MainContainer>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
