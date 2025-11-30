import { useState, useEffect } from 'react';

/**
 * 检测是否为无头浏览器或搜索引擎爬虫
 * 用于在爬虫访问时显示静态内容以优化 SEO
 */
export function useHeadlessDetection(): boolean {
  const [isHeadless, setIsHeadless] = useState(false);

  useEffect(() => {
    const detectHeadless = () => {
      // 如果在服务端，默认认为是爬虫
      if (typeof window === 'undefined') {
        return true;
      }

      const userAgent = navigator.userAgent.toLowerCase();

      // 检测常见的搜索引擎爬虫
      const crawlerPatterns = [
        'googlebot',
        'bingbot',
        'slurp',
        'duckduckbot',
        'baiduspider',
        'yandexbot',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'telegram',
        'skype',
        'crawler',
        'spider',
        'bot'
      ];

      // 检查 User-Agent 是否包含爬虫标识
      const isCrawler = crawlerPatterns.some(pattern => userAgent.includes(pattern));

      if (isCrawler) {
        return true;
      }

      // 检测无头浏览器的特征
      const headlessIndicators = [
        // Chrome headless 特征
        () => navigator.webdriver === true,

        // 缺少某些浏览器特有的属性
        () => !(window as any).chrome && userAgent.includes('chrome'),

        // 检测是否缺少插件支持
        () => navigator.plugins.length === 0,

        // 检测语言设置异常
        () => !navigator.languages || navigator.languages.length === 0,

        // 检测屏幕属性异常
        () => screen.width === 0 || screen.height === 0,

        // 检测是否缺少某些浏览器 API
        () => typeof window.chrome === 'undefined' && userAgent.includes('chrome'),
      ];

      // 如果满足多个无头浏览器特征，认为是无头浏览器
      const headlessScore = headlessIndicators.reduce((score, check) => {
        try {
          return score + (check() ? 1 : 0);
        } catch {
          return score + 1; // 如果检测出错，也算作可疑
        }
      }, 0);

      return headlessScore >= 2;
    };

    setIsHeadless(detectHeadless());
  }, []);

  return isHeadless;
}