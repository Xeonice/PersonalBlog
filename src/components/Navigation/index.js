import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import RouterLink from 'gatsby-plugin-transition-link/AniLink'
import styled, { useTheme } from "styled-components"

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

const Navigation = ({ setIsDark }) => {
  const data = useStaticQuery(graphql`
    query {
      resume: file(relativePath: { eq: "files/唐和辉 - 18602149227.pdf" }) {
        publicURL
      }
    }
  `)

  const theme = useTheme()

  return (
    <Box display="flex" alignItems="center" element="nav">
      <MenuItem
        element={RouterLink}
        to="/"
        aria-label="Home"
        activeStyle={{ color: theme.colors.white.default }}
        cover
        direction="left"
        bg="#3F51B5"
      >
        <Logo />
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        element={RouterLink}
        to="/about"
        cover
        direction="left"
        bg="#3F51B5"
      >
        个人简介
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        href={data.resume.publicURL}
        aria-label="Resume"
        cover
        direction="left"
        bg="#3F51B5"
      >
        个人简历
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        element={RouterLink}
        to="/work"
        cover
        direction="left"
        bg="#3F51B5"
      >
        工作
      </MenuItem>
      <Separator />
      <MenuItem
        activeStyle={{ color: theme.colors.white.default }}
        element={RouterLink}
        to="/writings"
        cover
        direction="left"
        bg="#3F51B5"
      >
        文章
      </MenuItem>
      <ThemeButton onChange={setIsDark} />
    </Box>
  )
}

export default Navigation
