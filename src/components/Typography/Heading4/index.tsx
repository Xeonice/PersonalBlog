import classnames from 'classnames';
import * as React from 'react';
import H4Style from './index.module.css';

const Heading4: React.FunctionComponent<any> = function ({ children, className }) {
  return (
    <h4 className={classnames(H4Style.Wrapper, className)}>
      {children}
    </h4>
  );
};

export default Heading4;
