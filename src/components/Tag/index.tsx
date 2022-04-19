import * as React from 'react';
import TextSmall from '../Typography/TextSmall';
import TagStyle from './index.module.css';

const Tag: React.FunctionComponent<any> = function ({
  children, element, color, ...props
}) {
  return (
    <span className={TagStyle.wrapper}>
      <TextSmall className={TagStyle.font} color={color} {...props}>
        {children}
      </TextSmall>
    </span>

  );
};

export default Tag;
