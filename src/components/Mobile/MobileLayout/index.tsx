import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import DeviceDebugger from '../../DeviceDebugger';
import MobileFirstPage from '../MobileFirstPage';
import MobileGalgamePage from '../MobileGalgamePage';
import { useConfig } from '../../../hooks/useConfig';
import styles from './index.module.css';

interface MobileLayoutProps {
  defaultSection: string;
}

// 移动端页面映射
const mobilePages = [
  { index: 0, route: '/', section: null },        // 第0页：个人信息页
  { index: 1, route: '/about', section: 'about' },     // 第1页：关于我
  { index: 2, route: '/experience', section: 'experience' }, // 第2页：经历
  { index: 3, route: '/principles', section: 'principles' }, // 第3页：准则
  { index: 4, route: '/article-links', section: 'article-links' }, // 第4页：文章
  { index: 5, route: '/contact', section: 'contact' }  // 第5页：联系
];

const MobileLayout: React.FC<MobileLayoutProps> = ({ defaultSection }) => {
  const router = useRouter();
  const { config } = useConfig();

  // 根据 defaultSection 计算初始页面（派生状态）
  const initialPage = useMemo(() => {
    console.log('🔄 Calculating initial page, defaultSection:', defaultSection);

    // 根据 defaultSection 找对应页面
    const page = mobilePages.find(p => p.section === defaultSection);
    if (page) {
      console.log('📍 Found matching page:', page);
      return page.index;
    } else if (defaultSection === 'about') {
      // 特殊处理：about section 对应首页之后的第1页
      console.log('📍 Setting page to 1 for about section');
      return 1;
    } else {
      console.log('⚠️ No matching page found for defaultSection:', defaultSection);
      // 如果没有找到匹配的页面，默认显示首页
      return 0;
    }
  }, [defaultSection]);

  const [currentPage, setCurrentPage] = useState(initialPage);

  // 当 defaultSection 变化时同步 currentPage
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  // 路由同步逻辑
  const navigateToPage = (pageIndex: number) => {
    console.log(`🔄 Navigating to page ${pageIndex}, current page: ${currentPage}`);
    setCurrentPage(pageIndex);

    // 更新路由
    const targetRoute = mobilePages[pageIndex].route;
    console.log(`🛣️ Target route: ${targetRoute}, current route: ${router.pathname}`);
    if (targetRoute !== router.pathname) {
      router.push(targetRoute, undefined, { shallow: true });
    }
  };

  // 处理向上滑动进入下一页
  const handleSwipeUp = () => {
    console.log('🏠 MobileLayout: handleSwipeUp called, current page:', currentPage);
    if (currentPage < 5) {
      navigateToPage(currentPage + 1);
    }
  };

  // 处理向下滑动返回上一页
  const handleSwipeDown = () => {
    console.log('🏠 MobileLayout: handleSwipeDown called, current page:', currentPage);
    if (currentPage > 0) {
      navigateToPage(currentPage - 1);
    }
  };

  // 首页专用：向上滑动进入第二页
  const handleFirstPageSwipeUp = () => {
    console.log('🏠 MobileLayout: handleFirstPageSwipeUp called, navigating to page 1');
    navigateToPage(1); // 进入关于我页面
  };


  return (
    <div className={styles.mobileContainer}>
      <DeviceDebugger />

      <AnimatePresence mode="wait">
        {currentPage === 0 && (
          <MobileFirstPage
            key="first-page"
            onSwipeUp={handleFirstPageSwipeUp}
            onSwipeDown={handleSwipeDown}
            config={config}
          />
        )}

        {currentPage > 0 && (
          <MobileGalgamePage
            key={`galgame-page-${currentPage}`}
            currentPage={currentPage}
            onSwipeUp={handleSwipeUp}
            onSwipeDown={handleSwipeDown}
            onNavigate={navigateToPage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileLayout;