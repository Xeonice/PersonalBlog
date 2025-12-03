import * as React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import TextRevealMotion from '../components/TextRevealMotion';
import AnchorNavigation from '../components/AnchorNavigation';
import ThemeButton from '../components/ThemeButton';
import ThreeJSBackground from '../components/ThreeJSBackground';
import DynamicSection from '../components/DynamicSection';
import GalgameSection from '../components/GalgameSection';
import MobileLayout from '../components/Mobile/MobileLayout';
import { useConfig } from '../hooks/useConfig';
import { useHeadlessDetection } from '../hooks/useHeadlessDetection';
import { useClientSEO } from '../hooks/useMetaManager';
import { useDeviceType } from '../hooks/useDeviceType';
import {
  generateSectionSEO,
  generateStructuredData,
  SEOData,
} from '../utils/seo';
import indexStyle from './index.module.css';

// 缓动函数提取到模块级别，避免每次渲染重新创建
const EASING: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const leftSideVariants = {
  hidden: { x: -30 },
  visible: {
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASING,
    },
  },
};

const rightSideVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASING,
      delay: 0.2,
    },
  },
};

interface StructuredData {
  '@context': string;
  '@type': string;
  name?: string;
  description?: string;
  url?: string;
  sameAs?: string[];
  [key: string]: unknown;
}

interface IndexPageProps {
  defaultSection: string;
  seo: SEOData;
  structuredData: StructuredData;
}

