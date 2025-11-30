import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import styles from './index.module.css';

interface NavigationItem {
  id: string;
  label: string;
}

interface AnchorNavigationProps {
  items: NavigationItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
}

/**
 * 导航组件 - 用于页面间切换
 * 移除了锚点跳转能力，改为通过 onNavigate 回调处理页面切换
 */
const AnchorNavigation: React.FC<AnchorNavigationProps> = ({
  items,
  activeId,
  onNavigate,
}) => {
  const [hoveredSection, setHoveredSection] = useState('');
  // 如果没有传入 activeId，默认使用第一个 item
  const activeSection = activeId || (items.length > 0 ? items[0].id : '');

  const handleClick = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  return (
    <nav className={styles.anchorNav} aria-label="Page navigation">
      <ul className={styles.navList}>
        {items.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredSection === item.id;
          const shouldExpand = isActive || isHovered;

          return (
            <li key={item.id} className={styles.navListItem}>
              <motion.button
                type="button"
                className={classnames(styles.navItem, {
                  [styles.active]: isActive,
                })}
                onClick={(e) => handleClick(e, item.id)}
                onHoverStart={() => setHoveredSection(item.id)}
                onHoverEnd={() => setHoveredSection('')}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <motion.span
                  className={styles.indicator}
                  animate={{
                    width: shouldExpand ? '4rem' : '2rem',
                    opacity: shouldExpand ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.span
                  className={styles.label}
                  animate={{
                    color: shouldExpand ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: shouldExpand ? 600 : 500,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AnchorNavigation;