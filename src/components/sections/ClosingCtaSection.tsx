import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/effects/MagneticButton';

/**
 * Closing CTA — the last persuasive beat before the contact form.
 *
 * Hebrew/RTL, "Cinematic Spatial Dark / cyan-only". The word "Leads" wears the
 * SpeedLeads logo treatment (italic + cyan gradient) so it reads as the brand.
 * Reveal uses AOS (data-aos) like the neighbouring sections, so it animates in
 * AND reverses on scroll-up the same way (AOS.init: once:false, mirror:true).
 * Creative motif: a row of cyan "lead" dots that pulse back to life under a soft
 * aura — "let's bring those leads back to life" (paused under reduced motion).
 */

const REVIVE_DOTS = 9;

const ClosingCtaSection = () => {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="closing-cta" className="relative overflow-hidden py-24 sm:py-32">
      {/* soft cyan aura behind the headline — the leads coming back to life */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(0,167,255,0.16),_transparent_70%)] blur-2xl sm:h-[28rem] sm:w-[28rem]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-5 text-sm font-medium tracking-wide text-tech-blue/90 sm:text-base"
            data-aos="fade-up"
          >
            ההזדמנות שכבר שילמת עליה
          </p>

          <div
            className="mb-7 flex items-center justify-center gap-2.5"
            aria-hidden="true"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {Array.from({ length: REVIVE_DOTS }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-tech-blue shadow-[0_0_8px_rgba(0,246,255,0.65)] animate-pulse motion-reduce:animate-none"
                style={{ animationDelay: `${i * 140}ms` }}
              />
            ))}
          </div>

          <h2
            className="font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            כבר שילמת על ה־
            <span dir="ltr" className="font-logo-leads italic gradient-text">
              Leads
            </span>{' '}
            האלה.
          </h2>

          <div
            className="mx-auto my-7 h-1 w-24 rounded-full bg-gradient-to-l from-[color:var(--btn-from,#00f6ff)] to-[color:var(--btn-to,#00a7ff)]"
            data-aos="fade-up"
            data-aos-delay="150"
          />

          <p
            className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            עכשיו נבדוק יחד אם אפשר להחזיר אותם לחיים — ולהפוך אותם להכנסה אמיתית.
            רוצים לראות איך זה עובד, בלי שום התחייבות? אין לכם מה להפסיד, חוץ
            מהמכירות שאתם משאירים על השולחן בדיוק עכשיו.
          </p>

          <div className="mt-10 flex justify-center" data-aos="fade-up" data-aos-delay="250">
            <MagneticButton onClick={scrollToContact}>
              <Button
                id="closing_cta_button"
                size="lg"
                className="min-h-[44px] rounded-full bg-gradient-to-l from-[color:var(--btn-from,#00f6ff)] to-[color:var(--btn-to,#00a7ff)] px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-tech-blue/25 hover:brightness-110 sm:px-10 sm:py-4"
              >
                בואו ננסה
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCtaSection;
