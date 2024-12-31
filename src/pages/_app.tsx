import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      document.getElementById("container")?.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute='class'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
