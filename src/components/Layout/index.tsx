/** @jsxImportSource @emotion/react */
import Navigation from '../Navigation';
import Footer from '../Footer';
import LayoutStyle from './index.module.css';

export default function Layout({ children }): JSX.Element {
  // const [colorMode] = useColorMode()
  // const isDark = colorMode === `dark`

  // useEffect(() => {
  //   window.parent.postMessage({ theme: colorMode }, "*")
  // }, [colorMode])

  return (
    <main className={LayoutStyle.container}>
      <Navigation />
      {children}
      <Footer />
    </main>
  );
}
