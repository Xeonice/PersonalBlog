import * as React from 'react';
import { TransitionState } from 'gatsby-plugin-transition-link';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SayHi from '../components/SayHi';
import Link from '../components/Link';
import { section } from '../components/Box';
import { Heading2, Paragraph } from '../components/Typography';
import AnimeContainer from '../components/AnimeContainer';

const Work: React.FunctionComponent = function () {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout>
          <section maxWidth="640px" marginTop={32} element="section">
            <SEO title="Work" />
            <AnimeContainer toggle={transitionStatus === 'entered'}>
              <Paragraph>
                我目前供职于一家互联网金融公司，目前于公司内部负责面向中台体系的
                Lowcode
                工具，其最终目标在于为公司中后台项目的研发显著提升效能。当然我也在
                Github 上有那么一部分产出，如果感兴趣的话，可以读一读我的
                {' '}
                <Link
                  color="white"
                  href="https://github.com/Xeonice"
                  underlined
                >
                  Github 个人帐号
                </Link>
                {' '}
                。
              </Paragraph>
              <section marginTop={32} element="section">
                <Heading2>DataSet 教程</Heading2>
                <Paragraph>
                  该项目是为了改良 Choerodon-ui
                  体系的相关文档。当前的文档存在各种各样的潜在问题，让交付人员无法轻松快捷的迅速上手整个项目。
                </Paragraph>
                <Paragraph>
                  因此，我正在致力于改善开发过程中被忽视的这一点，主要入手方向在于自定义
                  IDE 和更有好的交互文档，目前已经完成了针对 vscode
                  的插件，教程网站也随着 ui 新官网的上线而完成。具体可以看看
                  {' '}
                  <Link
                    color="white"
                    underlined
                    href="https://open-hand.github.io/choerodon-ui/zh/tutorials/introduction"
                  >
                    Choerodon-ui 教程
                  </Link>
                  {' '}
                  。
                </Paragraph>
                <Paragraph>
                  感兴趣的话，可以了解以下我们正在使用的这套
                  {' '}
                  <Link
                    color="white"
                    underlined
                    href="https://open-hand.github.io/choerodon-ui/zh"
                  >
                    Choerodon-ui
                  </Link>
                  {' '}
                  体系。
                </Paragraph>
              </section>
              <section element="section" marginTop={32} marginBottom={32}>
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
    rdd: file(relativePath: { eq: "talks/readme-driven-development.pdf" }) {
      publicURL
    }
    rddUk: file(
      relativePath: { eq: "talks/readme-driven-development-phpuk.pdf" }
    ) {
      publicURL
    }
  }
`;

export default Work;
