/** @jsxImportSource @emotion/react */
import classnames from 'classnames';
import Navigation from '../Navigation';
import Footer from '../Footer';
import LayoutStyle from './index.module.css';

export default function Layout({ children }): JSX.Element {
  return (
    <main className={classnames(LayoutStyle.container)}>
      <Navigation />
      {children}
      <Footer />
    </main>
  );
}
