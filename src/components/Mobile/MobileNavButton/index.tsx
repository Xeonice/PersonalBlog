import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileMenu from '../MobileMenu';
import styles from './index.module.css';

interface MobileNavButtonProps {
  currentPage: number;
  totalPages?: number;
  onNavigate?: (pageIndex: number) => void;
  isDark?: boolean;
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({
  currentPage,
  totalPages = 6,
  onNavigate,
  isDark = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (pageIndex: number) => {
    onNavigate?.(pageIndex);
    setIsMenuOpen(false); // 导航后关闭菜单
  };

  return (
    <>
      {/* 固定的导航按钮 - 左下角 */}
      <motion.button
        className={`${styles.navButton} ${isDark ? styles.darkTheme : ''}`}
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 as const, y: 20 as const }}
        animate={{ opacity: 1 as const, y: 0 as const }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            className={styles.navIcon}
          />
        </motion.div>
      </motion.button>

      {/* 全屏菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            currentPage={currentPage}
            totalPages={totalPages}
            onNavigate={handleNavigate}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavButton;