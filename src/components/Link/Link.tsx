import * as React from 'react';

import classnames from 'classnames';
import Link from 'next/link';

type LinkProps = {
  className?: string;
  underline?: boolean;
  href: string;
  inActive: boolean;
};

const StyledLink: React.FunctionComponent<LinkProps> = function ({
  children,
  href,
  className,
  underline,
  inActive = false,
}) {
  return (
    <Link href={href} passHref>
      <a
        href="replace"
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
      </a>
    </Link>
  );
};

StyledLink.defaultProps = {
  className: '',
  underline: false,
  isActive: false,
};

export default StyledLink;
