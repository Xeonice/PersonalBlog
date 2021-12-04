import * as React from "react"

const Paragraph: React.FunctionComponent = ({ children }) => (
  <p className="font-serif font-normal leading-loose mt-8 mb-6 text-gray-500">
    {children}
  </p>
)

export default Paragraph
