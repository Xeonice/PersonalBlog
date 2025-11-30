import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { generateSectionSEO } from '../utils/seo';

interface SectionData {
  id: string;
  title: string;
  type: string;
  content: any;
}

/**
 * Meta 管理 Hook
 * 用于在客户端路由切换时动态更新页面的 meta 信息
 */
export function useMetaManager(currentSection: SectionData | null) {
  const router = useRouter();

  useEffect(() => {
    if (!currentSection) return;

    const seo = generateSectionSEO(currentSection.id);

    // 更新页面标题
    if (typeof document !== 'undefined') {
      document.title = seo.title;

      // 更新 meta description
      updateMetaTag('description', seo.description);
      updateMetaTag('keywords', seo.keywords.join(', '));

      // 更新 Open Graph 标签
      updateMetaTag('og:title', seo.title, 'property');
      updateMetaTag('og:description', seo.description, 'property');
      updateMetaTag('og:url', seo.url, 'property');

      // 更新 Twitter Card
      updateMetaTag('twitter:title', seo.title);
      updateMetaTag('twitter:description', seo.description);

      // 更新 canonical URL
      updateCanonicalUrl(seo.url);
    }
  }, [currentSection]);

  // 监听路由变化，确保 URL 和内容同步
  useEffect(() => {
    const handleRouteChange = () => {
      // 路由变化时的额外处理
      if (typeof window !== 'undefined') {
        // 可以添加 Google Analytics 或其他追踪代码
        console.log(`Route changed to: ${router.asPath}`);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
}

/**
 * 更新 meta 标签
 */
function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (typeof document === 'undefined') return;

  const selector = `meta[${attribute}="${name}"]`;
  let metaTag = document.querySelector(selector) as HTMLMetaElement;

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, name);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
}

/**
 * 更新 canonical URL
 */
function updateCanonicalUrl(url: string) {
  if (typeof document === 'undefined') return;

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = url;
}

/**
 * 客户端 SEO 数据更新 Hook
 * 专门用于处理客户端路由的 SEO 更新
 */
export function useClientSEO(sectionId: string) {
  const router = useRouter();

  useEffect(() => {
    if (!sectionId || typeof document === 'undefined') return;

    const seo = generateSectionSEO(sectionId);

    // 批量更新所有 meta 信息
    const updates = [
      () => document.title = seo.title,
      () => updateMetaTag('description', seo.description),
      () => updateMetaTag('keywords', seo.keywords.join(', ')),
      () => updateMetaTag('og:title', seo.title, 'property'),
      () => updateMetaTag('og:description', seo.description, 'property'),
      () => updateMetaTag('og:url', seo.url, 'property'),
      () => updateMetaTag('twitter:title', seo.title),
      () => updateMetaTag('twitter:description', seo.description),
      () => updateCanonicalUrl(seo.url),
    ];

    // 使用 requestAnimationFrame 确保在下一帧更新，避免阻塞渲染
    requestAnimationFrame(() => {
      updates.forEach(update => {
        try {
          update();
        } catch (error) {
          console.warn('Failed to update meta tag:', error);
        }
      });
    });

  }, [sectionId, router.asPath]);
}

/**
 * 预加载下一个 section 的数据（优化性能）
 */
export function useSEOPreload(allSections: SectionData[]) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 预生成所有 section 的 SEO 数据，缓存起来
    const seoCache = new Map();

    allSections.forEach(section => {
      const seo = generateSectionSEO(section.id);
      seoCache.set(section.id, seo);
    });

    // 将缓存存储到 window 对象中供后续使用
    (window as any).__seoCache = seoCache;
  }, [allSections]);
}