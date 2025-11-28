import React from 'react';
import { motion, Variants, useInView, cubicBezier, Transition } from 'framer-motion';
import styles from './TextRevealMotion.module.css';

export type TextRevealVariant = 'overlay' | 'clipPath' | 'advanced' | 'wipe';

interface TextRevealMotionProps {
  children: React.ReactNode;
  variant?: TextRevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

interface CustomVariants extends Variants {
  hidden: {
    opacity?: number;
    y?: number;
    x?: number;
    clipPath?: string;
    rotateX?: number;
    transformPerspective?: number;
    transition?: Transition;
  };
  visible: {
    opacity?: number;
    y?: number;
    x?: number;
    clipPath?: string;
    rotateX?: number;
    transformPerspective?: number;
    transition?: Transition;
  };
}

const variants: Record<TextRevealVariant, CustomVariants> = {
  overlay: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.645, 0.045, 0.355, 1),
      },
    },
  },
  clipPath: {
    hidden: {
      clipPath: 'inset(0 100% 0 0)',
    },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 1.2,
        ease: cubicBezier(0.645, 0.045, 0.355, 1),
      },
    },
  },
  advanced: {
    hidden: {
      opacity: 0,
      y: 75,
      rotateX: -90,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: cubicBezier(0.215, 0.61, 0.355, 1),
      },
    },
  },
  wipe: {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      },
    },
  },
};

const TextRevealMotion: React.FC<TextRevealMotionProps> = ({
  children,
  variant = 'overlay',
  delay = 0,
  duration,
  className = '',
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold
  });

  const selectedVariants = React.useMemo((): CustomVariants => {
    const baseVariants = variants[variant];

    if (duration || delay) {
      const baseTransition = baseVariants.visible.transition || {};
      return {
        hidden: baseVariants.hidden,
        visible: {
          ...baseVariants.visible,
          transition: {
            ...baseTransition,
            ...(duration && { duration }),
            ...(delay && { delay }),
          },
        },
      };
    }

    return baseVariants;
  }, [variant, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariants}
      className={`${styles.textReveal} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default TextRevealMotion;