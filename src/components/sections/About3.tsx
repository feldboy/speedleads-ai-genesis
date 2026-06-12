import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/effects/MagneticButton";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: { src: string; alt: string };
  secondaryImage?: { src: string; alt: string };
}

const features = [
  {
    n: "01",
    title: "שירות אישי",
    subtitle: "שותפות אמיתית",
    body: "מנהל פרויקט ייעודי, זמינות גבוהה ותמיכה הרבה אחרי ההשקה — שותפים שלכם בכל שלב.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=300&fit=crop&auto=format&q=80",
  },
  {
    n: "02",
    title: "אסטרטגיה",
    subtitle: "תוצאות מדידות",
    body: "מגדירים את המוצר יחד, בונים MVP מהיר ומניעים צמיחה דרך איטרציות מבוססות נתונים.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop&auto=format&q=80",
  },
  {
    n: "03",
    title: "איכות וביצועים",
    subtitle: "מהיר, יציב, מאובטח",
    body: "בנייה לפי הסטנדרטים הגבוהים ביותר — בדיקות אוטומטיות, אבטחה מקיפה וזמני טעינה מהירים.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=300&fit=crop&auto=format&q=80",
  },
  {
    n: "04",
    title: "שקיפות מלאה",
    subtitle: "אתם על ההגה",
    body: "גישה מלאה לקוד המקור, תשתית ודוחות התקדמות. מידע מלא ותהליכי החלטה שקופים.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=300&fit=crop&auto=format&q=80",
  },
];

export const About3 = ({
  title = "למה SpeedLeads.AI?",
  description = "פתרונות AI מתקדמים שחוסכים זמן, משפרים דיוק ומאפשרים לכם להתמקד במה שחשוב באמת.",
}: About3Props = {}) => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        {/* Header — asymmetric */}
        <div className="asym-grid items-end mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-tech-blue">03 / 04</span>
              <span className="h-px w-12 bg-tech-blue/40" />
              <span className="eyebrow text-gray-500">Why us</span>
            </div>
            <h2 className="heading-he display-lg text-dark" data-aos="fade-up">
              {title.split('?')[0]} <br />
              <span className="gradient-text">?</span>
            </h2>
          </div>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-md lg:justify-self-end" data-aos="fade-up" data-aos-delay="100">
            {description}
          </p>
        </div>

        {/* 4 feature tiles — asymmetric 2x2 with image headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          {features.map((f, i) => (
            <div
              key={f.n}
              className="bg-white p-8 lg:p-10 group hover:bg-gray-50/80 transition-colors duration-500"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="overflow-hidden mb-8" style={{ borderRadius: '2px' }}>
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="section-index text-tech-blue">{f.n}</span>
                <span className="h-px flex-1 bg-gray-200" />
                <span className="eyebrow text-gray-400">{f.subtitle}</span>
              </div>
              <h3 className="heading-he text-dark mb-3" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <Button
              size="lg"
              className="btn-brand text-white px-10 py-4 text-sm uppercase tracking-wider"
            >
              בואו נתחיל לעבוד יחד →
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
