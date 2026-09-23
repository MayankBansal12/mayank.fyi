import Head from 'next/head';
import { useRouter } from 'next/router';
import { inspirationMetadata } from '@/data/inspiration';
import { site } from '@/data/portfolio';

const siteDomain = new URL(site.url).hostname;
const pageMetadata = {
  [inspirationMetadata.path]: inspirationMetadata,
};

const Metadata: React.FC = () => {
  const { pathname } = useRouter();
  const metadata = pageMetadata[pathname] ?? {
    title: site.title,
    description: site.description,
    path: '/',
  };
  const canonicalUrl = new URL(metadata.path, site.url).toString();

  return (
    <Head>
      <title>{metadata.title}</title>
      <link rel='canonical' href={canonicalUrl} />
      <meta property='og:title' content={metadata.title} />
      <meta property='og:description' content={metadata.description} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:image' content={site.socialImage} />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={site.socialImageAlt} />
      <meta property='og:type' content='website' />

      <meta name='twitter:title' content={metadata.title} />
      <meta name='twitter:description' content={metadata.description} />
      <meta property='twitter:url' content={canonicalUrl} />
      <meta property='twitter:domain' content={siteDomain} />
      <meta name='twitter:image' content={site.socialImage} />
      <meta name='twitter:image:alt' content={site.socialImageAlt} />
      <meta name='twitter:card' content='summary_large_image' />

      <meta name='description' content={metadata.description} />
      <script
        defer
        src='https://cloud.umami.is/script.js'
        data-website-id='1e889be1-5db9-4cc4-9453-f4d41ddfa46b'
      ></script>
    </Head>
  );
};

export default Metadata;
