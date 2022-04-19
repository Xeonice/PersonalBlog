import * as React from 'react';
import overViewInfoStyle from './index.module.css';

const Separator = function () {
  return <span className={overViewInfoStyle.separator} />;
};

const Title = function ({ children }) {
  return (
    <span className={overViewInfoStyle.title}>
      {children}
    </span>
  );
};

const Info = function ({ children, href }) {
  return (
    <a href={href} className={overViewInfoStyle.info}>
      {children}
    </a>
  );
};

const ItemContainer = function ({ children }) {
  return <li className={overViewInfoStyle.listItem}>{children}</li>;
};

const OverviewInfo = function () {
  return (
    <ul className={overViewInfoStyle.list}>
      <ItemContainer>
        <Separator />
        <Title>工作地</Title>
        <Info href="https://zh.wikipedia.org/zh-hk/%E6%9D%AD%E5%B7%9E%E5%B8%82">
          杭州 - 西湖区
        </Info>
      </ItemContainer>
      <ItemContainer>
        <Separator />
        <Title>Github</Title>
        <Info href="https://github.com/Xeonice">@Xeonice</Info>
      </ItemContainer>
    </ul>
  );
};

export default OverviewInfo;
