import { useState, useEffect } from 'react';

interface SocialIcon {
  id: string;
  icon: string;
  href: string;
  label: string;
}

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

interface SectionConfig {
  sections: Record<string, SectionData>;
  navigation: Array<{ id: string; label: string }>;
  socialIcons: SocialIcon[];
}

export function useConfig() {
  const [config, setConfig] = useState<SectionConfig | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      const response = await fetch('/config/sections.json');
      const configData = await response.json();
      setConfig(configData);
    };

    loadConfig();
  }, []);

  return { config };
}