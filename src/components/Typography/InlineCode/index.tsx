import * as React from 'react';
import InlineCodeStyle from './index.module.css';

const InlineCode: React.FunctionComponent<any> = function ({
  children, ...props
}) {
  return (
    <code className={InlineCodeStyle.Wrapper} {...props}>
      {children}
    </code>
  );
};

export default InlineCode;
