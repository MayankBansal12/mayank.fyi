import type { BlogPost } from '@/data/portfolio';

type BlogRowProps = {
  post: BlogPost;
};

export default function BlogRow({ post }: BlogRowProps) {
  const content = (
    <>
      <h3 className='writing-title'>
        <span aria-hidden>•</span>
        <span>{post.title}</span>
      </h3>
      <time className='writing-date'>{post.publishedAt}</time>
    </>
  );

  return (
    <li className='writing-item'>
      {post.href ? (
        <a href={post.href} target='_blank' rel='noreferrer noopener' className='writing-row'>
          {content}
        </a>
      ) : (
        <div className='writing-row'>{content}</div>
      )}
    </li>
  );
}
