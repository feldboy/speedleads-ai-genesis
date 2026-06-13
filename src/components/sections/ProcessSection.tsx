import { useRef, type ReactNode } from 'react';
import KineticHeading from '@/components/ui/KineticHeading';
import GlowCard from '@/components/ui/GlowCard';
import SectionReveal from '@/components/ui/SectionReveal';
import { useGsap, gsap } from '@/hooks/useGsap';
import { useIsMobile } from '@/hooks/use-mobile';
import { fxRuntime } from '@/lib/effectsConfig';
import { VIGNETTES } from './process/Vignettes';

/**
 * Customer process scrollytelling — "how your idea comes to life".
 * Desktop: the section pins and six stations travel horizontally, each scroll
 * checkpoint landing one station dead-center. Each station is a live vignette
 * (the step demos itself), fronted by a giant outlined numeral that parallaxes
 * at a slower rate, with a node-rail that ignites as the scrub passes. The
 * scrub also blows wind into the global particle layer (fxRuntime.windX).
 * Mobile / reduced motion: a vertical stack, vignettes still alive.
 *
 * NOTE: step copy adapted in SpeedLeads voice (structure inspired by the
 * owner-supplied shiruziel.com reference) — flagged for owner review.
 */

type Step = { title: string; description: ReactNode };

const STEPS: Step[] = [
  {
    title: 'שיחת אפיון',
    description: (
      <>
        הכול מתחיל בשיחה אחת. נפגשים לשיחת אפיון <strong className="text-cyan-200 font-semibold">ללא עלות וללא התחייבות</strong>, מבינים לעומק את העסק, המטרות והקהל שלכם — ובוחנים איפה AI ואוטומציה יזיזו באמת את המחט. בסוף השיחה יש בידיכם <strong className="text-cyan-200 font-semibold">מסמך אפיון כתוב והצעת מחיר מסודרת</strong>.
      </>
    ),
  },
  {
    title: 'אסטרטגיה ומסרים',
    description: (
      <>
        מגדירים יחד את המסרים, מעמיקים בקהל היעד ומזקקים את מה <strong className="text-cyan-200 font-semibold">שמבדל אתכם מכל מתחרה</strong>. מנסחים קופי חד ואותנטי שמספר את סיפור המותג שלכם, ובונים מסע לקוח שמוביל כל מבקר למקום אחד: <strong className="text-cyan-200 font-semibold">להשאיר פרטים</strong>.
      </>
    ),
  },
  {
    title: 'עיצוב',
    description: (
      <>
        עיצוב טוב מעביר את המסר <strong className="text-cyan-200 font-semibold">במבט ראשון</strong>. בונים לכם שפה ויזואלית מרשימה שמדויקת לבידול שלכם — <strong className="text-cyan-200 font-semibold">סטוריטלינג ויזואלי</strong> שרואים, לא רק קוראים, עד הפיקסל האחרון.
      </>
    ),
  },
  {
    title: 'אינטראקציות ותנועה',
    description: (
      <>
        השלב שבו העיצוב <strong className="text-cyan-200 font-semibold">מתעורר לחיים</strong>: אנימציות בגלילה, תגובה לכל לחיצה ותנועה קולנועית שגורמת למבקרים להישאר. בדיוק כמו האתר הזה — <strong className="text-cyan-200 font-semibold">כל מה שאתם מרגישים כאן יכול להיות גם שלכם</strong>.
      </>
    ),
  },
  {
    title: 'פיתוח',
    description: (
      <>
        קוד מהיר, נקי ומותאם SEO — <strong className="text-cyan-200 font-semibold">בלי תבניות מדף</strong>. אתר רספונסיבי שמדויק לצרכים שלכם, עם ביצועים שגוגל מתגמל ושילובי AI שעובדים בשבילכם <strong className="text-cyan-200 font-semibold">24/7</strong>.
      </>
    ),
  },
  {
    title: 'בדיקות והשקה',
    description: (
      <>
        לפני העלייה לאוויר האתר עובר <strong className="text-cyan-200 font-semibold">בדיקות יסודיות בכל מכשיר ודפדפן</strong>. עולים לאוויר עם הדרכה מלאה לתפעול <strong className="text-cyan-200 font-semibold">וליווי צמוד אחרי ההשקה</strong> — כדי לוודא שהכול עובד חלק, גם כשאנחנו כבר לא בחדר.
      </>
    ),
  },
];

