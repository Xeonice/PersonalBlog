import * as React from "react"
import classnames from "classnames"

const TextBody: React.FunctionComponent<{
  className: string
}> = ({ className, children }) => {
  return (
    <span className={classnames(className, "font-serif", "text-normal")}>
      {children}
    </span>
  )
}

export default TextBody
