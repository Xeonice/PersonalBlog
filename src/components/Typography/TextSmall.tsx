import classnames from 'classnames';
import * as React from 'react';

export type TextSmallProps = {
  color?: string;
  className: string;
  children?: React.ReactNode;
}

const TextSmall: React.FunctionComponent<TextSmallProps> = function (props) {
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
