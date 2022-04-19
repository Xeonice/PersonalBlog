import * as React from 'react';
import H3Style from './index.module.css';

const Heading3: React.FunctionComponent = function ({ children }) {
  return (
    <h3 className={H3Style.Wrapper}>
      {children}
    </h3>
  );
};

export default Heading3;
