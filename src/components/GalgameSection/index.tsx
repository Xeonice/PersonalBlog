import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTimes, faPlay } from '@fortawesome/free-solid-svg-icons';
import TypewriterText from './TypewriterText';
import GalgameButton from './GalgameButton';
import SectionContent from '../SectionContent';
import styles from './index.module.css';

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
}

const GalgameSection: React.FC<GalgameSectionProps> = ({
  sections,
  currentSectionIndex,
  onSectionComplete,
  onSectionChange,
}) => {
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [totalTexts, setTotalTexts] = useState(0);
  const [skipCurrentText, setSkipCurrentText] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [useScrollMode, setUseScrollMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentSection = sections[currentSectionIndex];

  useEffect(() => {
    // 完全重置所有状态
    setIsTextComplete(false);
    setIsReady(true);
    setCurrentTextIndex(0);
    setSkipCurrentText(false);
    setIsScrolledToBottom(false);

    // 重置滚动模式状态
    setUseScrollMode(false);

    // 计算当前章节的文本总数
    let textCount = 0;
    let shouldUseScrollMode = false;

    if (currentSection) {
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
    }

    setTotalTexts(textCount);
    setUseScrollMode(shouldUseScrollMode);

    // 对于使用滚动模式的组件，直接标记为完成以显示继续按钮的逻辑
    if (shouldUseScrollMode) {
      setIsTextComplete(true);
    }
  }, [currentSectionIndex, currentSection]);

  // 检查是否显示提示
  useEffect(() => {
    const hintDismissed = localStorage.getItem('galgame-hint-dismissed');
    if (!hintDismissed) {
      setShowHint(true);
    }
  }, []);


  // 滚动到底部检测（针对使用滚动模式的组件）
  useEffect(() => {
    if (!scrollContainerRef.current || !useScrollMode) return;

    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;

      // 检测是否滚动到底部（留一些余量）
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setIsScrolledToBottom(isAtBottom);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [useScrollMode]);

  const handleTextComplete = () => {
    const nextIndex = currentTextIndex + 1;
    setCurrentTextIndex(nextIndex);
    setSkipCurrentText(false); // 重置跳过状态

    if (nextIndex >= totalTexts) {
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
    <div
      className={styles.galgameContainer}
      onMouseDown={handleClick}
    >
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
                  scrollContainerRef={scrollContainerRef}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 固定底部 Footer */}
      <div className={styles.galgameFooter}>
        {/* 左侧提示 */}
        {showHint && (
          <GalgameButton
            type="hint"
            onClick={handleHintClose}
            motionProps={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 10 },
              transition: { delay: 1, duration: 0.5 }
            }}
          >
            <FontAwesomeIcon icon={faLightbulb} className={styles.hintIcon} />
            <span className={styles.hintText}>点击任意位置可快进文本</span>
            <FontAwesomeIcon icon={faTimes} className={styles.hintCloseIcon} />
          </GalgameButton>
        )}

        {/* 右侧操作按钮 */}
        {/* 使用回调机制决定是否使用滚动检测 */}
        {((useScrollMode ? isScrolledToBottom : isTextComplete) && currentSectionIndex < sections.length - 1) && (
          <GalgameButton
            type="continue"
            motionProps={{
              initial: { opacity: 0, y: 30, scale: 0.9 },
              animate: { opacity: 1, y: 0, scale: 1 },
              transition: {
                delay: 1,
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
          >
            <FontAwesomeIcon icon={faPlay} className={styles.promptIcon} />
            <span className={styles.promptText}>点击继续</span>
          </GalgameButton>
        )}
      </div>
    </div>
  );
};

export default GalgameSection;