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
          在大二開始的 Blog 折騰生涯中，我已經更換了好幾個 Blog 系統，如 Ghost / WordPress / Hexo 之類的。最終還是回歸到了簡潔且對前端友好的 Gatsby 體系下，畢竟能寫 React 的 Blog 系統才是好系統（逃）。
        </Paragraph>
        <Paragraph>
          我平日的一大愛好就是折騰一些小工具，尤其是那種能提升日常開發效率，從而提升摸魚時間的小工具。另一大愛好就是打主機遊戲，如果希望進行交流的話，可以通過以下途徑找到我{" "}
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
            <List title="開源書籍">
              <List.Item link="https://learn-tamil.com">
                DataSet Tutorial
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
