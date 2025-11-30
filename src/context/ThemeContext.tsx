import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { themes, getThemeById, getDefaultTheme, ThemeConfig } from '../config/themes';
import { useThemeTransition } from '../components/ThemeTransition';

interface MultiThemeContextValue {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  setTheme: (themeId: string) => void;
  mounted: boolean;
}

const MultiThemeContext = createContext<MultiThemeContextValue | null>(null);

export const useMultiTheme = () => {
  const context = useContext(MultiThemeContext);
  if (!context) {
    throw new Error('useMultiTheme must be used within MultiThemeProvider');
  }
  return context;
};

// 将主题配色应用到 CSS 变量 - 使用批量更新避免多次样式重计算
const applyThemeColors = (theme: ThemeConfig) => {
  const { colors } = theme;

  // 使用 requestAnimationFrame 确保在下一帧批量更新
  requestAnimationFrame(() => {
    const root = document.documentElement;

    // 使用 setAttribute 一次性设置所有变量，避免内存泄漏
    root.setAttribute('style', `
      --bg-primary: ${colors.bgPrimary};
      --bg-secondary: ${colors.bgSecondary};
      --bg-tertiary: ${colors.bgTertiary};
      --bg-card: ${colors.bgCard};
      --bg-overlay: ${colors.bgOverlay};
      --bg-glass: ${colors.bgGlass};
      --text-primary: ${colors.textPrimary};
      --text-secondary: ${colors.textSecondary};
      --text-muted: ${colors.textMuted};
      --text-accent: ${colors.textAccent};
      --text-link: ${colors.textLink};
      --text-highlight: ${colors.textHighlight};
      --color-primary: ${colors.colorPrimary};
      --color-secondary: ${colors.colorSecondary};
      --color-accent: ${colors.colorAccent};
      --color-warning: ${colors.colorWarning};
      --color-error: ${colors.colorError};
      --border-color: ${colors.borderColor};
      --border-light: ${colors.borderLight};
      --divider-color: ${colors.dividerColor};
      --shadow-sm: ${colors.shadowSm};
      --shadow-md: ${colors.shadowMd};
      --shadow-lg: ${colors.shadowLg};
      --shadow-xl: ${colors.shadowXl};
      --shadow-glow: ${colors.shadowGlow};
    `);
  });
};

interface MultiThemeProviderProps {
  children: ReactNode;
}

export const MultiThemeProvider: React.FC<MultiThemeProviderProps> = ({ children }) => {
  const { setTheme: setNextTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(getDefaultTheme());

  // 尝试获取过渡动画上下文
  let themeTransition: ReturnType<typeof useThemeTransition> | null = null;
  try {
    themeTransition = useThemeTransition();
  } catch {
    // ThemeTransitionProvider 可能未包裹
  }

  // 从 localStorage 读取保存的主题
  useEffect(() => {
    setMounted(true);
    const savedThemeId = localStorage.getItem('multi-theme-id');
    if (savedThemeId) {
      const savedTheme = getThemeById(savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        applyThemeColors(savedTheme);
        setNextTheme(savedTheme.isDark ? 'dark' : 'light');
      }
    } else {
      // 默认应用当前主题
      applyThemeColors(currentTheme);
    }
  }, []);

  const setTheme = useCallback((themeId: string) => {
    const newTheme = getThemeById(themeId);
    if (!newTheme) return;

    const applyNewTheme = () => {
      setCurrentTheme(newTheme);
      applyThemeColors(newTheme);
      setNextTheme(newTheme.isDark ? 'dark' : 'light');
      localStorage.setItem('multi-theme-id', themeId);
    };

    // 如果有过渡动画，则使用过渡动画
    if (themeTransition && !themeTransition.isTransitioning) {
      themeTransition.startTransition(applyNewTheme, newTheme.transitionColor);
    } else {
      applyNewTheme();
    }
  }, [themeTransition, setNextTheme]);

  return (
    <MultiThemeContext.Provider
      value={{
        currentTheme,
        availableThemes: themes,
        setTheme,
        mounted,
      }}
    >
      {children}
    </MultiThemeContext.Provider>
  );
};

export default MultiThemeProvider;
