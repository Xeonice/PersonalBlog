import React from "react"

import { MDXProvider } from "@mdx-js/react"
import {
  Heading1,
  Heading2,
  Paragraph,
  Heading3,
  Heading4,
  InlineCode,
} from "./src/components/Typography"
import { Separator } from "./src/components/Separator"
import { OrderedList, UnOrderedList } from "./src/components/List"
import { Quote } from "./src/components/Quote"
import Link from "./src/components/Link"

import "prism-themes/themes/prism-vsc-dark-plus.css"

const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  hr: Separator,
  p: Paragraph,
  ol: OrderedList,
  ul: UnOrderedList,
  blockquote: Quote,
  inlineCode: InlineCode,
  a: ({ children, ...props }) => (
    <Link underlined color="white" {...props}>
      {children}
    </Link>
  ),
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
