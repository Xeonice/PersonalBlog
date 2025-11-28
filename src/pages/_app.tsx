import '../../styles/global.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
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
      <ThemeTransitionProvider duration={1000} variant="slide" icon="✨">
        <MultiThemeProvider>
          <Component {...pageProps} />
        </MultiThemeProvider>
      </ThemeTransitionProvider>
    </ThemeProvider>
  );
}
