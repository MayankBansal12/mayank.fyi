import { useEffect } from 'react';

const SOUND_TARGET = '[data-sound="tap"]';

export default function InteractionSounds() {
  useEffect(() => {
    const audio = new Audio('/sounds/tap.wav');
    audio.preload = 'auto';
    audio.volume = 0.22;

    function playTap() {
      audio.currentTime = 0;
      void audio.play().catch(() => {
        // Browsers may block hover audio until the first user interaction.
      });
    }

    function getSoundTarget(event: Event) {
      return event.target instanceof Element ? event.target.closest(SOUND_TARGET) : null;
    }

    function handlePointerOver(event: PointerEvent) {
      if (event.pointerType === 'touch') return;

      const target = getSoundTarget(event);
      if (!target) return;
      if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;

      playTap();
    }

    function handleClick(event: MouseEvent) {
      if (getSoundTarget(event)) playTap();
    }

    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('click', handleClick);
      audio.pause();
    };
  }, []);

  return null;
}
