import * as React from "react"
import Link from "next/link"

import TextSmall from "../Typography/TextSmall"
import { section } from "../Box"

const Separator = () => (
  <span className="inline-block mx-2.5 my-0 text-gray-500 text-xs">/</span>
)

const Footer: React.FunctionComponent = () => (
  <section>
    <section>
      <TextSmall color="gray-500">&copy; 2020 — Douglas</TextSmall>
      <Separator />
      <TextSmall color="gray-500">rss</TextSmall>
    </section>
    <section>
      <TextSmall color="gray-500">友情连接</TextSmall>
      <Separator />
      <TextSmall color="gray-500" element={Link} href="https://kalasearch.cn/">
        卡拉搜索
      </TextSmall>
    </section>
  </section>
)

export default Footer
