import * as React from 'react';
import H4Style from './index.module.css';

const Heading4: React.FunctionComponent = function ({ children }) {
  return (
    <h4 className={H4Style.Wrapper}>
      {children}
    </h4>
  );
};

export default Heading4;
