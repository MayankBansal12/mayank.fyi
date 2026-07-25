import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='h-8'>
      <a
        href='#top'
        className='portfolio-icon-button portfolio-back-to-top'
        aria-label='back to top'
      >
        <ArrowUp size={16} aria-hidden />
      </a>
    </footer>
  );
}
