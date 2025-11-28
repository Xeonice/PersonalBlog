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

// 将主题配色应用到 CSS 变量
const applyThemeColors = (theme: ThemeConfig) => {
  const root = document.documentElement;
  const { colors } = theme;

  // 设置 CSS 变量
  root.style.setProperty('--bg-primary', colors.bgPrimary);
  root.style.setProperty('--bg-secondary', colors.bgSecondary);
  root.style.setProperty('--bg-tertiary', colors.bgTertiary);
  root.style.setProperty('--bg-card', colors.bgCard);
  root.style.setProperty('--bg-overlay', colors.bgOverlay);
  root.style.setProperty('--bg-glass', colors.bgGlass);

  root.style.setProperty('--text-primary', colors.textPrimary);
  root.style.setProperty('--text-secondary', colors.textSecondary);
  root.style.setProperty('--text-muted', colors.textMuted);
  root.style.setProperty('--text-accent', colors.textAccent);
  root.style.setProperty('--text-link', colors.textLink);
  root.style.setProperty('--text-highlight', colors.textHighlight);

  root.style.setProperty('--color-primary', colors.colorPrimary);
  root.style.setProperty('--color-secondary', colors.colorSecondary);
  root.style.setProperty('--color-accent', colors.colorAccent);
  root.style.setProperty('--color-warning', colors.colorWarning);
  root.style.setProperty('--color-error', colors.colorError);

  root.style.setProperty('--border-color', colors.borderColor);
  root.style.setProperty('--border-light', colors.borderLight);
  root.style.setProperty('--divider-color', colors.dividerColor);

  root.style.setProperty('--shadow-sm', colors.shadowSm);
  root.style.setProperty('--shadow-md', colors.shadowMd);
  root.style.setProperty('--shadow-lg', colors.shadowLg);
  root.style.setProperty('--shadow-xl', colors.shadowXl);
  root.style.setProperty('--shadow-glow', colors.shadowGlow);
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
