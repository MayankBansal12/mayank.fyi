import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useRef } from 'react';

const TICK_COUNT = 17;
const minimapTicks = Array.from({ length: TICK_COUNT }, (_, i) => `tick-${i}`);
/** Time constant for the viewport box easing toward the scroll position */
const FOLLOW_MS = 70;

function getScrollLimit() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function setScrollPosition(top: number) {
  const nextTop = Math.max(0, Math.min(getScrollLimit(), top));
  window.scrollTo(0, nextTop);
}

export default function ScrollMinimap() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef(0);

  function scrollFromPointer(clientY: number) {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const bounds = track.getBoundingClientRect();
    const inset =
      Number.parseFloat(getComputedStyle(track).getPropertyValue('--minimap-inset')) || 0;
    const travel = bounds.height - inset * 2 - thumb.offsetHeight;
    const position = clientY - bounds.top - inset - dragOffsetRef.current;
    const progress = travel > 0 ? Math.max(0, Math.min(1, position / travel)) : 0;
    setScrollPosition(progress * getScrollLimit());
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    draggingRef.current = true;
    const thumb = thumbRef.current;
    dragOffsetRef.current =
      event.target === thumb && thumb
        ? event.clientY - thumb.getBoundingClientRect().top
        : (thumb?.offsetHeight ?? 0) / 2;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = 'true';
    document.documentElement.classList.add('scroll-minimap-dragging');
    scrollFromPointer(event.clientY);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    scrollFromPointer(event.clientY);
  }

  function stopDragging(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.removeAttribute('data-dragging');
    document.documentElement.classList.remove('scroll-minimap-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const scrollLimit = getScrollLimit();
    const lineStep = Math.max(48, window.innerHeight * 0.1);
    let nextTop: number | null = null;

    if (event.key === 'ArrowDown') nextTop = window.scrollY + lineStep;
    if (event.key === 'ArrowUp') nextTop = window.scrollY - lineStep;
    if (event.key === 'PageDown') nextTop = window.scrollY + window.innerHeight * 0.8;
    if (event.key === 'PageUp') nextTop = window.scrollY - window.innerHeight * 0.8;
    if (event.key === 'Home') nextTop = 0;
    if (event.key === 'End') nextTop = scrollLimit;
    if (nextTop === null) return;

    event.preventDefault();
    window.scrollTo({
      top: Math.max(0, Math.min(scrollLimit, nextTop)),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = 0;
    let currentY: number | null = null;
    let targetY = 0;
    const portfolio = document.getElementById('top');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const measure = () => {
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!track || !thumb) return false;

      const documentHeight = document.documentElement.scrollHeight;
      const scrollLimit = getScrollLimit();
      const progress = scrollLimit > 0 ? window.scrollY / scrollLimit : 0;
      const inset =
        Number.parseFloat(getComputedStyle(track).getPropertyValue('--minimap-inset')) || 0;
      const availableHeight = track.clientHeight - inset * 2;
      const thumbHeight = Math.round(
        Math.max(18, Math.min(34, availableHeight * (window.innerHeight / documentHeight))),
      );

      thumb.style.height = `${thumbHeight}px`;
      // Rest on whole pixels so the 1px outline stays crisp
      targetY = Math.round(Math.max(0, availableHeight - thumbHeight) * progress);
      track.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      return true;
    };

    const render = (y: number) => {
      const thumb = thumbRef.current;
      if (thumb) thumb.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    // Exponential ease toward the target so the box glides instead of stepping
    const tick = (time: number) => {
      const dt = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;

      if (currentY === null || reducedMotion.matches) {
        currentY = targetY;
      } else {
        currentY += (targetY - currentY) * (1 - Math.exp(-dt / FOLLOW_MS));
        if (Math.abs(targetY - currentY) < 0.05) currentY = targetY;
      }

      render(currentY);

      if (currentY !== targetY) {
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        animationFrame = 0;
        lastTime = 0;
      }
    };

    const requestUpdate = () => {
      if (!measure() || animationFrame) return;
      animationFrame = window.requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    if (portfolio) resizeObserver.observe(portfolio);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      document.documentElement.classList.remove('scroll-minimap-dragging');
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className='scroll-minimap'
      role='scrollbar'
      tabIndex={0}
      aria-label='page scroll position'
      aria-controls='top'
      aria-orientation='vertical'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={stopDragging}
      onKeyDown={handleKeyDown}
    >
      <span className='scroll-minimap-ticks' aria-hidden>
        {minimapTicks.map((tick) => (
          <span key={tick} />
        ))}
      </span>
      <span ref={thumbRef} className='scroll-minimap-thumb' aria-hidden />
    </div>
  );
}
