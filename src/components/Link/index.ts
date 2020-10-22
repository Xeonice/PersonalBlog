import Link from "./Link"

import { BoxProps } from "../Box"
import { GatsbyLinkProps } from "gatsby-link"

export interface LinkProps extends BoxProps<any> {
  as?: any;
  color?: string;
  tint?: string;
  underlined?: string | boolean;
  href?: string;
}

export default Link
