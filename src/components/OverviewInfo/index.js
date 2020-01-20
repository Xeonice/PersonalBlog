import React from "react"
import styled from "styled-components"

import TextSmall from "../Typography/TextSmall"
import Link from "../Link"

import "./styles.css"

const Separator = styled.span`
  width: 24px;
  display: block;
  margin: 16px 0;
  height: 2px;
  background-color: ${props => props.theme.colors.black.lighter};
`

const OverviewInfo = () => (
  <ul className="flex justify-between my-16 overview-info md:max-w-sm">
    <li>
      <span className="block w-8 bg-white border-t border-white my-2" />
      <TextSmall color="silver" className="block tracking-wide leading-none">
        Working at
      </TextSmall>
      <Link
        color="white"
        className=" text-base font-bold xs:text-lg"
        href="https://www.teamleader.eu/"
      >
        Teamleader
      </Link>
    </li>
    <li>
      <span className="block w-8 bg-white border-t border-white my-2" />
      <TextSmall color="silver" className="block tracking-wide leading-none">
        Living in
      </TextSmall>
      <Link
        color="white"
        className="text-base font-bold xs:text-lg"
        href="https://goo.gl/maps/9kKByTYJhSz"
      >
        Ghent, BE
      </Link>
    </li>
    <li>
      <span className="block w-8 bg-white border-t border-white my-2" />
      <TextSmall color="silver" className="block tracking-wide leading-none">
        Follow me
      </TextSmall>
      <Link
        color="white"
        className="text-base font-bold xs:text-lg"
        href="https://twitter.com/rswebdesigner"
      >
        @rswebdesigner
      </Link>
    </li>
  </ul>
)

export default OverviewInfo
