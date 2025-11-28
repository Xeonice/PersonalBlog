import * as React from 'react';

import classnames from 'classnames';
import Link from 'next/link';
import styles from './index.module.css';

export type LinkProps = {
  className?: string;
  underline?: boolean;
  href: string;
  inActive?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  'aria-label'?: string;
};

const StyledLink: React.FunctionComponent<LinkProps> = function ({
  children,
  href,
  className = '',
  underline = false,
  inActive = false,
  onClick,
  ...props
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={classnames(
        className,
        styles.link,
        {
          [styles.linkInactive]: inActive,
          [styles.linkUnderline]: underline,
        },
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
