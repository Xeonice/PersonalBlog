import React from "react"
import { TransitionState } from 'gatsby-plugin-transition-link';
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SayHi from "../components/SayHi"
import Link from "../components/Link"
import { Box } from "../components/Box"
import { Paragraph, Heading2 } from "../components/Typography"
import AnimeContainer from "../components/AnimeContainer"

const Work = ({ data }) => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout>
          <Box maxWidth="640px" marginTop={32} element="section">
            <SEO title="Work" />
            <AnimeContainer toggle={transitionStatus === 'entered'}>
              <Paragraph>
                我目前供职于一家专注于服务中小型企业的公司，县目前于公司中台体系负责一些前端基建的相关工作，最终目标在于能够利用公司庞大的后端资源实现更为快捷的交付。当然我也在 Github 上有那么一部分产出，如果感兴趣的话，可以读一读我的
                {" "}
                <Link color="white" href="https://github.com/Xeonice" underlined>
                  Github 个人帐号
                </Link>
                {" "}。
              </Paragraph>
              <Box marginTop={32} element="section">
                <Heading2>DataSet 教程</Heading2>
                <Paragraph>
                  当前这个项目，是为了改良我司正在使用的 Choerodon-ui 体系的相关文档。当前的文档存在各种各样的潜在问题，让交付人员无法轻松快捷的迅速上手整个项目。
                </Paragraph>
                <Paragraph>
                  因此，我正在致力于改善开发过程中被忽视的这一点，主要入手方向在于自定义 IDE 和更有好的交互文档，目前已经完成了针对 vscode 的插件。
                </Paragraph>
                <Paragraph>
                  感兴趣的话，可以了解以下我们正在使用的这套{" "}
                  <Link color="white" underlined href="https://choerodon.github.io/choerodon-ui/index-cn">
                    Choerodon-ui
                  </Link>
                  {" "} 体系。
                </Paragraph>
              </Box>
              <Box element="section" marginTop={32} marginBottom={32}>
                <SayHi />
              </Box>
            </AnimeContainer>
          </Box>
        </Layout>
      )}
    </TransitionState>
  )
}

export const query = graphql`
  query {
    rdd: file(relativePath: { eq: "talks/readme-driven-development.pdf" }) {
      publicURL
    }
    rddUk: file(
      relativePath: { eq: "talks/readme-driven-development-phpuk.pdf" }
    ) {
      publicURL
    }
  }
`

export default Work
