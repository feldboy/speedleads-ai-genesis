import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpLeft } from 'lucide-react';
import MagneticButton from '@/components/effects/MagneticButton';
import SpotlightCard from '@/components/effects/SpotlightCard';
import { scrollToSection } from '@/lib/scroll';

const GAP_PX = 24;
const AUTOPLAY_MS = 4000;

interface SuccessStory {
  id: string;
  title: string;
  description: string;
  client: {
    name: string;
    role: string;
    company: string;
    image: string;
  };
  project: {
    image: string;
    demoLink: string;
    category: string;
  };
  stats: {
    metric: string;
    value: string;
  }[];
}

const successStories: SuccessStory[] = [
  {
    id: 'story_1',
    title: 'אתר מרצה מקצועי שהכפיל את כמות הלידים',
    description: 'אתר אישי מתקדם עם אוטומציות AI שממיר מבקרים ללקוחות פוטנציאליים.',
    client: {
      name: 'ניב ראובני',
      role: 'מרצה ויועץ עסקי',
      company: 'ניב ראובני',
      image: '/lovable-uploads/2e4fae97-83ec-48d9-8a2a-f2ce997f9785.png',
    },
    project: {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&auto=format',
      demoLink: 'https://nivreuveni.com/',
      category: 'בניית אתרים',
    },
    stats: [
      { metric: 'עלייה בלידים', value: '200%' },
      { metric: 'זמן שהייה', value: '+40%' },
    ],
  },
  {
    id: 'story_2',
    title: 'אוטומציה חכמה שחוסכת 20 שעות עבודה בשבוע',
    description: 'מערכת AI מתקדמת לניהול לקוחות ואוטומציה של תהליכי שיווק.',
    client: {
      name: 'מיכל כהן',
      role: 'סמנכ"ל שיווק',
      company: 'מרקט פרו',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=80&h=80&fit=crop&auto=format',
    },
    project: {
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop&auto=format',
      demoLink: '#demo-automation',
      category: 'אוטומציות AI',
    },
    stats: [
      { metric: 'חיסכון זמן', value: '20 שעות' },
      { metric: 'שיפור שירות', value: '+60%' },
    ],
  },
  {
    id: 'story_3',
    title: 'חנות אונליין חכמה עם עלייה של 150% במכירות',
    description: "אינטגרציית AI למערכת המכירות עם המלצות אישיות וצ'אטבוט חכם.",
    client: {
      name: 'דן אבידן',
      role: 'בעלים',
      company: 'אלקטרו סטור',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    },
    project: {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&auto=format',
      demoLink: '#demo-ecommerce',
      category: 'יישום AI',
    },
    stats: [
      { metric: 'עלייה במכירות', value: '+150%' },
      { metric: 'שביעות רצון', value: '+45%' },
    ],
  },
  {
    id: 'story_4',
    title: 'פלטפורמת SaaS עם AI שמניבה $50K חודשיים',
    description: 'פיתוח פלטפורמה מלאה עם אלגוריתמים חכמים וממשק משתמש מתקדם.',
    client: {
      name: 'רונית לוי',
      role: 'מייסדת',
      company: 'DataFlow Pro',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
    },
    project: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&auto=format',
      demoLink: '#demo-saas',
      category: 'פיתוח מלא',
    },
    stats: [
      { metric: 'הכנסות חודשיות', value: '$50K' },
      { metric: 'משתמשים פעילים', value: '10K' },
    ],
  },
  {
    id: 'story_5',
    title: 'מערכת ניהול חכמה שחסכה 40% בעלויות',
    description: 'פתרון AI מותאם אישית לייעול תהליכי הניהול והפחתת עלויות תפעול.',
    client: {
      name: 'אמיר שלום',
      role: 'מנכ"ל',
      company: 'טכנולוגיות המחר',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    },
    project: {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop&auto=format',
      demoLink: '#demo-management',
      category: 'אוטומציות AI',
    },
    stats: [
      { metric: 'חיסכון בעלויות', value: '40%' },
      { metric: 'יעילות צוות', value: '+55%' },
    ],
  },
  {
    id: 'story_6',
    title: 'אפליקציה מובילה עם 100K הורדות בחודש הראשון',
    description: "אפליקציית מובייל חכמה עם פיצ'רי AI מתקדמים.",
    client: {
      name: 'תמר דוד',
      role: 'מנהלת מוצר',
      company: 'InnovateTech',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&auto=format',
    },
    project: {
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop&auto=format',
      demoLink: '#demo-mobile',
      category: 'פיתוח מובייל',
    },
    stats: [
      { metric: 'הורדות בחודש', value: '100K' },
      { metric: 'דירוג ממוצע', value: '4.8' },
    ],
  },
];

