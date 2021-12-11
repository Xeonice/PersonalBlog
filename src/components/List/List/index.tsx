import * as React from 'react';
import styled from '@emotion/styled';

import Link from 'next/link';
import classnames from 'classnames';
import { Heading4, TextSmall } from '../../Typography';
import listStyle from './index.module.css';

const Title = function ({ children, subtitle }) {
  return (
    <li
      className={classnames(listStyle.itemTitle, {
        'my-4': subtitle,
        'my-2': !subtitle,
      })}
    >
      {children}
    </li>
  );
};

const Subtitle = function ({ children }) {
  return (
    <TextSmall color="silver-default" className={listStyle.subTitle}>{children}</TextSmall>
  );
};

type ItemType = React.FunctionComponent<{ subtitle?: string; link: string }>;

const Item: ItemType = function ({ children, subtitle, link }) {
  return (
    <Title subtitle={subtitle}>
      <Link href={link} passHref>
        {children}
      </Link>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Title>
  );
};

interface ListType extends React.FunctionComponent<{ title?: string }> {
  Item: ItemType;
}

const List: ListType = function ({ title, children, ...props }) {
  return (
    <section {...props}>
      <Heading4 className={listStyle.title}>{title}</Heading4>
      <ul>{children}</ul>
    </section>
  );
};

List.Item = Item;

export default List;
