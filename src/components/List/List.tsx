import * as React from "react"
import styled from '@emotion/styled';
import { Link as RouterLink } from "gatsby"

import { Heading4, TextBody, TextSmall, ElementProps } from "../Typography"
import { Box } from "../Box"
import Link from "../Link"

interface TitleType extends ElementProps {
  subtitle: string;
}

const Title = styled(TextBody)<TitleType>`
  margin: ${props =>
      props.subtitle ? props.theme.spacing[4] : props.theme.spacing[2]}
    0;
`

const Subtitle = styled(TextSmall)`
  display: block;
`

type ItemType = React.FunctionComponent<{ subtitle?: string, link: string }>

const Item: ItemType = ({ children, subtitle, link }) => {
  const isExternalLink = link && link.startsWith("http")

  return (
    <Title element="li" color="white" subtitle={subtitle}>
      <Link
        {...(isExternalLink ? { href: link } : { to: link })}
        element={isExternalLink ? "a" : RouterLink}
      >
        {children}
        {subtitle && <Subtitle color="silver">{subtitle}</Subtitle>}
      </Link>
    </Title>
  )
}

interface ListType extends React.FunctionComponent<{ title?: string }> {
  Item: ItemType;
}

const List: ListType = ({ title, children, ...props }) => (
  <Box {...props}>
    <Heading4 color="silver">{title}</Heading4>
    <Box element="ul">{children}</Box>
  </Box>
)

List.Item = Item

export default List
