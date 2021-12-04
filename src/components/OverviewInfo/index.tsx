import * as React from 'react';

const Separator = function () {
  return <span className="block mt-8 h-px" />;
};

const Title = function ({ children }) {
  return (
    <span className="text-xs text-gray-500 block leading-wide leading-tight">
      {children}
    </span>
  );
};

const Info = function ({ children, href }) {
  return (
    <a href={href} className="text-black font-bold leading-tight block mt-1">
      {children}
    </a>
  );
};

const ItemContainer = function ({ children }) {
  return <li className="mr-4">{children}</li>;
};

const OverviewInfo = function () {
  return (
    <ul className="flex	mt-4">
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
