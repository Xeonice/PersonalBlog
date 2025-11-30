import React from 'react';
import { Heading2, Paragraph } from '../Typography';
import styles from './index.module.css';

interface SectionData {
  id: string;
  title: string;
  type: 'text' | 'timeline' | 'list' | 'contact';
  content: any;
}

interface DynamicSectionProps {
  section: SectionData;
  className?: string;
  isHomepage?: boolean;
}

const TextSection: React.FC<{ content: { paragraphs: string[] }; isHomepage?: boolean }> = ({ content, isHomepage }) => (
  <div className={styles.textContent}>
    {content.paragraphs.map((paragraph, index) => (
      <Paragraph key={index} className={index === 0 && isHomepage ? styles.firstParagraphHomepage : undefined}>
        {paragraph}
      </Paragraph>
    ))}
  </div>
);

const TimelineSection: React.FC<{ content: { items: any[] } }> = ({ content }) => (
  <div className={styles.timelineContent}>
    {content.items.map((item, index) => (
      <div key={index} className={styles.timelineItem}>
        <div className={styles.timelinePeriod}>{item.period}</div>
        <div className={styles.timelineDetails}>
          <h4 className={styles.timelineTitle}>{item.title}</h4>
          <div className={styles.timelineCompany}>{item.company}</div>
          <Paragraph>{item.description}</Paragraph>
        </div>
      </div>
    ))}
  </div>
);

const ListSection: React.FC<{ content: { items: any[] } }> = ({ content }) => (
  <div className={styles.listContent}>
    {content.items.map((item, index) => (
      <div key={index} className={styles.listItem}>
        <h4 className={styles.listTitle}>{item.title}</h4>
        <Paragraph>{item.description}</Paragraph>
      </div>
    ))}
  </div>
);

const ContactSection: React.FC<{ content: { description: string; methods: any[] } }> = ({ content }) => (
  <div className={styles.contactContent}>
    <Paragraph>{content.description}</Paragraph>
    <div className={styles.contactMethods}>
      {content.methods.map((method, index) => (
        <div key={index} className={styles.contactMethod}>
          <span className={styles.contactLabel}>{method.label}:</span>
          <a
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            {method.value}
          </a>
        </div>
      ))}
    </div>
  </div>
);

const DynamicSection: React.FC<DynamicSectionProps> = ({ section, className, isHomepage }) => {
  const renderContent = () => {
    switch (section.type) {
      case 'text':
        return <TextSection content={section.content} isHomepage={isHomepage} />;
      case 'timeline':
        return <TimelineSection content={section.content} />;
      case 'list':
        return <ListSection content={section.content} />;
      case 'contact':
        return <ContactSection content={section.content} />;
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  return (
    <section id={section.id} className={`${className} ${isHomepage ? styles.homepageSection : ''}`}>
      <div className={styles.sectionHeader}>
        <Heading2>{section.title}</Heading2>
      </div>
      <div className={styles.sectionContent}>
        {renderContent()}
      </div>
    </section>
  );
};

export default DynamicSection;