import Link from 'next/link';
import PageShell from '@/components/rough/PageShell';

export default function NotFound() {
  return (
    <PageShell title='404 not found'>
      <p className='portfolio-page-prose'>wrong url, let me help you</p>

      <nav aria-label='portfolio pages' className='flex flex-wrap gap-2'>
        <Link href='/' className='portfolio-button'>
          home
        </Link>
        <Link href='/about' className='social-chip'>
          about
        </Link>
        <Link href='/work' className='social-chip'>
          work
        </Link>
        <Link href='/contact' className='social-chip'>
          contact
        </Link>
        <Link href='/inspiration' className='social-chip'>
          inspiration
        </Link>
      </nav>
    </PageShell>
  );
}
