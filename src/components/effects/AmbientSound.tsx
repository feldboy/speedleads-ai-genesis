import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAmbientSound } from '@/hooks/useAmbientSound';
import { useFxConfig } from '@/lib/effectsConfig';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Persistent toggle for the generative ambient soundscape, with a volume
 * slider that slides out while it plays. Sits above the accessibility widget
 * (bottom-left). Sound is always off until the visitor opts in.
 */
const AmbientSound = () => {
  const { playing, toggle, setVolume, available } = useAmbientSound();
  const { volume } = useFxConfig();
  const isMobile = useIsMobile();

  // The volume slider slides out when sound starts. On desktop it stays out while
  // playing (unchanged). On mobile it would cover other controls forever, so it
  // auto-tucks away ~3.5s after it's revealed; revealing again (tap the playing
  // button, or touch the slider) resets the timer.
  const [sliderOpen, setSliderOpen] = useState(false);
  const [revealTick, setRevealTick] = useState(0);

  // Open when sound starts, close when it stops.
  useEffect(() => {
    if (playing) {
      setSliderOpen(true);
      setRevealTick((t) => t + 1);
    } else {
      setSliderOpen(false);
    }
  }, [playing]);

  // Mobile only: tuck the slider away a few seconds after each reveal.
  useEffect(() => {
    if (!isMobile || !sliderOpen) return;
    const id = window.setTimeout(() => setSliderOpen(false), 3500);
    return () => window.clearTimeout(id);
  }, [isMobile, sliderOpen, revealTick]);

  const reveal = () => {
    setSliderOpen(true);
    setRevealTick((t) => t + 1);
  };

  if (!available) return null;

  return (
    // dir=ltr so the button stays glued to the left anchor and the slider
    // extends rightward when it appears
    <div dir="ltr" className="fixed bottom-[84px] left-5 z-40 flex items-center gap-2">
      <button
        type="button"
        id="ambient_sound_toggle"
        onClick={() => {
          // On mobile, if sound is on but the slider has tucked away, the first
          // tap just brings the slider back instead of muting.
          if (isMobile && playing && !sliderOpen) {
            reveal();
            return;
          }
          toggle();
        }}
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
        className={`overflow-hidden transition-all duration-500 ${sliderOpen ? 'w-28 opacity-100' : 'w-0 opacity-0'}`}
        aria-hidden={!sliderOpen}
      >
        <div className="glass-liquid rounded-full px-3 py-2 flex items-center">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMobile) reveal(); // keep it open while you're adjusting
            }}
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
