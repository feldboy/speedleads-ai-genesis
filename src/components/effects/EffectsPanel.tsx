import { useState, type ReactNode } from 'react';
import { Check, Copy, RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fx, resetFx, setFx, useFxConfig, type FxConfig } from '@/lib/effectsConfig';

/**
 * The on-page effects control panel: every visual/audio tunable (colors,
 * strengths, particle physics, motion speed, volume) live-edits the site
 * through the effects config. Built for the owner to dial in the look —
 * "copy settings" exports the tuned values so they can become the new
 * defaults — but safe to leave for visitors to play with.
 *
 * Desktop: floating glass card above its toggle (bottom-left). Mobile:
 * bottom sheet. Hidden under reduced motion (the effects it drives are off).
 */

type NumericKey = {
  [K in keyof FxConfig]: FxConfig[K] extends number ? K : never;
}[keyof FxConfig];
type ColorKey = {
  [K in keyof FxConfig]: FxConfig[K] extends string ? K : never;
}[keyof FxConfig];

const SliderRow = ({
  label,
  k,
  min,
  max,
  step = 0.05,
}: {
  label: string;
  k: NumericKey;
  min: number;
  max: number;
  step?: number;
}) => {
  const config = useFxConfig();
  return (
    <label className="flex items-center gap-3 text-sm text-white/75">
      <span className="w-28 shrink-0">{label}</span>
      <Slider
        value={[config[k]]}
        min={min}
        max={max}
        step={step}
        onValueChange={([value]) => setFx({ [k]: value })}
        className="flex-1"
      />
      <span dir="ltr" className="w-10 shrink-0 text-left text-xs tabular-nums text-white/50">
        {step >= 1 ? config[k] : config[k].toFixed(2)}
      </span>
    </label>
  );
};

const ColorRow = ({ label, k }: { label: string; k: ColorKey }) => {
  const config = useFxConfig();
  return (
    <label className="flex items-center gap-3 text-sm text-white/75">
      <span className="w-28 shrink-0">{label}</span>
      <input
        type="color"
        value={config[k]}
        onChange={(e) => setFx({ [k]: e.target.value })}
        className="h-7 w-12 cursor-pointer rounded border border-white/15 bg-transparent p-0.5"
      />
      <span dir="ltr" className="text-xs uppercase tabular-nums text-white/40">{config[k]}</span>
    </label>
  );
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-3">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-tech-blue/90">{title}</h3>
    {children}
  </section>
);

const EffectsPanel = () => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (reducedMotion) return null;

  const copySettings = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(fx, null, 2));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — nothing to do */
    }
  };

  return (
    <>
      <button
        type="button"
        id="effects_panel_toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'סגירת לוח האפקטים' : 'פתיחת לוח האפקטים'}
        title="לוח אפקטים"
        className="fixed bottom-[140px] left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-liquid text-white/80 transition-all duration-300 hover:text-white hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <SlidersHorizontal className="h-5 w-5" />}
      </button>

      {open && (
        <div
          dir="rtl"
          role="dialog"
          aria-label="לוח בקרת אפקטים"
          className={
            isMobile
              ? 'fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[#070D18]/95 backdrop-blur-xl p-5 pb-8 space-y-6'
              : 'fixed bottom-[192px] left-5 z-50 w-[340px] max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#070D18]/92 backdrop-blur-xl p-5 space-y-6 shadow-2xl'
          }
        >
          <header className="flex items-center justify-between">
            <h2 className="font-display text-lg text-white">לוח אפקטים</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copySettings}
                title="העתקת ההגדרות (JSON)"
                aria-label="העתקת ההגדרות"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:text-white"
              >
                {copied ? <Check className="h-4 w-4 text-tech-blue" /> : <Copy className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={resetFx}
                title="איפוס לברירת המחדל"
                aria-label="איפוס לברירת המחדל"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </header>

          <Section title="רקע נוזלי">
            <SliderRow label="עוצמת העשן" k="inkIntensity" min={0} max={4} />
            <SliderRow label="מהירות זרימה" k="inkFlow" min={0} max={5} />
            <SliderRow label="ערבול בעכבר" k="inkStir" min={0} max={5} />
            <SliderRow label="גודל ערבול" k="inkStirSize" min={0.3} max={4} />
            <SliderRow label="אורך ערבול" k="inkStirTrail" min={0.3} max={4} />
            <ColorRow label="צבע זוהר" k="inkCyan" />
            <ColorRow label="צבע עומק" k="inkAzure" />
          </Section>

          <Section title="חלקיקים">
            <SliderRow label="כמות" k="particleCount" min={0} max={2500} step={10} />
            <SliderRow label="גודל" k="particleSize" min={0.5} max={12} step={0.1} />
            <SliderRow label="זוהר" k="particleGlow" min={0} max={5} />
            <SliderRow label="חדות" k="particleSharpness" min={0} max={3} />
            <SliderRow label="שובל" k="particleTrail" min={0} max={1} step={0.01} />
            <SliderRow label="רזולוציה" k="particleResolution" min={0.25} max={1} step={0.05} />
            <SliderRow label="כבידת עכבר" k="particleGravity" min={0} max={8} />
            <SliderRow label="רדיוס כבידה" k="gravityRadius" min={40} max={500} step={10} />
            <SliderRow label="היסט כבידה X" k="gravityOffsetX" min={-300} max={300} step={5} />
            <SliderRow label="היסט כבידה Y" k="gravityOffsetY" min={-300} max={300} step={5} />
            <ColorRow label="צבע" k="particleColor" />
          </Section>

          <Section title="עכבר">
            <ColorRow label="צבע" k="cursorColor" />
            <SliderRow label="גודל נקודה" k="cursorSize" min={0.3} max={4} />
            <SliderRow label="גודל טבעת" k="cursorHalo" min={0.25} max={5} />
            <SliderRow label="עוצמת זרקור" k="cursorSpotlight" min={0} max={4} />
            <SliderRow label="גודל זרקור" k="cursorSpotlightSize" min={0.3} max={3} />
          </Section>

          <Section title="הירו">
            <SliderRow label="עוצמה" k="heroIntensity" min={0} max={4} />
            <SliderRow label="מהירות" k="heroSpeed" min={0} max={5} />
            <ColorRow label="גוון" k="heroTint" />
          </Section>

          <Section title="כותרות וכפתורים">
            <ColorRow label="כותרת — התחלה" k="headlineFrom" />
            <ColorRow label="כותרת — סוף" k="headlineTo" />
            <ColorRow label="כפתור — התחלה" k="buttonFrom" />
            <ColorRow label="כפתור — סוף" k="buttonTo" />
          </Section>

          <Section title="תנועה">
            <SliderRow label="מהירות כללית" k="motionSpeed" min={0.1} max={4} />
          </Section>

          <Section title="סאונד">
            <SliderRow label="עוצמת שמע" k="volume" min={0} max={1} step={0.01} />
            <SliderRow label="אפקטי סאונד" k="sfxVolume" min={0} max={1} step={0.01} />
            <SliderRow label="ווש סמן" k="whooshVolume" min={0} max={1} step={0.01} />
          </Section>
        </div>
      )}
    </>
  );
};

export default EffectsPanel;
