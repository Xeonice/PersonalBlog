import React from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import OverviewInfo from "../components/OverviewInfo"
import { Box } from "../components/Box"
import AnimeLogo from "../components/AnimeLogo"

const Introduction = styled.h1`
  color: ${(props) => props.theme.colors.white.default};
  font-family: ${(props) => props.theme.fontFamily.default};
  font-size: ${(props) => props.theme.fontSize["4xl"]};
  font-weight: 600;
  line-height: 1.333333;
  overflow-wrap: break-word;
  max-width: 640px;

  @media (max-width: 375px) {
    font-size: ${(props) => props.theme.fontSize["3xl"]};
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="首页" />
    <Box
      element="section"
      display="flex"
      // flexDirection="column"
      // justifyContent="center"
      alignItems="space-between"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="space-between"
        flex={1}
      >
        <Introduction>
          Hello，歡迎來到 Douglas 的自留地，一個持續奮鬥在搬磚路上的 Web 開發
        </Introduction>
        <OverviewInfo />
      </Box>
      <AnimeLogo width={640} height={480} />
    </Box>
  </Layout>
)

export default IndexPage
