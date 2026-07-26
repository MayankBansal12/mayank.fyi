import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 240);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <footer className='h-8'>
      {visible ? (
        <a
          href='#top'
          className='portfolio-icon-button portfolio-back-to-top'
          aria-label='back to top'
        >
          <ArrowUp size={16} aria-hidden />
        </a>
      ) : null}
    </footer>
  );
}
