import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Link from "../components/Link"

import { extractBlogPosts, getSortedGroups, groupPostsByYear } from "../utils"

import externalLinks from "../content/articles/externalLinks"
import SayHi from "../components/SayHi"
import { Box } from "../components/Box"
import { Paragraph } from "../components/Typography"
import List from "../components/List/List"

const Writings = ({ data }) => {
  const blogPosts = getSortedGroups(
    groupPostsByYear(extractBlogPosts(data).concat(externalLinks))
  )

  return (
    <Layout>
      <Box maxWidth="640px" marginTop={32} element="section">
        <SEO title="Writings" />
        <Paragraph>
          在大二开始的 Blog 折腾生涯中，我已经更换了好几个 Blog 系统，如 Ghost / WordPress / Hexo 之类的。最终还是回归到了简洁且对前端友好的 Gatsby 体系下，毕竟能写 React 的 Blog 系统才是好系统（逃）。
        </Paragraph>
        <Paragraph>
          我平日的一大爱好就是折腾一些小工具，尤其是那种能提升日常开发效率，从而提升摸鱼时间的小工具。另一大爱好就是打主机游戏，如果希望进行交流的话，可以通过以下途径找到我{" "}
          <Link
            color="white"
            href="https://twitter.com/_DouglasDong_"
            underlined
          >
            @_DouglasDong_
          </Link>
        </Paragraph>

        <Box marginTop={32} element="section">
          <Box marginTop={12}>
            <List title="开源项目">
              <List.Item link="https://marketplace.visualstudio.com/items?itemName=handMS.c7n-dataset-plugin">
                vscode-dataset-extension
              </List.Item>
            </List>
          </Box>

          {blogPosts.map(([key, posts]) => {
            return (
              <Box marginTop={12}>
                <List title={key} key={key}>
                  {posts.map((post, index) => (
                    <List.Item link={post.link} key={index}>
                      {post.title}
                    </List.Item>
                  ))}
                </List>
              </Box>
            )
          })}
        </Box>
        <Box marginTop={32} marginBottom={32} element="section">
          <SayHi />
        </Box>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Writings
