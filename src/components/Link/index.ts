import Link from './Link';

import { BoxProps } from '../Box';

export interface LinkProps extends BoxProps<any> {
  as?: any
  to?: string
  color?: string
  tint?: string
  underlined?: string | boolean
  href?: string
}

export default Link;
