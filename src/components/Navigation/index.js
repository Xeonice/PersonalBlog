import React from "react"
import { useThemeUI } from 'theme-ui';
import { graphql, useStaticQuery } from "gatsby"
import RouterLink from 'gatsby-plugin-transition-link/AniLink'
import styled from '@emotion/styled';

import Logo from "../Logo"

import Link from "../Link"
import { Box } from "../Box"
import ThemeButton from "../ThemeButton"

const Separator = styled.span`
  display: inline-block;
  margin: 0 8px;
  color: ${props => props.theme.colors.silver.default};
  font-size: ${props => props.theme.fontSize.lg};
  font-family: ${props => props.theme.fontFamily.default};

  @media (max-width: 374px) {
    margin: 0 4px;
    font-size: ${props => props.theme.fontSize.base};
  }

  &:before {
    content: "/";
  }
`

const MenuItem = styled(Link)`
  color: ${props => props.theme.colors.silver.default};
  font-size: ${props => props.theme.fontSize.lg};
  font-family: ${props => props.theme.fontFamily.default};
  font-weight: 600;

  @media (max-width: 375px) {
    font-size: ${props => props.theme.fontSize.base};
  }

  @media (max-width: 320px) {
    font-size: ${props => props.theme.fontSize.sm};
  }
`

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query {
      resume: file(relativePath: { eq: "files/唐和辉 - 18602149227.pdf" }) {
        publicURL
      }
    }
  `)

  const { theme } = useThemeUI()

  return (
    <Box display="flex" alignItems="center" element="nav">
      <MenuItem
        element={RouterLink}
        to="/"
        aria-label="Home"
        activeStyle={{ color: theme.colors.white.default }}
        paintDrip
        hex="#3F51B5"
      >
        <Logo />
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        element={RouterLink}
        to="/about"
        paintDrip
        hex="#3F51B5"
      >
        個人簡介
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        href={data.resume.publicURL}
        aria-label="Resume"
        paintDrip
        hex="#3F51B5"
      >
        個人簡歷
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        element={RouterLink}
        to="/work"
        paintDrip
        hex="#3F51B5"
      >
        工作
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        element={RouterLink}
        to="/writings"
        paintDrip
        hex="#3F51B5"
      >
        文章
      </MenuItem>
      <Box
        display="flex"
        justifyContent="flex-end"
        flex={1}
      >
        <ThemeButton />
      </Box>
    </Box>
  )
}

export default Navigation
