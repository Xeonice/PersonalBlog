'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMultiTheme } from '../../context/ThemeContext';
import styles from './index.module.css';

// 缓动函数提取到模块级别
const EASING: [number, number, number, number] = [0.4, 0, 0.2, 1];

/**
 * 静态 Mesh 渐变组件
 * 使用多层 CSS radial-gradient 模拟 mesh gradient 效果
 */
function StaticMeshGradient({ colors }: { colors: string[] }) {
  // 确保至少有 4 个颜色
  const safeColors = [...colors];
  while (safeColors.length < 4) {
    safeColors.push(safeColors[safeColors.length - 1] || '#000000');
  }

  const [c1, c2, c3, c4] = safeColors;

  // 使用多层叠加的 radial-gradient 创建 mesh 效果
  const gradientStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: `
      radial-gradient(circle at 30% 20%, ${c1} 0%, transparent 50%),
      radial-gradient(circle at 80% 30%, ${c2} 0%, transparent 45%),
      radial-gradient(circle at 20% 80%, ${c3} 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, ${c4} 0%, transparent 45%),
      linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)
    `,
    backgroundBlendMode: 'normal',
  };

  return <div style={gradientStyle} />;
}

/**
 * 主题选择器组件
 * 圆形按钮显示当前主题的渐变色，点击后展开下拉菜单选择配色
 */
export default function ThemeButton(): React.ReactElement {
  const { currentTheme, availableThemes, setTheme, mounted } = useMultiTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // 动画配置 - 使用模块级别的 EASING 常量
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: EASING,
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: EASING,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: EASING },
    },
  };

  // 未挂载时显示占位符
  if (!mounted) {
    return (
      <div className={styles.container}>
        <button
          className={styles.themeButton}
          disabled
          aria-label="Loading theme"
        >
          <span className={styles.colorCircle}>
            <div className={styles.gradientPlaceholder} />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {/* 主题按钮 */}
      <motion.button
        className={styles.themeButton}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`当前主题: ${currentTheme.name}，点击切换主题`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <motion.span
          className={styles.colorCircle}
          animate={{
            boxShadow: isOpen
              ? `0 0 0 3px var(--bg-primary), 0 0 0 5px ${currentTheme.colors.colorPrimary}`
              : `0 2px 8px rgba(0, 0, 0, 0.2)`,
          }}
          transition={{ duration: 0.2 }}
        >
          <StaticMeshGradient colors={currentTheme.meshColors} />
        </motion.span>
      </motion.button>

      {/* 下拉菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="listbox"
            aria-label="选择主题"
          >
            <div className={styles.dropdownHeader}>
              <span>选择主题</span>
            </div>
            <div className={styles.themeList}>
              {availableThemes.map((theme) => (
                <motion.button
                  key={theme.id}
                  className={`${styles.themeOption} ${
                    currentTheme.id === theme.id ? styles.active : ''
                  }`}
                  variants={itemVariants}
                  onClick={() => handleThemeSelect(theme.id)}
                  whileHover={{ x: 4, backgroundColor: 'var(--bg-tertiary)' }}
                  whileTap={{ scale: 0.98 }}
                  role="option"
                  aria-selected={currentTheme.id === theme.id}
                >
                  <span className={styles.optionColor}>
                    <StaticMeshGradient colors={theme.meshColors} />
                  </span>
                  <span className={styles.optionName}>{theme.name}</span>
                  {currentTheme.id === theme.id && (
                    <motion.span
                      className={styles.checkMark}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13.5 4.5L6 12L2.5 8.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
