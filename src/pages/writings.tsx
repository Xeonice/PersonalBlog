import * as React from 'react';
import { TransitionState } from 'gatsby-plugin-transition-link';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Link from '../components/Link';

import { extractBlogPosts, getSortedGroups, groupPostsByYear } from '../utils';

import externalLinks from '../content/articles/externalLinks';
import SayHi from '../components/SayHi';
import { section } from '../components/Box';
import { Paragraph } from '../components/Typography';
import List from '../components/List/List';
import AnimeContainer from '../components/AnimeContainer';

const Writings: React.FunctionComponent<{ data: any }> = function ({ data }) {
  const blogPosts = getSortedGroups(
    groupPostsByYear(extractBlogPosts(data).concat(externalLinks)),
  );

  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout>
          <section maxWidth="640px" marginTop={32} element="section">
            <SEO title="Writings" />
            <AnimeContainer toggle={transitionStatus === 'entered'}>
              <Paragraph>
                在大二开始的 Blog 折腾生涯中，我已经更换了好几个 Blog 系统，如
                Ghost / WordPress / Hexo
                之类的。最终还是回归到了简洁且对前端友好的 Gatsby
                体系下，毕竟能写 React 的 Blog 系统才是好系统（逃）。
              </Paragraph>
              <Paragraph>
                我平日的一大爱好就是折腾一些小工具，尤其是那种能提升日常开发效率，从而提升摸鱼时间的小工具。另一大爱好就是打主机游戏，如果希望进行交流的话，可以通过以下途径找到我
                {' '}
                <Link
                  color="white"
                  href="https://twitter.com/_DouglasDong_"
                  underlined
                >
                  @_DouglasDong_
                </Link>
              </Paragraph>

              <section marginTop={32} element="section">
                <section marginTop={12}>
                  <List title="开源项目">
                    <List.Item link="https://marketplace.visualstudio.com/items?itemName=handMS.c7n-dataset-plugin">
                      vscode-dataset-extension
                    </List.Item>
                  </List>
                </section>

                {blogPosts.map(([key, posts]) => (
                  <section key={key} marginTop={12}>
                    <List title={key} key={key}>
                      {posts.map((post, index) => (
                        <List.Item
                          link={post.link}
                          key={index}
                          subtitle={post.categories[0]}
                        >
                          {post.title}
                        </List.Item>
                      ))}
                    </List>
                  </section>
                ))}
              </section>
              <section marginTop={32} marginBottom={32} element="section">
                <SayHi />
              </section>
            </AnimeContainer>
          </section>
        </Layout>
      )}
    </TransitionState>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            categories
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Writings;
