/**
 * Shared sketch geometry tokens.
 * Keep radius, stroke inset, padding, and sketch intensity consistent across rough UI.
 */
export const ROUGH_RADIUS = 10;

/** Stroke inset so rough paths clear the container edge. */
export const ROUGH_INSET = {
  box: 3,
  chip: 2,
  sticky: 2,
} as const;

/**
 * Sketch intensity for rounded frames drawn via `rc.path()`.
 *
 * Path-based shapes tessellate curves into many segments; each segment gets
 * independent jitter, so the same roughness as `rc.rectangle()` looks much
 * noisier. Keep these lower than line/arrow defaults (~1.25 / 1).
 */
export const ROUGH_FRAME_SKETCH = {
  roughness: 0.45,
  bowing: 0.3,
} as const;

/**
 * Tailwind padding class names — keep chip/sticky identical; boxes step up in size.
 * Prefer these over ad-hoc p-* values so frames feel consistent.
 */
export const ROUGH_PADDING = {
  /** Default frame padding (RoughBox). */
  box: 'p-4 md:p-5',
  /** Compact control padding — chips, stickies, small dashed notes. */
  chip: 'px-3 py-2',
  sticky: 'px-3 py-2',
  compact: 'px-3 py-2',
  /** Wider hero / callout frames. */
  hero: 'px-6 py-6 md:px-10 md:py-8',
  wide: 'px-5 py-4 md:px-8',
  spacious: 'px-8 py-8',
} as const;

/**
 * SVG path for a rounded rectangle (absolute coords).
 * Radius is clamped so tiny chips never overshoot half-width/height.
 */
export function roundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number = ROUGH_RADIUS,
): string {
  const w = Math.max(0, width);
  const h = Math.max(0, height);
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));

  if (r === 0) {
    return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
  }

  // Quadratic corners — reads soft without looking pill-shaped
  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `Q ${x + w} ${y} ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `Q ${x + w} ${y + h} ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `Q ${x} ${y + h} ${x} ${y + h - r}`,
    `V ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    'Z',
  ].join(' ');
}
