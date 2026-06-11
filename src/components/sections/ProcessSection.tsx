import { useRef } from 'react';
import { MessageSquare, Compass, Palette, MousePointerClick, Code2, Rocket } from 'lucide-react';
import KineticHeading from '@/components/ui/KineticHeading';
import GlowCard from '@/components/ui/GlowCard';
import SectionReveal from '@/components/ui/SectionReveal';
import { useGsap } from '@/hooks/useGsap';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Customer process scrollytelling — "how your idea comes to life".
 * Desktop: the section pins and the six stations travel horizontally as you
 * scroll, with the Signal as the progress rail (the steps are stations the
 * signal passes through). Mobile / reduced motion: a vertical stack.
 *
 * NOTE: step copy is a placeholder — final Hebrew copy to be reviewed with
 * the owner (see DESIGN-OVERHAUL-PLAN.md).
 */

const STEPS = [
  {
    icon: MessageSquare,
    title: 'שיחת אפיון',
    description: 'מכירים את העסק, המטרות והקהל שלכם — ומבינים מה באמת יזיז את המחט.',
  },
  {
    icon: Compass,
    title: 'אסטרטגיה ומסרים',
    description: 'בונים נרטיב שממיר: מסע לקוח חכם, היררכיית מסרים וקריאות לפעולה מדויקות.',
  },
  {
    icon: Palette,
    title: 'עיצוב',
    description: 'שפה ויזואלית כובשת שמייחדת אתכם מכל מתחרה — עד הפיקסל האחרון.',
  },
  {
    icon: MousePointerClick,
    title: 'אינטראקציות ותנועה',
    description: 'מיקרו-אנימציות ותנועה קולנועית שמפיחות חיים בכל גלילה ולחיצה.',
  },
  {
    icon: Code2,
    title: 'פיתוח',
    description: 'קוד מהיר, נקי ומותאם SEO — ביצועים שגוגל ולקוחות אוהבים.',
  },
  {
    icon: Rocket,
    title: 'בדיקות והשקה',
    description: 'מוודאים שהכל מושלם בכל מכשיר — ויוצאים לאוויר עם ליווי צמוד.',
  },
];

const StepCard = ({ step, index }: { step: (typeof STEPS)[number]; index: number }) => {
  const Icon = step.icon;
  return (
    <GlowCard className="h-full p-8 flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <span className="font-display text-7xl md:text-8xl leading-none text-outline select-none" dir="ltr">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tech-blue/10 border border-tech-blue/25">
          <Icon className="h-6 w-6 text-tech-blue" />
        </span>
      </div>
      <h3 className="font-display text-2xl text-white">{step.title}</h3>
      <p className="text-white/70 leading-relaxed">{step.description}</p>
    </GlowCard>
  );
};

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const reducedMotion = useGsap(
    ({ gsap }) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || isMobile) return;

      // RTL: overflowing panels extend leftward, so the track travels +x
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (railRef.current) {
              railRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    },
    sectionRef,
    [isMobile]
  );

  const horizontal = !isMobile && !reducedMotion;

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden">
      <div className={horizontal ? 'flex h-screen flex-col justify-center py-10' : 'py-20'}>
        <div className="container mx-auto mb-10">
          <KineticHeading as="h2" gradient className="text-3xl sm:text-4xl lg:text-5xl text-center">
            איך הרעיון שלכם מתעורר לחיים
          </KineticHeading>
          <p className="mt-4 text-center text-white/60 max-w-2xl mx-auto">
            שישה צעדים מהשיחה הראשונה ועד האתר באוויר — האות עובר דרך כל תחנה.
          </p>

          {/* The Signal as progress rail (fills with scroll on desktop) */}
          <div className="relative mt-10 h-[2px] bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
            <div
              ref={railRef}
              className="absolute inset-0 origin-right rounded-full"
              style={{
                background: 'var(--brand-gradient)',
                transform: horizontal ? 'scaleX(0)' : 'scaleX(1)',
              }}
            />
          </div>
        </div>

        {horizontal ? (
          <div ref={trackRef} className="flex gap-6 px-10 will-change-transform">
            {STEPS.map((step, i) => (
              <div key={step.title} className="w-[min(420px,80vw)] shrink-0">
                <StepCard step={step} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <SectionReveal className="container mx-auto grid gap-6 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </SectionReveal>
        )}
      </div>
    </section>
  );
};

export default ProcessSection;
