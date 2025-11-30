import * as React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import TextRevealMotion from '../components/TextRevealMotion';
import AnchorNavigation from '../components/AnchorNavigation';
import ThemeButton from '../components/ThemeButton';
import ThreeJSBackground from '../components/ThreeJSBackground';
import DynamicSection from '../components/DynamicSection';
import { useConfig } from '../hooks/useConfig';
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


const IndexPage: React.FC = function () {
  const [hoveredIcon, setHoveredIcon] = React.useState('');
  const { config } = useConfig();

  const socialIcons = [
    { id: 'github', icon: faGithub, href: 'https://github.com/Xeonice', label: 'GitHub' },
    { id: 'twitter', icon: faTwitter, href: 'https://twitter.com/_DouglasDong_', label: 'Twitter' },
    { id: 'resume', icon: faFilePdf, href: '/files/%E5%94%90%E5%92%8C%E8%BE%89%20-%2018602149227.pdf', label: 'Resume' },
  ];

  return (
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
                  欢迎来到 Douglas 的自留地，一个持续奋斗在搬砖路上的产品工程师。
                </p>
              </TextRevealMotion>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <AnchorNavigation items={config?.navigation || []} />
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
                      color: hoveredIcon === social.id ? 'var(--color-primary)' : 'var(--text-secondary)',
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
        >
          <div className={indexStyle.content}>
            {/* Dynamic Sections */}
            {config?.navigation?.map((navItem) => {
              const sectionData = config.sections[navItem.id];
              if (!sectionData) return null;

              return (
                <DynamicSection
                  key={navItem.id}
                  section={sectionData}
                  className={indexStyle.section}
                  isHomepage={true}
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
      </div>
    </>
  );
};

export default IndexPage;
