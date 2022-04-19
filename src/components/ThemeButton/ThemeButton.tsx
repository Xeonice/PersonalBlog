/** @jsxImportSource @emotion/react */
import * as React from 'react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import themeButtonStyle from './index.module.css';
import theme from '../../gatsby-plugin-theme-ui';

const strActiveLightMode = '打开 Light Mode';
const strActiveDarkMode = '打开 Dark Mode';

export default function ModeSwitch(): React.ReactElement {
  const [isDark, setIsDark] = useState(false);

  const toggleColorMode = (localStorage) => {
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
    <button
      className={themeButtonStyle['color-scheme-toggle']}
      title="Toggle between light and dark mode"
      onClick={() => {
        toggleColorMode(window.localStorage);
      }}
    >
      {isDark ? (
        <svg
          className={themeButtonStyle.light}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentcolor"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="92.8"
            y1="59"
            x2="85.1"
            y2="40.5"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="43"
            y1="108.8"
            x2="24.5"
            y2="101.1"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="213"
            y1="108.8"
            x2="231.5"
            y2="101.1"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="163.2"
            y1="59"
            x2="170.9"
            y2="40.5"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="240"
            y1="160"
            x2="16"
            y2="160"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="208"
            y1="200"
            x2="48"
            y2="200"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <path
            d="M70.2,160a60,60,0,1,1,115.6,0"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
        </svg>
      ) : (
        <svg
          className={themeButtonStyle.dark}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentcolor"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="216"
            y1="112"
            x2="216"
            y2="64"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="240"
            y1="88"
            x2="192"
            y2="88"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="168"
            y1="24"
            x2="168"
            y2="56"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <line
            x1="184"
            y1="40"
            x2="152"
            y2="40"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
          <path
            d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
        </svg>
      )}
    </button>
  );
}

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonMask = function ({ isDark }) {
  return (
    <div
      className={classNames(themeButtonStyle['moon-mask'], {
        [themeButtonStyle['moon-mask-dark']]: isDark,
      })}
    />
  );
};

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = function ({ isDark }) {
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
