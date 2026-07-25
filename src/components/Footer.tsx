import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='flex items-center justify-between gap-4 px-4 py-8 text-sm text-board-muted sm:px-6'>
      <p>mayank bansal · {new Date().getFullYear()}</p>
      <a href='#top' className='portfolio-icon-button' aria-label='back to top'>
        <ArrowUp size={16} aria-hidden />
      </a>
    </footer>
  );
}
