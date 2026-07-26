import { ArrowUpRight } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import PageShell from '@/components/rough/PageShell';
import RoughLink from '@/components/rough/RoughLink';
import { getWritingBySlug, getWritingSlugs, type WritingPost } from '@/lib/writing';

type WritingPostPageProps = {
  post: WritingPost;
};

export default function WritingPostPage({ post }: WritingPostPageProps) {
  return (
    <PageShell title={post.title}>
      <div className='writing-article-meta'>
        <time dateTime={post.publishedAtISO}>{post.publishedAt}</time>
        <span aria-hidden>/</span>
        <a href={post.sourceUrl} target='_blank' rel='noreferrer noopener'>
          read on substack <ArrowUpRight size={13} aria-hidden />
        </a>
      </div>

      {post.description ? <p className='writing-article-description'>{post.description}</p> : null}

      <article
        className='writing-article-content'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Substack HTML is generated from local content authored by the site owner.
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <RoughLink href='/writing' seed={801}>
        back to writing
      </RoughLink>
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
