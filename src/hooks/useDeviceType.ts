import { isMobileOnly, isTablet as isTabletDetect, isDesktop as isDesktopDetect } from 'react-device-detect';
import { useEffect, useState } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isClient: boolean;
}

export const useDeviceType = (): DeviceInfo => {
  // 使用惰性初始化检测客户端环境
  const [isClient] = useState(() => typeof window !== 'undefined');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    // 只有在客户端才监听窗口变化
    if (typeof window === 'undefined') return;

    // 监听窗口变化（响应式支持）
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 结合设备检测和窗口大小
  const isMobile = isClient && (isMobileOnly || windowWidth < 768);
  const isTablet = isClient && (isTabletDetect || (windowWidth >= 768 && windowWidth < 1024));
  const isDesktop = isClient && (isDesktopDetect || windowWidth >= 1024);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice: isMobile || isTablet,
    isClient
  };
};