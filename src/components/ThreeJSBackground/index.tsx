import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useMultiTheme } from '../../context/ThemeContext';

// 动态导入，禁用 SSR
const ThreeJSCanvas = dynamic(() => import('./ThreeJSCanvas'), {
  ssr: false,
  loading: () => <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--bg-primary)', zIndex: -1 }} />
});

interface ThemeColors {
  background: string;
  primaryParticle: string;
  secondaryParticle: string;
  accentParticle: string;
}

export default function ThreeJSBackground() {
  const { currentTheme, mounted } = useMultiTheme();

  // 提取主题颜色
  const getThemeColors = useCallback((theme: typeof currentTheme): ThemeColors => {
    return {
      background: theme.colors.bgPrimary,
      primaryParticle: theme.colors.textPrimary,      // 正文颜色
      secondaryParticle: theme.colors.textSecondary,  // 次要文字颜色
      accentParticle: theme.colors.colorPrimary,      // 导航横条的高亮色
    };
  }, []);

  if (!mounted) {
    return <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--bg-primary)', zIndex: -1 }} />;
  }

  const themeColors = getThemeColors(currentTheme);

  return <ThreeJSCanvas themeColors={themeColors} themeStyle={currentTheme.themeStyle} />;
}