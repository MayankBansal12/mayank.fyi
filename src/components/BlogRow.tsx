import { ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '@/data/portfolio';

type BlogRowProps = {
  post: BlogPost;
};

export default function BlogRow({ post }: BlogRowProps) {
  const content = (
    <>
      <div className='min-w-0'>
        <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-board-muted'>
          <span>{post.publishedAt}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className='text-lg font-semibold md:text-xl'>{post.title}</h3>
        <p className='mt-1 text-sm opacity-75'>{post.summary}</p>
        <div className='mt-3 flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <span key={tag} className='portfolio-tag'>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <span className='blog-row-action'>
        {post.href ? <ArrowUpRight size={18} aria-hidden /> : 'coming soon'}
      </span>
    </>
  );

  if (post.href) {
    return (
      <a href={post.href} target='_blank' rel='noreferrer noopener' className='blog-row group'>
        {content}
      </a>
    );
  }

  return <article className='blog-row'>{content}</article>;
}
