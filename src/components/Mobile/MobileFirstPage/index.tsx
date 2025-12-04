import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import TextRevealMotion from '../../TextRevealMotion';
import ThemeButton from '../../ThemeButton';
import ThreeJSBackground from '../../ThreeJSBackground';
import { useSwipeGesture } from '../../../hooks/useSwipeGesture';
import styles from './index.module.css';

interface SocialIcon {
  id: string;
  icon: string | IconDefinition;
  href: string;
  label: string;
}

interface MobileFirstPageProps {
  onSwipeDown?: () => void;
  onSwipeUp?: () => void;
  config?: {
    socialIcons?: SocialIcon[];
  };
}

const MobileFirstPage: React.FC<MobileFirstPageProps> = ({
  onSwipeDown,
  onSwipeUp,
  config
}) => {
  const [hoveredIcon, setHoveredIcon] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 图标映射
  const iconMap: Record<string, IconDefinition> = {
    'github': faGithub,
    'twitter': faTwitter,
    'file-pdf': faFilePdf
  };

  // 处理社交图标
  const socialIcons = config?.socialIcons?.map(item => ({
    ...item,
    icon: typeof item.icon === 'string' ? (iconMap[item.icon] || faGithub) : item.icon
  })) || [];

  // 处理向上滑动手势（首页进入下一页）
  const handleSwipeUp = () => {
    console.log('📱 MobileFirstPage: handleSwipeUp called - going to next page');
    onSwipeUp?.();
  };

  // 处理向下滑动手势（首页没有上一页）
  const handleSwipeDown = () => {
    debugger;
    console.log('📱 MobileFirstPage: handleSwipeDown called (no action - already at first page)');
    onSwipeDown?.();
  };

  // 绑定手势检测（首页使用整个容器，因为没有滚动内容）
  const swipeHandlers = useSwipeGesture({
    onSwipeUp: handleSwipeUp,
    onSwipeDown: handleSwipeDown,
    threshold: 50, // 设置滑动阈值
    target: containerRef // 使用整个容器作为检测目标，包括提示区域
  });

  return (
    <>
      {/* Three.js 背景 */}
      <ThreeJSBackground />

      <div ref={containerRef} className={styles.container} {...swipeHandlers}>
        {/* 顶部主题切换按钮 */}
        <div className={styles.topBar}>
          <ThemeButton />
        </div>

        {/* 主要内容区域 */}
        <div ref={contentRef} className={styles.content}>
          {/* 个人信息 */}
          <div className={styles.personalInfo}>
            <TextRevealMotion delay={0.2} duration={0.7}>
              <h1 className={styles.name}>Douglas</h1>
            </TextRevealMotion>

            <TextRevealMotion delay={0.5} duration={0.7}>
              <h2 className={styles.title}>产品工程师</h2>
            </TextRevealMotion>

            <TextRevealMotion delay={0.8} duration={0.7}>
              <p className={styles.description}>
                欢迎来到 Douglas 的自留地，一个持续奋斗在搬砖路上的产品工程师。
              </p>
            </TextRevealMotion>
          </div>

          {/* 社交图标 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className={styles.socialIcons}
          >
            {socialIcons.map((social) => (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                onHoverStart={() => setHoveredIcon(social.id)}
                onHoverEnd={() => setHoveredIcon('')}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                aria-label={social.label}
              >
                <motion.div
                  animate={{
                    color: hoveredIcon === social.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <FontAwesomeIcon icon={social.icon} size="xl" />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* 上滑提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className={styles.swipeHint}
          onClick={handleSwipeUp}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={styles.swipeIndicator}
          >
            <div className={styles.arrow}>↑</div>
          </motion.div>
          <p className={styles.swipeText}>向上滑动开始</p>
        </motion.div>
      </div>
    </>
  );
};

export default MobileFirstPage;