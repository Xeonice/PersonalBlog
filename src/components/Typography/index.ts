import TextSmall from "./TextSmall"
import TextBody from "./TextBody"
import Heading1 from "./Heading1"
import Heading2 from "./Heading2"
import Heading3 from "./Heading3"
import Heading4 from "./Heading4"
import Paragraph from "./Paragraph"
import InlineCode from './InlineCode';
import { Theme } from "../../gatsby-plugin-theme-ui"

export interface ElementProps {
  as: string;
  color: string,
  tint: string,
  theme: Theme,
}

export {
  TextSmall,
  TextBody,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  InlineCode
}