import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import { extractBlogPosts, getSortedGroups, groupPostsByYear } from "../utils"
import externalLinks from "../content/articles/externalLinks"

const Writings = ({ data }) => {
  const blogPosts = getSortedGroups(
    groupPostsByYear(extractBlogPosts(data).concat(externalLinks))
  )

  return (
    <Layout className="p-4">
      <SEO title="Writings" />
      <h1 className="text-3xl font-bold leading-none text-white break-words xs:text-4xl">
        My writings
      </h1>
      <p>
        From time to time, I do write. Sometime on my blog, but also on other
        blogs such as on{" "}
        <a className="text-white underline" href="https://medium.com/@rathes">
          Medium
        </a>
        . The topics, I write about are diverse. Obviously, I write about the
        web, but also about non-web topics like my mother tongue Tamil or even
        about movies or anime.
      </p>
      <p>
        I do write in English, German and Tamil. So if you do not understand the
        title, it may be that you do not speak the language. If you want me to
        translate a specific article, just drop a message{" "}
        <a
          className="text-white underline"
          href="https://twitter.com/rswebdesigner"
        >
          @rswebdesigner
        </a>
      </p>
      <div className="mt-12">
        <div className="mb-10">
          <h2 className="text-silver-darker tracking-wider text-sm mb-2">
            Books & Whitepapers
          </h2>
          <a
            className="block text-white text-lg mb-2"
            href="https://learn-tamil.com"
          >
            A Guide To Basic Tamil Grammar
          </a>
        </div>
        {blogPosts.map(([key, posts]) => {
          return (
            <div key={key} className="mb-10">
              <h2 className="text-silver-darker tracking-wider text-sm mb-2">
                {key}
              </h2>
              {posts.map((post, index) =>
                post.link.startsWith("http") ? (
                  <a
                    href={post.link}
                    key={index}
                    className="block text-white text-lg mb-2"
                  >
                    {post.title}
                  </a>
                ) : (
                  <Link
                    to={post.link}
                    key={index}
                    className="block text-white text-lg mb-2"
                  >
                    {post.title}
                  </Link>
                )
              )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Writings
