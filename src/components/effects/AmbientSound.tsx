import { Volume2, VolumeX } from 'lucide-react';
import { useAmbientSound } from '@/hooks/useAmbientSound';
import { useFxConfig } from '@/lib/effectsConfig';

/**
 * Persistent toggle for the generative ambient soundscape, with a volume
 * slider that slides out while it plays. Sits above the accessibility widget
 * (bottom-left). Sound is always off until the visitor opts in.
 */
const AmbientSound = () => {
  const { playing, toggle, setVolume, available } = useAmbientSound();
  const { volume } = useFxConfig();

  if (!available) return null;

  return (
    // dir=ltr so the button stays glued to the left anchor and the slider
    // extends rightward when it appears
    <div dir="ltr" className="fixed bottom-[84px] left-5 z-40 flex items-center gap-2">
      <button
        type="button"
        id="ambient_sound_toggle"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'השתקת צליל רקע' : 'הפעלת צליל רקע'}
        title={playing ? 'השתקת צליל רקע' : 'הפעלת צליל רקע'}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full glass-liquid text-white/80 transition-all duration-300 hover:text-white hover:scale-105"
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

      {/* Volume slides out only while playing */}
      <div
        className={`overflow-hidden transition-all duration-500 ${playing ? 'w-28 opacity-100' : 'w-0 opacity-0'}`}
        aria-hidden={!playing}
      >
        <div className="glass-liquid rounded-full px-3 py-2 flex items-center">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="עוצמת צליל רקע"
            className="w-full h-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-tech-blue"
            disabled={!playing}
          />
        </div>
      </div>
    </div>
  );
};

export default AmbientSound;
