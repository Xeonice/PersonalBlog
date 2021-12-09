import * as React from 'react';
import styled from '@emotion/styled';

import Link from 'next/link';
import classnames from 'classnames';
import { Heading4, TextSmall } from '../Typography';

const Title = function ({ children, subtitle }) {
  return (
    <li
      className={classnames('text-normal', 'text-black', 'flex', 'flex-col', {
        'my-4': subtitle,
        'my-2': !subtitle,
      })}
    >
      {children}
    </li>
  );
};

const Subtitle = styled(TextSmall)`
  display: block;
`;

type ItemType = React.FunctionComponent<{ subtitle?: string; link: string }>;

const Item: ItemType = function ({ children, subtitle, link }) {
  return (
    <Title subtitle={subtitle}>
      <Link href={link} passHref>
        {children}
      </Link>
      {subtitle && <Subtitle color="silver">{subtitle}</Subtitle>}
    </Title>
  );
};

interface ListType extends React.FunctionComponent<{ title?: string }> {
  Item: ItemType;
}

const List: ListType = function ({ title, children, ...props }) {
  return (
    <section {...props}>
      <Heading4>{title}</Heading4>
      <ul>{children}</ul>
    </section>
  );
};

List.Item = Item;

export default List;
