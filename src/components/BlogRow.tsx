import Link from 'next/link';
import type { BlogPost } from '@/data/portfolio';

type BlogRowProps = {
  post: BlogPost;
};

export default function BlogRow({ post }: BlogRowProps) {
  const isExternalLink = post.href?.startsWith('http');
  const content = (
    <>
      <h3 className='writing-title'>
        <span aria-hidden>{'->'}</span>
        <span>{post.title}</span>
      </h3>
      <time className='writing-date'>{post.publishedAt}</time>
    </>
  );

  return (
    <li className='writing-item'>
      {post.href && isExternalLink ? (
        <a
          href={post.href}
          target='_blank'
          rel='noreferrer noopener'
          className='writing-row'
          data-sound='tap'
        >
          {content}
        </a>
      ) : post.href ? (
        <Link href={post.href} className='writing-row' data-sound='tap'>
          {content}
        </Link>
      ) : (
        <div className='writing-row' data-sound='tap'>
          {content}
        </div>
      )}
    </li>
  );
}
