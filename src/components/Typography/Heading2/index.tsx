import * as React from 'react';
import H2Style from './index.module.css';

const Heading2: React.FunctionComponent<{ children?: React.ReactNode }> = function ({ children }) {
  return (
    <h2 className={H2Style.Wrapper}>
      {children}
    </h2>
  );
};

export default Heading2;
