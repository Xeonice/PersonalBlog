import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SayHi from "../components/SayHi"
import Link from "../components/Link"
import { Box } from "../components/Box"
import { Paragraph, Heading2 } from "../components/Typography"

const Work = ({ data }) => {
  return (
    <Layout>
      <Box maxWidth="640px" marginTop={32} element="section">
        <SEO title="Work" />
        <Paragraph>
          我目前供職於一家專注於服務中小型企業的公司，縣目前於公司中台體系負責一些前端基建的相關工作，最終目標在於能夠利用公司龐大的後端資源實現更為快捷的交付。當然我也在 Github 上有那麼一部分產出，如果感興趣的話，可以讀一讀我的
          {" "}
          <Link color="white" href="https://github.com/rathesDot" underlined>
            Github 個人賬號
          </Link>
          {" "}。
        </Paragraph>
        <Box marginTop={32} element="section">
          <Heading2>DataSet 教程</Heading2>
          <Paragraph>
            當前這個項目，是為了改良我司正在使用的 Choerodon-ui 體系的相關文檔。當前的文檔存在各種各樣的潛在問題，讓交付人員無法輕鬆快捷的迅速上手整個項目。
          </Paragraph>
          <Paragraph>
            因此，我正在致力於書寫一份針對 DataSet 的交互文檔，使新人在接觸這一文檔體系時能夠擁有更加平滑的學習曲線。在這一文檔完成後，我會將其放在個人隨筆中。
          </Paragraph>
          <Paragraph>
            感興趣的話，可以了解以下我們正在使用的這套{" "}
            <Link color="white" underlined href="https://choerodon.github.io/choerodon-ui/index-cn">
              Choerodon-ui
            </Link>
            {" "} 體系。
          </Paragraph>
        </Box>
        <Box element="section" marginTop={32} marginBottom={32}>
          <SayHi />
        </Box>
      </Box>
    </Layout>
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
