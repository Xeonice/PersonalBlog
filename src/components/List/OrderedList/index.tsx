import * as React from 'react';

import OrderedListStyle from './index.module.css';

export default function OrderedList({ children, ...props }) {
  return <ol className={OrderedListStyle.Wrapper}>{children}</ol>;
}
