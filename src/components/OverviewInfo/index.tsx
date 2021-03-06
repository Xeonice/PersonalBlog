import * as React from 'react';
import styled from '@emotion/styled';

import { TextBody, TextSmall, ElementProps } from "../Typography"
import Link from "../Link"
import { Box } from "../Box"

const Separator = styled.span`
  width: 24px;
  display: block;
  margin: 16px 0;
  height: 2px;
`

const Title = styled(TextSmall)<ElementProps>`
  display: block;
  letter-spacing: ${props => props.theme.letterSpacing.wide};
  line-height: 1.166666666;
`

const Info = styled(Link)`
  font-weight: ${props => props.theme.fontWeight["bold"]};
  line-height: 1.1875;
  display: block;
  margin-top: 5px;
`

const OverviewInfo = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    marginTop={4}
    maxWidth="200px"
  >
    <Box>
      <Separator />
      <Title color="silver">工作地</Title>
      <Info color="white" href="https://www.hussle.com" element={TextBody}>
        杭州 - 西湖区
      </Info>
    </Box>
    <Box>
      <Separator />
      <Title color="silver">Github</Title>
      <Info
        color="white"
        element={Link}
        href="https://github.com/Xeonice"
      >
        @Xeonice
      </Info>
    </Box>
  </Box>
)

export default OverviewInfo
