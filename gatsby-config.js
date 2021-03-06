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
const isEnvDev = process.env.NODE_ENV === 'development';

module.exports = {
  siteMetadata: {
    title: `前端开发 — DouglaDong`,
    description: `Hello，欢迎来到 Douglas 的自留地，一个持续奋斗在搬砖路上的 Web 开发`,
    author: `@_douglasdong_`,
    siteUrl: `https://douglasdong.com`,
  },
  plugins: [
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Douglas's Blog Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "http://feeds.feedburner.com/DouglassBlogFeed",
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: isEnvDev,
      },
    },
  ],
}
