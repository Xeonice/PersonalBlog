import * as React from "react"
import styled from "@emotion/styled"

import { Heading4, TextSmall } from "../Typography"
import classnames from "classnames"

const Title = ({ children, subtitle }) => (
  <li
    className={classnames("text-normal", "text-black", "flex", "flex-col", {
      ["my-4"]: subtitle,
      ["my-2"]: !subtitle,
    })}
  >
    {children}
  </li>
)

const Subtitle = styled(TextSmall)`
  display: block;
`

type ItemType = React.FunctionComponent<{ subtitle?: string; link: string }>

const Item: ItemType = ({ children, subtitle, link }) => {
  return (
    <Title subtitle={subtitle}>
      <a href={link}>{children}</a>
      {subtitle && <Subtitle color="silver">{subtitle}</Subtitle>}
    </Title>
  )
}

interface ListType extends React.FunctionComponent<{ title?: string }> {
  Item: ItemType
}

const List: ListType = ({ title, children, ...props }) => (
  <section {...props}>
    <Heading4>{title}</Heading4>
    <ul>{children}</ul>
  </section>
)

List.Item = Item

export default List
