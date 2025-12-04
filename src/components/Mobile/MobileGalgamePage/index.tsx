import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeButton from '../../ThemeButton';
import ThreeJSBackground from '../../ThreeJSBackground';
import GalgameSection from '../../GalgameSection';
import MobileNavButton from '../MobileNavButton';
import SwipeButton from '../SwipeButton';
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

interface SwipeProgress {
  direction: 'up' | 'down' | 'left' | 'right' | null;
  progress: number;
  isActive: boolean;
  canTrigger: boolean;
  distance: number;
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
  const backSwipeButtonRef = useRef<HTMLDivElement>(null); // 返回上一页的 SwipeButton 引用
  const nextSwipeButtonRef = useRef<HTMLDivElement>(null); // 进入下一页的 SwipeButton 引用

  // 手势进度状态
  const [swipeProgress, setSwipeProgress] = useState<SwipeProgress>({
    direction: null,
    progress: 0,
    isActive: false,
    canTrigger: false,
    distance: 0
  });

  // 处理手势回调，添加调试信息
  const handleSwipeUp = () => {
    console.log('📱 MobileGalgamePage: handleSwipeUp called - going to next page');
    onSwipeUp?.();
  };

  const handleSwipeDown = () => {
    console.log('📱 MobileGalgamePage: handleSwipeDown called - going to previous page');
    onSwipeDown?.();
  };

  // 处理手势进度回调 - 添加节流避免频繁更新
  const handleSwipeProgress = useCallback((progress: SwipeProgress) => {
    console.log('📱 MobileGalgamePage received swipe progress:', progress);

    // 只在状态真正变化时更新
    setSwipeProgress(prev => {
      if (
        prev.direction === progress.direction &&
        prev.isActive === progress.isActive &&
        prev.canTrigger === progress.canTrigger &&
        Math.abs(prev.progress - progress.progress) < 0.01 &&
        Math.abs(prev.distance - progress.distance) < 1
      ) {
        return prev; // 避免不必要的重新渲染
      }
      return progress;
    });
  }, []);

  // 绑定手势检测
  const swipeHandlers = useSwipeGesture({
    onSwipeUp: handleSwipeUp,
    onSwipeDown: handleSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    onSwipeProgress: handleSwipeProgress,
    threshold: 50, // 设置滑动阈值
    target: scrollContainerRef, // 直接使用滚动容器的 ref
    upSwipeButtonRef: nextSwipeButtonRef, // 上滑对应的按钮（向下箭头，进入下一页）
    downSwipeButtonRef: backSwipeButtonRef, // 下滑对应的按钮（向上箭头，返回上一页）
    requireSwipeButtonVisible: true // GalgameContainer 页面需要检查 SwipeButton 可见性
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

          {/* 返回提示按钮 - 下滑手势触发返回上一页，显示向上箭头 */}
          <SwipeButton
            ref={backSwipeButtonRef}
            direction="up"
            onClick={handleSwipeDown}
            swipeProgress={swipeProgress}
            style="hint"
            animationDelay={1.5}
            theme={currentTheme.isDark ? 'dark' : 'light'}
          />

          {/* 主题切换按钮 */}
          <ThemeButton />
        </div>

        {/* 主要内容区域 */}
        <div ref={contentRef} className={styles.content}>
          <AnimatePresence mode="wait">
            {currentSection ? (
              <motion.div
                key={`section-${currentPage}`}
                initial={{ opacity: 0 as const, y: 20 as const }}
                animate={{ opacity: 1 as const, y: 0 as const }}
                exit={{ opacity: 0 as const, y: -20 as const }}
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
                  swipeProgress={swipeProgress}
                  nextPageSwipeButtonRef={nextSwipeButtonRef}
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
                initial={{ opacity: 0 as const, y: 20 as const }}
                animate={{ opacity: 1 as const, y: 0 as const }}
                exit={{ opacity: 0 as const, y: -20 as const }}
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