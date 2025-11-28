import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import styles from './index.module.css';

/**
 * 动物之森风格页面切换动画
 * 效果：纯色背景从底部拉起覆盖整个屏幕，停留一段时间后再拉下去
 */

type TransitionPhase = 'idle' | 'entering' | 'holding' | 'leaving';
type TransitionVariant = 'slide' | 'wave' | 'circle' | 'blinds';

interface ThemeTransitionContextValue {
  isTransitioning: boolean;
  phase: TransitionPhase;
  startTransition: (callback?: () => void, color?: string) => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextValue | null>(null);

export const useThemeTransition = () => {
  const context = useContext(ThemeTransitionContext);
  if (!context) {
    throw new Error('useThemeTransition must be used within ThemeTransitionProvider');
  }
  return context;
};

interface ThemeTransitionProviderProps {
  children: ReactNode;
  duration?: number;
  variant?: TransitionVariant;
  icon?: string;
}

export const ThemeTransitionProvider: React.FC<ThemeTransitionProviderProps> = ({
  children,
  duration = 1000,
  variant = 'slide',
  icon = '✨',
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [transitionColor, setTransitionColor] = useState('#64ffda');

  const startTransition = useCallback((callback?: () => void, color?: string) => {
    if (isTransitioning) return;

    if (color) {
      setTransitionColor(color);
    }

    setIsTransitioning(true);
    setPhase('entering');

    // 进入完成后保持
    setTimeout(() => {
      setPhase('holding');
      // 执行实际的主题切换
      if (callback) callback();
    }, duration / 2);

    // 开始退出
    setTimeout(() => {
      setPhase('leaving');
    }, duration / 2 + 200);

    // 完全退出
    setTimeout(() => {
      setPhase('idle');
      setIsTransitioning(false);
    }, duration + 200);
  }, [isTransitioning, duration]);

  // 动画配置
  const easing = cubicBezier(0.4, 0, 0.2, 1);

  const slideVariants = {
    idle: { y: '100%' },
    entering: { y: 0 },
    holding: { y: 0 },
    leaving: { y: '-100%' },
  };

  const circleVariants = {
    idle: { scale: 0, opacity: 0 },
    entering: { scale: 1.5, opacity: 1 },
    holding: { scale: 1.5, opacity: 1 },
    leaving: { scale: 0, opacity: 0 },
  };

  return (
    <ThemeTransitionContext.Provider value={{ isTransitioning, phase, startTransition }}>
      {children}

      {/* 过渡动画遮罩 */}
      <AnimatePresence>
        {phase !== 'idle' && (
          <div className={styles.overlay}>
            {variant === 'slide' && (
              <motion.div
                className={styles.slideBg}
                style={{ backgroundColor: transitionColor }}
                initial="idle"
                animate={phase}
                variants={slideVariants}
                transition={{
                  duration: phase === 'leaving' ? duration / 2000 : duration / 2000,
                  ease: easing,
                }}
              >
                <motion.span
                  className={styles.centerIcon}
                  animate={{
                    y: ['-10px', '10px', '-10px'],
                    rotate: ['-5deg', '5deg', '-5deg'],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {icon}
                </motion.span>
              </motion.div>
            )}

            {variant === 'wave' && (
              <motion.div
                className={styles.waveBg}
                style={{ backgroundColor: transitionColor }}
                initial="idle"
                animate={phase}
                variants={slideVariants}
                transition={{
                  duration: duration / 2000,
                  ease: cubicBezier(0.34, 1.56, 0.64, 1),
                }}
              >
                <div
                  className={styles.waveTop}
                  style={{ backgroundColor: transitionColor }}
                />
              </motion.div>
            )}

            {variant === 'circle' && (
              <motion.div
                className={styles.circleBg}
                style={{ backgroundColor: transitionColor }}
                initial="idle"
                animate={phase}
                variants={circleVariants}
                transition={{
                  duration: duration / 2000,
                  ease: easing,
                }}
              />
            )}

            {variant === 'blinds' && (
              <div className={styles.blindsContainer}>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles.blindStrip}
                    style={{ backgroundColor: transitionColor }}
                    initial={{ scaleY: 0 }}
                    animate={{
                      scaleY: phase === 'idle' || phase === 'leaving' ? 0 : 1,
                      originY: phase === 'leaving' ? 0 : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      ease: easing,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </ThemeTransitionContext.Provider>
  );
};

export default ThemeTransitionProvider;
