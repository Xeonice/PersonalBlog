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

const TypewriterText: React.FC<TypewriterTextProps> = React.memo(({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
  enableSkip = true,
  skipToEnd = false,
}) => {
  // 使用稳定的 key，只在 text 真正变化时重置，不受 delay 影响
  const textKey = text; // 移除 delay，避免不必要的重置
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // 新增：动画锁定状态
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTextKeyRef = useRef(textKey);
  const initialDelayRef = useRef(delay); // 记住初始延迟值

  // 跳过动画，立即显示全部文本
  const skipAnimation = useCallback(() => {
    console.log('skipAnimation called:', { isAnimating, isLocked, hasStarted });

    if (!isAnimating) {
      console.log('skipAnimation: Animation not running, returning');
      return;
    }

    console.log('skipAnimation: Executing skip...');

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('skipAnimation: Cleared interval');
    }

    setDisplayedText(text);
    setIsAnimating(false);
    setIsLocked(false); // 解锁动画
    console.log('skipAnimation: Set final state, calling onComplete');
    onComplete?.();
  }, [text, isAnimating, isLocked, hasStarted, onComplete]);

  // 开始打字动画
  const startAnimation = useCallback(() => {
    if (isLocked) return; // 防止动画被重复启动

    setIsLocked(true); // 锁定动画，防止外部干扰
    setIsAnimating(true);
    setHasStarted(true);
    let currentIndex = 0;
    setDisplayedText('');

    intervalRef.current = setInterval(() => {
      currentIndex += 1;

      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));

        if (currentIndex === text.length) {
          // 动画完成
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsAnimating(false);
          setIsLocked(false); // 解锁动画
          // 使用 setTimeout 来避免状态更新时机问题
          setTimeout(() => {
            onComplete?.();
          }, 0);
        }
      }
    }, speed);
  }, [text, speed, onComplete, isLocked]);

  // 使用 useEffect 来重置状态，但只在文本真正变化且未锁定时重置
  useEffect(() => {
    if (lastTextKeyRef.current !== textKey && !isLocked) {
      lastTextKeyRef.current = textKey;
      // 清理旧的 timers
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // 异步重置状态
      setTimeout(() => {
        setDisplayedText('');
        setIsAnimating(false);
        setHasStarted(false);
        setIsLocked(false);
        initialDelayRef.current = delay; // 更新初始延迟
      }, 0);
    }
  }, [textKey, isLocked, delay]);

  useEffect(() => {
    // 清理函数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 启动动画的 effect - 使用稳定的延迟值和锁定机制
  useEffect(() => {
    if (lastTextKeyRef.current === textKey && !isLocked && !hasStarted) {
      const useDelay = initialDelayRef.current;
      // 延迟后开始动画
      if (useDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          if (!isLocked) { // 双重检查锁定状态
            startAnimation();
          }
        }, useDelay);
      } else {
        // 使用 requestAnimationFrame 确保在下一帧开始动画
        requestAnimationFrame(() => {
          if (!isLocked) { // 双重检查锁定状态
            startAnimation();
          }
        });
      }
    }
  }, [textKey, startAnimation, isLocked, hasStarted]);

  // 外部触发的跳过效果
  useEffect(() => {
    if (skipToEnd && isAnimating) {
      // 使用 setTimeout 异步调用，避免在 effect 中同步调用 setState
      setTimeout(() => {
        skipAnimation();
      }, 0);
    }
  }, [skipToEnd, isAnimating, skipAnimation]);

  const handleClick = (e: React.MouseEvent) => {
    console.log('TypewriterText clicked:', {
      enableSkip,
      isAnimating,
      isLocked,
      hasStarted,
      displayedText: displayedText.length,
      textLength: text.length
    });
    if (enableSkip && isAnimating) {
      // 在 React 中，通常只需要 stopPropagation 就足够了
      e.stopPropagation(); // 防止事件冒泡到父组件

      console.log('Calling skipAnimation...');
      skipAnimation();
    } else {
      console.log('Skip conditions not met:', {
        enableSkip,
        isAnimating,
        conditionMet: enableSkip && isAnimating
      });
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
        lineHeight: 'inherit',
        color: 'inherit',
        fontSize: 'inherit',
        // 防止手势事件干扰
        touchAction: enableSkip && isAnimating ? 'manipulation' : 'auto',
        // 提高层级以避免被手势动画影响，并使用 transform3d 开启硬件加速
        position: 'relative',
        zIndex: isAnimating ? 10 : 'auto',
        transform: 'translate3d(0, 0, 0)', // 开启硬件加速，独立渲染层
        willChange: isAnimating ? 'opacity' : 'auto', // 优化动画性能
      }}
    >
      {/* 在动画未开始时不显示任何内容，避免水合不匹配 */}
      {!hasStarted ? null : displayedText}
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
}, (prevProps, nextProps) => {
  // 自定义比较函数：只有在关键属性真正变化时才重新渲染
  return (
    prevProps.text === nextProps.text &&
    prevProps.className === nextProps.className &&
    prevProps.enableSkip === nextProps.enableSkip &&
    prevProps.skipToEnd === nextProps.skipToEnd &&
    // 忽略 speed, delay, onComplete 的变化，避免不必要的重新渲染
    // 但保留 skipToEnd 因为它用于外部触发跳过
    true
  );
});

TypewriterText.displayName = 'TypewriterText';

export default TypewriterText;