/** @jsxImportSource @emotion/react */
import * as React from 'react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import IconWrapper from '../IconWrapper';
import themeButtonStyle from './index.module.css';

const strActiveLightMode = '打开 Light Mode';
const strActiveDarkMode = '打开 Dark Mode';

export default function ModeSwitch(): React.ReactElement {
  const [isDark, setIsDark] = useState(false);

  const toggleColorMode = (localStorage) => {
    debugger;
    if (localStorage.theme === 'dark') {
      localStorage.theme = 'light';
    } else {
      localStorage.theme = 'dark';
    }
    setIsDark(localStorage.theme === 'dark');
  };

  useEffect(() => {
    if (window.localStorage.theme === 'dark') {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      window.localStorage.theme === 'dark'
      || (!('theme' in localStorage)
        && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <IconWrapper
      isDark={isDark}
      onClick={() => toggleColorMode(window.localStorage)}
      data-a11y="false"
      aria-label={isDark ? strActiveLightMode : strActiveDarkMode}
      title={isDark ? strActiveLightMode : strActiveDarkMode}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask
        isDark={isDark}
      />
    </IconWrapper>
  );
}

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
var MoonMask = function ({ isDark }) {
  return (
    <div
      className={classNames(themeButtonStyle['moon-mask'], {
        [themeButtonStyle['moon-mask-dark']]: isDark,
      })}
    />
  );
};

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
var MoonOrSun = function ({ isDark }) {
  return (
    <div
      className={classNames(themeButtonStyle['moon-or-sun'], {
        [themeButtonStyle['moon-or-sun-dark']]: isDark,
      })}
    />
  );
};

// bg: (theme) => theme.colors.white.default,
// border: (theme) => `${isDark ? '4px' : '2px'} solid ${theme.colors.white.default}`,
// '&::before': {
//   border: (theme) => `2px solid ${theme.colors.white.default}`,
// },
// '&::after': {
//   boxShadow: (theme) => `0 -23px 0 ${theme.colors.white.default},
//   0 23px 0 ${theme.colors.white.default},
//   23px 0 0 ${theme.colors.white.default},
//   -23px 0 0 ${theme.colors.white.default},
//   15px 15px 0 ${theme.colors.white.default},
//   -15px 15px 0 ${theme.colors.white.default},
//   15px -15px 0 ${theme.colors.white.default},
//   -15px -15px 0 ${theme.colors.white.default}`,
// },
