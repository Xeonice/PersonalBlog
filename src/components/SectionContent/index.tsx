import React, {
  useRef,
  useState,
  useCallback,
} from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { motion, useInView } from 'framer-motion';
import { useMultiTheme } from '../../context/ThemeContext';
import { useDeviceType } from '../../hooks/useDeviceType';
import StyledLink from '../Link';
import { Paragraph } from '../Typography';
import TypewriterText from '../GalgameSection/TypewriterText';
import styles from './index.module.css';

interface ContactMethod {
  type: string;
  link: string;
  label?: string;
}

interface Article {
  title: string;
  description: string;
  link: string;
  image?: string;
  year: string;
  tags?: string[];
}

interface TimelineItem {
  period: string;
  location?: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

interface ListItem {
  title: string;
  description: string;
}

interface SectionData {
  id: string;
  title: string;
  type: 'text' | 'timeline' | 'list' | 'contact' | 'articles';
  content:
    | { paragraphs: string[] }
    | { items: TimelineItem[] }
    | { items: ListItem[] }
    | { description: string; methods: ContactMethod[] }
    | { articles: Article[]; description?: string };
}

// 类型守卫函数
function hasTextContent(section: SectionData): section is SectionData & { content: { paragraphs: string[] } } {
  return section.type === 'text';
}

function hasTimelineContent(section: SectionData): section is SectionData & { content: { items: TimelineItem[] } } {
  return section.type === 'timeline';
}

function hasListContent(section: SectionData): section is SectionData & { content: { items: ListItem[] } } {
  return section.type === 'list';
}

function hasContactContent(section: SectionData): section is SectionData & { content: { description: string; methods: ContactMethod[] } } {
  return section.type === 'contact';
}

function hasArticlesContent(section: SectionData): section is SectionData & { content: { articles: Article[]; description?: string } } {
  return section.type === 'articles';
}

interface SectionContentProps {
  section: SectionData;
  mode?: 'static' | 'galgame';
  // Galgame 模式特有的 props
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
  isHomepage?: boolean;
  // 通知上层组件是否使用滚动模式
  onScrollModeChange?: (useScrollMode: boolean) => void;
}

// 获取联系方式的图标和信息
const getContactInfo = (method: ContactMethod) => {
  switch (method.type) {
    case 'email':
      return {
        icon: faEnvelope,
        title: '电子邮箱',
        prefix: '通过',
        linkText: '邮箱',
        suffix: '联系我',
        description: '最直接的沟通方式',
      };
    case 'github':
      return {
        icon: faGithub,
        title: 'GitHub',
        prefix: '在',
        linkText: 'GitHub',
        suffix: '上关注我',
        description: '查看我的开源项目',
      };
    case 'twitter':
      return {
        icon: faTwitter,
        title: 'Twitter',
        prefix: '在',
        linkText: 'Twitter',
        suffix: '上找到我',
        description: '日常想法与分享',
      };
    default:
      return {
        icon: faUser,
        title: method.label,
        prefix: '访问我的',
        linkText: method.label,
        suffix: '',
        description: '',
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
}> = ({
  content,
  mode,
  currentTextIndex = 0,
  skipCurrentText,
  onTextComplete,
  isHomepage,
}) => {
  if (mode === 'static') {
    return (
      <div className={styles.textContent}>
        {content.paragraphs.map((paragraph, index) => (
          <Paragraph
            key={index}
            className={
              index === 0 && isHomepage
                ? styles.firstParagraphHomepage
                : undefined
            }
          >
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
  content: { items: TimelineItem[] };
  mode: 'static' | 'galgame';
}> = ({
  content,
  mode,
}) => {
  const { currentTheme } = useMultiTheme();
  const { isMobile } = useDeviceType();

  if (mode === 'static') {
    const themeClass = currentTheme.isDark
      ? styles.timelineItemDark
      : styles.timelineItemLight;
    const mobileClass = isMobile ? styles.timelineItemMobile : '';

    return (
      <div
        className={`${styles.timelineContent} ${isMobile ? styles.timelineContentMobile : ''}`}
      >
        {content.items.map((item, index) => (
          <motion.div
            key={index}
            className={`${styles.timelineItem} ${themeClass} ${mobileClass}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -2,
              transition: { duration: 0.2 },
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
                    <StyledLink
                      href={item.companyUrl}
                      className={styles.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      <span className={styles.atSymbol}>·</span>
                      <span className={styles.companyName}>{item.company}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={styles.externalIcon}
                      >
                        <path d="m9 18 6-6-6-6" />
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
                  {item.achievements.map(
                    (achievement: string, achIndex: number) => (
                      <li key={achIndex} className={styles.achievementItem}>
                        {achievement}
                      </li>
                    )
                  )}
                </ul>
              )}

              {/* 技术栈标签 */}
              {item.technologies && item.technologies.length > 0 && (
                <div className={styles.technologiesWrapper}>
                  <div className={styles.technologiesList}>
                    {item.technologies.map(
                      (tech: string, techIndex: number) => (
                        <span key={techIndex} className={styles.technologyTag}>
                          {tech}
                        </span>
                      )
                    )}
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
    <div
      className={`${styles.timelineContent} ${isMobile ? styles.timelineContentMobile : ''}`}
    >
      {content.items.map((item: TimelineItem, index: number) => (
        <TimelineItemGalgame key={index} item={item} index={index} />
      ))}
    </div>
  );
};

// 单独的时间轴项目组件（Galgame 模式）
const TimelineItemGalgame: React.FC<{
  item: TimelineItem;
  index: number;
}> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTheme } = useMultiTheme();

  const isInView = useInView(ref, {
    // 不传 root，使用默认的 viewport
    once: true, // 只触发一次
    amount: 0.1, // 10% 可见就触发
    margin: '0px 0px -5% 0px', // 元素进入视口 5% 就触发，比原来的 10% 更容易触发
  });

  // 根据主题选择样式类，并检查是否为移动端
  const { isMobile } = useDeviceType();
  const themeClass = currentTheme.isDark
    ? styles.timelineItemDark
    : styles.timelineItemLight;
  const mobileClass = isMobile ? styles.timelineItemMobile : '';

  return (
    <motion.div
      ref={ref}
      className={`${styles.timelineItem} ${themeClass} ${mobileClass}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay: isInView ? index * 0.1 : 0, // 只在可见时才应用延迟
      }}
      onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
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
            {isInView ? (
              <TypewriterText
                text={item.title}
                delay={200 + index * 100} // 根据索引错开打字机效果
                speed={60}
              />
            ) : (
              item.title
            )}
            {item.companyUrl && item.companyUrl !== '#' ? (
              <StyledLink
                href={item.companyUrl}
                className={styles.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <span className={styles.atSymbol}>·</span>
                <span className={styles.companyName}>{item.company}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={styles.externalIcon}
                >
                  <path d="m9 18 6-6-6-6" />
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
};;

// 单个列表项组件（Galgame 模式） - 只处理正在动画的项目
const ListItemGalgame: React.FC<{
  item: ListItem;
  skipCurrentText?: boolean;
  onComplete?: () => void;
}> = ({ item, skipCurrentText, onComplete }) => {
  const [titleCompleted, setTitleCompleted] = useState(false);

  // 使用 useCallback 来稳定函数引用
  const handleTitleComplete = useCallback(() => {
    setTitleCompleted(true);
  }, []);

  return (
    <>
      <h4 className={styles.listTitle}>
        {!titleCompleted ? (
          <TypewriterText
            text={item.title}
            delay={0}
            speed={80}
            onComplete={handleTitleComplete}
            skipToEnd={skipCurrentText}
          />
        ) : (
          item.title
        )}
      </h4>
      <div
        className={styles.listDescription}
        style={{ minHeight: '1.5em', marginTop: '0.5rem' }}
      >
        {titleCompleted && (
          <TypewriterText
            text={item.description}
            delay={300}
            speed={50}
            onComplete={onComplete}
            skipToEnd={skipCurrentText}
          />
        )}
      </div>
    </>
  );
};

// 列表内容渲染
const ListContent: React.FC<{
  content: { items: ListItem[] };
  mode: 'static' | 'galgame';
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
}> = ({
  content,
  mode,
  currentTextIndex = 0,
  skipCurrentText,
  onTextComplete,
}) => {
  const { isMobile } = useDeviceType();

  if (mode === 'static') {
    return (
      <div
        className={`${styles.listContent} ${isMobile ? styles.listContentMobile : ''}`}
      >
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
    <div
      className={`${styles.listContent} ${isMobile ? styles.listContentMobile : ''}`}
    >
      {content.items.map((item: ListItem, index: number) => (
        <div key={index} className={styles.listItem}>
          {currentTextIndex > index ? (
            // 已完成的项目 - 直接显示静态内容，不使用组件
            <>
              <h4 className={styles.listTitle}>{item.title}</h4>
              <div className={styles.completedText}>{item.description}</div>
            </>
          ) : currentTextIndex === index ? (
            // 当前正在播放动画的项目
            <ListItemGalgame
              item={item}
              skipCurrentText={skipCurrentText}
              onComplete={onTextComplete}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

// 文章内容渲染
const ArticlesContent: React.FC<{
  content: { articles: Article[]; description?: string };
  mode: 'static' | 'galgame';
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
}> = ({
  content,
  mode,
  currentTextIndex = 0,
  skipCurrentText,
  onTextComplete,
}) => {
  if (mode === 'static') {
    return (
      <div className={styles.articlesContent}>
        {content.description && (
          <Paragraph className={styles.articlesDescription}>
            {content.description}
          </Paragraph>
        )}
        <div className={styles.articlesGrid}>
          {content.articles.map((article, index) => (
            <StyledLink
              key={index}
              href={article.link}
              className={styles.articleCard}
              target={article.link.startsWith('http') ? '_blank' : '_self'}
              rel={
                article.link.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* 左侧图片区域 */}
              {article.image && (
                <div className={styles.articleImage}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={200}
                    height={120}
                    className={styles.articleImageImg}
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </div>
              )}

              <div className={styles.articleMainContent}>
                <div className={styles.articleYear}>{article.year}</div>
                <div className={styles.articleContent}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <Paragraph className={styles.articleDescription}>
                    {article.description}
                  </Paragraph>
                  {article.tags && (
                    <div className={styles.articleTags}>
                      {article.tags.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className={styles.articleTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </StyledLink>
          ))}
        </div>
      </div>
    );
  }

  // Galgame 模式 - 基于滚动的卡片显示（使用 useInView）
  return (
    <div className={styles.articlesContent}>
      {content.description && (
        <div className={styles.articlesDescription}>
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
      )}
      {/* 文章列表会在描述完成后显示 */}
      {currentTextIndex > 0 && (
        <div className={styles.articlesGrid}>
          {content.articles.map((article: Article, index: number) => (
            <ArticleItemGalgame
              key={index}
              article={article}
              index={index}
              isLastItem={index === content.articles.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 单独的文章项目组件（Galgame 模式）
const ArticleItemGalgame: React.FC<{
  article: Article;
  index: number;
  isLastItem?: boolean;
}> = ({ article, index, isLastItem = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTheme } = useMultiTheme();

  const isInView = useInView(ref, {
    // 不传 root，使用默认的 viewport
    once: true, // 只触发一次
    amount: 0.1, // 10% 可见就触发
    // 最后一张卡片使用更宽松的条件
    margin: isLastItem ? '0px 0px -50px 0px' : '0px 0px -10% 0px',
  });

  // 根据主题选择样式类
  const themeClass = currentTheme.isDark
    ? styles.articleCardDark
    : styles.articleCardLight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1, // 错开动画时间
      }}
      onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <StyledLink
        href={article.link}
        className={`${styles.articleCard} ${themeClass}`}
        target={article.link.startsWith('http') ? '_blank' : '_self'}
        rel={
          article.link.startsWith('http') ? 'noopener noreferrer' : undefined
        }
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* 左侧图片区域 */}
        {article.image && (
          <div className={styles.articleImage}>
            <Image
              src={article.image}
              alt={article.title}
              width={200}
              height={120}
              className={styles.articleImageImg}
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
        )}

        <div className={styles.articleMainContent}>
          <div className={styles.articleYear}>{article.year}</div>
          <div className={styles.articleContent}>
            <h3 className={styles.articleTitle}>
              {isInView ? (
                <TypewriterText
                  text={article.title}
                  delay={200 + index * 100} // 根据索引错开打字机效果
                  speed={60}
                />
              ) : (
                article.title
              )}
            </h3>
            <div className={styles.articleDescription}>
              {article.description}
            </div>
            {article.tags && (
              <div className={styles.articleTags}>
                {article.tags.map((tag: string, tagIndex: number) => (
                  <span key={tagIndex} className={styles.articleTag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </StyledLink>
    </motion.div>
  );
};

// 联系方式内容渲染
const ContactContent: React.FC<{
  content: { description: string; methods: ContactMethod[] };
  mode: 'static' | 'galgame';
  currentTextIndex?: number;
  skipCurrentText?: boolean;
  onTextComplete?: () => void;
}> = ({
  content,
  mode,
  currentTextIndex = 0,
  skipCurrentText,
  onTextComplete,
}) => {
  const { isMobile } = useDeviceType();

  if (mode === 'static') {
    // 静态模式 - 使用现代卡片设计
    return (
      <div
        className={`${styles.contactContent} ${isMobile ? styles.contactContentMobile : ''}`}
      >
        <Paragraph
          className={`${styles.contactDesc} ${isMobile ? styles.contactDescMobile : ''}`}
        >
          {content.description}
        </Paragraph>
        <div
          className={`${styles.contactGrid} ${isMobile ? styles.contactGridMobile : ''}`}
        >
          {content.methods.map((method, index) => {
            const contactInfo = getContactInfo(method);

            return (
              <div key={index} className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <FontAwesomeIcon icon={contactInfo.icon} />
                </div>
                <div className={styles.contactCardContent}>
                  <h4 className={styles.contactCardTitle}>
                    {contactInfo.title}
                  </h4>
                  <div className={styles.contactCardText}>
                    <p className={styles.contactCardDescription}>
                      {contactInfo.description}
                    </p>
                    <div className={styles.contactCardAction}>
                      {contactInfo.prefix}{' '}
                      <StyledLink
                        href={method.link}
                        underline
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
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
    <div
      className={`${styles.contactContent} ${isMobile ? styles.contactContentMobile : ''}`}
    >
      {/* 主要描述 */}
      <div
        className={`${styles.contactDesc} ${isMobile ? styles.contactDescMobile : ''}`}
      >
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
      <div
        className={`${styles.contactGrid} ${isMobile ? styles.contactGridMobile : ''}`}
      >
        {content.methods.map((method: ContactMethod, index: number) => {
          const methodIndex = index + 1;
          const contactInfo = getContactInfo(method);

          return (
            <motion.div
              key={index}
              className={styles.contactCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity:
                  currentTextIndex > methodIndex
                    ? 1
                    : currentTextIndex === methodIndex
                      ? 1
                      : 0,
                y:
                  currentTextIndex > methodIndex
                    ? 0
                    : currentTextIndex === methodIndex
                      ? 0
                      : 20,
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
                    <p className={styles.contactCardDescription}>
                      {contactInfo.description}
                    </p>
                    <div className={styles.contactCardAction}>
                      {contactInfo.prefix}{' '}
                      <StyledLink
                        href={method.link}
                        underline
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        {contactInfo.linkText}
                      </StyledLink>
                      {contactInfo.suffix && ` ${contactInfo.suffix}`}
                    </div>
                  </div>
                ) : currentTextIndex === methodIndex ? (
                  // 当前正在播放的动画
                  <div className={styles.contactCardText}>
                    <p className={styles.contactCardDescription}>
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
                    </p>
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
  onScrollModeChange,
}) => {
  // 在组件加载时，根据 section 类型通知上层是否使用滚动模式
  React.useEffect(() => {
    if (mode === 'galgame' && onScrollModeChange) {
      const useScrollMode =
        section.type === 'timeline' || section.type === 'articles';
      onScrollModeChange(useScrollMode);
    }
  }, [section.type, mode, onScrollModeChange]);
  const renderContent = () => {
    switch (section.type) {
      case 'text':
        if (hasTextContent(section)) {
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
        }
        return null;
      case 'timeline':
        if (hasTimelineContent(section)) {
          return (
            <TimelineContent
              content={section.content}
              mode={mode}
            />
          );
        }
        return null;
      case 'list':
        if (hasListContent(section)) {
          return (
            <ListContent
              content={section.content}
              mode={mode}
              currentTextIndex={currentTextIndex}
              skipCurrentText={skipCurrentText}
              onTextComplete={onTextComplete}
            />
          );
        }
        return null;
      case 'articles':
        if (hasArticlesContent(section)) {
          return (
            <ArticlesContent
              content={section.content}
              mode={mode}
              currentTextIndex={currentTextIndex}
              skipCurrentText={skipCurrentText}
              onTextComplete={onTextComplete}
            />
          );
        }
        return null;
      case 'contact':
        if (hasContactContent(section)) {
          return (
            <ContactContent
              content={section.content}
              mode={mode}
              currentTextIndex={currentTextIndex}
              skipCurrentText={skipCurrentText}
              onTextComplete={onTextComplete}
            />
          );
        }
        return null;
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default SectionContent;
