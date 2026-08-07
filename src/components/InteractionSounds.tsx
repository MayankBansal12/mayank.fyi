import { useEffect } from 'react';

const HOVER_SOUND_TARGET = '[data-sound-hover]';
const CLICK_SOUND_TARGET = '[data-sound-click]';

export default function InteractionSounds() {
  useEffect(() => {
    const hoverAudio = new Audio('/sounds/hover.wav');
    const tapAudio = new Audio('/sounds/tap.wav');

    for (const audio of [hoverAudio, tapAudio]) {
      audio.preload = 'auto';
      audio.volume = 0.22;
    }

    function play(audio: HTMLAudioElement) {
      audio.currentTime = 0;
      void audio.play().catch(() => {
        // Browsers may block hover audio until the first user interaction.
      });
    }

    function getSoundTarget(event: Event, selector: string) {
      return event.target instanceof Element ? event.target.closest(selector) : null;
    }

    function handlePointerOver(event: PointerEvent) {
      if (event.pointerType === 'touch') return;

      const target = getSoundTarget(event, HOVER_SOUND_TARGET);
      if (!target) return;
      if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;

      play(hoverAudio);
    }

    function handleClick(event: MouseEvent) {
      if (getSoundTarget(event, CLICK_SOUND_TARGET)) play(tapAudio);
    }

    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('click', handleClick);
      hoverAudio.pause();
      tapAudio.pause();
    };
  }, []);

  return null;
}
