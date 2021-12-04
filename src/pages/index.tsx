/** @jsxImportSource theme-ui */
import { ThemeProvider } from "theme-ui"
import theme from "../gatsby-plugin-theme-ui"
import * as React from "react"
import styled from "@emotion/styled"
import Typewriter from "typewriter-effect"

import Layout from "../components/Layout"
import { ElementProps } from "../components/Typography"
import OverviewInfo from "../components/OverviewInfo"

const Introduction = styled.h1<ElementProps>`
  color: ${(props) => props.theme.colors.black.default};
  font-family: ${(props) => props.theme.fontFamily.default};
  font-size: ${(props) => props.theme.fontSize["4xl"]};
  font-weight: 900;
  line-height: 1.333333;
  overflow-wrap: break-word;
  max-width: 640px;

  @media (max-width: 375px) {
    font-size: ${(props) => props.theme.fontSize["3xl"]};
  }
`

const IndexPage: React.FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <section className="flex flex-col flex-3 text-gray-50">
        <h1 className="font-serif font-black leading-snug text-black text-4xl max-w-screen-sm">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  "Hello，欢迎来到 Douglas 的自留地，一个持续奋斗在搬砖路上的 Web 开发"
                )
                .callFunction(() => {
                  console.log("String typed out!")
                })
                .start()
            }}
          />
        </h1>
        <OverviewInfo />
      </section>
    </Layout>
  </ThemeProvider>
)

export default IndexPage
