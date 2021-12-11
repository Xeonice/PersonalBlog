/** @jsxImportSource @emotion/react */
import * as React from 'react';
import styled from '@emotion/styled';
import mediaqueries from '../IconWrapper/media';
import IconWrapper from '../IconWrapper';

const strActiveLightMode = '打开 Light Mode';
const strActiveDarkMode = '打开 Dark Mode';

const toggleColorMode = () => {

};

export default function ModeSwitch(): React.ReactElement {
  const isDark = true;
  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y="false"
      aria-label={isDark ? strActiveLightMode : strActiveDarkMode}
      title={isDark ? strActiveLightMode : strActiveDarkMode}
    >
      <MoonOrSun
        isDark={isDark}
        sx={{
          bg: (theme) => theme.colors.white.default,
          border: (theme) => `${isDark ? '4px' : '2px'} solid ${theme.colors.white.default}`,
          '&::before': {
            border: (theme) => `2px solid ${theme.colors.white.default}`,
          },
          '&::after': {
            boxShadow: (theme) => `0 -23px 0 ${theme.colors.white.default},
            0 23px 0 ${theme.colors.white.default},
            23px 0 0 ${theme.colors.white.default},
            -23px 0 0 ${theme.colors.white.default},
            15px 15px 0 ${theme.colors.white.default},
            -15px 15px 0 ${theme.colors.white.default},
            15px -15px 0 ${theme.colors.white.default},
            -15px -15px 0 ${theme.colors.white.default}`,
          },
        }}
      />
      <MoonMask
        isDark={isDark}
        sx={{
          bg: (theme) => theme.colors.black.default,
          transition: (theme) => `${theme.colorModeTransition}, transform 0.45s ease`,
        }}
      />
    </IconWrapper>
  );
}

const MoonMask = styled.div<{ isDark: boolean; sx: object }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
  opacity: ${(p) => (p.isDark ? 0 : 1)};
`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean; sx: object }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: scale(${(p) => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${(p) => (p.isDark ? 'visible' : 'hidden')};

  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${(p) => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(${(p) => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${(p) => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`;
