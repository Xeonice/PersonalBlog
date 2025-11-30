import React from 'react';
import { motion } from 'framer-motion';
import { useMultiTheme } from '../../context/ThemeContext';
import styles from './GalgameButton.module.css';

interface GalgameButtonProps {
  type: 'hint' | 'continue';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  motionProps?: any;
}

const GalgameButton: React.FC<GalgameButtonProps> = ({
  type,
  children,
  onClick,
  className = '',
  motionProps
}) => {
  const { currentTheme } = useMultiTheme();

  const buttonClass = type === 'hint' ? styles.hintButton : styles.continueButton;
  const themeClass = currentTheme.isDark ? styles.darkTheme : styles.lightTheme;

  const MotionComponent = motionProps ? motion.div : 'div';

  return (
    <MotionComponent
      className={`${buttonClass} ${themeClass} ${className}`}
      onClick={onClick}
      {...(motionProps || {})}
    >
      {children}
    </MotionComponent>
  );
};

export default GalgameButton;