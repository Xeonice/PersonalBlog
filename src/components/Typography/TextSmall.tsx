import classnames from 'classnames';
import * as React from 'react';

const TextSmall = function ({ children, color }) {
  return (
    <span
      className={classnames('text-xs', 'font-serif', {
        [`text-${color}`]: color,
      })}
    >
      {children}
    </span>
  );
};

export default TextSmall;
