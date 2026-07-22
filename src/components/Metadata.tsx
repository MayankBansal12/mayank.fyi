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
        content='mayank bansal portfolio, your friendly neighbourhood developer. full stack developer'
      />
      <meta property='twitter:url' content='https://mayankbansal.xyz' />
      <meta property='twitter:domain' content='mayankbansal.xyz' />
      <meta
        name='twitter:image'
        content='https://res.cloudinary.com/dwuyp1nss/image/upload/v1735586934/mayankbansal.xyz/g2s0ah77imvhuzpac1nu.jpg'
      />
      <meta
        name='twitter:card'
        content='i am a developer from india with a working experience of around a year. currently working as a backend developer at an early stage startup...always looking to explore and work on interesting tech projects'
      />

      <meta
        name='description'
        content='mayank bansal portfolio, your friendly neighbourhood developer.'
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
