import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { AppearanceProvider } from '@/components/AppearanceProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <AppearanceProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppearanceProvider>
    </ThemeProvider>
  );
}
