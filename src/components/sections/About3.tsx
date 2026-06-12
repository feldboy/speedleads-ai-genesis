import { motion } from 'framer-motion';
import MagneticButton from '@/components/effects/MagneticButton';
import { scrollToSection } from '@/lib/scroll';

interface About3Props {
  title?: string;
  description?: string;
}

const features = [
  {
    n: '01',
    title: 'שירות אישי',
    subtitle: 'שותפות אמיתית',
    body: 'מנהל פרויקט ייעודי, זמינות גבוהה ותמיכה הרבה אחרי ההשקה — שותפים שלכם בכל שלב.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop&auto=format&q=80',
  },
  {
    n: '02',
    title: 'אסטרטגיה',
    subtitle: 'תוצאות מדידות',
    body: 'מגדירים את המוצר יחד, בונים MVP מהיר ומניעים צמיחה דרך איטרציות מבוססות נתונים.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format&q=80',
  },
  {
    n: '03',
    title: 'איכות וביצועים',
    subtitle: 'מהיר, יציב, מאובטח',
    body: 'בנייה לפי הסטנדרטים הגבוהים ביותר — בדיקות אוטומטיות, אבטחה מקיפה וזמני טעינה מהירים.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&auto=format&q=80',
  },
  {
    n: '04',
    title: 'שקיפות מלאה',
    subtitle: 'אתם על ההגה',
    body: 'גישה מלאה לקוד המקור, לתשתית ולדוחות התקדמות. תהליכי החלטה שקופים מהיום הראשון.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80',
  },
];

export const About3 = ({
  title = 'למה SpeedLeads.AI?',
  description = 'כי מערכת טובה נמדדת בלילה — כשאף אחד לא עובד והלידים ממשיכים לקבל מענה.',
}: About3Props = {}) => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto">
        {/* Header — asymmetric */}
        <div className="asym-grid items-end mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-champagne">03 / 06</span>
              <span className="h-px w-12 bg-champagne/40" />
              <span className="eyebrow text-ivory/50">Why us</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="heading-he display-lg text-ivory"
            >
              {title.replace('?', '')}
              <span className="serif-lux gradient-text">?</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base lg:text-lg text-ivory/55 leading-relaxed max-w-md lg:justify-self-end"
          >
            {description}
          </motion.p>
        </div>

        {/* 2x2 editorial tiles — image reveals behind text on hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-ivory/10" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative p-9 lg:p-12 overflow-hidden bg-obsidian-raised/60 ${
                i % 2 === 0 ? 'md:border-l md:border-ivory/10' : ''
              } ${i < 2 ? 'border-b border-ivory/10' : ''}`}
            >
              {/* hover image reveal */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-cover bg-center scale-105 group-hover:scale-100"
                style={{ backgroundImage: `url(${f.image})`, transitionProperty: 'opacity, transform' }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="font-tech gradient-text leading-none"
                    style={{ fontSize: '2.6rem', fontWeight: 600, letterSpacing: '-0.04em' }}
                    dir="ltr"
                  >
                    {f.n}
                  </span>
                  <span className="h-px flex-1 bg-ivory/10 group-hover:bg-champagne/30 transition-colors duration-500" />
                  <span className="eyebrow text-ivory/40">{f.subtitle}</span>
                </div>
                <h3 className="heading-he text-ivory mb-3" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>
                  {f.title}
                </h3>
                <p className="text-ivory/55 leading-relaxed group-hover:text-ivory/75 transition-colors duration-500">
                  {f.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <MagneticButton onClick={() => scrollToSection('contact')}>
            <button className="btn-lux px-10 py-4 text-sm tracking-wider" id="why_us_cta_button">
              בואו נתחיל לעבוד יחד ←
            </button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};
