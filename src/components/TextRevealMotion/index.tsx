import React from 'react';
import { motion, useInView, cubicBezier } from 'framer-motion';
import styles from './TextRevealMotion.module.css';

interface TextRevealMotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
  maskColor?: string;
}

/**
 * 文字揭示动画组件 - 高级组合效果
 * 效果：遮罩向右滑出 + 文字淡入上移
 */
const TextRevealMotion: React.FC<TextRevealMotionProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  className = '',
  triggerOnce = true,
  maskColor = 'var(--text-primary)',
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: 'some',
    margin: '50px 0px 0px 0px',
  });

  // 动画曲线
  const easing = cubicBezier(0.65, 0, 0.35, 1);

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
            ease: easing,
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
            ease: easing,
          }}
        />
      </div>
    </div>
  );
};

export default TextRevealMotion;
