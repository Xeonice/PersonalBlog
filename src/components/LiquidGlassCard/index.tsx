import React from 'react';
import { motion, cubicBezier } from 'framer-motion';
import LiquidGlass from 'liquid-glass-react';
import styles from './LiquidGlassCard.module.css';

export type LiquidGlassVariant = 'default' | 'prominent' | 'subtle' | 'interactive';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  variant?: LiquidGlassVariant;
  glassOpacity?: number;
  blurAmount?: number;
  borderRadius?: number;
  shadow?: boolean;
  hover?: boolean;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const variantConfig = {
  default: {
    opacity: 0.1,
    blur: 10,
    radius: 16,
    shadow: true,
  },
  prominent: {
    opacity: 0.2,
    blur: 20,
    radius: 20,
    shadow: true,
  },
  subtle: {
    opacity: 0.05,
    blur: 8,
    radius: 12,
    shadow: false,
  },
  interactive: {
    opacity: 0.15,
    blur: 15,
    radius: 18,
    shadow: true,
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.645, 0.045, 0.355, 1),
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  variant = 'default',
  glassOpacity,
  blurAmount,
  borderRadius,
  shadow = true,
  hover = true,
  animated = true,
  className = '',
  style = {},
}) => {
  const config = variantConfig[variant];

  const finalOpacity = glassOpacity ?? config.opacity;
  const finalBlur = blurAmount ?? config.blur;
  const finalRadius = borderRadius ?? config.radius;
  const finalShadow = shadow && config.shadow;

  const cardClasses = [
    styles.liquidGlassCard,
    styles[variant],
    finalShadow && styles.withShadow,
    hover && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cardStyle: React.CSSProperties = {
    borderRadius: `${finalRadius}px`,
    ...style,
  };

  const content = (
    <LiquidGlass
      displacementScale={finalBlur * 2}
      blurAmount={finalOpacity}
      cornerRadius={finalRadius}
      padding="0"
      mode="standard"
      className={styles.glassEffect}
    >
      <div className={styles.cardContent}>
        {children}
      </div>
    </LiquidGlass>
  );

  if (animated) {
    return (
      <motion.div
        className={cardClasses}
        style={cardStyle}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover={hover ? 'hover' : undefined}
        whileTap="tap"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} style={cardStyle}>
      {content}
    </div>
  );
};

export default LiquidGlassCard;