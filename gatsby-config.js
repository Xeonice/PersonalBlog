const markdownPlugins = [
  `gatsby-plugin-twitter`,
  {
    resolve: `gatsby-remark-prismjs`,
    options: {
      aliases: {},
      classPrefix: "language-",
      showLineNumbers: false,
      noInlineHighlight: true,
    },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      // It's important to specify the maxWidth (in pixels) of
      // the content container as this plugin uses this as the
      // base for generating different widths of each image.
      maxWidth: 590,
    },
  },
]

module.exports = {
  siteMetadata: {
    title: `前端开发 — DouglaDong`,
    description: `Hello，欢迎来到 Douglas 的自留地，一个持续奋斗在搬砖路上的 Web 开发`,
    author: `@_douglasdong_`,
    siteUrl: `https://douglasdong.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Noto Serif SC`,
            variants: [`400`, `600`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: markdownPlugins,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: markdownPlugins,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     trackingIds: ["UA-48222009-4"],
    //     gtagConfig: {
    //       anonymize_ip: true,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `douglasdong's blog`,
        short_name: `douglasdong`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/content/images/icon.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark-mode',
        classNameLight: 'light-mode',
        storageKey: 'darkMode',
        minify: true,
      },
    },
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-feed`
  ],
}
