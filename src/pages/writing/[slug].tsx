import { ArrowUpRight } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import PageShell from '@/components/rough/PageShell';
import { getWritingBySlug, getWritingSlugs, type WritingPost } from '@/lib/writing';

type WritingPostPageProps = {
  post: WritingPost;
};

export default function WritingPostPage({ post }: WritingPostPageProps) {
  const wordCount = post.contentHtml
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <PageShell title={post.title}>
      {post.description ? <p className='writing-article-description'>{post.description}</p> : null}

      <div className='writing-article-meta'>
        <div className='writing-article-details'>
          <span>{readingTime} min read</span>
          <span aria-hidden>•</span>
          <time dateTime={post.publishedAtISO}>{post.publishedAt}</time>
        </div>
        <a
          className='portfolio-view-all portfolio-button-secondary group'
          href={post.sourceUrl}
          target='_blank'
          rel='noreferrer noopener'
        >
          read on substack <ArrowUpRight size={13} className='view-all-arrow' aria-hidden />
        </a>
      </div>

      <article
        className='writing-article-content'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Substack HTML is generated from local content authored by the site owner.
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </PageShell>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getWritingSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<WritingPostPageProps> = ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const post = getWritingBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};
