import React, { useState } from 'react';
import { useDeviceType } from '../../hooks/useDeviceType';
import styles from './index.module.css';

const DeviceDebugger: React.FC = () => {
  const deviceInfo = useDeviceType();

  // 使用惰性初始化从 localStorage 读取初始值
  const [showDebugger, setShowDebugger] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('device-debug') === 'true';
  });

  // 只在开发环境和启用调试时显示
  if (process.env.NODE_ENV !== 'development' || !showDebugger) {
    return null;
  }

  return (
    <div className={styles.debugger}>
      <h3>🔧 设备检测调试信息</h3>
      <div className={styles.info}>
        <p><strong>isMobile:</strong> {deviceInfo.isMobile ? '✅' : '❌'}</p>
        <p><strong>isTablet:</strong> {deviceInfo.isTablet ? '✅' : '❌'}</p>
        <p><strong>isDesktop:</strong> {deviceInfo.isDesktop ? '✅' : '❌'}</p>
        <p><strong>isTouchDevice:</strong> {deviceInfo.isTouchDevice ? '✅' : '❌'}</p>
        <p><strong>isClient:</strong> {deviceInfo.isClient ? '✅' : '❌'}</p>
        <p><strong>窗口宽度:</strong> {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</p>
      </div>
      <div className={styles.controls}>
        <button
          onClick={() => {
            localStorage.setItem('device-debug', 'false');
            setShowDebugger(false);
          }}
          className={styles.closeButton}
        >
          关闭调试
        </button>
      </div>
    </div>
  );
};

export default DeviceDebugger;