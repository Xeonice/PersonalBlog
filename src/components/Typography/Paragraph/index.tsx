import * as React from 'react';
import ParagraphStyle from './index.module.css';

const Paragraph: React.FunctionComponent = function ({ children }) {
  return (
    <p className={ParagraphStyle.Wrapper}>
      {children}
    </p>
  );
};

export default Paragraph;
