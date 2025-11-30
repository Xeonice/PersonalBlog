import React from 'react';

export const Heading2: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return <h2 className={className}>{children}</h2>;
};

export const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return <p className={className}>{children}</p>;
};