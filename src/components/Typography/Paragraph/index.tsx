import * as React from 'react';
import ParagraphStyle from './index.module.css';

interface ParagraphProps {
  children?: React.ReactNode;
  className?: string;
}

const Paragraph: React.FunctionComponent<ParagraphProps> = function ({ children, className }) {
  return (
    <p className={`${ParagraphStyle.Wrapper} ${className || ''}`}>
      {children}
    </p>
  );
};

export default Paragraph;
