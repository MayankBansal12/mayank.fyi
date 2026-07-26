import { Head, Html, Main, NextScript } from 'next/document';

const preloaderBootScript = `
try {
  if (!sessionStorage.getItem('preloader-seen')) {
    document.documentElement.classList.add('preloader-pending');
  }
} catch (e) {}
`.trim();

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/Excalifont-Regular.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <script
          // Runs before paint so first-session visits don't flash page content.
          // Key must match PRELOADER_STORAGE_KEY in Preloader.tsx.
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static boot script, no user input
          dangerouslySetInnerHTML={{ __html: preloaderBootScript }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
