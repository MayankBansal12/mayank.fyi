import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type ContributionCell = {
  id: string;
  level: number;
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
  return { id: `week-${week}-day-${day}`, level };
});

export default function GitHubContributions() {
  const [cells, setCells] = useState(fallbackCells);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      try {
        const response = await fetch(
          'https://github-contributions-api.jogruber.de/v4/MayankBansal12?y=last',
          { signal: controller.signal },
        );
        if (!response.ok) return;

        const data = (await response.json()) as {
          contributions?: Array<{ date: string; level: number }>;
        };
        if (!data.contributions || data.contributions.length === 0) return;

        setCells(
          data.contributions.slice(-364).map((contribution) => ({
            id: contribution.date,
            level: Math.max(0, Math.min(4, contribution.level)),
          })),
        );
        setIsLive(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    void loadContributions();
    return () => controller.abort();
  }, []);

  return (
    <section className='github-activity' aria-labelledby='github-activity-title'>
      <div className='mb-3 flex items-center justify-between gap-4'>
        <div>
          <h2 id='github-activity-title' className='text-sm font-semibold'>
            github activity
          </h2>
          <p className='mt-0.5 text-xs text-board-muted'>a sketch of recent building rhythm</p>
        </div>
        <a
          href='https://github.com/MayankBansal12'
          target='_blank'
          rel='noreferrer noopener'
          className='portfolio-inline-control group'
        >
          profile <ArrowUpRight size={13} className='control-arrow' aria-hidden />
        </a>
      </div>
      <div className='github-grid-scroll'>
        <div className='github-grid' aria-hidden>
          {cells.map((cell) => (
            <span key={cell.id} className='github-cell' data-level={cell.level} />
          ))}
        </div>
      </div>
      <p className='mt-2 text-[0.65rem] text-board-muted'>
        {isLive ? 'live contribution activity' : 'activity preview'} · visit github for details
      </p>
    </section>
  );
}
