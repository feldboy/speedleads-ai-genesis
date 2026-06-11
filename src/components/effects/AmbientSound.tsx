import { Volume2, VolumeX } from 'lucide-react';
import { useAmbientSound } from '@/hooks/useAmbientSound';

/**
 * Persistent toggle for the generative ambient pad. Sits above the
 * accessibility widget (bottom-left). Sound is always off until the
 * visitor opts in.
 */
const AmbientSound = () => {
  const { playing, toggle, available } = useAmbientSound();

  if (!available) return null;

  return (
    <button
      type="button"
      id="ambient_sound_toggle"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'השתקת צליל רקע' : 'הפעלת צליל רקע'}
      title={playing ? 'השתקת צליל רקע' : 'הפעלת צליל רקע'}
      className="fixed bottom-[84px] left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full glass-liquid text-white/80 transition-all duration-300 hover:text-white hover:scale-105"
    >
      {playing ? (
        <span className="relative flex items-center justify-center">
          <Volume2 className="h-5 w-5 text-tech-blue" />
          <span className="absolute inline-flex h-9 w-9 rounded-full border border-tech-blue/40 animate-ping" style={{ animationDuration: '2.4s' }} />
        </span>
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  );
};

export default AmbientSound;
