import React from "react"
import { Link as RouterLink } from 'gatsby';
import Link from "../Link"
import styled from "styled-components"

import TextSmall from "../Typography/TextSmall"
import { Box } from "../Box"

const Separator = styled.span`
  display: inline-block;
  margin: 0 8px;
  color: ${props => props.theme.colors.silver.default};
  font-size: ${props => props.theme.fontSize.xs};
  font-family: ${props => props.theme.fontFamily.default};

  &:before {
    content: "/";
  }
`

const Footer = () => (
  <Box>
    <Box>
      <TextSmall color="silver">&copy; 2020 — Douglas</TextSmall>
      <Separator />
      <TextSmall color="silver" element={RouterLink} to="/rss.xml">
        rss
      </TextSmall>
    </Box>
    <Box>
      <TextSmall color="silver">友情连接</TextSmall>
      <Separator />
      <TextSmall color="silver" element={Link} href="https://kalasearch.cn/">
        卡拉搜索
      </TextSmall>
    </Box>
  </Box>
)

export default Footer
