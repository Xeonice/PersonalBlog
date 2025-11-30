import { useState, useEffect } from 'react';

interface SocialIcon {
  id: string;
  icon: string;
  href: string;
  label: string;
}

interface SectionConfig {
  sections: Record<string, any>;
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