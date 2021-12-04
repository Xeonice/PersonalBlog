import * as React from "react"

import Layout from "../components/Layout"
import { section } from "../components/Box"
import { Heading1, Paragraph } from "../components/Typography"
import { List } from "../components/List"

const NotFoundPage = () => (
  <Layout>
    <section>
      <Heading1>看起来你正在找一个不存在的页面啊。</Heading1>
      <Paragraph>
        假如你从搜索引擎进入到这里的话，可以试试其他的关键词，可能是搜索引擎的收录有问题。否则，你可以试试下面的链接是不是你想要的：
      </Paragraph>
      <Paragraph>
        <List>
          <List.Item link="/">首頁</List.Item>
          <List.Item link="/writings">個人隨筆</List.Item>
          <List.Item link="/about">個人簡介</List.Item>
        </List>
      </Paragraph>
    </section>
  </Layout>
)

export default NotFoundPage
