import * as React from 'react';

import Layout from '../components/Layout';
import StyledLink from '../components/Link';
import SayHi from '../components/SayHi';
import { Paragraph } from '../components/Typography';
import List from '../components/List/List';
import { getSortedPostsMetaList } from '../../lib/posts';

export async function getStaticProps() {
  // TODO：按年排序
  debugger;
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
      <section className="max-w-screen-sm mt-11">
        <Paragraph>
          在大二开始的 Blog 折腾生涯中，我已经更换了好几个 Blog 系统，如 Ghost /
          WordPress / Hexo 之类的。最终还是回归到了简洁且对前端友好的 Gatsby
          体系下，毕竟能写 React 的 Blog 系统才是好系统（逃）。
        </Paragraph>
        <Paragraph>
          我平日的一大爱好就是折腾一些小工具，尤其是那种能提升日常开发效率，从而提升摸鱼时间的小工具。另一大爱好就是打主机游戏，如果希望进行交流的话，可以通过以下途径找到我
          {' '}
          <StyledLink href="https://twitter.com/_DouglasDong_" underline>
            @_DouglasDong_
          </StyledLink>
        </Paragraph>

        <section className="mt-11">
          <section className="mt-4">
            <List title="开源项目">
              <List.Item link="https://marketplace.visualstudio.com/items?itemName=handMS.c7n-dataset-plugin">
                vscode-dataset-extension
              </List.Item>
            </List>
          </section>

          {allPostsData.map((data, index) => (
            <section key={index} className="mt-4">
              <List title={data.id} key={index}>
                {/* {posts.map((post, index) => ( */}
                <List.Item
                  link={data.link}
                  key={index}
                  subtitle={data.categories[0]}
                >
                  {data.title}
                </List.Item>
                {/* // ))} */}
              </List>
            </section>
          ))}
        </section>
        <section className="my-11">
          <SayHi />
        </section>
      </section>
    </Layout>
  );
};

export default Writings;
