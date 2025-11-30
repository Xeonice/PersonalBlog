import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number; // 打字速度，毫秒/字符
  delay?: number; // 开始延迟
  onComplete?: () => void;
  className?: string;
  enableSkip?: boolean; // 是否允许点击跳过
  skipToEnd?: boolean; // 外部触发跳到结尾
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
  enableSkip = true,
  skipToEnd = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 跳过动画，立即显示全部文本
  const skipAnimation = useCallback(() => {
    if (!isAnimating) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setDisplayedText(text);
    setCurrentIndex(text.length);
    setIsAnimating(false);
    setIsComplete(true);
    onComplete?.();
  }, [text, isAnimating, onComplete]);

  // 开始打字动画
  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setCurrentIndex(0);
    setDisplayedText('');

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex <= text.length) {
          setDisplayedText(text.slice(0, nextIndex));

          if (nextIndex === text.length) {
            // 动画完成
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsAnimating(false);
            setIsComplete(true);
            // 使用 setTimeout 来避免状态更新时机问题
            setTimeout(() => {
              onComplete?.();
            }, 0);
          }

          return nextIndex;
        }

        return prevIndex;
      });
    }, speed);
  }, [text, speed]); // 移除 onComplete 依赖

  useEffect(() => {
    // 只有在文本真正改变时才重置
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setIsAnimating(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 延迟后开始动画
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        startAnimation();
      }, delay);
    } else {
      startAnimation();
    }

    // 清理函数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text]); // 只依赖 text 变化

  // 外部触发的跳过效果
  useEffect(() => {
    if (skipToEnd && isAnimating) {
      skipAnimation();
    }
  }, [skipToEnd, isAnimating, skipAnimation]);

  const handleClick = (e: React.MouseEvent) => {
    if (enableSkip) {
      e.stopPropagation();
      skipAnimation();
    }
  };

  return (
    <motion.div
      className={`typewriter-text ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      style={{
        cursor: enableSkip && isAnimating ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {displayedText}
      {isAnimating && (
        <motion.span
          className="cursor"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            backgroundColor: 'currentColor',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </motion.div>
  );
};

export default TypewriterText;