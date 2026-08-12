import { useEffect, useRef, useState } from 'react';
import { FiExternalLink, FiX } from 'react-icons/fi';
import type { Project } from '@/data/portfolio';

type ProjectPreviewModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose, project]);

  if (!project?.liveLink) return null;

  const previewUrl = project.liveLink.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className='project-modal-backdrop'>
      <button
        type='button'
        className='project-modal-dismiss'
        onClick={onClose}
        aria-label='close project preview'
        tabIndex={-1}
      />
      <div
        className='project-modal-layout'
        role='dialog'
        aria-modal='true'
        aria-label={`${project.title} live preview`}
      >
        <div className='project-modal-actions'>
          <button
            ref={closeButtonRef}
            type='button'
            className='project-modal-action'
            onClick={onClose}
            aria-label='close preview'
            title='close preview'
          >
            <FiX aria-hidden />
          </button>
          <a
            href={project.liveLink}
            target='_blank'
            rel='noreferrer noopener'
            className='project-modal-action'
            aria-label={`open ${project.title} in a new tab`}
            title='open in a new tab'
          >
            <FiExternalLink aria-hidden />
          </a>
        </div>

        <div className='project-modal-browser'>
          <div className='project-preview-bar project-modal-browser-bar'>
            <span />
            <span />
            <span />
            <small className='project-preview-url' title={project.liveLink}>
              {previewUrl}
            </small>
          </div>
          <div className='project-modal-stage'>
            {isLoading ? <p className='project-modal-loading'>loading live preview...</p> : null}
            <iframe
              key={project.liveLink}
              src={project.liveLink}
              title={`${project.title} live website`}
              className='project-modal-frame'
              onLoad={() => setIsLoading(false)}
              allow='fullscreen'
              referrerPolicy='strict-origin-when-cross-origin'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
