import * as React from 'react';

import './OrderedList.module.css';

export default function OrderedList({ children, ...props }) {
  return <section className="OrderedListWrapper">{children}</section>;
}
