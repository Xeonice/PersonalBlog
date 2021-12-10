import classnames from 'classnames';
import * as React from 'react';

const TextSmall = function ({ children, className, color }) {
  return (
    <span
      className={classnames('text-xs', 'font-serif', {
        [`text-${color}`]: color,
      }, className)}
    >
      {children}
    </span>
  );
};

export default TextSmall;
