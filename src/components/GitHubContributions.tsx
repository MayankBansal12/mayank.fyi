import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { githubActivity } from '@/data/portfolio';

type ContributionCell = {
  id: string;
  level: number;
  count: number | null;
};

const fallbackCells: ContributionCell[] = Array.from({ length: 364 }, (_, index) => {
  const week = Math.floor(index / 7);
  const day = index % 7;
  const signal = (week * 11 + day * 7 + week * day) % 19;
  let level = 4;
  if (signal < 7) level = 0;
  else if (signal < 12) level = 1;
  else if (signal < 16) level = 2;
  else if (signal < 18) level = 3;
  return { id: `week-${week}-day-${day}`, level, count: null };
});

function getContributionLabel(cell: ContributionCell) {
  if (cell.count === null) return `Activity level ${cell.level} of 4`;
  const unit = cell.count === 1 ? 'contribution' : 'contributions';
  return `${cell.count} ${unit} on ${cell.id}`;
}

function TooltipPortal({ text, cellRect }: { text: string; cellRect: DOMRect }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 9999,
  });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const gap = 7;
    const margin = 8;
    const vw = window.innerWidth;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;

    let top = cellRect.top - th - gap;
    const leftUnclamped = cellRect.left + cellRect.width / 2 - tw / 2;

    if (top < margin) {
      top = cellRect.bottom + gap;
    }

    const left = Math.max(margin, Math.min(leftUnclamped, vw - tw - margin));

    setStyle({
      position: 'fixed',
      top,
      left,
      opacity: 1,
      pointerEvents: 'none',
      zIndex: 9999,
    });
  }, [cellRect]);

  return (
    <div ref={ref} style={style} className='github-tooltip' role='tooltip'>
      {text}
    </div>
  );
}

export default function GitHubContributions() {
  const [cells, setCells] = useState(fallbackCells);
  const [tooltip, setTooltip] = useState<{ text: string; rect: DOMRect } | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${githubActivity.username}?y=last`,
          { signal: controller.signal },
        );
        if (!response.ok) return;

        const data = (await response.json()) as {
          contributions?: Array<{ date: string; level: number; count: number }>;
        };
        if (!data.contributions || data.contributions.length === 0) return;

        setCells(
          data.contributions.slice(-364).map((contribution) => ({
            id: contribution.date,
            level: Math.max(0, Math.min(4, contribution.level)),
            count: Number.isFinite(contribution.count) ? contribution.count : null,
          })),
        );
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    void loadContributions();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!tooltip) return;
    const hide = () => setTooltip(null);
    window.addEventListener('scroll', hide, { capture: true });
    window.addEventListener('resize', hide);
    return () => {
      window.removeEventListener('scroll', hide, { capture: true });
      window.removeEventListener('resize', hide);
    };
  }, [tooltip]);

  return (
    <section className='github-activity' aria-labelledby='github-activity-title'>
      <div className='mb-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4'>
        <div>
          <h2 id='github-activity-title' className='text-sm font-semibold'>
            {githubActivity.title}
          </h2>
          <p className='mt-0.5 text-xs text-board-muted'>{githubActivity.description}</p>
        </div>
        <div
          className='github-legend'
          role='img'
          aria-label='contribution activity from less to more'
        >
          <span>less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className='github-cell' data-level={level} aria-hidden />
          ))}
          <span>more</span>
        </div>
      </div>
      <div className='github-grid-scroll'>
        <div className='github-grid' aria-hidden>
          {cells.map((cell) => (
            // biome-ignore lint/a11y/noStaticElementInteractions: grid is aria-hidden, handlers only for tooltip positioning
            <span
              key={cell.id}
              className='github-cell'
              data-level={cell.level}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({
                  text: getContributionLabel(cell),
                  rect,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
        </div>
      </div>
      <div ref={portalRef} />
      {mounted &&
        tooltip &&
        portalRef.current &&
        createPortal(
          <TooltipPortal text={tooltip.text} cellRect={tooltip.rect} />,
          portalRef.current,
        )}
    </section>
  );
}
