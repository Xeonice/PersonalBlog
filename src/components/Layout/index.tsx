/** @jsxImportSource @emotion/react */
import React from 'react';
import classnames from 'classnames';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ThreeJSBackground from '../ThreeJSBackground';
import LayoutStyle from './index.module.css';

export default function Layout({ children }): React.JSX.Element {
  return (
    <>
      <ThreeJSBackground />
      <main className={classnames(LayoutStyle.container)}>
        <Navigation />
        {children}
        <Footer />
      </main>
    </>
  );
}