const StationCard = ({ step, index, horizontal }: { step: Step; index: number; horizontal: boolean }) => {
  const Vignette = VIGNETTES[index];
  return (
    <div className="relative h-full" data-station>
      {/* Giant numeral behind the card — parallaxes slower than the track */}
      <span
        data-numeral
        aria-hidden="true"
        className={`font-display process-numeral select-none pointer-events-none absolute z-20 leading-none ${
          horizontal ? 'text-[10rem] xl:text-[12rem] -top-20 xl:-top-24 right-0' : 'text-7xl -top-8 right-2'
        }`}
        dir="ltr"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div data-card className={`relative z-10 will-change-transform ${horizontal ? 'h-full' : ''}`}>
        <GlowCard className={`p-6 md:p-7 flex flex-col gap-4 ${horizontal ? 'mt-10 h-[calc(100%-2.5rem)]' : 'mt-8'}`}>
          {/* The live vignette — this step, demoing itself */}
          <div className="h-44 rounded-xl border border-white/10 bg-[#05080F]/60 overflow-hidden">
            <Vignette />
          </div>
          <h3 className="font-display text-2xl text-white">{step.title}</h3>
          <p className="text-white/70 leading-relaxed text-[15px]">{step.description}</p>
        </GlowCard>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef(0);
  const isMobile = useIsMobile();

  const reducedMotion = useGsap(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || isMobile) return;

      const stations = Array.from(track.querySelectorAll<HTMLElement>('[data-station]'));
      const cards = stations.map((s) => s.querySelector<HTMLElement>('[data-card]'));
      const numerals = stations.map((s) => s.querySelector<HTMLElement>('[data-numeral]'));
      const nodes = Array.from(section.querySelectorAll<HTMLElement>('[data-rail-node]'));

      // RTL: overflowing panels extend leftward, so the track travels +x
      const distance = () => track.scrollWidth - window.innerWidth;

      const applyStage = (progress: number) => {
        // blow scrub wind into the global particle layer (decays there)
        const gust = (progress - lastProgressRef.current) * 18;
        lastProgressRef.current = progress;
        fxRuntime.windX = Math.max(-1, Math.min(1, fxRuntime.windX + gust));
        if (railRef.current) railRef.current.style.transform = `scaleX(${progress})`;

        const litCount = progress * (STEPS.length - 1) + 0.25;
        nodes.forEach((node, i) => {
          const lit = i <= litCount;
          node.style.backgroundColor = lit ? '#00F6FF' : 'rgba(255,255,255,0.18)';
          node.style.boxShadow = lit ? '0 0 10px rgba(0,246,255,0.9), 0 0 22px rgba(0,246,255,0.4)' : 'none';
          node.style.transform = `translate(50%, -50%) scale(${lit ? 1.25 : 1})`;
        });

        const vwCenter = window.innerWidth / 2;
        stations.forEach((station, i) => {
          const rect = station.getBoundingClientRect();
          const offCenter = (rect.left + rect.width / 2 - vwCenter) / vwCenter; // -1..1 around focus
          const d = Math.min(Math.abs(offCenter), 1.6);
          const card = cards[i];
          const numeral = numerals[i];
          if (card) {
            // focus-pull via scale only — fading the whole card's opacity let the
            // particle field bleed through the off-centre cards, so keep them solid.
            gsap.set(card, {
              scale: 1 - 0.06 * Math.min(d, 1),
              opacity: 1,
            });
          }
          // The numeral drags behind the travel direction — depth
          if (numeral) gsap.set(numeral, { x: offCenter * 55, opacity: 1 - 0.35 * Math.min(d, 1) });
        });
      };

      // Scroll distance is 1.8× the track travel — slower, more deliberate.
      // Track geometry (center-aligning spacers + equal card widths) makes
      // every snap point land one station exactly at viewport center.
      gsap.to(track, {
        x: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(distance() * 1.8)}`,
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (STEPS.length - 1),
            duration: { min: 0.3, max: 0.7 },
            ease: 'power1.inOut',
          },
          onUpdate: (self) => applyStage(self.progress),
        },
      });

      applyStage(0);
    },
    sectionRef,
    [isMobile]
  );

  const horizontal = !isMobile && !reducedMotion;

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden">
      <div className={horizontal ? 'relative flex h-screen flex-col justify-center py-10' : 'relative py-20'}>
        <div className="container mx-auto mb-6 relative z-10">
          <KineticHeading as="h2" gradient className="text-3xl sm:text-4xl lg:text-5xl text-center">
            איך הרעיון שלכם מתעורר לחיים
          </KineticHeading>
          <p className="mt-4 text-center text-white/60 max-w-2xl mx-auto">
            שישה שלבים מהשיחה הראשונה ועד האתר באוויר — וכל שלב מדגים את עצמו, חי, ממש כאן.
          </p>

          {/* Progress rail + station nodes (ignite as the scrub passes) */}
          <div className="relative mt-10 h-[2px] bg-white/10 rounded-full" aria-hidden="true">
            <div
              ref={railRef}
              className="absolute inset-0 origin-right rounded-full"
              style={{
                background: 'var(--brand-gradient)',
                transform: horizontal ? 'scaleX(0)' : 'scaleX(1)',
              }}
            />
            {horizontal &&
              STEPS.map((step, i) => (
                <span
                  key={step.title}
                  data-rail-node
                  className="absolute top-1/2 h-2.5 w-2.5 rounded-full transition-colors duration-300"
                  style={{
                    right: `${(i / (STEPS.length - 1)) * 100}%`,
                    transform: 'translate(50%, -50%)',
                    backgroundColor: 'rgba(255,255,255,0.18)',
                  }}
                />
              ))}
          </div>
        </div>

        {horizontal ? (
          <div ref={trackRef} className="relative z-10 flex items-stretch gap-8 pt-16 will-change-transform">
            {/* Leading/trailing spacers center station 1 at progress 0 and
                station 6 at progress 1 — every snap = one card dead-center.
                (2rem compensates for the flex gap before/after the spacer.) */}
            <div aria-hidden="true" className="shrink-0 w-[calc(50vw-min(480px,80vw)/2-2rem)]" />
            {STEPS.map((step, i) => (
              <div key={step.title} className="w-[min(480px,80vw)] shrink-0">
                <StationCard step={step} index={i} horizontal />
              </div>
            ))}
            <div aria-hidden="true" className="shrink-0 w-[calc(50vw-min(480px,80vw)/2-2rem)]" />
          </div>
        ) : (
          <SectionReveal className="container mx-auto grid gap-10 pt-8 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <StationCard key={step.title} step={step} index={i} horizontal={false} />
            ))}
          </SectionReveal>
        )}
      </div>
    </section>
  );
};

export default ProcessSection;
