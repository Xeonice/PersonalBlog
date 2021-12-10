import * as React from 'react';
import UnOrderListStyle from './index.module.css';

const UnOrderedList = function ({ children, ...props }) {
  return (
    <ul
      className={UnOrderListStyle.Wrapper}
      {...props}
    >
      {children}
    </ul>
  );
};

export default UnOrderedList;
