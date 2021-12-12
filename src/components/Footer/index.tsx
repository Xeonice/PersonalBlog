import * as React from 'react';

import TextSmall from '../Typography/TextSmall';
import StyledLink from '../Link/Link';
import footerStyle from './index.module.css';

const Separator = function () {
  return <span className="inline-block mx-2.5 my-0 text-gray-500 text-xs">/</span>;
};

const Footer: React.FunctionComponent = function () {
  return (
    <section>
      <section>
        <TextSmall className={footerStyle.text}>&copy; 2020 — Douglas</TextSmall>
        <Separator />
        <TextSmall className={footerStyle.text}>rss</TextSmall>
      </section>
      <section>
        <TextSmall className={footerStyle.text}>友情连接</TextSmall>
        <Separator />
        <StyledLink className={footerStyle.link} href="https://kalasearch.cn/">
          卡拉搜索
        </StyledLink>
      </section>
    </section>
  );
};

export default Footer;
