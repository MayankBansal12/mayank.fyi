import Head from 'next/head';

const Metadata: React.FC = () => {
  return (
    <Head>
      <title>mayank bansal • your friendly neighbourhood developer</title>
      <meta property='og:title' content='mayank bansal • your friendly neighbourhood developer' />
      <meta property='og:description' content='portfolio website for mayank bansal' />
      <meta property='og:url' content='https://mayankbansal.xyz' />
      <meta
        property='og:image'
        content='https://res.cloudinary.com/dwuyp1nss/image/upload/v1735586934/mayankbansal.xyz/g2s0ah77imvhuzpac1nu.jpg'
      />
      <meta property='og:type' content='website' />

      <meta name='twitter:title' content='mayank bansal • your friendly neighbourhood developer' />
      <meta
        name='twitter:description'
        content='mayank bansal portfolio, backend developer and software engineer.'
      />
      <meta property='twitter:url' content='https://mayankbansal.xyz' />
      <meta property='twitter:domain' content='mayankbansal.xyz' />
      <meta
        name='twitter:image'
        content='https://res.cloudinary.com/dwuyp1nss/image/upload/v1735586934/mayankbansal.xyz/g2s0ah77imvhuzpac1nu.jpg'
      />
      <meta name='twitter:card' content='summary_large_image' />

      <meta
        name='description'
        content='mayank bansal portfolio, backend developer and software engineer.'
      />
      <script
        defer
        src='https://cloud.umami.is/script.js'
        data-website-id='1e889be1-5db9-4cc4-9453-f4d41ddfa46b'
      ></script>
    </Head>
  );
};

export default Metadata;
