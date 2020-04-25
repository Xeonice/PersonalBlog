import React from "react"

import Link from "../Link"
import { Box } from "../Box"

const SayHi = () => (
  <Box
    maxWidth="520px"
    fontFamily="default"
    fontSize="4xl"
    fontWeight={600}
    lineHeight={1.194444444444}
    textColor="white"
  >
    點擊此處{" "}
    <Link
      aria-label="Send an E-Mail to hello@rathes.me"
      href="mailto:hello@rathes.me"
      underlined
    >
      與我聯繫
    </Link>
    ，進行一些更為深入的探討。
  </Box>
)

export default SayHi
