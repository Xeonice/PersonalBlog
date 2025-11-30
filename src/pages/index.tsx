import * as React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import TextRevealMotion from '../components/TextRevealMotion';
import SectionMotion from '../components/SectionMotion';
import AnchorNavigation from '../components/AnchorNavigation';
import ThemeButton from '../components/ThemeButton';
import { Heading2, Paragraph } from '../components/Typography';
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

const navigationItems = [
  { id: 'about', label: '关于我' },
  { id: 'experience', label: '经历' },
  { id: 'principles', label: '原则' },
  { id: 'contact', label: '联系' },
];

const IndexPage: React.FC = function () {
  const [hoveredIcon, setHoveredIcon] = React.useState('');

  const socialIcons = [
    { id: 'github', icon: faGithub, href: 'https://github.com/Xeonice', label: 'GitHub' },
    { id: 'twitter', icon: faTwitter, href: 'https://twitter.com/_DouglasDong_', label: 'Twitter' },
    { id: 'resume', icon: faFilePdf, href: '/files/%E5%94%90%E5%92%8C%E8%BE%89%20-%2018602149227.pdf', label: 'Resume' },
  ];

  return (
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
                <AnchorNavigation items={navigationItems} />
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
            {/* About Section */}
            <SectionMotion id="about" direction="up" delay={0.1} className={indexStyle.section}>
              <div className={indexStyle.sectionHeader}>
                <Heading2>关于我</Heading2>
              </div>
              <div className={indexStyle.sectionContent}>
                <Paragraph>
                  我是 Douglas，一个目前工作与生活在杭州的 Web 开发，虽然立足于前端岗位，但我的个人视野从不局限于前端，同样也会聚焦于后端 / Devops / 抑或是产品 / UI。
                </Paragraph>
                <Paragraph>
                  开设这片自留地的主要原因在于，我希望在一个远离 gfw 的地方描述与记录一些自己的个人想法，同时不必因为一些 '不可名状的原因' 被迫自我阉割。因此，这里的记录可能并不仅限于开发，也可能会有一些除研发以外的随想。
                </Paragraph>
                <Paragraph>
                  最近执行 Lowcode 期间，对于业务本身的思考越来越多，因为 Blog 中的大部分文章可能都在讲一些自己执行期间遇到的问题和思考，所以废话会多一点（对技术流来说）。
                </Paragraph>
                <Paragraph>
                  我一直坚信一点，分享知识是巩固 / 获取新知识的最好方法。因此我会定期记录一些日常开发中解决问题的方法供各位参考。同样的，我热衷于为开源事业作出自己的一份贡献，如果有优质开源项目需要贡献人手，欢迎随时与我联系。
                </Paragraph>
              </div>
            </SectionMotion>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IndexPage;
