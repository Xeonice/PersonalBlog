import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { motion, useInView } from 'framer-motion';
import { useMultiTheme } from '../../context/ThemeContext';
import StyledLink from '../Link';
import { Paragraph } from '../Typography';
import TypewriterText from '../GalgameSection/TypewriterText';
import styles from './index.module.css';

interface SectionData {
  id: string;
  title: string;
  type: 'text' | 'timeline' | 'list' | 'contact';
  content: any;
}

interface SectionContentProps {
  section: SectionData;
  mode?: 'static' | 'galgame';
  // Galgame 模式特有的 props
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
  isHomepage?: boolean;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

// 获取联系方式的图标和信息
const getContactInfo = (method: any) => {
  switch (method.type) {
    case 'email':
      return {
        icon: faEnvelope,
        title: '电子邮箱',
        prefix: '通过',
        linkText: '邮箱',
        suffix: '联系我',
        description: '最直接的沟通方式'
      };
    case 'github':
      return {
        icon: faGithub,
        title: 'GitHub',
        prefix: '在',
        linkText: 'GitHub',
        suffix: '上关注我',
        description: '查看我的开源项目'
      };
    case 'twitter':
      return {
        icon: faTwitter,
        title: 'Twitter',
        prefix: '在',
        linkText: 'Twitter',
        suffix: '上找到我',
        description: '日常想法与分享'
      };
    default:
      return {
        icon: faUser,
        title: method.label,
        prefix: '访问我的',
        linkText: method.label,
        suffix: '',
        description: ''
      };
  }
};

// 文本内容渲染
const TextContent: React.FC<{
  content: { paragraphs: string[] };
  mode: 'static' | 'galgame';
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
  isHomepage?: boolean;
}> = ({ content, mode, currentTextIndex = 0, skipCurrentText, onTextComplete, isHomepage }) => {
  if (mode === 'static') {
    return (
      <div className={styles.textContent}>
        {content.paragraphs.map((paragraph, index) => (
          <Paragraph key={index} className={index === 0 && isHomepage ? styles.firstParagraphHomepage : undefined}>
            {paragraph}
          </Paragraph>
        ))}
      </div>
    );
  }

  // Galgame 模式
  return (
    <div className={styles.textContent}>
      {content.paragraphs.map((paragraph: string, index: number) => (
        <div key={index} className={styles.textLine}>
          {currentTextIndex > index && (
            <div className={styles.completedText}>{paragraph}</div>
          )}
          {currentTextIndex === index && (
            <TypewriterText
              text={paragraph}
              delay={0}
              onComplete={onTextComplete}
              skipToEnd={skipCurrentText}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// 时间轴内容渲染
const TimelineContent: React.FC<{
  content: { items: any[] };
  mode: 'static' | 'galgame';
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}> = ({ content, mode, currentTextIndex = 0, skipCurrentText, onTextComplete, scrollContainerRef }) => {
  const { currentTheme } = useMultiTheme();

  if (mode === 'static') {
    const themeClass = currentTheme.isDark ? styles.timelineItemDark : styles.timelineItemLight;

    return (
      <div className={styles.timelineContent}>
        {content.items.map((item, index) => (
          <motion.div
            key={index}
            className={`${styles.timelineItem} ${themeClass}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -2,
              transition: { duration: 0.2 }
            }}
          >
            {/* 左侧：时间段 */}
            <div className={styles.timelinePeriod}>
              <span className={styles.periodText}>{item.period}</span>
              {item.location && (
                <span className={styles.periodLocation}>{item.location}</span>
              )}
            </div>

            {/* 右侧：详细内容 */}
            <div className={styles.timelineDetails}>
              {/* 职位和公司 */}
              <div className={styles.timelineHeader}>
                <h3 className={styles.timelineTitle}>
                  {item.title}
                  {item.companyUrl && item.companyUrl !== '#' ? (
                    <StyledLink href={item.companyUrl} className={styles.companyLink}>
                      <span className={styles.atSymbol}>·</span>
                      <span className={styles.companyName}>{item.company}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={styles.externalIcon}
                      >
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </StyledLink>
                  ) : (
                    <>
                      <span className={styles.atSymbol}>·</span>
                      <span className={styles.companyName}>{item.company}</span>
                    </>
                  )}
                </h3>
              </div>

              {/* 主要描述 */}
              <Paragraph className={styles.timelineDescription}>
                {item.description}
              </Paragraph>

              {/* 成就列表（如果有） */}
              {item.achievements && item.achievements.length > 0 && (
                <ul className={styles.achievementsList}>
                  {item.achievements.map((achievement: string, achIndex: number) => (
                    <li key={achIndex} className={styles.achievementItem}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}

              {/* 技术栈标签 */}
              {item.technologies && item.technologies.length > 0 && (
                <div className={styles.technologiesWrapper}>
                  <div className={styles.technologiesList}>
                    {item.technologies.map((tech: string, techIndex: number) => (
                      <span key={techIndex} className={styles.technologyTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Galgame 模式 - 基于滚动的卡片显示（使用 useInView）
  return (
    <div className={styles.timelineContent}>
      {content.items.map((item: any, index: number) => (
        <TimelineItemGalgame
          key={index}
          item={item}
          index={index}
          scrollContainerRef={scrollContainerRef}
        />
      ))}
    </div>
  );
};

// 单独的时间轴项目组件（Galgame 模式）
const TimelineItemGalgame: React.FC<{
  item: any;
  index: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}> = ({ item, index, scrollContainerRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTheme } = useMultiTheme();

  const isInView = useInView(ref, {
    root: scrollContainerRef?.current || null,  // 使用传入的滚动容器
    once: true,  // 只触发一次
    amount: 0.1,  // 10% 可见就触发
    margin: "0px 0px -10% 0px"  // 稍微提前触发
  });

  // 根据主题选择样式类
  const themeClass = currentTheme.isDark ? styles.timelineItemDark : styles.timelineItemLight;

  return (
    <motion.div
      ref={ref}
      className={`${styles.timelineItem} ${themeClass}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: isInView ? index * 0.1 : 0  // 只在可见时才应用延迟
      }}
    >
            {/* 卡片内容保持不变 */}
            {/* 左侧：时间段 */}
            <div className={styles.timelinePeriod}>
              <span className={styles.periodText}>{item.period}</span>
              {item.location && (
                <span className={styles.periodLocation}>{item.location}</span>
              )}
            </div>

            {/* 右侧：详细内容 */}
            <div className={styles.timelineDetails}>
              {/* 职位和公司 */}
              <div className={styles.timelineHeader}>
                <h3 className={styles.timelineTitle}>
                  {item.title}
                  {item.companyUrl && item.companyUrl !== '#' ? (
                    <StyledLink href={item.companyUrl} className={styles.companyLink}>
                      <span className={styles.atSymbol}>·</span>
                      <span className={styles.companyName}>{item.company}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={styles.externalIcon}
                      >
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </StyledLink>
                  ) : (
                    <>
                      <span className={styles.atSymbol}>·</span>
                      <span className={styles.companyName}>{item.company}</span>
                    </>
                  )}
                </h3>
              </div>

              {/* 主要描述 - 整个卡片显示时直接显示完整内容 */}
              <Paragraph className={styles.timelineDescription}>
                {item.description}
              </Paragraph>

              {/* 成就列表 */}
              {item.achievements && item.achievements.length > 0 && (
                <ul className={styles.achievementsList}>
                  {item.achievements.map((achievement: string, achIndex: number) => (
                    <li key={achIndex} className={styles.achievementItem}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}

              {/* 技术栈标签 */}
              {item.technologies && item.technologies.length > 0 && (
                <div className={styles.technologiesWrapper}>
                  <div className={styles.technologiesList}>
                    {item.technologies.map((tech: string, techIndex: number) => (
                      <span key={techIndex} className={styles.technologyTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
    </motion.div>
  );
};

// 列表内容渲染
const ListContent: React.FC<{
  content: { items: any[] };
  mode: 'static' | 'galgame';
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
}> = ({ content, mode, currentTextIndex = 0, skipCurrentText, onTextComplete }) => {
  if (mode === 'static') {
    return (
      <div className={styles.listContent}>
        {content.items.map((item, index) => (
          <div key={index} className={styles.listItem}>
            <h4 className={styles.listTitle}>{item.title}</h4>
            <Paragraph>{item.description}</Paragraph>
          </div>
        ))}
      </div>
    );
  }

  // Galgame 模式
  return (
    <div className={styles.listContent}>
      {content.items.map((item: any, index: number) => (
        <div key={index} className={styles.listItem}>
          {currentTextIndex > index && (
            <div className={styles.completedText}>{`${item.title}: ${item.description}`}</div>
          )}
          {currentTextIndex === index && (
            <TypewriterText
              text={`${item.title}: ${item.description}`}
              delay={0}
              onComplete={onTextComplete}
              skipToEnd={skipCurrentText}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// 联系方式内容渲染
const ContactContent: React.FC<{
  content: { description: string; methods: any[] };
  mode: 'static' | 'galgame';
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
}> = ({ content, mode, currentTextIndex = 0, skipCurrentText, onTextComplete }) => {
  if (mode === 'static') {
    // 静态模式 - 使用现代卡片设计
    return (
      <div className={styles.contactContent}>
        <Paragraph className={styles.contactDesc}>{content.description}</Paragraph>
        <div className={styles.contactGrid}>
          {content.methods.map((method, index) => {
            const contactInfo = getContactInfo(method);

            return (
              <div key={index} className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <FontAwesomeIcon icon={contactInfo.icon} />
                </div>
                <div className={styles.contactCardContent}>
                  <h4 className={styles.contactCardTitle}>{contactInfo.title}</h4>
                  <div className={styles.contactCardText}>
                    <p className={styles.contactCardDescription}>{contactInfo.description}</p>
                    <div className={styles.contactCardAction}>
                      {contactInfo.prefix}{' '}
                      <StyledLink href={method.link} underline>
                        {contactInfo.linkText}
                      </StyledLink>
                      {contactInfo.suffix && ` ${contactInfo.suffix}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Galgame 模式
  return (
    <div className={styles.contactContent}>
      {/* 主要描述 */}
      <div className={styles.contactDesc}>
        {currentTextIndex > 0 && (
          <div className={styles.completedText}>{content.description}</div>
        )}
        {currentTextIndex === 0 && (
          <TypewriterText
            text={content.description}
            delay={0}
            onComplete={onTextComplete}
            skipToEnd={skipCurrentText}
          />
        )}
      </div>

      {/* 联系方式卡片 */}
      <div className={styles.contactGrid}>
        {content.methods.map((method: any, index: number) => {
          const methodIndex = index + 1;
          const contactInfo = getContactInfo(method);

          return (
            <motion.div
              key={index}
              className={styles.contactCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentTextIndex > methodIndex ? 1 : (currentTextIndex === methodIndex ? 1 : 0),
                y: currentTextIndex > methodIndex ? 0 : (currentTextIndex === methodIndex ? 0 : 20)
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={styles.contactCardIcon}>
                <FontAwesomeIcon icon={contactInfo.icon} />
              </div>
              <div className={styles.contactCardContent}>
                <h4 className={styles.contactCardTitle}>{contactInfo.title}</h4>
                {currentTextIndex > methodIndex ? (
                  // 动画完成后显示可点击的链接版本
                  <div className={styles.contactCardText}>
                    <p className={styles.contactCardDescription}>{contactInfo.description}</p>
                    <div className={styles.contactCardAction}>
                      {contactInfo.prefix}{' '}
                      <StyledLink href={method.link} underline>
                        {contactInfo.linkText}
                      </StyledLink>
                      {contactInfo.suffix && ` ${contactInfo.suffix}`}
                    </div>
                  </div>
                ) : currentTextIndex === methodIndex ? (
                  // 当前正在播放的动画
                  <div className={styles.contactCardText}>
                    <TypewriterText
                      text={contactInfo.description}
                      delay={0}
                      speed={30}
                      onComplete={() => {
                        setTimeout(() => {
                          onTextComplete?.();
                        }, 500);
                      }}
                      skipToEnd={skipCurrentText}
                    />
                  </div>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  mode = 'static',
  currentTextIndex,
  skipCurrentText,
  onTextComplete,
  isHomepage,
  scrollContainerRef
}) => {
  const renderContent = () => {
    switch (section.type) {
      case 'text':
        return (
          <TextContent
            content={section.content}
            mode={mode}
            currentTextIndex={currentTextIndex}
            skipCurrentText={skipCurrentText}
            onTextComplete={onTextComplete}
            isHomepage={isHomepage}
          />
        );
      case 'timeline':
        return (
          <TimelineContent
            content={section.content}
            mode={mode}
            currentTextIndex={currentTextIndex}
            skipCurrentText={skipCurrentText}
            onTextComplete={onTextComplete}
            scrollContainerRef={scrollContainerRef}
          />
        );
      case 'list':
        return (
          <ListContent
            content={section.content}
            mode={mode}
            currentTextIndex={currentTextIndex}
            skipCurrentText={skipCurrentText}
            onTextComplete={onTextComplete}
          />
        );
      case 'contact':
        return (
          <ContactContent
            content={section.content}
            mode={mode}
            currentTextIndex={currentTextIndex}
            skipCurrentText={skipCurrentText}
            onTextComplete={onTextComplete}
          />
        );
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default SectionContent;