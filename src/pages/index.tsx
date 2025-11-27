import * as React from 'react';
import Typewriter from 'typewriter-effect';

import Layout from '../components/Layout';
import OverviewInfo from '../components/OverviewInfo';
import indexStyle from './index.module.css';

const IndexPage = function () {
  return (
    <Layout>
      <section className={indexStyle.introduction}>
        <h1>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  'Hello，欢迎来到 Douglas 的自留地，一个持续奋斗在搬砖路上的 Web 开发'
                )
                .pauseFor(1500)
                .deleteChars(7)
                .typeString('全栈工程师')
                .pauseFor(1500)
                .deleteChars(5)
                .typeString('产品工程师')
                .start();
            }}
          />
        </h1>
        <OverviewInfo />
      </section>
    </Layout>
  );
};

export default IndexPage;
