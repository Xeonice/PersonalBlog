import TextSmall from './TextSmall';
import TextBody from './TextBody';
import Heading1 from './Heading1';
import Heading2 from './Heading2';
import Heading3 from './Heading3';
import Heading4 from './Heading4';
import Paragraph from './Paragraph';
import InlineCode from './InlineCode';
import { BoxProps } from '../Box';

export interface ElementProps extends BoxProps<any> {
  as?: string;
  color?: string;
  tint?: string;
  href?: string;
  to?: string;
}

export {
  TextSmall,
  TextBody,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  InlineCode,
};
