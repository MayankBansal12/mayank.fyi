import { useEffect, useState } from 'react';

export const PRELOADER_STORAGE_KEY = 'preloader-seen';

const HOLD_MS = 3500;
/** Full-panel lift duration — keep in sync with `.preloader` exit transition */
const EXIT_MS = 820;
/** Don't block forever if the font request stalls */
const FONT_WAIT_MS = 4000;

const PRIMARY_FONT = 'Excalifont-Regular';
const WELCOME_WORDS = ['welcome', 'to', 'my', 'corner', 'of', 'the', 'internet', ':)'];

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

async function waitForPrimaryFont(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return;

  const face = `400 1em "${PRIMARY_FONT}"`;

  try {
    if (document.fonts.check(face)) return;

    await Promise.race([
      document.fonts.load(face).then(() => document.fonts.ready),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, FONT_WAIT_MS);
      }),
    ]);
  } catch {
    // Proceed with fallback font rather than hanging the preloader
  }
}

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [fontReady, setFontReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PRELOADER_STORAGE_KEY)) {
        document.documentElement.classList.remove('preloader-pending');
        return;
      }
      sessionStorage.setItem(PRELOADER_STORAGE_KEY, '1');
    } catch {
      document.documentElement.classList.remove('preloader-pending');
      return;
    }

    const reduced = prefersReducedMotion();
    setReducedMotion(reduced);
    setVisible(true);
    document.documentElement.classList.add('preloader-active');

    let cancelled = false;
    const timers = { exit: 0, hide: 0 };

    (async () => {
      await waitForPrimaryFont();
      if (cancelled) return;

      setFontReady(true);

      const hold = reduced ? 900 : HOLD_MS;
      const exitDuration = reduced ? 320 : EXIT_MS;
      const exitAt = Math.max(0, hold - exitDuration);

      timers.exit = window.setTimeout(() => setExiting(true), exitAt);
      timers.hide = window.setTimeout(() => {
        setVisible(false);
        document.documentElement.classList.remove('preloader-active');
      }, hold);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timers.exit);
      window.clearTimeout(timers.hide);
      document.documentElement.classList.remove('preloader-active');
    };
  }, []);

  // Drop the pre-hydration cover only after the real preloader has painted
  useEffect(() => {
    if (!visible) return;
    document.documentElement.classList.remove('preloader-pending');
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`preloader${exiting ? ' preloader--exit' : ''}${reducedMotion ? ' preloader--reduced' : ''}`}
      role='status'
      aria-live='polite'
      aria-label={fontReady ? 'welcome to my corner of the internet' : 'loading'}
    >
      {!fontReady ? (
        <div className='preloader__loader' aria-hidden='true'>
          <span className='preloader__loader-dot' />
          <span className='preloader__loader-dot' />
          <span className='preloader__loader-dot' />
        </div>
      ) : (
        <div className='preloader__inner'>
          <p className='preloader__text' aria-hidden='true'>
            {WELCOME_WORDS.map((word, i) => (
              <span
                key={word}
                className='preloader__word'
                style={{ animationDelay: `${120 + i * 55}ms` }}
              >
                {word}
                {i < WELCOME_WORDS.length - 1 ? '\u00a0' : ''}
              </span>
            ))}
          </p>
          <span className='preloader__underline' aria-hidden='true' />
          <span className='preloader__dot' aria-hidden='true' />
        </div>
      )}
    </div>
  );
}
