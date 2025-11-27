import * as React from 'react';

import classnames from 'classnames';
import Link from 'next/link';

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
  className,
  underline,
  inActive = false,
}) {
  return (
    <Link
      href={href}
      className={classnames(
        className,
        {
          'text-black-default dark:text-white-default': !inActive,
          'text-gray-default dark:text-silver-default': inActive,
          underline,
        },
      )}
    >
      {children}
    </Link>
  );
};

StyledLink.defaultProps = {
  className: '',
  underline: false,
  inActive: false,
};

export default StyledLink;
