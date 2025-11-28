import * as React from 'react';
import { motion, cubicBezier } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import OverviewInfo from '../components/OverviewInfo';
import TextRevealMotion from '../components/TextRevealMotion';
import LiquidGlassCard from '../components/LiquidGlassCard';
import SectionMotion from '../components/SectionMotion';
import SayHi from '../components/SayHi';
import StyledLink from '../components/Link';
import AnchorNavigation from '../components/AnchorNavigation';
import ThemeButton from '../components/ThemeButton';
import { Heading1, Heading2, Paragraph } from '../components/Typography';
import indexStyle from './index.module.css';

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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.645, 0.045, 0.355, 1),
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
      ease: cubicBezier(0.645, 0.045, 0.355, 1),
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

            {/* Experience Section */}
            <SectionMotion id="experience" direction="up" delay={0.2} className={indexStyle.section}>
              <div className={indexStyle.sectionHeader}>
                <Heading2>工作经历</Heading2>
              </div>
              <div className={indexStyle.sectionContent}>
                <LiquidGlassCard variant="subtle" className={indexStyle.experienceCard}>
                  <div className={indexStyle.experienceHeader}>
                    <h3>高级前端工程师 · 互联网金融公司</h3>
                    <span className={indexStyle.experienceDate}>2020 — 至今</span>
                  </div>
                  <Paragraph>
                    负责公司内部面向中台体系的 Lowcode 平台开发，致力于提升中后台项目的研发效能。主导了多个核心功能模块的设计与实现，显著提升了团队的开发效率。
                  </Paragraph>
                  <div className={indexStyle.techStack}>
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>Node.js</span>
                    <span>Lowcode</span>
                  </div>
                </LiquidGlassCard>

                <LiquidGlassCard variant="subtle" className={indexStyle.experienceCard}>
                  <div className={indexStyle.experienceHeader}>
                    <h3>DataSet 教程项目</h3>
                    <span className={indexStyle.experienceDate}>开源项目</span>
                  </div>
                  <Paragraph>
                    改良 Choerodon-ui 体系的相关文档，开发了针对 VSCode 的插件，创建了更友好的交互式文档，显著改善了开发者的使用体验。
                  </Paragraph>
                  <div className={indexStyle.projectLinks}>
                    <StyledLink
                      href="https://open-hand.github.io/choerodon-ui/zh/tutorials/introduction"
                      underline
                    >
                      查看项目
                    </StyledLink>
                    <StyledLink
                      href="https://marketplace.visualstudio.com/items?itemName=handMS.c7n-dataset-plugin"
                      underline
                    >
                      VSCode 插件
                    </StyledLink>
                  </div>
                </LiquidGlassCard>
              </div>
            </SectionMotion>

            {/* Personal Principles Section */}
            <SectionMotion id="principles" direction="up" delay={0.3} className={indexStyle.section}>
              <div className={indexStyle.sectionHeader}>
                <Heading2>个人原则</Heading2>
              </div>
              <div className={indexStyle.sectionContent}>
                <Paragraph>
                  在技术和工作中，我遵循一些核心原则，这些原则指导着我的决策和行为方式。
                </Paragraph>
                <div className={indexStyle.principlesGrid}>
                  <LiquidGlassCard variant="subtle" className={indexStyle.principleCard}>
                    <h4>技术驱动价值</h4>
                    <p>技术的价值在于解决实际问题，而不是单纯的技术炫技。始终以业务价值为导向选择技术方案。</p>
                  </LiquidGlassCard>

                  <LiquidGlassCard variant="subtle" className={indexStyle.principleCard}>
                    <h4>持续学习成长</h4>
                    <p>技术日新月异，保持好奇心和学习能力是保持竞争力的关键。分享知识，与他人共同成长。</p>
                  </LiquidGlassCard>

                  <LiquidGlassCard variant="subtle" className={indexStyle.principleCard}>
                    <h4>追求卓越品质</h4>
                    <p>无论是代码质量、用户体验还是团队协作，都要追求卓越，注重细节，持续改进。</p>
                  </LiquidGlassCard>

                  <LiquidGlassCard variant="subtle" className={indexStyle.principleCard}>
                    <h4>开放协作精神</h4>
                    <p>相信开源的力量，积极参与开源社区，与全球开发者分享知识和经验。</p>
                  </LiquidGlassCard>
                </div>
              </div>
            </SectionMotion>

            {/* Contact Section */}
            <SectionMotion id="contact" direction="up" delay={0.4} className={indexStyle.section}>
              <div className={indexStyle.sectionHeader}>
                <Heading2>联系方式</Heading2>
              </div>
              <div className={indexStyle.sectionContent}>
                <SayHi />
              </div>
            </SectionMotion>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IndexPage;
