import React, { useMemo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

interface SwipeProgress {
  direction: 'up' | 'down' | 'left' | 'right' | null;
  progress: number; // 0-1 基于阈值的进度
  isActive: boolean; // 是否在进行手势
  canTrigger: boolean; // 是否可以触发（边界检查通过）
  distance: number; // 实际滑动距离
}

interface SwipeButtonProps {
  direction: 'up' | 'down';
  onClick?: () => void;
  className?: string;
  swipeProgress?: SwipeProgress;
  animationDelay?: number;
  style?: 'hint' | 'prompt'; // hint = backHint 样式, prompt = mobilePromptButton 样式
  theme?: 'light' | 'dark'; // 主题样式
}

const SwipeButton = forwardRef<HTMLDivElement, SwipeButtonProps>(({
  direction,
  onClick,
  className = '',
  swipeProgress,
  animationDelay = 1.5,
  style = 'hint',
  theme = 'dark'
}, ref) => {
  const icon = direction === 'up' ? faArrowUp : faArrowDown;

  // 检查是否有相关的手势进度
  // 手势方向和按钮方向的映射关系：
  // - 下滑手势(down) 触发 上箭头按钮(up) 反馈 - 返回上一页
  // - 上滑手势(up) 触发 下箭头按钮(down) 反馈 - 进入下一页
  const gestureDirection = direction === 'up' ? 'down' : 'up';
  const isGestureActive = swipeProgress?.isActive &&
    swipeProgress?.direction === gestureDirection &&
    swipeProgress?.canTrigger;

  // 添加调试日志（减少频率）
  const shouldLog = useMemo(() => {
    // 只在状态变化时记录，避免频繁日志影响性能
    return !isGestureActive || (swipeProgress && swipeProgress.progress % 0.2 < 0.1);
  }, [isGestureActive, swipeProgress]);

  if (shouldLog) {
    console.log('SwipeButton debug:', {
      direction,
      swipeProgress,
      isGestureActive,
      gestureScale: isGestureActive ? (0.8 + (swipeProgress!.progress * 0.4)) : 1
    });
  }

  // 计算手势反馈的样式 - 使用 useMemo 优化性能
  const gestureScale = useMemo(() =>
    isGestureActive ? (0.8 + (swipeProgress!.progress * 0.4)) : 1,
    [isGestureActive, swipeProgress]
  );

  const isTriggered = useMemo(() =>
    isGestureActive && swipeProgress!.progress >= 1,
    [isGestureActive, swipeProgress]
  );

  // 选择样式类
  const baseClass = style === 'hint' ? styles.hintButton : styles.promptButton;
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;
  const buttonClass = `${baseClass} ${themeClass}`;

  return (
    <motion.div
      ref={ref}
      className={`${buttonClass} ${className} ${isTriggered ? styles.triggered : ''}`}
      initial={{ opacity: 0 as const, scale: 0.8 as const }}
      animate={{
        opacity: 1 as const, // 始终保持可见
        scale: isGestureActive ? gestureScale : (1 as const) // 只在手势时缩放
      }}
      transition={{
        opacity: {
          delay: animationDelay,
          duration: 0.6
        },
        scale: {
          duration: isGestureActive ? 0.1 : 0.6, // 加快手势响应
          type: isGestureActive ? 'tween' : 'spring',
          stiffness: 400, // 提高弹性
          damping: 25
        }
      }}
      onClick={onClick}
      style={{
        // 优化渲染性能
        transform: 'translate3d(0, 0, 0)',
        willChange: isGestureActive ? 'transform' : 'auto',
      }}
    >
      {/* 进度环 - 只在手势激活时显示 */}
      {isGestureActive && (
        <motion.div
          className={styles.progressRing}
          initial={{ rotate: -90 }}
          animate={{ rotate: -90 }}
        >
          <svg width="100%" height="100%" className={styles.progressSvg}>
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="transparent"
              stroke="var(--color-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: swipeProgress!.progress,
                stroke: isTriggered ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.6)'
              }}
              transition={{ duration: 0.2 }}
              style={{
                strokeDasharray: '1',
                transformOrigin: 'center'
              }}
            />
          </svg>
        </motion.div>
      )}

      <motion.div
        className={styles.buttonIcon}
        animate={{
          y: direction === 'up' ? [0 as const, -4 as const, 0 as const] : [0 as const, 4 as const, 0 as const],
          scale: isTriggered ? (1.2 as const) : (1 as const),
          color: isTriggered ? 'var(--color-primary)' : undefined
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          },
          scale: { duration: 0.2 },
          color: { duration: 0.2 }
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </motion.div>

      {/* 额外的触发效果 */}
      {isTriggered && (
        <motion.div
          className={styles.triggerEffect}
          initial={{ scale: 0 as const, opacity: 1 as const }}
          animate={{ scale: 1.5 as const, opacity: 0 as const }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  );
});

SwipeButton.displayName = 'SwipeButton';

export default SwipeButton;