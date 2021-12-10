import * as React from 'react';
import H1Style from './index.module.css';

const Heading1: React.FunctionComponent = function ({ children }) {
  return (
    <h1 className={H1Style.Wrapper}>
      {children}
    </h1>
  );
};

export default Heading1;
