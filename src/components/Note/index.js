import React from "react"

import { Box } from "../Box"

const Note = ({ element, children }) => {
  return (
    <Box
      element={element || "p"}
      backgroundColor="black"
      backgroundTint="light"
      marginTop={8}
      marginBottom={8}
      padding={4}
      textColor="silver"
      textTint="darker"
      fontSize="sm"
    >
      {children}
    </Box>
  )
}

export default Note
