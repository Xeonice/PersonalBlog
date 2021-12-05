import * as React from 'react';

import classnames from 'classnames';
import Link from 'next/link';

type LinkProps = {
  className?: string;
  underline?: boolean;
  href: string;
  isActive?: boolean;
};

const StyledLink: React.FunctionComponent<LinkProps> = function ({
  children,
  href,
  isActive,
  className,
  underline,
}) {
  return (
    <Link href={href} passHref>
      <a
        href="replace"
        className={classnames(
          {
            'text-gray-500': !isActive,
            'text-black': isActive,
            underline,
          },
          className,
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