const IndexPage: React.FC<IndexPageProps> = ({
  defaultSection,
  seo,
  structuredData,
}) => {
  const router = useRouter();
  const [hoveredIcon, setHoveredIcon] = React.useState('');
  const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const { config } = useConfig();
  const isHeadless = useHeadlessDetection();
  const { isMobile, isTablet } = useDeviceType();

  // 默认启用 Galgame 模式，但对 headless 浏览器使用传统模式以优化 SEO
  const isGalgameMode = !isHeadless;

  // 获取当前激活的导航项ID
  const currentActiveId = config?.navigation?.[currentSectionIndex]?.id;

  // 动态生成当前 section 的 SEO 数据（用于客户端导航时的更新）
  const currentSEO = React.useMemo(() => {
    if (!currentActiveId) return seo;
    return generateSectionSEO(currentActiveId);
  }, [currentActiveId, seo]);

  // 使用客户端 SEO 更新 Hook
  useClientSEO(currentActiveId || defaultSection);

  // 处理水合问题
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const socialIcons = React.useMemo(() => {
    // 将 iconMap 移到 useMemo 内部
    const iconMap: Record<string, IconDefinition> = {
      github: faGithub,
      twitter: faTwitter,
      'file-pdf': faFilePdf,
    };

    if (!config?.socialIcons) return [];
    return config.socialIcons.map((item) => ({
      ...item,
      icon: iconMap[item.icon] || faGithub,
    }));
  }, [config]);

  // 根据 defaultSection 初始化当前 section
  React.useEffect(() => {
    if (!config?.navigation) return;

    const initializeSection = () => {
      const navIndex = config.navigation.findIndex(
        (item) => item.id === defaultSection
      );
      if (navIndex !== -1) {
        setCurrentSectionIndex(navIndex);
      }
    };

    initializeSection();
  }, [config, defaultSection]);

  // 监听客户端路由变化（用于 SPA 导航）
  React.useEffect(() => {
    if (!config?.navigation) return;

    const handleRouteChange = (url: string) => {
      // 从 URL 提取 section
      const pathParts = url.split('/').filter(Boolean);
      const sectionId = pathParts[0] || 'about';

      const navIndex = config.navigation.findIndex(
        (item) => item.id === sectionId
      );
      if (navIndex !== -1) {
        setCurrentSectionIndex(navIndex);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [config, router]);

  // 处理导航点击 - 使用真实路径而非 hash
  const handleNavigationClick = (navId: string) => {
    const navIndex =
      config?.navigation?.findIndex((item) => item.id === navId) ?? 0;
    setCurrentSectionIndex(navIndex);

    // 使用真实路径进行 SPA 导航
    const newPath = navId === 'about' ? '/' : `/${navId}`;
    router.push(newPath, undefined, { scroll: false });
  };

  // 处理章节切换
  const handleSectionChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < (config?.navigation?.length ?? 0)) {
      setCurrentSectionIndex(newIndex);

      // 更新路由
      const sectionId = config?.navigation?.[newIndex]?.id;
      if (sectionId) {
        const newPath = sectionId === 'about' ? '/' : `/${sectionId}`;
        router.push(newPath, undefined, { scroll: false });
      }
    }
  };

  // 获取所有章节数据
  const allSections = React.useMemo(() => {
    if (!config?.navigation || !config?.sections) return [];

    return config.navigation
      .map((navItem) => {
        const sectionData = config.sections[navItem.id];
        return sectionData ? { ...sectionData } : null;
      })
      .filter(Boolean);
  }, [config]);

  // 提取 PC 端布局渲染逻辑
  const renderDesktopLayout = () => (
    <>
      <ThreeJSBackground />
      <div className={indexStyle.pageContainer}>
        <div className={indexStyle.topBar}>
          <ThemeButton />
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={indexStyle.twoColumnLayout}
        >
          {/* Left Side - Fixed Personal Info */}
          <motion.div
            variants={leftSideVariants}
            className={indexStyle.leftColumn}
          >
            <div className={indexStyle.personalInfo}>
              <div className={indexStyle.mainContent}>
                <TextRevealMotion delay={0.2} duration={0.7}>
                  <h1 className={indexStyle.name}>Douglas</h1>
                </TextRevealMotion>

                <TextRevealMotion delay={0.5} duration={0.7}>
                  <h2 className={indexStyle.title}>产品工程师</h2>
                </TextRevealMotion>

                <TextRevealMotion delay={0.8} duration={0.7}>
                  <p className={indexStyle.description}>
                    欢迎来到 Douglas
                    的自留地，一个持续奋斗在搬砖路上的产品工程师。
                  </p>
                </TextRevealMotion>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <AnchorNavigation
                    items={config?.navigation || []}
                    activeId={currentActiveId}
                    onNavigate={handleNavigationClick}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className={indexStyle.socialIcons}
              >
                {socialIcons.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={indexStyle.socialIcon}
                    onHoverStart={() => setHoveredIcon(social.id)}
                    onHoverEnd={() => setHoveredIcon('')}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    aria-label={social.label}
                  >
                    <motion.div
                      animate={{
                        color:
                          hoveredIcon === social.id
                            ? 'var(--color-primary)'
                            : 'var(--text-secondary)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <FontAwesomeIcon icon={social.icon} size="xl" />
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Scrollable Content */}
          <motion.div
            variants={rightSideVariants}
            className={`${indexStyle.rightColumn} rightColumn`}
            style={
              isGalgameMode
                ? {
                    overflowY: 'hidden',
                    overflowX: 'hidden',
                    maxHeight: '100vh',
                    paddingBottom: '2rem',
                  }
                : {}
            }
          >
            <div className={indexStyle.content}>
              {isGalgameMode && allSections.length > 0 ? (
                /* Galgame 模式 */
                <GalgameSection
                  key={`desktop-galgame-${currentSectionIndex}`}
                  sections={allSections}
                  currentSectionIndex={currentSectionIndex}
                  onSectionChange={handleSectionChange}
                />
              ) : (
                /* 传统模式 - 显示当前 section */
                config?.navigation?.map((navItem) => {
                  const sectionData = config.sections[navItem.id];
                  if (!sectionData || navItem.id !== currentActiveId)
                    return null;

                  return (
                    <DynamicSection
                      key={navItem.id}
                      section={sectionData}
                      className={indexStyle.section}
                      isHomepage={true}
                    />
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );

  // 设备检测和条件渲染
  if (!isHydrated) {
    // SSR 时默认渲染 PC 版（SEO 友好）
    return (
      <>
        <Head>
          <title>{currentSEO.title}</title>
          <meta name="description" content={currentSEO.description} />
          <meta name="keywords" content={currentSEO.keywords.join(', ')} />
          <meta name="author" content="Douglas" />
          <meta property="og:title" content={currentSEO.title} />
          <meta property="og:description" content={currentSEO.description} />
          <meta property="og:url" content={currentSEO.url} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Douglas 的个人网站" />
          <meta property="og:locale" content="zh_CN" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={currentSEO.title} />
          <meta name="twitter:description" content={currentSEO.description} />
          <meta name="twitter:site" content="@_DouglasDong_" />
          <meta name="twitter:creator" content="@_DouglasDong_" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={currentSEO.url} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </Head>
        {/* SSR 默认渲染 PC 版布局 */}
        {renderDesktopLayout()}
      </>
    );
  }

  // 客户端水合后，根据设备类型条件渲染
  if (isMobile || isTablet) {
    return (
      <>
        <Head>
          <title>{currentSEO.title}</title>
          <meta name="description" content={currentSEO.description} />
          <meta name="keywords" content={currentSEO.keywords.join(', ')} />
          <meta name="author" content="Douglas" />
          <meta property="og:title" content={currentSEO.title} />
          <meta property="og:description" content={currentSEO.description} />
          <meta property="og:url" content={currentSEO.url} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Douglas 的个人网站" />
          <meta property="og:locale" content="zh_CN" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={currentSEO.title} />
          <meta name="twitter:description" content={currentSEO.description} />
          <meta name="twitter:site" content="@_DouglasDong_" />
          <meta name="twitter:creator" content="@_DouglasDong_" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={currentSEO.url} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </Head>
        <MobileLayout defaultSection={defaultSection} />
      </>
    );
  }

  // 桌面端渲染
  return (
    <>
      <Head>
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="keywords" content={currentSEO.keywords.join(', ')} />
        <meta name="author" content="Douglas" />

        {/* Open Graph */}
        <meta property="og:title" content={currentSEO.title} />
        <meta property="og:description" content={currentSEO.description} />
        <meta property="og:url" content={currentSEO.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Douglas 的个人网站" />
        <meta property="og:locale" content="zh_CN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={currentSEO.title} />
        <meta name="twitter:description" content={currentSEO.description} />
        <meta name="twitter:site" content="@_DouglasDong_" />
        <meta name="twitter:creator" content="@_DouglasDong_" />

        {/* 其他 SEO 标签 */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentSEO.url} />

        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      {renderDesktopLayout()}
    </>
  );
};;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: [] } },           // /
      { params: { slug: ['experience'] } }, // /experience
      { params: { slug: ['principles'] } }, // /principles
      { params: { slug: ['article-links'] } }, // /article-links
      { params: { slug: ['contact'] } },    // /contact
    ],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async ({ params }) => {
  const slug = params?.slug as string[] | undefined;
  const sectionId = slug?.[0] || 'about';

  const seo = generateSectionSEO(sectionId);
  const structuredData = generateStructuredData(sectionId);

  return {
    props: {
      defaultSection: sectionId,
      seo,
      structuredData,
    },
  };
};

export default IndexPage;