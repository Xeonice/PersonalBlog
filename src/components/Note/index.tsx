import * as React from "react"

import { section } from "../Box"

const Note = ({ element, children, ...props }) => (
  <section
    element={element || "p"}
    backgroundColor="black"
    backgroundTint="light"
    marginTop={8}
    marginBottom={8}
    padding={4}
    textColor="silver"
    textTint="darker"
    fontSize="sm"
    {...props}
  >
    {children}
  </section>
)

export default Note
