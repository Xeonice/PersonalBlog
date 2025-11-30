import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './SectionMotion.module.css';

// 缓动函数提取到模块级别，避免每次渲染重新创建
const EASING: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

interface SectionMotionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  stagger?: boolean;
  triggerOnce?: boolean;
}

const directionVariants = {
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
  left: { x: 50, opacity: 0 },
  right: { x: -50, opacity: 0 },
};

const SectionMotion: React.FC<SectionMotionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 50,
  stagger = false,
  triggerOnce = true,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  // 延迟创建 IntersectionObserver，让首次渲染完成后再检测
  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered.current)) return;

    let observer: IntersectionObserver | null = null;

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
        { threshold: 0.1, rootMargin: '-100px 0px -100px 0px' }
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

  const baseVariants = {
    hidden: {
      ...directionVariants[direction],
      [direction === 'up' || direction === 'down' ? 'y' : 'x']:
        direction === 'up' || direction === 'right' ? distance : -distance,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: EASING,
        ...(stagger && {
          staggerChildren: 0.1,
          delayChildren: delay,
        }),
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration * 0.7,
        ease: EASING,
      },
    },
  };

  const sectionClasses = [
    styles.sectionMotion,
    styles[direction],
    className,
  ].filter(Boolean).join(' ');

  if (stagger) {
    return (
      <motion.section
        ref={ref}
        id={id}
        className={sectionClasses}
        variants={baseVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={staggerVariants}>
            {child}
          </motion.div>
        ))}
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={sectionClasses}
      variants={baseVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  );
};

export default SectionMotion;