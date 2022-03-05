import * as React from 'react';

import Layout from '../components/Layout';
import StyledLink from '../components/Link';
import SayHi from '../components/SayHi';
import { Paragraph } from '../components/Typography';
import List from '../components/List/List';
import { getSortedPostsMetaList } from '../../lib/posts';
import writingStyle from './writings.module.css';

export async function getStaticProps() {
  // TODO：按年排序
  const allPostsData = getSortedPostsMetaList();
  return {
    props: {
      allPostsData,
    },
  };
}

const Writings: React.FunctionComponent<{ allPostsData: any }> = function ({
  allPostsData,
}) {
  return (
    <Layout>
      <section className={writingStyle.container}>
        <Paragraph>
          在大二开始的 Blog 折腾生涯中，我已经更换了好几个 Blog 系统，如 Ghost /
          WordPress / Hexo / Gatsby 之类的。现在的站点由 Gatsby 迁移到 next.js，折腾才是人类第一生产力
        </Paragraph>
        <Paragraph>
          我平日的一大爱好就是折腾一些小工具，尤其是那种能提升日常开发效率，从而提升摸鱼时间的小工具。另一大爱好就是打主机游戏，如果希望进行交流的话，可以通过以下途径找到我
          {' '}
          <StyledLink href="https://twitter.com/_DouglasDong_" underline>
            @_DouglasDong_
          </StyledLink>
        </Paragraph>

        <section className={writingStyle.section}>
          <List title="开源项目">
            <List.Item link="https://marketplace.visualstudio.com/items?itemName=handMS.c7n-dataset-plugin">
              vscode-dataset-extension
            </List.Item>
          </List>

          {Object.entries(allPostsData)
            .sort(([a], [b]) => {
              if (a < b) {
                return 1;
              }
              return -1;
            })
            .map(([postDate, posts]) => (
              <section key={postDate} className={writingStyle.section}>
                <List title={postDate} key={postDate}>
                  {posts.map((post) => (
                    <List.Item
                      link={post.link}
                      key={post.id}
                      subtitle={post.categories[0]}
                    >
                      {post.title}
                    </List.Item>
                  ))}
                </List>
              </section>
            ))}
        </section>
        <SayHi />
      </section>
    </Layout>
  );
};

export default Writings;
