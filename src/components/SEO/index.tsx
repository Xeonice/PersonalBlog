import * as React from "react"
import * as PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

interface SEOType {
  description?: string;
  lang?: string;
  meta?: Array<any>;
  title?: string;
}

const SEO: React.FunctionComponent<SEOType> = ({ description, lang, meta, title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || data.site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
        class: "han-init"
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'viewport',
          content: "width=device-width, initial-scale=1"
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:site_name`,
          content: `DouglasDong's blog`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `zh`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
