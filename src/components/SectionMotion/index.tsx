import React from 'react';
import { motion, useInView, cubicBezier } from 'framer-motion';
import styles from './SectionMotion.module.css';

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
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: 0.1,
    margin: "-100px 0px -100px 0px"
  });

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
        ease: cubicBezier(0.645, 0.045, 0.355, 1),
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
        ease: cubicBezier(0.645, 0.045, 0.355, 1),
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