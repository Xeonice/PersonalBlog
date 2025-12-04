import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ThemeButton from '../../ThemeButton';
import ThreeJSBackground from '../../ThreeJSBackground';
import GalgameSection from '../../GalgameSection';
import MobileNavButton from '../MobileNavButton';
import { useSwipeGesture } from '../../../hooks/useSwipeGesture';
import { useConfig } from '../../../hooks/useConfig';
import { useMultiTheme } from '../../../context/ThemeContext';
import styles from './index.module.css';

interface MobileGalgamePageProps {
  currentPage: number;
  totalPages?: number;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onNavigate?: (pageIndex: number) => void;
}

const MobileGalgamePage: React.FC<MobileGalgamePageProps> = ({
  currentPage,
  totalPages = 6,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onNavigate
}) => {
  const { config } = useConfig();
  const { currentTheme } = useMultiTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 新增：用于 GalgameSection 内部滚动容器

  // 处理手势回调，添加调试信息
  const handleSwipeUp = () => {
    console.log('📱 MobileGalgamePage: handleSwipeUp called - going to next page');
    onSwipeUp?.();
  };

  const handleSwipeDown = () => {
    console.log('📱 MobileGalgamePage: handleSwipeDown called - going to previous page');
    onSwipeDown?.();
  };

  // 绑定手势检测
  const swipeHandlers = useSwipeGesture({
    onSwipeUp: handleSwipeUp,
    onSwipeDown: handleSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    threshold: 50, // 设置滑动阈值
    target: scrollContainerRef // 直接使用滚动容器的 ref
  });

  // 获取当前页面对应的内容
  const getCurrentContent = () => {
    if (!config?.navigation || currentPage < 1 || currentPage > 5) return null;

    // 页面与导航映射：
    // 第1页 -> navigation[0] (about)
    // 第2页 -> navigation[1] (experience)
    // 第3页 -> navigation[2] (principles)
    // 第4页 -> navigation[3] (article-links)
    // 第5页 -> navigation[4] (contact)
    const navigationIndex = currentPage - 1;
    const navItem = config.navigation[navigationIndex];
    const sectionData = navItem ? config.sections[navItem.id] : null;

    return sectionData;
  };

  const currentSection = getCurrentContent();

  return (
    <>
      {/* Three.js 背景 */}
      <ThreeJSBackground />

      <div ref={containerRef} className={styles.container} {...swipeHandlers}>
        {/* 统一的顶部栏 */}
        <div className={styles.topBar}>
          {/* 页面指示器 */}
          <div className={styles.pageIndicator}>
            <span>{currentPage}/5</span>
          </div>

          {/* 简化的返回提示 */}
          <motion.div
            className={styles.backHint}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            onClick={handleSwipeDown}
          >
            <motion.div
              className={styles.backIcon}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </motion.div>
          </motion.div>

          {/* 主题切换按钮 */}
          <ThemeButton />
        </div>

        {/* 主要内容区域 */}
        <div ref={contentRef} className={styles.content}>
          <AnimatePresence mode="wait">
            {currentSection ? (
              <motion.div
                key={`section-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className={styles.sectionContainer}
              >
                <GalgameSection
                  key={`galgame-section-${currentPage}`}
                  sections={[currentSection]}
                  currentSectionIndex={0}
                  isMobilePage={true}
                  currentPage={currentPage}
                  totalPages={5}
                  scrollContainerRef={scrollContainerRef}
                  onSectionComplete={() => {
                    // 章节内容完成，但不自动跳转页面
                    // 跳转由滑动手势或点击继续按钮触发
                  }}
                  onMobilePageNext={handleSwipeUp}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`placeholder-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className={styles.placeholder}
              >
                <h1>第 {currentPage} 页</h1>
                <p>内容正在准备中...</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>


      </div>

      {/* 导航按钮 */}
      <MobileNavButton
        currentPage={currentPage}
        totalPages={totalPages}
        onNavigate={onNavigate}
        isDark={currentTheme.isDark}
      />
    </>
  );
};

export default MobileGalgamePage;