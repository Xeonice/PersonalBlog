import React from 'react';
import { Heading2 } from '../Typography';
import SectionContent from '../SectionContent';
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

type SectionContent =
  | { paragraphs: string[] } // text
  | { items: TimelineItem[] } // timeline
  | { items: ListItem[] } // list
  | { description: string; methods: ContactMethod[] } // contact
  | { articles: Article[]; description?: string }; // articles

interface SectionData {
  id: string;
  title: string;
  type: 'text' | 'timeline' | 'list' | 'contact' | 'articles';
  content: SectionContent;
}

interface DynamicSectionProps {
  section: SectionData;
  className?: string;
  isHomepage?: boolean;
}


const DynamicSection: React.FC<DynamicSectionProps> = ({ section, className, isHomepage }) => {
  return (
    <section id={section.id} className={`${className} ${isHomepage ? styles.homepageSection : ''}`}>
      <div className={styles.sectionHeader}>
        <Heading2>{section.title}</Heading2>
      </div>
      <div className={styles.sectionContent}>
        <SectionContent
          section={section}
          mode="static"
          isHomepage={isHomepage}
        />
      </div>
    </section>
  );
};

export default DynamicSection;