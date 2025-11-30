import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo, useEffect, useRef } from 'react';
import styles from './index.module.css';

/**
 * 动物之森风格棋盘格转场动画
 * 效果：棋盘格从上往下逐行出现覆盖屏幕，然后从下往上逐行消失露出新主题
 *
 * 性能优化：
 * 1. 使用 CSS animation 而不是 transition，避免 class 切换时的状态丢失
 * 2. tileEnter 和 tileLeave 叠加而非互斥，确保动画连贯
 * 3. 使用 contain 属性隔离布局计算
 * 4. 使用 GPU 加速的 transform 属性
 */

type TransitionPhase = 'idle' | 'entering' | 'holding' | 'leaving';

interface ThemeTransitionContextValue {
  isTransitioning: boolean;
  phase: TransitionPhase;
  startTransition: (callback?: () => void, color?: string) => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextValue | null>(null);

export const useThemeTransition = () => {
  const context = useContext(ThemeTransitionContext);
  if (!context) {
    throw new Error('useThemeTransition must be used within ThemeTransitionProvider');
  }
  return context;
};

interface ThemeTransitionProviderProps {
  children: ReactNode;
  /** 列数（默认 8） */
  columns?: number;
  /** 行数（默认 6） */
  rows?: number;
  /** 总动画时长（毫秒） */
  duration?: number;
}

// Tile 组件 - 使用 CSS animation
interface TileProps {
  row: number;
  col: number;
  rows: number;
  enterDelay: number;
  leaveDelay: number;
  tileDuration: number;
  phase: TransitionPhase;
  color: string;
}

// 使用 React.memo 避免不必要的重新渲染
const Tile = React.memo<TileProps>(({ row, col, rows, enterDelay, leaveDelay, tileDuration, phase, color }) => {
  // 根据 phase 决定 className
  // 关键：tileEnter 在整个动画期间保持，tileLeave 在 leaving 阶段叠加
  const isAnimating = phase !== 'idle';
  const isLeaving = phase === 'leaving';

  const className = [
    styles.tile,
    isAnimating ? styles.tileEnter : '',
    isLeaving ? styles.tileLeave : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      style={{
        backgroundColor: color,
        '--enter-delay': `${enterDelay}s`,
        '--leave-delay': `${leaveDelay}s`,
        '--tile-duration': `${tileDuration}s`,
        // 进入时从顶部展开，离开时从底部收起
        transformOrigin: isLeaving ? 'bottom' : 'top',
      } as React.CSSProperties}
    />
  );
});

Tile.displayName = 'Tile';

export const ThemeTransitionProvider: React.FC<ThemeTransitionProviderProps> = ({
  children,
  columns = 8,
  rows = 6,
  duration = 1200,  // 默认总时长
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [transitionColor, setTransitionColor] = useState('#64ffda');
  const callbackRef = useRef<(() => void) | undefined>(undefined);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // 清理所有定时器
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // 预计算 tiles 数据，包括延迟时间
  // 实现棋盘格效果：像国际象棋一样，先显示一种颜色的格子，再显示另一种
  const { tiles, maxEnterTime, maxLeaveTime } = useMemo(() => {
    // 每个 tile 的动画时长（秒）
    const tileDuration = 0.18;
    // 同一类型格子内的行延迟
    const rowDelay = 0.025;
    // 两种类型格子之间的间隔时间
    const checkerboardOffset = 0.15;

    const tilesData = Array.from({ length: columns * rows }, (_, i) => {
      const row = Math.floor(i / columns);
      const col = i % columns;
      // 棋盘格类型：(row + col) % 2 决定是"黑格"还是"白格"
      const isSecondGroup = (row + col) % 2 === 1;
      // 第二组格子延迟开始
      const groupOffset = isSecondGroup ? checkerboardOffset : 0;

      return {
        index: i,
        row,
        col,
        // 进入时：先显示第一组，再显示第二组；组内从上往下
        enterDelay: groupOffset + row * rowDelay,
        // 离开时：先隐藏第一组，再隐藏第二组；组内从下往上
        leaveDelay: groupOffset + (rows - 1 - row) * rowDelay,
        tileDuration,
      };
    });

    // 计算最后一个 tile 完成动画的时间
    // 第二组的最后一行完成时间
    const maxEnterDelay = checkerboardOffset + (rows - 1) * rowDelay;
    const maxLeaveDelay = checkerboardOffset + (rows - 1) * rowDelay;

    return {
      tiles: tilesData,
      maxEnterTime: (maxEnterDelay + tileDuration) * 1000, // 转为毫秒
      maxLeaveTime: (maxLeaveDelay + tileDuration) * 1000,
    };
  }, [columns, rows]);

  const startTransition = useCallback((callback?: () => void, color?: string) => {
    if (isTransitioning) return;

    // 清理之前的定时器
    clearTimers();

    if (color) {
      setTransitionColor(color);
    }
    callbackRef.current = callback;

    setIsTransitioning(true);
    setPhase('entering');

    // 基于实际动画时间计算时间节点
    const enterDuration = maxEnterTime + 50; // 加一点缓冲
    const holdDuration = 150; // 保持时间
    const leaveDuration = maxLeaveTime + 50;

    // 进入完成后保持并执行回调
    const holdTimer = setTimeout(() => {
      setPhase('holding');
      if (callbackRef.current) {
        callbackRef.current();
        callbackRef.current = undefined;
      }
    }, enterDuration);
    timersRef.current.push(holdTimer);

    // 开始退出
    const leaveTimer = setTimeout(() => {
      setPhase('leaving');
    }, enterDuration + holdDuration);
    timersRef.current.push(leaveTimer);

    // 完全退出
    const endTimer = setTimeout(() => {
      setPhase('idle');
      setIsTransitioning(false);
    }, enterDuration + holdDuration + leaveDuration);
    timersRef.current.push(endTimer);
  }, [isTransitioning, clearTimers, maxEnterTime, maxLeaveTime]);

  return (
    <ThemeTransitionContext.Provider value={{ isTransitioning, phase, startTransition }}>
      {children}

      {/* 棋盘格过渡动画遮罩 */}
      {phase !== 'idle' && (
        <div className={styles.checkerboardOverlay}>
          <div
            className={styles.checkerboardGrid}
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {tiles.map(({ index, row, col, enterDelay, leaveDelay, tileDuration }) => (
              <Tile
                key={index}
                row={row}
                col={col}
                rows={rows}
                enterDelay={enterDelay}
                leaveDelay={leaveDelay}
                tileDuration={tileDuration}
                phase={phase}
                color={transitionColor}
              />
            ))}
          </div>
        </div>
      )}
    </ThemeTransitionContext.Provider>
  );
};

export default ThemeTransitionProvider;
