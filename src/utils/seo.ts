/**
 * SEO 工具函数
 * 为不同 section 生成 SEO metadata
 */

export interface SEOData {
  title: string;
  description: string;
  url: string;
  keywords: string[];
}

export function generateSectionSEO(sectionId: string): SEOData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  switch (sectionId) {
    case 'about':
    case '':
      return {
        title: '关于我 - Douglas',
        description: '产品工程师 Douglas，专注前端开发、产品设计，分享技术思考与开源贡献。欢迎了解我的技术背景和工作经历。',
        url: baseUrl,
        keywords: ['产品工程师', '前端开发', 'Web开发', '技术博客', 'Douglas', '杭州']
      };

    case 'experience':
      return {
        title: '工作经历 - Douglas',
        description: 'Douglas 的职业成长历程，从前端工程师到产品工程师，专注于前端架构设计、产品功能开发及技术选型。',
        url: `${baseUrl}/experience`,
        keywords: ['工作经历', '职业发展', '前端架构', '产品工程师', '技术选型', '项目经验']
      };

    case 'principles':
      return {
        title: '工作原则 - Douglas',
        description: 'Douglas 的工作哲学：技术为本、用户至上、开源精神、持续改进。分享我在技术和产品开发中的核心理念。',
        url: `${baseUrl}/principles`,
        keywords: ['工作原则', '技术理念', '用户体验', '开源精神', '持续改进', '产品思维']
      };

    case 'contact':
      return {
        title: '联系方式 - Douglas',
        description: '与 Douglas 取得联系：邮箱、GitHub、Twitter 等多种联系方式。欢迎技术交流、项目合作或开源贡献讨论。',
        url: `${baseUrl}/contact`,
        keywords: ['联系方式', '技术交流', '项目合作', '开源贡献', 'GitHub', 'Twitter', '邮箱']
      };

    default:
      return {
        title: 'Douglas 的个人网站',
        description: 'Douglas 的个人网站 - 产品工程师的技术分享、工作经历与思考记录。专注前端开发、产品设计及开源贡献。',
        url: baseUrl,
        keywords: ['个人网站', '产品工程师', '技术分享', '前端开发', '产品设计', '开源']
      };
  }
}

export function generateStructuredData(sectionId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  const basePerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Douglas",
    "jobTitle": "产品工程师",
    "url": baseUrl,
    "sameAs": [
      "https://github.com/Xeonice",
      "https://twitter.com/_DouglasDong_"
    ],
    "knowsAbout": [
      "Web开发",
      "前端架构",
      "产品设计",
      "JavaScript",
      "React",
      "Next.js"
    ]
  };

  switch (sectionId) {
    case 'about':
    case '':
      return {
        ...basePerson,
        "description": "专注于前端开发和产品设计的工程师，热衷于开源贡献和技术分享"
      };

    case 'experience':
      return {
        ...basePerson,
        "@type": "Person",
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "产品工程师",
            "occupationLocation": {
              "@type": "City",
              "name": "杭州"
            },
            "skills": "前端架构设计、产品功能开发、技术选型"
          },
          {
            "@type": "Occupation",
            "name": "前端开发工程师",
            "skills": "用户界面实现与优化、项目开发"
          }
        ]
      };

    default:
      return basePerson;
  }
}