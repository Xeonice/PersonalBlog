import classnames from 'classnames';
import * as React from 'react';

const TextSmall: React.FunctionComponent<{
  color: string | undefined;
  className: string;
}> = function (props) {
  const { color, className, children } = props;
  return (
    <span
      className={classnames('text-xs', 'font-serif', color ? {
        [`text-${color}`]: color,
      } : {}, className)}
    >
      {children}
    </span>
  );
};

export default TextSmall;
