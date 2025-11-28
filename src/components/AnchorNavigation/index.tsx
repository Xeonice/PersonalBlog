import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import styles from './index.module.css';

interface AnchorNavigationProps {
  items: Array<{
    id: string;
    label: string;
  }>;
}

const AnchorNavigation: React.FC<AnchorNavigationProps> = ({ items }) => {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredSection, setHoveredSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const rightColumn = document.querySelector('.rightColumn') as HTMLElement;
      if (!rightColumn) return;

      const scrollPosition = rightColumn.scrollTop + 150; // 增加偏移量

      // 找到当前可视区域的section
      for (let i = items.length - 1; i >= 0; i--) {
        const section = document.getElementById(items[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const containerRect = rightColumn.getBoundingClientRect();
          const sectionTop = section.offsetTop;

          if (sectionTop <= scrollPosition) {
            setActiveSection(items[i].id);
            break;
          }
        }
      }
    };

    // 设置初始状态
    setActiveSection('about'); // 默认高亮第一个

    const rightColumn = document.querySelector('.rightColumn') as HTMLElement;
    if (rightColumn) {
      rightColumn.addEventListener('scroll', handleScroll);
      handleScroll(); // 初始调用
    }

    return () => {
      if (rightColumn) {
        rightColumn.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    // 立即设置活跃状态，提供即时反馈
    setActiveSection(sectionId);

    const rightColumn = document.querySelector('.rightColumn') as HTMLElement;
    const targetElement = document.getElementById(sectionId);

    if (targetElement && rightColumn) {
      const offset = targetElement.offsetTop - 100;
      rightColumn.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.anchorNav} aria-label="In-page jump links">
      <ul className={styles.navList}>
        {items.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredSection === item.id;
          const shouldExpand = isActive || isHovered;

          return (
            <li key={item.id} className={styles.navListItem}>
              <motion.a
                href={`#${item.id}`}
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
              </motion.a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AnchorNavigation;