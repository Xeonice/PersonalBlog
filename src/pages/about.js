import React from "react"
import { Link as RouterLink } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SayHi from "../components/SayHi"

import { Heading1, Paragraph, Heading2 } from "../components/Typography"
import { Box } from "../components/Box"
import List from "../components/List/List"
import Link from "../components/Link"
import { Separator } from "../components/Separator"

const AboutMe = () => (
  <Layout>
    <SEO title="個人簡介" />
    <Box maxWidth="640px" marginTop={32}>
      <Heading1>/ˈdəgləs/</Heading1>
      <Paragraph>
        我是 Douglas，一個目前工作與生活在上海的 Web 開發，雖然立足於前端崗位，但我的個人視野從不局限於前端，同樣也會聚焦於後端 / Devops / 抑或是產品 / UI。
      </Paragraph>
      <Paragraph>
        開設這片自留地的主要原因在於，我希望在一個遠離 gfw 的地方描述與記錄一些自己的個人想法，同時不必因為一些
        ‘不可名狀的原因’ 被迫自我閹割。因此，這裡的記錄可能並不僅限於開發，也可能會有一些除研發以外的隨想。
      </Paragraph>
      <Paragraph>
        這裡的內容會由以下三個部分組成：算法 / 研發 / 趨勢，其中由於個人職業與見解原因，可能會更傾向於研發部分。而研發部分的內容，則會傾向於 Node.js / JavaScript。畢竟我還是個前端嘛（逃）。
      </Paragraph>
      <Paragraph>
        我一直堅信一點，分享知識是鞏固 / 獲取新知識的最好方法。因此我會定期記錄一些日常開發中解決問題的方法供各位參考。同樣的，我熱衷於為開源事業作出自己的一份貢獻，如果有優質開源項目需要貢獻人手，歡迎隨時與我聯繫。
      </Paragraph>

      <Box marginTop={32} element="section">
        <Heading2>當前閱讀書單</Heading2>
        <Paragraph>
          計算機學科發展了這麼多年，書籍與文檔是用於記錄知識的重要載體。這裡會列出我最近正在讀的一些書籍 / 文章，作為個人記錄使用。
        </Paragraph>
        <Paragraph>
          這份書單會以開發相關內容為主，同樣會在一定時期加入一些非開發類別的書籍 / 文章。
        </Paragraph>
        <Paragraph>
          我希望有朝一日，這份書單能發展成一份龐大的書籍記錄，為後來的開發者提供一些有效的幫助，讓他們能夠少走一些我走過的彎路。
        </Paragraph>
        <Box marginTop={12}>
          <List title="2020 閱讀清單">
            <List.Item subtitle="Robert Sedgewick, Kevin Wayne" link="https://www.ituring.com.cn/book/875">
              算法（第4版）
            </List.Item>
            <List.Item
              subtitle="高德纳"
              link="https://www.ituring.com.cn/book/925"
            >
              计算机程序设计艺术 卷4A：组合算法（一）
            </List.Item>
          </List>
          <Separator />
          <List title="正在閱讀">
            <List.Item subtitle="Robert Sedgewick, Kevin Wayne" link="https://www.ituring.com.cn/book/875">
              算法（第4版）
            </List.Item>
            <List.Item
              subtitle="高德纳"
              link="https://www.ituring.com.cn/book/925"
            >
              计算机程序设计艺术 卷4A：组合算法（一）
            </List.Item>
          </List>
        </Box>
      </Box>

      <Box marginTop={32} element="section">
        <Heading2>個人隨筆</Heading2>
        <Paragraph>
          自大二開始，我就一直在折騰自己的 Blog 系統，當前的 Blog 系统已经是第四时代的产物了。{" "}
          <Link element={RouterLink} to="/writings" underlined color="white">
            个人随笔
          </Link>{" "}
          部分記敘了我自大三以來的一些技術實現和隨想，當然剔除了以前我寫的不太好的黑歷史（逃）。
        </Paragraph>
      </Box>
      <Box element="section" marginTop={32} marginBottom={32}>
        <SayHi />
      </Box>
    </Box>
  </Layout>
)

export default AboutMe
