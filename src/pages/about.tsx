import * as React from "react"
import { TransitionState } from 'gatsby-plugin-transition-link';
import { Link as RouterLink } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SayHi from "../components/SayHi"

import { Heading1, Paragraph, Heading2 } from "../components/Typography"
import { Box } from "../components/Box"
import List from "../components/List/List"
import Link from "../components/Link"
import { Separator } from "../components/Separator"
import AnimeContainer from "../components/AnimeContainer"

const AboutMe: React.FunctionComponent = () => (
  <TransitionState>
    {({ transitionStatus }) => (
      <Layout>
        <SEO title="個人簡介" />
        <Box maxWidth="640px" marginTop={16}>
          <AnimeContainer toggle={transitionStatus === 'entered'}>
            <Heading1 key="heading1">/ˈdəgləs/</Heading1>
            <Paragraph key="paragraph1">
              我是 Douglas，一个目前工作与生活在杭州的 Web 开发，虽然立足于前端岗位，但我的个人视野从不局限于前端，同样也会聚焦于后端 / Devops / 抑或是产品 / UI。
            </Paragraph>
            <Paragraph key="paragraph2">
              开设这片自留地的主要原因在于，我希望在一个远离 gfw 的地方描述与记录一些自己的个人想法，同时不必因为一些 ‘不可名状的原因’ 被迫自我阉割。因此，这里的记录可能并不仅限于开发，也可能会有一些除研发以外的随想。
            </Paragraph>
            <Paragraph key="paragraph3">
              最近执行 Lowcode 期间，对于业务本身的思考越来越多，因为 Blog 中的大部分文章可能都在讲一些自己执行期间遇到的问题和思考，所以废话会多一点（对技术流来说）。
            </Paragraph>
            <Paragraph key="paragraph4">
              我一直坚信一点，分享知识是巩固 / 获取新知识的最好方法。因此我会定期记录一些日常开发中解决问题的方法供各位参考。同样的，我热衷于为开源事业作出自己的一份贡献，如果有优质开源项目需要贡献人手，欢迎随时与我联系。
            </Paragraph>

            <Box marginTop={32} element="section" key="section">
              <Heading2>当前阅读书单</Heading2>
              <Paragraph>
                计算机学科发展了这么多年，书籍与文档是用于记录知识的重要载体。这里会列出我最近正在读的一些书籍 / 文章，作为个人记录使用。
              </Paragraph>
              <Paragraph>
                这份书单会以开发相关内容为主，同样会在一定时期加入一些非开发类别的书籍 / 文章。
              </Paragraph>
              <Paragraph>
                我希望有朝一日，这份书单能发展成一份庞大的书籍记录，为后来的开发者提供一些有效的帮助，让他们能够少走一些我走过的弯路。
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
                  <List.Item
                    subtitle="Alexander Shvets"
                    link="https://refactoringguru.cn/design-patterns/book"
                  >
                    深入设计模式
                  </List.Item>
                  <List.Item
                    subtitle="Matt Frisbie"
                    link="https://www.ituring.com.cn/book/2472"
                  >
                    JavaScript高级程序设计（第4版）
                  </List.Item>
                  <List.Item
                    subtitle="Eric Matthes"
                    link="https://www.ituring.com.cn/book/2784"
                  >
                    Python编程：从入门到实践（第2版）
                  </List.Item>
                </List>
                <Separator />
                <List title="正在閱讀">
                  <List.Item
                    subtitle="Matt Frisbie"
                    link="https://www.ituring.com.cn/book/2472"
                  >
                    JavaScript高级程序设计（第4版）
                  </List.Item>
                  <List.Item
                    subtitle="Eric Matthes"
                    link="https://www.ituring.com.cn/book/2784"
                  >
                    Python编程：从入门到实践（第2版）
                  </List.Item>
                </List>
              </Box>
            </Box>

            <Box marginTop={32} element="section">
              <Heading2>个人随笔</Heading2>
              <Paragraph>
                自大二开始，我就一直在折腾自己的 Blog 系统，当前的 Blog 系统已经是第四时代的产物了。{" "}
                <Link element={RouterLink} to="/writings" underlined color="white">
                  个人随笔
                </Link>{" "}
                部分记叙了我自大三以来的一些技术实现和随想，当然剔除了以前我写的不太好的黑历史（逃）。
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

export default AboutMe
