import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './TextRevealMotion.module.css';

interface TextRevealMotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
  maskColor?: string;
}

// 缓动函数提取到模块级别，避免每次渲染重新创建
const EASING: [number, number, number, number] = [0.65, 0, 0.35, 1];

/**
 * 文字揭示动画组件 - 高级组合效果
 * 效果：遮罩向右滑出 + 文字淡入上移
 *
 * 性能优化：延迟 IntersectionObserver 创建，避免初始化卡顿
 */
const TextRevealMotion: React.FC<TextRevealMotionProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  className = '',
  triggerOnce = true,
  maskColor = 'var(--text-primary)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  // 延迟创建 IntersectionObserver，让首次渲染完成后再检测
  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered.current)) return;

    let observer: IntersectionObserver | null = null;

    // 使用 requestAnimationFrame 延迟到下一帧，避免阻塞首次渲染
    const rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true);
            hasTriggered.current = true;
            if (triggerOnce && observer) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        },
        { threshold: 0.1, rootMargin: '50px 0px 0px 0px' }
      );

      observer.observe(element);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [triggerOnce]);

  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`}>
      <div className={styles.container}>
        {/* 文字内容 - 淡入 + 上移 */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: duration * 0.85,
            delay: delay + duration * 0.2,
            ease: EASING,
          }}
        >
          {children}
        </motion.div>

        {/* 遮罩块 - 向右滑出 */}
        <motion.div
          className={styles.mask}
          style={{ backgroundColor: maskColor }}
          initial={{ x: 0 }}
          animate={isInView ? { x: '100%' } : { x: 0 }}
          transition={{
            duration: duration,
            delay: delay,
            ease: EASING,
          }}
        />
      </div>
    </div>
  );
};

export default TextRevealMotion;
