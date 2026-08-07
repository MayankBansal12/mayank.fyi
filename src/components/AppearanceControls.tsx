import { Check, ChevronDown, Palette, Type } from 'lucide-react';
import { useRouter } from 'next/router';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import RoughBox from '@/components/rough/RoughBox';
import { baseStrokeOptions } from '@/lib/rough/theme';
import { useRoughDraw } from '@/lib/rough/useRoughDraw';
import {
  type BackgroundId,
  backgrounds,
  type FontId,
  fonts,
  useAppearance,
} from './AppearanceProvider';

type OpenMenu = 'background' | 'font' | null;

function RoughSwatch({ color, seed }: { color: string; seed: number }) {
  const { containerRef, svgRef } = useRoughDraw({
    seed,
    deps: [color],
    draw: ({ rc, svg, width, height, palette, reducedMotion }) => {
      svg.appendChild(
        rc.ellipse(width / 2, height / 2, width - 5, height - 5, {
          ...baseStrokeOptions(palette, { seed, reducedMotion, strokeWidth: 1.1 }),
          fill: color,
          fillStyle: 'solid',
        }),
      );
    },
  });

  return (
    <span ref={containerRef} className='relative block h-7 w-7 shrink-0'>
      <svg
        ref={svgRef}
        className='pointer-events-none absolute inset-0 h-full w-full'
        aria-hidden
      />
    </span>
  );
}

function MenuTrigger({
  label,
  open,
  controls,
  onClick,
  children,
}: {
  label: string;
  open: boolean;
  controls: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type='button'
      className='appearance-trigger'
      aria-label={label}
      aria-expanded={open}
      aria-controls={controls}
      aria-haspopup='menu'
      title={label}
      onClick={onClick}
      data-sound-hover
    >
      {children}
      <span className='hidden sm:inline'>{label}</span>
      <ChevronDown
        className={`hidden h-3.5 w-3.5 transition-transform sm:block ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

const focusOption = (menu: HTMLElement | null, index: number) => {
  const options = menu?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
  if (!options?.length) return;
  options[(index + options.length) % options.length]?.focus();
};

export default function AppearanceControls() {
  const { background, font, setBackground, setFont } = useAppearance();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const backgroundTriggerRef = useRef<HTMLDivElement>(null);
  const fontTriggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const backgroundMenuId = useId();
  const fontMenuId = useId();
  const router = useRouter();

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);

  const closeAndFocus = () => {
    const trigger = openMenu === 'background' ? backgroundTriggerRef : fontTriggerRef;
    setOpenMenu(null);
    trigger.current?.querySelector('button')?.focus();
  };

  const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const options = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [],
    );
    const current = options.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === 'Escape') {
      event.preventDefault();
      closeAndFocus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption(menuRef.current, current + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption(menuRef.current, current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusOption(menuRef.current, 0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusOption(menuRef.current, options.length - 1);
    }
  };

  const toggle = (menu: Exclude<OpenMenu, null>) => {
    const next = openMenu === menu ? null : menu;
    setOpenMenu(next);
    if (next) requestAnimationFrame(() => focusOption(menuRef.current, 0));
  };

  const menu = openMenu && (
    <div
      ref={menuRef}
      id={openMenu === 'background' ? backgroundMenuId : fontMenuId}
      role='menu'
      aria-label={`${openMenu} options`}
      className='appearance-menu absolute right-0 top-[calc(100%+0.5rem)] z-50 w-52 origin-top-right'
      onKeyDown={handleKeys}
    >
      <RoughBox
        seed={openMenu === 'background' ? 81 : 82}
        fill='solid'
        fillColor='var(--board-background)'
        paddingClassName='px-3 pt-4 pb-3'
        strokeWidth={0.85}
        className='appearance-menu-paper'
      >
        <p className='px-2 pb-2 text-left text-xs text-board-muted'>{openMenu}</p>
        {openMenu === 'background'
          ? backgrounds.map((option, index) => (
              <button
                type='button'
                role='menuitemradio'
                aria-checked={background === option.id}
                tabIndex={background === option.id ? 0 : -1}
                className='appearance-option'
                key={option.id}
                onClick={() => {
                  setBackground(option.id as BackgroundId);
                  setOpenMenu(null);
                }}
              >
                <RoughSwatch color={option.light} seed={91 + index} />
                <span>{option.label}</span>
                {background === option.id && (
                  <Check className='ml-auto h-4 w-4' strokeWidth={2.4} />
                )}
              </button>
            ))
          : fonts.map((option) => (
              <button
                type='button'
                role='menuitemradio'
                aria-checked={font === option.id}
                tabIndex={font === option.id ? 0 : -1}
                className='appearance-option lowercase'
                style={{ fontFamily: option.family }}
                key={option.id}
                onClick={() => {
                  setFont(option.id as FontId);
                  setOpenMenu(null);
                }}
              >
                <span>{option.label}</span>
                {font === option.id && <Check className='ml-auto h-4 w-4' strokeWidth={2.4} />}
              </button>
            ))}
      </RoughBox>
    </div>
  );

  return (
    <div ref={rootRef} className='flex items-center gap-2'>
      <div ref={backgroundTriggerRef} className='relative'>
        <MenuTrigger
          label='background'
          open={openMenu === 'background'}
          controls={backgroundMenuId}
          onClick={() => toggle('background')}
        >
          <Palette className='h-[17px] w-[17px]' />
        </MenuTrigger>
        {openMenu === 'background' && menu}
      </div>
      <div ref={fontTriggerRef} className='relative'>
        <MenuTrigger
          label='font'
          open={openMenu === 'font'}
          controls={fontMenuId}
          onClick={() => toggle('font')}
        >
          <Type className='h-[17px] w-[17px]' />
        </MenuTrigger>
        {openMenu === 'font' && menu}
      </div>
    </div>
  );
}
