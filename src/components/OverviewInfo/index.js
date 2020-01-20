import React from "react"
import styled from "styled-components"

import { TextBody, TextSmall } from "../Typography"
import Link from "../Link"

import "./styles.css"

const OverviewInfoContainer = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
  max-width: 375px;
`

const Separator = styled.span`
  width: 24px;
  display: block;
  margin: 16px 0;
  height: 2px;
  background-color: ${props => props.theme.colors.black.lighter};
`

const Title = styled(TextSmall)`
  display: block;
  letter-spacing: ${props => props.theme.letterSpacing.wide};
  line-height: 1.166666666;
`

const Info = styled(Link)`
  font-weight: 600;
  line-height: 1.1875;
  display: block;
  margin-top: 5px;
`

const OverviewInfo = () => (
  <OverviewInfoContainer>
    <div>
      <Separator />
      <Title color="silver">Working at</Title>
      <Info color="white" href="https://www.teamleader.eu/" element={TextBody}>
        Teamleader
      </Info>
    </div>
    <div>
      <Separator />
      <Title color="silver">Living in</Title>
      <Info
        color="white"
        element={TextBody}
        href="https://goo.gl/maps/9kKByTYJhSz"
      >
        Ghent, BE
      </Info>
    </div>
    <div>
      <Separator />
      <Title color="silver">Follow me</Title>
      <Info
        color="white"
        element={TextBody}
        href="https://twitter.com/rswebdesigner"
      >
        @rswebdesigner
      </Info>
    </div>
  </OverviewInfoContainer>
)

export default OverviewInfo
