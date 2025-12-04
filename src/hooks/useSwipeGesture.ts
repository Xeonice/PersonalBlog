import { useSwipeable } from 'react-swipeable';
import { useRef } from 'react';
import { useDeviceType } from './useDeviceType';

interface SwipeProgress {
  direction: 'up' | 'down' | 'left' | 'right' | null;
  progress: number; // 0-1 基于阈值的进度
  isActive: boolean; // 是否在进行手势
  canTrigger: boolean; // 是否可以触发（边界检查通过）
  distance: number; // 实际滑动距离
}

interface UseSwipeGestureProps {
  onSwipeDown?: () => void;
  onSwipeUp?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeProgress?: (progress: SwipeProgress) => void; // 新增手势进度回调
  threshold?: number;
  target?: React.RefObject<HTMLElement>;
  upSwipeButtonRef?: React.RefObject<HTMLElement>; // 上滑对应的 SwipeButton 引用（向下箭头）
  downSwipeButtonRef?: React.RefObject<HTMLElement>; // 下滑对应的 SwipeButton 引用（向上箭头）
  requireSwipeButtonVisible?: boolean; // 是否需要检查 SwipeButton 可见性，默认 false（第一页不需要）
}

export const useSwipeGesture = ({
  onSwipeDown,
  onSwipeUp,
  onSwipeLeft,
  onSwipeRight,
  onSwipeProgress,
  threshold = 50, // 滑动阈值
  target,
  upSwipeButtonRef,
  downSwipeButtonRef,
  requireSwipeButtonVisible = false // 默认不需要检查，第一页不需要
}: UseSwipeGestureProps) => {

  const lastGestureTime = useRef(0); // 用于手势防抖
  const lastProgressTime = useRef(0); // 用于进度更新节流
  const { isMobile } = useDeviceType(); // 移动端检测

  // 检查指定方向的 SwipeButton 是否可见
  const isSwipeButtonVisible = (direction: 'up' | 'down'): boolean => {
    // 根据手势方向选择对应的按钮
    // 上滑手势 -> 检查 upSwipeButtonRef（向下箭头，进入下一页）
    // 下滑手势 -> 检查 downSwipeButtonRef（向上箭头，返回上一页）
    const buttonRef = direction === 'up' ? upSwipeButtonRef : downSwipeButtonRef;

    if (!buttonRef?.current) {
      console.log(`❌ SwipeButton ref for ${direction} gesture not found`);
      return false;
    }

    const buttonElement = buttonRef.current;
    const rect = buttonElement.getBoundingClientRect();
    const isVisible = rect.width > 0 && rect.height > 0 &&
                     rect.top >= 0 && rect.left >= 0 &&
                     rect.bottom <= window.innerHeight &&
                     rect.right <= window.innerWidth;

    const computedStyle = window.getComputedStyle(buttonElement);
    const isDisplayed = computedStyle.display !== 'none' &&
                       computedStyle.visibility !== 'hidden' &&
                       computedStyle.opacity !== '0';

    console.log(`🔍 SwipeButton visibility check for ${direction} gesture:`, {
      direction,
      isVisible,
      isDisplayed,
      rect: {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      },
      computedStyle: {
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity
      }
    });

    return isVisible && isDisplayed;
  };

  // 检查是否应该启用手势
  const shouldEnableGesture = (direction: 'up' | 'down' | 'left' | 'right'): boolean => {
    if (!isMobile) {
      console.log('❌ Not on mobile device, disabling gesture');
      return false;
    }

    // 只有在需要检查 SwipeButton 可见性时才进行检查（例如 GalgameContainer 页面）
    if (requireSwipeButtonVisible && (direction === 'up' || direction === 'down')) {
      if (!isSwipeButtonVisible(direction)) {
        console.log(`❌ SwipeButton for ${direction} gesture not visible, disabling gesture`);
        return false;
      }
    }

    console.log(`✅ Mobile device + gesture requirements met for ${direction}, enabling gesture`);
    return true;
  };

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
    // 首先检查是否应该启用手势
    if (!shouldEnableGesture(direction)) {
      console.log(`🚫 Gesture disabled for ${direction} - not on mobile or SwipeButton not visible`);
      return;
    }

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
    // 添加手势开始时的处理，用于进度跟踪
    onSwiping: (eventData) => {

      const { deltaY, deltaX } = eventData;

      // 确定主要滑动方向和距离
      const absY = Math.abs(deltaY);
      const absX = Math.abs(deltaX);

      if (absY > 10 || absX > 10) { // 有效滑动阈值
        let direction: 'up' | 'down' | 'left' | 'right' | null = null;
        let distance = 0;
        let canTrigger = false;

        // 确定主要方向
        if (absY > absX) {
          // 垂直滑动
          direction = deltaY > 0 ? 'down' : 'up';
          distance = absY;

          // 首先检查是否应该启用此方向的手势
          if (!shouldEnableGesture(direction)) {
            return; // 如果按钮不可见，直接返回
          }

          // 检查边界条件
          const checkDirection = direction === 'up' ? 'down' : 'up';
          canTrigger = checkScrollBoundary(checkDirection);

          if (canTrigger) {
            console.log('🎯 Gesture detected at boundary for', direction, 'swipe');
          }
        } else {
          // 水平滑动
          direction = deltaX > 0 ? 'right' : 'left';
          distance = absX;

          // 检查是否应该启用此方向的手势
          if (!shouldEnableGesture(direction)) {
            return; // 如果不符合条件，直接返回
          }

          canTrigger = true; // 水平滑动暂时不需要边界检查
        }

        // 计算进度
        const progress = Math.min(distance / threshold, 1);

        // 节流进度回调更新 - 避免频繁更新影响其他动画
        if (onSwipeProgress && direction) {
          const progressData = {
            direction,
            progress,
            isActive: true,
            canTrigger,
            distance
          };

          // 使用 requestAnimationFrame 确保不阻塞其他动画
          // 同时减少不必要的更新频率
          if (!lastProgressTime.current || Date.now() - lastProgressTime.current > 16) { // ~60fps
            lastProgressTime.current = Date.now();
            requestAnimationFrame(() => {
              onSwipeProgress(progressData);
            });
          }
        }
      }
    },
    // 手势结束时清理进度状态
    onSwiped: () => {
      // 重置进度状态 - 使用 requestAnimationFrame 优化性能
      if (onSwipeProgress) {
        requestAnimationFrame(() => {
          onSwipeProgress({
            direction: null,
            progress: 0,
            isActive: false,
            canTrigger: false,
            distance: 0
          });
        });
      }
    },
    trackMouse: false, // 禁用鼠标跟踪，只支持触摸
    trackTouch: true,  // 启用触摸跟踪
    preventScrollOnSwipe: false, // 恢复为 false，让我们手动处理边界检测
    delta: threshold, // 设置触发阈值
  });

  return swipeHandlers;
};