const SuccessStoryCard = ({ story }: { story: SuccessStory }) => (
  <SpotlightCard className="group h-full flex flex-col overflow-hidden rounded">
    {/* Project image */}
    <div className="relative h-44 overflow-hidden shrink-0">
      <img
        src={story.project.image}
        alt={story.title}
        className="w-full h-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-90 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1322] via-[#0B1322]/30 to-transparent" />
      <div className="absolute top-4 right-4">
        <span className="font-tech text-[0.65rem] tracking-[0.18em] px-3 py-1.5 border border-champagne/40 text-champagne bg-obsidian/70 backdrop-blur-sm" style={{ borderRadius: '2px' }}>
          {story.project.category}
        </span>
      </div>
      <a
        href={story.project.demoLink}
        target="_blank"
        rel="noopener noreferrer"
        id={`${story.id}_demo_link`}
        className="absolute bottom-4 left-4 flex items-center gap-1.5 font-tech text-xs text-ivory/80 hover:text-tech-blue transition-colors"
      >
        <ArrowUpLeft className="w-3.5 h-3.5" />
        צפו בדמו
      </a>
    </div>

    {/* Content */}
    <div className="p-6 lg:p-7 flex-1 flex flex-col relative">
      {/* serif quote mark */}
      <span
        className="serif-lux gradient-text absolute -top-7 right-5 select-none pointer-events-none"
        style={{ fontSize: '4.5rem', lineHeight: 1 }}
        aria-hidden="true"
      >
        ”
      </span>

      <h3 className="heading-he text-ivory mb-3 leading-snug min-h-[3.4rem] line-clamp-2" style={{ fontSize: '1.25rem' }}>
        {story.title}
      </h3>
      <p className="text-ivory/55 text-sm mb-6 leading-relaxed line-clamp-2 min-h-[2.8rem]">
        {story.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-px bg-ivory/10 border border-ivory/10 mb-6" style={{ borderRadius: '2px', overflow: 'hidden' }}>
        {story.stats.map((stat) => (
          <div key={stat.metric} className="bg-obsidian-card p-4 text-center">
            <div className="font-tech gradient-text text-xl mb-1 leading-none" dir="ltr">
              {stat.value}
            </div>
            <div className="text-ivory/45 text-xs leading-tight">{stat.metric}</div>
          </div>
        ))}
      </div>

      {/* Client footer */}
      <div className="mt-auto flex items-center gap-3 pt-5 border-t border-ivory/10">
        <img
          src={story.client.image}
          alt={story.client.name}
          className="w-11 h-11 rounded-full object-cover border border-champagne/40"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="text-ivory text-sm font-semibold truncate">{story.client.name}</div>
          <div className="text-ivory/45 text-xs truncate">
            {story.client.role} · <span className="text-champagne/80">{story.client.company}</span>
          </div>
        </div>
      </div>
    </div>
  </SpotlightCard>
);

const TestimonialsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: 'start',
    dragFree: false,
    skipSnaps: false,
    containScroll: 'keepSnaps',
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    const id = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [emblaApi, isPlaying]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  return (
    <section id="success-stories" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="asym-grid items-end mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-champagne">04 / 06</span>
              <span className="h-px w-12 bg-champagne/40" />
              <span className="eyebrow text-ivory/50">Case studies</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="heading-he display-lg text-ivory"
            >
              תוצאות. <br />
              <span className="gradient-text font-black">לא הבטחות.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base lg:text-lg text-ivory/55 leading-relaxed max-w-md lg:justify-self-end"
          >
            כל פרויקט נמדד במספרים — לידים, שעות שנחסכו, מכירות. הנה כמה מהם.
          </motion.p>
        </div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="overflow-hidden" ref={emblaRef} style={{ direction: 'ltr' }}>
            <div className="flex items-stretch will-change-transform transform-gpu">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="embla__slide min-w-0 flex flex-col testimonial-slide"
                  style={{ paddingRight: GAP_PX }}
                  aria-label={story.title}
                >
                  <div dir="rtl" className="flex flex-col h-full">
                    <SuccessStoryCard story={story} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 card-obsidian hover:border-champagne/50 rounded-full flex items-center justify-center text-ivory/80 hover:text-champagne transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 card-obsidian hover:border-champagne/50 rounded-full flex items-center justify-center text-ivory/80 hover:text-champagne transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          <div className="flex justify-center mt-10 gap-2.5">
            {scrollSnaps.map((_, i) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`h-1 transition-all duration-400 ${
                    active
                      ? 'w-10 bg-gradient-to-l from-champagne-light to-champagne'
                      : 'w-4 bg-ivory/15 hover:bg-ivory/30'
                  }`}
                  style={{ borderRadius: '1px' }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-ivory/55 mb-8">
            מוכנים לכתוב את סיפור ההצלחה הבא?
          </p>
          <MagneticButton onClick={() => scrollToSection('contact')}>
            <button className="btn-lux px-9 py-4 text-sm tracking-wider" id="success_stories_cta_button">
              בואו נתחיל לעבוד ביחד ←
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
