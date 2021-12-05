import { graphql, Link as RouterLink } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Img from 'gatsby-image';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import Link from '../../components/Link';
import { section } from '../../components/Box';
import { Heading1 } from '../../components/Typography';

import Tag from '../../components/Tag';

const mdx: React.FunctionComponent<{ data: any }> = ({ data }) => {
  const post = data.mdx;
  const meta = [
    {
      name: 'og:url',
      content: data.site.siteMetadata.siteUrl + post.fields.slug,
    },
    {
      name: 'og:type',
      content: 'article',
    },
    {
      name: 'og:locale',
      content: post.frontmatter.locale,
    },
    {
      name: 'article:author',
      content: 'https://www.facebook.com/rathes.de',
    },
  ];
  const imageMeta = post.frontmatter.image
    ? [
      {
        name: 'twitter:image',
        content:
            data.site.siteMetadata.siteUrl + post.frontmatter.image.publicURL,
      },
      {
        name: 'og:image',
        content:
            data.site.siteMetadata.siteUrl + post.frontmatter.image.publicURL,
      },
      {
        name: 'og:image:secure_url',
        content:
            data.site.siteMetadata.siteUrl + post.frontmatter.image.publicURL,
      },
    ]
    : [];

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        meta={[...meta, ...imageMeta]}
      />
      <section maxWidth="640px" marginTop={8}>
        <Heading1>{post.frontmatter.title}</Heading1>
        <section
          marginBottom={8}
          justifyContent="space-between"
          alignItems="center"
          display="flex"
        >
          <section>{post.frontmatter.date}</section>
          <section>
            {post.frontmatter.categories.map((category) => (
              <Tag color="silver">{category}</Tag>
            ))}
          </section>
        </section>
        <section marginBottom={4} marginTop={4}>
          {post.frontmatter.image && (
            <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
          )}
        </section>
        <MDXRenderer>{post.body}</MDXRenderer>
        <section element="footer" marginTop={32} marginBottom={32}>
          <Link element={RouterLink} color="white" underline to="/writings">
            返回文章列表
          </Link>
        </section>
      </section>
    </Layout>
  );
};
export default mdx;

export const query = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
      }
      frontmatter {
        title
        locale
        categories
        date(formatString: "L LT", locale: "zh-cn")
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
