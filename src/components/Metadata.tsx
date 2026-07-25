import Head from 'next/head';
import { site } from '@/data/portfolio';

const siteDomain = new URL(site.url).hostname;

const Metadata: React.FC = () => {
  return (
    <Head>
      <title>{site.title}</title>
      <link rel='canonical' href={site.url} />
      <meta property='og:title' content={site.title} />
      <meta property='og:description' content={site.socialDescription} />
      <meta property='og:url' content={site.url} />
      <meta property='og:image' content={site.socialImage} />
      <meta property='og:image:alt' content={site.socialImageAlt} />
      <meta property='og:type' content='website' />

      <meta name='twitter:title' content={site.title} />
      <meta name='twitter:description' content={site.description} />
      <meta property='twitter:url' content={site.url} />
      <meta property='twitter:domain' content={siteDomain} />
      <meta name='twitter:image' content={site.socialImage} />
      <meta name='twitter:image:alt' content={site.socialImageAlt} />
      <meta name='twitter:card' content='summary_large_image' />

      <meta name='description' content={site.description} />
      <script
        defer
        src='https://cloud.umami.is/script.js'
        data-website-id='1e889be1-5db9-4cc4-9453-f4d41ddfa46b'
      ></script>
    </Head>
  );
};

export default Metadata;
