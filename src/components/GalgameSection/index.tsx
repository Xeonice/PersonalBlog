import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faTimes,
  faPlay,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import TypewriterText from './TypewriterText';
import GalgameButton from './GalgameButton';
import SectionContent from '../SectionContent';
import { useDeviceType } from '../../hooks/useDeviceType';
import styles from './index.module.css';

// ScrollContainer Context 已移除，因为 useInView 不需要指定 root

interface SectionData {
  id: string;
  title: string;
  type: 'text' | 'timeline' | 'list' | 'contact' | 'articles';
  content: any;
}

interface GalgameSectionProps {
  sections: SectionData[];
  currentSectionIndex: number;
  onSectionComplete?: () => void;
  onSectionChange?: (index: number) => void;
  isMobilePage?: boolean;
  currentPage?: number;
  totalPages?: number;
  onMobilePageNext?: () => void;
}

const GalgameSection: React.FC<GalgameSectionProps> = ({
  sections,
  currentSectionIndex,
  onSectionComplete,
  onSectionChange,
  isMobilePage = false,
  currentPage,
  totalPages,
  onMobilePageNext,
}) => {
  const { isMobile } = useDeviceType();
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentSection = sections[currentSectionIndex];

  // 计算当前章节的配置（派生状态）
  const sectionConfig = useMemo(() => {
    if (!currentSection) {
      return { totalTexts: 0, useScrollMode: false, shouldComplete: false };
    }

    let textCount = 0;
    let shouldUseScrollMode = false;

    switch (currentSection.type) {
      case 'text':
        textCount = currentSection.content.paragraphs.length;
        shouldUseScrollMode = false;
        break;
      case 'timeline':
        // 时间轴使用滚动模式，不需要文本计数
        textCount = 0;
        shouldUseScrollMode = true;
        break;
      case 'articles':
        // 文章列表使用滚动模式，不需要文本计数
        textCount = 0;
        shouldUseScrollMode = true;
        break;
      case 'list':
        textCount = currentSection.content.items.length;
        shouldUseScrollMode = false;
        break;
      case 'contact':
        textCount = 1 + currentSection.content.methods.length;
        shouldUseScrollMode = false;
        break;
    }

    return {
      totalTexts: textCount,
      useScrollMode: shouldUseScrollMode,
      shouldComplete: shouldUseScrollMode,
    };
  }, [currentSection]);

  // 使用惰性初始化状态，通过父组件传递的 key 来重置状态
  const [isTextComplete, setIsTextComplete] = useState(
    () => sectionConfig.shouldComplete
  );
  const [isReady] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [skipCurrentText, setSkipCurrentText] = useState(false);
  const [showHint, setShowHint] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('galgame-hint-dismissed');
  });
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  // 滚动到底部检测（针对使用滚动模式的组件）
  useEffect(() => {
    if (!sectionConfig.useScrollMode) return;

    debugger;
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;

      // 检测是否滚动到底部（留更多余量，确保能触发）
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 300;
      setIsScrolledToBottom(isAtBottom);
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    // 立即执行一次检测，以防内容已经在底部
    handleScroll();

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [sectionConfig.useScrollMode]);

  const handleTextComplete = () => {
    const nextIndex = currentTextIndex + 1;
    setCurrentTextIndex(nextIndex);
    setSkipCurrentText(false); // 重置跳过状态

    if (nextIndex >= sectionConfig.totalTexts) {
      setIsTextComplete(true);
      onSectionComplete?.();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // 检查是否是左键点击
    if (e.button !== 0) return;

    if (isTextComplete && currentSectionIndex < sections.length - 1) {
      // 进入下一个章节
      onSectionChange?.(currentSectionIndex + 1);
    } else if (!isTextComplete) {
      // 如果当前文本还在播放，触发快进
      setSkipCurrentText(true);
    }
  };

  const handleHintClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    setShowHint(false);
    localStorage.setItem('galgame-hint-dismissed', 'true');
  };

  if (!isReady || !currentSection) {
    return null;
  }

  return (
    <div className={styles.galgameContainer} onMouseDown={handleClick}>
        {/* 主要内容区域 */}
        <div className={styles.mainContentArea} ref={scrollContainerRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.sectionContainer}
            >
              <div className={styles.sectionHeader}>
                <TypewriterText
                  text={currentSection.title}
                  delay={0}
                  className={styles.sectionTitle}
                  speed={100}
                />
              </div>

              <div className={styles.sectionContent}>
                <div className={styles.contentBody} ref={contentRef}>
                  <SectionContent
                    section={currentSection}
                    mode="galgame"
                    currentTextIndex={currentTextIndex}
                    skipCurrentText={skipCurrentText}
                    onTextComplete={handleTextComplete}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 固定底部 Footer */}
        <div
          className={`${styles.galgameFooter} ${isMobilePage ? styles.mobileFooter : ''}`}
        >
          {/* 左侧提示 */}
          <div className={styles.footerLeft}>
            {showHint && (
              <GalgameButton
                type="hint"
                onClick={handleHintClose}
                motionProps={{
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 10 },
                  transition: { delay: 1, duration: 0.5 },
                }}
              >
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className={styles.hintIcon}
                />
                <span className={styles.hintText}>
                  {isMobile ? '点击快进' : '点击任意位置可快进文本'}
                </span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={styles.hintCloseIcon}
                />
              </GalgameButton>
            )}
          </div>

          {/* 中间继续按钮 - 仅在移动端页面模式下显示 */}
          <div className={styles.footerCenter}>
            {isMobilePage &&
              (sectionConfig.useScrollMode
                ? isScrolledToBottom
                : isTextComplete) &&
              currentPage &&
              totalPages &&
              currentPage < totalPages && (
                <motion.div
                  className={styles.mobilePromptButton}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  onClick={onMobilePageNext}
                >
                  <motion.div
                    className={styles.mobilePromptIcon}
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </motion.div>
                </motion.div>
              )}
          </div>

          {/* 右侧操作按钮 - 仅在桌面端显示 */}
          <div className={styles.footerRight}>
            {!isMobilePage &&
              (sectionConfig.useScrollMode
                ? isScrolledToBottom
                : isTextComplete) &&
              currentSectionIndex < sections.length - 1 && (
                <GalgameButton
                  type="continue"
                  motionProps={{
                    initial: { opacity: 0, y: 30, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: {
                      delay: 1,
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    },
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={styles.promptIcon}
                  />
                  <span className={styles.promptText}>点击继续</span>
                </GalgameButton>
              )}
          </div>
        </div>
      </div>
  );
};

export default GalgameSection;
