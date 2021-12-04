import classnames from "classnames"
import * as React from "react"

const TextSmall = ({ children, color }) => (
  <span
    className={classnames("text-xs", "font-serif", {
      [`text-${color}`]: color,
    })}
  >
    {children}
  </span>
)

export default TextSmall
