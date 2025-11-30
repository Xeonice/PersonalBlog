import React from 'react';
import { Heading2 } from '../Typography';
import SectionContent from '../SectionContent';
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