import '../../styles/global.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/react-in-jsx-scope,react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
