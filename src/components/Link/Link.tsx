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
};

const StyledLink: React.FunctionComponent<LinkProps> = function ({
  children,
  href,
  className = '',
  underline = false,
  inActive = false,
}) {
  return (
    <Link
      href={href}
      className={classnames(
        className,
        styles.link,
        {
          [styles.linkInactive]: inActive,
          [styles.linkUnderline]: underline,
        },
      )}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
