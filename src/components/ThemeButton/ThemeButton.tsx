/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import themeButtonStyle from './index.module.css';

export default function ModeSwitch(): React.ReactElement {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className={themeButtonStyle['color-scheme-toggle']}
        title="Toggle between light and dark mode"
        disabled
      >
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
          <path
            d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="22"
          />
        </svg>
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      className={themeButtonStyle['color-scheme-toggle']}
      title="Toggle between light and dark mode"
      onClick={toggleColorMode}
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

