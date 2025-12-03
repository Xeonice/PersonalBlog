import '../../styles/global.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import { ThemeTransitionProvider } from '../components/ThemeTransition';
import { MultiThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      themes={['light', 'dark']}
    >
      <ThemeTransitionProvider columns={6} rows={4}>
        <MultiThemeProvider>
          <Component {...pageProps} />
          <Analytics />
        </MultiThemeProvider>
      </ThemeTransitionProvider>
    </ThemeProvider>
  );
}
