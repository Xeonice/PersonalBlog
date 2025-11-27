import * as React from 'react';
import QuoteContainerStyle from './index.module.css';

const Quote: React.FunctionComponent<{ children?: React.ReactNode }> = function ({ children }) {
  return (
    <blockquote className={QuoteContainerStyle.Wrapper}>
      {children}
    </blockquote>
  );
};

export default Quote;
