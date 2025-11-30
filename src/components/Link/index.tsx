import React from 'react';
import NextLink from 'next/link';

interface StyledLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  underline?: boolean;
}

const StyledLink: React.FC<StyledLinkProps> = ({
  href,
  children,
  className = '',
  target,
  rel,
  onMouseDown,
  onClick,
  underline
}) => {
  const linkStyle = underline ? { textDecoration: 'underline' } : {};

  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel}
        onMouseDown={onMouseDown}
        onClick={onClick}
        style={linkStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={className}
      onMouseDown={onMouseDown}
      onClick={onClick}
      style={linkStyle}
    >
      {children}
    </NextLink>
  );
};

export default StyledLink;