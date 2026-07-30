import { ArrowUpRight } from 'lucide-react';
import BlogRow from '@/components/BlogRow';
import PageShell from '@/components/rough/PageShell';
import RoughLink from '@/components/rough/RoughLink';
import { links } from '@/data/portfolio';
import { getAllWritings, type WritingIndexItem } from '@/lib/writing';

type WritingPageProps = {
  writings: WritingIndexItem[];
};

export default function WritingPage({ writings }: WritingPageProps) {
  return (
    <PageShell title='writing'>
      <div className='flex flex-wrap items-center gap-3 text-sm text-board-muted'>
        <RoughLink href={links.substack} seed={701}>
          substack
        </RoughLink>
      </div>

      <ul className='writing-list'>
        {writings.map((post) => (
          <BlogRow key={post.slug} post={{ ...post, href: `/writing/${post.slug}` }} />
        ))}
      </ul>

      <a
        href={links.substack}
        target='_blank'
        rel='noreferrer noopener'
        className='portfolio-view-all group mx-auto'
      >
        visit my substack
        <ArrowUpRight size={15} className='view-all-arrow' aria-hidden />
      </a>
    </PageShell>
  );
}

export function getStaticProps() {
  return {
    props: {
      writings: getAllWritings(),
    },
  };
}
