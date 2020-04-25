import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Box } from "../components/Box"
import { Heading1, Paragraph } from "../components/Typography"
import { List } from "../components/List"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Box maxWidth="640px">
      <Heading1>
        Looks like you are looking for a page that does not exist.
      </Heading1>
      <Paragraph>
        If you came here from a Google Search, feel free to go back and try a
        different search term. Otherwise, here are some things that you might
        have been looking for:
      </Paragraph>
      <Paragraph>
        <List>
          <List.Item link="/">首頁</List.Item>
          <List.Item link="/writings">個人隨筆</List.Item>
          <List.Item link="/about">個人簡介</List.Item>
        </List>
      </Paragraph>
    </Box>
  </Layout>
)

export default NotFoundPage
