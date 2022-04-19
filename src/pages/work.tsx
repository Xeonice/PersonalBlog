import * as React from 'react';
import Layout from '../components/Layout';
import SayHi from '../components/SayHi';
import StyledLink from '../components/Link';
import { Heading2, Paragraph } from '../components/Typography';
import workStyle from './work.module.css';

const Work: React.FunctionComponent = function () {
  return (
    <Layout>
      <section className={workStyle.container}>
        <Paragraph>
          我目前供职于一家互联网金融公司，目前于公司内部负责面向中台体系的
          Lowcode
          工具，其最终目标在于为公司中后台项目的研发显著提升效能。当然我也在
          Github 上有那么一部分产出，如果感兴趣的话，可以读一读我的
          {' '}
          <StyledLink href="https://github.com/Xeonice" underline>
            Github 个人帐号
          </StyledLink>
          {' '}
          。
        </Paragraph>
        <section className={workStyle.container}>
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
            <StyledLink
              underline
              href="https://open-hand.github.io/choerodon-ui/zh/tutorials/introduction"
            >
              Choerodon-ui 教程
            </StyledLink>
            {' '}
            。
          </Paragraph>
          <Paragraph>
            感兴趣的话，可以了解以下我们正在使用的这套
            {' '}
            <StyledLink
              underline
              href="https://open-hand.github.io/choerodon-ui/zh"
            >
              Choerodon-ui
            </StyledLink>
            {' '}
            体系。
          </Paragraph>
        </section>
        <SayHi />
      </section>
    </Layout>
  );
};

export default Work;
