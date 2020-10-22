import * as React from "react"

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
    点击此处{" "}
    <Link
      aria-label="Send an E-Mail to hello@rathes.me"
      href="mailto:ad546971975@icloud.com"
      underlined
    >
      与我联系
    </Link>
    ，进行一些更为深入的探讨。
  </Box>
)

export default SayHi
