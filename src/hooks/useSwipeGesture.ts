import { useSwipeable } from 'react-swipeable';
import { useRef } from 'react';

interface UseSwipeGestureProps {
  onSwipeDown?: () => void;
  onSwipeUp?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  target?: React.RefObject<HTMLElement>;
}

export const useSwipeGesture = ({
  onSwipeDown,
  onSwipeUp,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50, // 滑动阈值
  target
}: UseSwipeGestureProps) => {

  const lastGestureTime = useRef(0);

  // 将边界检查逻辑移到外部，避免 React Compiler 检测到 ref 访问
  const checkScrollBoundary = (direction: 'up' | 'down'): boolean => {
    const element = target?.current;
    if (!element) {
      console.log('❌ No target element found, target?.current is null, allowing gesture');
      console.log('🔍 Target ref info:', {
        hasTarget: !!target,
        targetCurrent: target?.current,
        targetType: typeof target?.current
      });
      return true; // 没有目标元素时，允许手势
    }

    console.log('✅ Target element found:', {
      tagName: element.tagName,
      className: element.className,
      scrollTop: element.scrollTop
    });

    // 尝试查找内部的滚动容器
    const scrollableElement = element.querySelector('[data-scrollable="true"]') as HTMLElement;

    if (!scrollableElement) {
      console.log('⚠️ No scrollable element found, using target element directly');
      // 如果找不到 data-scrollable 元素，使用目标元素本身
      const { scrollTop, scrollHeight, clientHeight } = element as HTMLElement;
      const hasScrollableContent = scrollHeight > clientHeight;
      const BOUNDARY_THRESHOLD = 30; // 使用相同的阈值

      if (!hasScrollableContent) {
        console.log('🎯 No scrollable content in target element, allowing gesture');
        return true;
      }

      if (direction === 'up') {
        const result = scrollTop <= BOUNDARY_THRESHOLD;
        console.log(`🔍 Target element TOP boundary: scrollTop=${Math.round(scrollTop)} <= ${BOUNDARY_THRESHOLD} = ${result}`);
        return result;
      } else {
        const result = Math.abs(scrollTop + clientHeight - scrollHeight) <= BOUNDARY_THRESHOLD;
        console.log(`🔍 Target element BOTTOM boundary: |${Math.round(scrollTop + clientHeight)} - ${Math.round(scrollHeight)}| = ${Math.abs(scrollTop + clientHeight - scrollHeight)} <= ${BOUNDARY_THRESHOLD} = ${result}`);
        return result;
      }
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollableElement;

    // 如果内容高度小于等于容器高度，说明没有滚动内容，直接允许手势
    const hasScrollableContent = scrollHeight > clientHeight;

    // 增加边界检测的容错范围，移动端滚动精度可能不够
    const BOUNDARY_THRESHOLD = 30; // 从 5px 增加到 30px
    const scrolledToTop = scrollTop <= BOUNDARY_THRESHOLD;
    const scrolledToBottom = Math.abs(scrollTop + clientHeight - scrollHeight) <= BOUNDARY_THRESHOLD;

    console.log('📏 Scroll boundary check:', {
      elementType: 'scrollable-container',
      scrollTop: Math.round(scrollTop),
      scrollHeight: Math.round(scrollHeight),
      clientHeight: Math.round(clientHeight),
      maxScrollTop: Math.round(scrollHeight - clientHeight),
      hasScrollableContent,
      threshold: BOUNDARY_THRESHOLD,
      scrolledToTop,
      scrolledToBottom,
      direction,
      checkDirection: direction === 'up' ? 'bottom' : 'top'
    });

    if (!hasScrollableContent) {
      console.log('🎯 No scrollable content, allowing gesture directly');
      return true; // 没有滚动内容时，直接允许手势
    }

    if (direction === 'up') {
      // 检查顶部：scrollTop 接近 0
      const result = scrolledToTop;
      console.log(`🔍 Checking TOP boundary for direction '${direction}': scrollTop=${Math.round(scrollTop)} <= ${BOUNDARY_THRESHOLD} = ${result}`);
      return result;
    } else {
      // 检查底部：scrollTop + clientHeight 接近 scrollHeight
      const result = scrolledToBottom;
      console.log(`🔍 Checking BOTTOM boundary for direction '${direction}': |${Math.round(scrollTop + clientHeight)} - ${Math.round(scrollHeight)}| = ${Math.abs(scrollTop + clientHeight - scrollHeight)} <= ${BOUNDARY_THRESHOLD} = ${result}`);
      return result;
    }
  };

  const handleSwipe = (direction: 'up' | 'down' | 'left' | 'right', deltaX: number, deltaY: number) => {
    const now = Date.now();
    // 防抖动：500ms内只允许一次手势
    if (now - lastGestureTime.current < 500) {
      console.log('🚫 Gesture throttled');
      return;
    }

    console.log('👆 Swipe detected:', { direction, deltaX, deltaY, threshold });

    // 检查垂直滑动是否在边界
    if (direction === 'up' || direction === 'down') {
      // 向上滑动（进入下一页）：需要检查是否在底部
      // 向下滑动（返回上一页）：需要检查是否在顶部
      const checkDirection = direction === 'up' ? 'down' : 'up';
      if (!checkScrollBoundary(checkDirection)) {
        console.log(`❌ Not at boundary for ${direction} gesture, allowing normal scroll`);
        return;
      }
    }

    lastGestureTime.current = now;

    // 触发对应的回调
    switch (direction) {
      case 'up':
        console.log('✅ Triggering onSwipeUp (swipe up at bottom - next page)');
        onSwipeUp?.();
        break;
      case 'down':
        console.log('✅ Triggering onSwipeDown (swipe down at top - previous page)');
        onSwipeDown?.();
        break;
      case 'left':
        console.log('✅ Triggering onSwipeLeft');
        onSwipeLeft?.();
        break;
      case 'right':
        console.log('✅ Triggering onSwipeRight');
        onSwipeRight?.();
        break;
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: (eventData) => {
      const { deltaY } = eventData;
      if (Math.abs(deltaY) >= threshold) {
        handleSwipe('down', 0, deltaY);
      }
    },
    onSwipedUp: (eventData) => {
      const { deltaY } = eventData;
      if (Math.abs(deltaY) >= threshold) {
        handleSwipe('up', 0, deltaY);
      }
    },
    onSwipedLeft: (eventData) => {
      const { deltaX } = eventData;
      if (Math.abs(deltaX) >= threshold) {
        handleSwipe('left', deltaX, 0);
      }
    },
    onSwipedRight: (eventData) => {
      const { deltaX } = eventData;
      if (Math.abs(deltaX) >= threshold) {
        handleSwipe('right', deltaX, 0);
      }
    },
    trackMouse: false, // 禁用鼠标跟踪，只支持触摸
    trackTouch: true,  // 启用触摸跟踪
    preventScrollOnSwipe: false, // 允许正常滚动
    delta: threshold, // 设置触发阈值
  });

  return swipeHandlers;
};