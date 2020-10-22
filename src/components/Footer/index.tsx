import * as React from 'react';
import { Link as RouterLink } from 'gatsby';
import Link from "../Link"
import styled from '@emotion/styled';

import TextSmall from "../Typography/TextSmall"
import { Box } from "../Box"

interface SeparatorProps {
  theme: Theme;
};

import { Theme } from "../../gatsby-plugin-theme-ui";

const Separator = styled.span<SeparatorProps>`
  display: inline-block;
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.silver.default};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: ${({ theme }) => theme.fontFamily.default};

  &:before {
    content: "/";
  }
`

const Footer: React.FunctionComponent = () => (
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
