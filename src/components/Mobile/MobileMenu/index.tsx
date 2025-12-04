import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.css';

interface MobileMenuProps {
  currentPage: number;
  totalPages?: number;
  onNavigate: (pageIndex: number) => void;
  onClose: () => void;
}

// 简化的页面配置
const mobilePages = [
  { index: 0, title: '首页' },
  { index: 1, title: '关于我' },
  { index: 2, title: '工作经历' },
  { index: 3, title: '个人准则' },
  { index: 4, title: '文章作品' },
  { index: 5, title: '联系方式' }
];

const MobileMenu: React.FC<MobileMenuProps> = ({
  currentPage,
  totalPages = 6,
  onNavigate,
  onClose
}) => {
  const handleNavigate = (pageIndex: number) => {
    onNavigate(pageIndex);
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 as const }}
      animate={{ opacity: 1 as const }}
      exit={{ opacity: 0 as const }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.menu}
        initial={{ opacity: 0 as const, y: 20 as const }}
        animate={{ opacity: 1 as const, y: 0 as const }}
        exit={{ opacity: 0 as const, y: 20 as const }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {mobilePages.slice(0, totalPages).map((page) => {
          const isActive = currentPage === page.index;
          return (
            <motion.button
              key={page.index}
              className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
              onClick={() => handleNavigate(page.index)}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.pageNumber}>{page.index + 1}</span>
              <span className={styles.pageTitle}>{page.title}</span>
              {isActive && <span className={styles.activeDot} />}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;