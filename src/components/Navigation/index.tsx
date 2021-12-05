import React from 'react';
import { useThemeUI } from 'theme-ui';
import { useRouter } from 'next/router';
import ThemeButton from '../ThemeButton';
import Logo from '../Logo';
import StyledLink from '../Link';

const Separator = function () {
  return (
    <span className="inline-block mx-2 text-gray-500 text-base md:mx-3 md:text-lg">
      /
    </span>
  );
};

const MenuItem = function ({ children, href }) {
  const router = useRouter();
  return (
    <StyledLink
      className="text-base font-bold md:text-lg"
      href={href}
      isActive={router.pathname === href}
    >
      {children}
    </StyledLink>
  );
};

const Navigation: React.FunctionComponent = function () {
  const { theme } = useThemeUI();

  return (
    <nav className="flex align-center justify-between">
      <div className="flex align-center">
        <MenuItem href="/" aria-label="Home">
          <Logo />
        </MenuItem>
        <Separator />
        <MenuItem href="/about">個人簡介</MenuItem>
        <Separator />
        <MenuItem
          href="/files/%E5%94%90%E5%92%8C%E8%BE%89%20-%2018602149227.pdf"
          aria-label="Resume"
        >
          個人簡歷
        </MenuItem>
        <Separator />
        <MenuItem href="/work">工作</MenuItem>
        <Separator />
        <MenuItem href="/writings">文章</MenuItem>
      </div>
      <ThemeButton />
    </nav>
  );
};

export default Navigation;
