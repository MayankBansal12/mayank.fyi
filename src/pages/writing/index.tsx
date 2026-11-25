import { ArrowUpRight, SketchIcon } from 'sketchicon';
import BlogRow from '@/components/BlogRow';
import PageShell from '@/components/rough/PageShell';
import { links } from '@/data/portfolio';
import { getAllWritings, type WritingIndexItem } from '@/lib/writing';

type WritingPageProps = {
  writings: WritingIndexItem[];
};

export default function WritingPage({ writings }: WritingPageProps) {
  return (
    <PageShell title='writing'>
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
        <SketchIcon
          icon={ArrowUpRight}
          size={15}
          roughness={1.8}
          className='view-all-arrow'
          aria-hidden
        />
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
