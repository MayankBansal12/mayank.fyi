import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

export const backgrounds = [
  { id: 'paper', label: 'paper', light: '#faf7f0', dark: '#161616' },
  { id: 'cream', label: 'warm cream', light: '#fff4d6', dark: '#282218' },
  { id: 'blue', label: 'pale blue', light: '#e7f5ff', dark: '#18232d' },
  { id: 'green', label: 'pale green', light: '#ebfbee', dark: '#19271d' },
  { id: 'lavender', label: 'soft lavender', light: '#f3f0ff', dark: '#241f31' },
] as const;

export const fonts = [
  { id: 'excalifont', label: 'Excalifont', family: '"Excalifont-Regular", sans-serif' },
  { id: 'dm-sans', label: 'DM Sans', family: '"DM Sans", sans-serif' },
  { id: 'poppins', label: 'Poppins', family: '"Poppins", sans-serif' },
  { id: 'system', label: 'System Sans', family: 'system-ui, sans-serif' },
] as const;

export type BackgroundId = (typeof backgrounds)[number]['id'];
export type FontId = (typeof fonts)[number]['id'];

type AppearanceContextValue = {
  background: BackgroundId;
  font: FontId;
  setBackground: (background: BackgroundId) => void;
  setFont: (font: FontId) => void;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

const isBackground = (value: string): value is BackgroundId =>
  backgrounds.some((option) => option.id === value);
const isFont = (value: string): value is FontId => fonts.some((option) => option.id === value);

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [background, setBackground] = useState<BackgroundId>('paper');
  const [font, setFont] = useState<FontId>('excalifont');
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    const savedBackground = localStorage.getItem('portfolio-background');
    const savedFont = localStorage.getItem('portfolio-font');
    if (savedBackground && isBackground(savedBackground)) setBackground(savedBackground);
    if (savedFont && isFont(savedFont)) setFont(savedFont);
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    localStorage.setItem('portfolio-background', background);
  }, [background, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    localStorage.setItem('portfolio-font', font);
  }, [font, preferencesLoaded]);

  return (
    <AppearanceContext.Provider value={{ background, font, setBackground, setFont }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) throw new Error('useAppearance must be used within AppearanceProvider');
  return context;
}
