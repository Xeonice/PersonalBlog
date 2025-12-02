import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useMultiTheme } from '../../context/ThemeContext';
import { useDeviceType } from '../../hooks/useDeviceType';
import styles from './GalgameButton.module.css';

interface GalgameButtonProps {
  type: 'hint' | 'continue';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  motionProps?: MotionProps;
}

const GalgameButton: React.FC<GalgameButtonProps> = ({
  type,
  children,
  onClick,
  className = '',
  motionProps
}) => {
  const { currentTheme } = useMultiTheme();
  const { isMobile } = useDeviceType();

  const buttonClass = type === 'hint' ? styles.hintButton : styles.continueButton;
  const themeClass = currentTheme.isDark ? styles.darkTheme : styles.lightTheme;
  const deviceClass = isMobile ? styles.mobile : styles.desktop;

  if (motionProps) {
    return (
      <motion.div
        className={`${buttonClass} ${themeClass} ${deviceClass} ${className}`}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`${buttonClass} ${themeClass} ${deviceClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GalgameButton;