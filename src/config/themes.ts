/**
 * 多主题配色系统
 * 每个主题定义了完整的配色方案
 */

export interface ThemeConfig {
  id: string;
  name: string;
  icon: string;
  // 代表色 - 用于主题选择器显示
  representColor: string;
  // Mesh 渐变色 - 用于主题按钮圆圈显示（多层叠加效果）
  meshColors: string[]; // 3-4个主色，用于生成 mesh gradient
  // 过渡动画遮罩颜色
  transitionColor: string;
  // 是否为深色主题（影响 next-themes 的 dark mode class）
  isDark: boolean;
  // CSS 变量
  colors: {
    // 背景色系
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    bgCard: string;
    bgOverlay: string;
    bgGlass: string;
    // 文字色系
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textAccent: string;
    textLink: string;
    textHighlight: string;
    // 强调色系
    colorPrimary: string;
    colorSecondary: string;
    colorAccent: string;
    colorWarning: string;
    colorError: string;
    // 边框
    borderColor: string;
    borderLight: string;
    dividerColor: string;
    // 阴影
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
    shadowXl: string;
    shadowGlow: string;
  };
}

export const themes: ThemeConfig[] = [
  {
    id: 'light',
    name: '日间模式',
    icon: '☀️',
    representColor: '#f8fafc',
    meshColors: ['#e2e8f0', '#f8fafc', '#64ffda', '#57cbff'],
    transitionColor: '#e2e8f0',
    isDark: false,
    colors: {
      bgPrimary: '#f8fafc',
      bgSecondary: '#f1f5f9',
      bgTertiary: '#e2e8f0',
      bgCard: '#ffffff',
      bgOverlay: 'rgba(15, 23, 42, 0.9)',
      bgGlass: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#0a192f',
      textSecondary: '#64748b',
      textMuted: '#8892b0',
      textAccent: '#64ffda',
      textLink: '#57cbff',
      textHighlight: '#020c1b',
      colorPrimary: '#64ffda',
      colorSecondary: '#57cbff',
      colorAccent: '#c792ea',
      colorWarning: '#ffcb6b',
      colorError: '#f07178',
      borderColor: '#e2e8f0',
      borderLight: '#f1f5f9',
      dividerColor: '#a8b2d1',
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      shadowGlow: '0 0 20px #64ffda',
    },
  },
  {
    id: 'dark',
    name: '夜间模式',
    icon: '🌙',
    representColor: '#0a192f',
    meshColors: ['#020c1b', '#112240', '#64ffda', '#57cbff'],
    transitionColor: '#112240',
    isDark: true,
    colors: {
      bgPrimary: '#020c1b',
      bgSecondary: '#0a192f',
      bgTertiary: '#112240',
      bgCard: '#233554',
      bgOverlay: 'rgba(10, 25, 47, 0.9)',
      bgGlass: 'rgba(100, 255, 218, 0.05)',
      textPrimary: '#ccd6f6',
      textSecondary: '#a8b2d1',
      textMuted: '#8892b0',
      textAccent: '#64ffda',
      textLink: '#57cbff',
      textHighlight: '#e6f1ff',
      colorPrimary: '#64ffda',
      colorSecondary: '#57cbff',
      colorAccent: '#c792ea',
      colorWarning: '#ffcb6b',
      colorError: '#f07178',
      borderColor: '#233554',
      borderLight: '#112240',
      dividerColor: '#64748b',
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
      shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.4)',
      shadowGlow: '0 0 20px #64ffda',
    },
  },
  {
    id: 'forest',
    name: '森林绿',
    icon: '🌲',
    representColor: '#1a3a2f',
    meshColors: ['#0d1f18', '#2d5a4a', '#4ade80', '#22d3ee'],
    transitionColor: '#2d5a4a',
    isDark: true,
    colors: {
      bgPrimary: '#0d1f18',
      bgSecondary: '#1a3a2f',
      bgTertiary: '#2d5a4a',
      bgCard: '#3d7a6a',
      bgOverlay: 'rgba(13, 31, 24, 0.9)',
      bgGlass: 'rgba(134, 239, 172, 0.05)',
      textPrimary: '#dcfce7',
      textSecondary: '#bbf7d0',
      textMuted: '#86efac',
      textAccent: '#4ade80',
      textLink: '#22d3ee',
      textHighlight: '#f0fdf4',
      colorPrimary: '#4ade80',
      colorSecondary: '#22d3ee',
      colorAccent: '#a78bfa',
      colorWarning: '#fbbf24',
      colorError: '#fb7185',
      borderColor: '#3d7a6a',
      borderLight: '#2d5a4a',
      dividerColor: '#86efac',
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
      shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.4)',
      shadowGlow: '0 0 20px #4ade80',
    },
  },
  {
    id: 'ocean',
    name: '海洋蓝',
    icon: '🌊',
    representColor: '#0c4a6e',
    meshColors: ['#082f49', '#0369a1', '#38bdf8', '#22d3ee'],
    transitionColor: '#0369a1',
    isDark: true,
    colors: {
      bgPrimary: '#082f49',
      bgSecondary: '#0c4a6e',
      bgTertiary: '#075985',
      bgCard: '#0369a1',
      bgOverlay: 'rgba(8, 47, 73, 0.9)',
      bgGlass: 'rgba(56, 189, 248, 0.05)',
      textPrimary: '#e0f2fe',
      textSecondary: '#bae6fd',
      textMuted: '#7dd3fc',
      textAccent: '#38bdf8',
      textLink: '#22d3ee',
      textHighlight: '#f0f9ff',
      colorPrimary: '#38bdf8',
      colorSecondary: '#22d3ee',
      colorAccent: '#c084fc',
      colorWarning: '#fcd34d',
      colorError: '#fb7185',
      borderColor: '#0369a1',
      borderLight: '#075985',
      dividerColor: '#7dd3fc',
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
      shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.4)',
      shadowGlow: '0 0 20px #38bdf8',
    },
  },
  {
    id: 'sunset',
    name: '日落橙',
    icon: '🌅',
    representColor: '#7c2d12',
    meshColors: ['#431407', '#9a3412', '#fb923c', '#fbbf24'],
    transitionColor: '#c2410c',
    isDark: true,
    colors: {
      bgPrimary: '#431407',
      bgSecondary: '#7c2d12',
      bgTertiary: '#9a3412',
      bgCard: '#c2410c',
      bgOverlay: 'rgba(67, 20, 7, 0.9)',
      bgGlass: 'rgba(251, 146, 60, 0.05)',
      textPrimary: '#ffedd5',
      textSecondary: '#fed7aa',
      textMuted: '#fdba74',
      textAccent: '#fb923c',
      textLink: '#fbbf24',
      textHighlight: '#fff7ed',
      colorPrimary: '#fb923c',
      colorSecondary: '#fbbf24',
      colorAccent: '#f472b6',
      colorWarning: '#facc15',
      colorError: '#f87171',
      borderColor: '#c2410c',
      borderLight: '#9a3412',
      dividerColor: '#fdba74',
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
      shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.4)',
      shadowGlow: '0 0 20px #fb923c',
    },
  },
  {
    id: 'lavender',
    name: '薰衣草',
    icon: '💜',
    representColor: '#581c87',
    meshColors: ['#3b0764', '#6b21a8', '#c084fc', '#f0abfc'],
    transitionColor: '#7e22ce',
    isDark: true,
    colors: {
      bgPrimary: '#3b0764',
      bgSecondary: '#581c87',
      bgTertiary: '#6b21a8',
      bgCard: '#7e22ce',
      bgOverlay: 'rgba(59, 7, 100, 0.9)',
      bgGlass: 'rgba(192, 132, 252, 0.05)',
      textPrimary: '#f3e8ff',
      textSecondary: '#e9d5ff',
      textMuted: '#d8b4fe',
      textAccent: '#c084fc',
      textLink: '#f0abfc',
      textHighlight: '#faf5ff',
      colorPrimary: '#c084fc',
      colorSecondary: '#f0abfc',
      colorAccent: '#67e8f9',
      colorWarning: '#fde047',
      colorError: '#fb7185',
      borderColor: '#7e22ce',
      borderLight: '#6b21a8',
      dividerColor: '#d8b4fe',
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
      shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.4)',
      shadowGlow: '0 0 20px #c084fc',
    },
  },
  {
    id: 'sakura',
    name: '樱花粉',
    icon: '🌸',
    representColor: '#fce7f3',
    meshColors: ['#fce7f3', '#fbcfe8', '#ec4899', '#f472b6'],
    transitionColor: '#fbcfe8',
    isDark: false,
    colors: {
      bgPrimary: '#fdf2f8',
      bgSecondary: '#fce7f3',
      bgTertiary: '#fbcfe8',
      bgCard: '#ffffff',
      bgOverlay: 'rgba(131, 24, 67, 0.9)',
      bgGlass: 'rgba(244, 114, 182, 0.1)',
      textPrimary: '#831843',
      textSecondary: '#9d174d',
      textMuted: '#be185d',
      textAccent: '#ec4899',
      textLink: '#db2777',
      textHighlight: '#500724',
      colorPrimary: '#ec4899',
      colorSecondary: '#f472b6',
      colorAccent: '#8b5cf6',
      colorWarning: '#f59e0b',
      colorError: '#ef4444',
      borderColor: '#fbcfe8',
      borderLight: '#fce7f3',
      dividerColor: '#f9a8d4',
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      shadowGlow: '0 0 20px #ec4899',
    },
  },
];

export const getThemeById = (id: string): ThemeConfig | undefined => {
  return themes.find(theme => theme.id === id);
};

export const getDefaultTheme = (): ThemeConfig => {
  return themes.find(theme => theme.id === 'dark') || themes[0];
};
