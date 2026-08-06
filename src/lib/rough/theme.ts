import type { Options } from 'roughjs/bin/core';

export type RoughPalette = {
  ink: string;
  muted: string;
  paper: string;
  stickyYellow: string;
  stickyGreen: string;
  stickyBlue: string;
  stickySalmon: string;
  stickyPurple: string;
  accent: string;
};

export function getRoughPalette(isDark: boolean): RoughPalette {
  if (isDark) {
    return {
      ink: '#b1ab9e',
      muted: '#9a9588',
      paper: '#161616',
      stickyYellow: '#5c5340',
      stickyGreen: '#2f4a38',
      stickyBlue: '#2f3f52',
      stickySalmon: '#5a3d3a',
      stickyPurple: '#433a55',
      accent: '#7dcea0',
    };
  }

  return {
    ink: '#1e1e1e',
    muted: '#6b6b6b',
    paper: '#faf7f0',
    stickyYellow: '#fff3bf',
    stickyGreen: '#d3f9d8',
    stickyBlue: '#d0ebff',
    stickySalmon: '#ffe3e3',
    stickyPurple: '#e5dbff',
    accent: '#2f9e44',
  };
}

export type RoughBaseOptions = {
  seed?: number;
  reducedMotion?: boolean;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
};

export function baseStrokeOptions(
  palette: RoughPalette,
  {
    seed = 1,
    reducedMotion = false,
    strokeWidth = 1.5,
    roughness = 1.25,
    bowing = 1,
  }: RoughBaseOptions = {},
): Options {
  return {
    seed,
    roughness: reducedMotion ? 0 : roughness,
    bowing: reducedMotion ? 0 : bowing,
    stroke: palette.ink,
    strokeWidth,
    fillStyle: 'solid',
  };
}
