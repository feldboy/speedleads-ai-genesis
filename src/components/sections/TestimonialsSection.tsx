import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const GAP_PX = 24; // uniform gap
// Fallback (used before JS calc). Viewport padding supplies edge gaps => total gap space consumed: (VISIBLE_COUNT + 1)*GAP_PX
const SLIDE_WIDTH = '30%'

interface SuccessStory {
  id: string;
  title: string;
  description: string;
  results: string[];
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
    id: "story_1",
    title: "אתר מרצה מקצועי שהכפיל את כמות הלידים",
    description:
      "בניית אתר אישי מתקדם עם אוטומציות AI שממיר מבקרים ללקוחות פוטנציאליים",
    results: [
      "הכפלת כמות הלידים תוך 3 חודשים",
      "שיפור של 40% בזמן השהייה באתר",
      "אוטומציה מלאה של תהליך יצירת הקשר",
    ],
    client: {
      name: "ניב ראובני",
      role: "מרצה ויועץ עסקי",
      company: "ניב ראובני",
      image: "/lovable-uploads/2e4fae97-83ec-48d9-8a2a-f2ce997f9785.png",
    },
    project: {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&auto=format",
      demoLink: "https://nivreuveni.com/",
      category: "בניית אתרים",
    },
    stats: [
      { metric: "עלייה בלידים", value: "200%" },
      { metric: "זמן שהייה", value: "+40%" },
    ],
  },
  {
    id: "story_2",
    title: "אוטומציה חכמה שחוסכת 20 שעות עבודה בשבוע",
    description: "מערכת AI מתקדמת לניהול לקוחות ואוטומציה של תהליכי שיווק",
    results: [
      "חיסכון של 20 שעות עבודה שבועיות",
      "שיפור של 60% ברמת השירות",
      "אוטומציה של 80% מהתהליכים השגרתיים",
    ],
    client: {
      name: "מיכל כהן",
      role: 'סמנכ"ל שיווק',
      company: "מרקט פרו",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=80&h=80&fit=crop&auto=format",
    },
    project: {
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop&auto=format",
      demoLink: "#demo-automation",
      category: "אוטומציות AI",
    },
    stats: [
      { metric: "חיסכון זמן", value: "20 שעות/שבוע" },
      { metric: "שיפור שירות", value: "+60%" },
    ],
  },
  {
    id: "story_3",
    title: "חנות אונליין חכמה עם עלייה של 150% במכירות",
    description: "אינטגרציה של AI למערכת המכירות עם המלצות אישיות וצ'אטבוט חכם",
    results: [
      "עלייה של 150% במכירות",
      "שיפור של 45% בשביעות רצון לקוחות",
      "הפחתה של 70% בזמן תגובה לפניות",
    ],
    client: {
      name: "דן אבידן",
      role: "בעלים",
      company: "אלקטרו סטור",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    },
    project: {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&auto=format",
      demoLink: "#demo-ecommerce",
      category: "יישום AI",
    },
    stats: [
      { metric: "עלייה במכירות", value: "+150%" },
      { metric: "שביעות רצון", value: "+45%" },
    ],
  },
  {
    id: "story_4",
    title: "פלטפורמת SaaS עם AI שמניבה $50K חודשיים",
    description: "פיתוח פלטפורמה מלאה עם אלגוריתמים חכמים וממשק משתמש מתקדם",
    results: [
      "הכנסות של $50,000 בחודש",
      "10,000 משתמשים פעילים",
      "שיעור השימוש היומי 85%",
    ],
    client: {
      name: "רונית לוי",
      role: "מייסדת",
      company: "DataFlow Pro",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    },
    project: {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&auto=format",
      demoLink: "#demo-saas",
      category: "פיתוח מלא",
    },
    stats: [
      { metric: "הכנסות חודשיות", value: "$50K" },
      { metric: "משתמשים פעילים", value: "10K" },
    ],
  },
  {
    id: "story_5",
    title: "מערכת ניהול חכמה שחיסכה 40% בעלויות",
    description: "פתרון AI מותאם אישית ליעול תהליכי הניהול והפחתת עלויות תפעול",
    results: [
      "חיסכון של 40% בעלויות התפעול",
      "שיפור של 55% ביעילות הצוות",
      "אוטומציה של כל התהליכים הביורוקרטיים",
    ],
    client: {
      name: "אמיר שלום",
      role: 'מנכ"ל',
      company: "טכנולוגיות המחר",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    },
    project: {
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop&auto=format",
      demoLink: "#demo-management",
      category: "אוטומציות AI",
    },
    stats: [
      { metric: "חיסכון בעלויות", value: "40%" },
      { metric: "יעילות צוות", value: "+55%" },
    ],
  },
  {
    id: "story_6",
    title: "אפליקציה מובילה עם 100K הורדות בחודש הראשון",
    description: "פיתוח אפליקציית מובייל חכמה עם פיצ'רי AI מתקדמים",
    results: [
      "100,000 הורדות בחודש הראשון",
      "דירוג 4.8 כוכבים בחנויות האפליקציות",
      "שיעור החזקה של 75% אחרי 30 יום",
    ],
    client: {
      name: "תמר דוד",
      role: "מנהלת מוצר",
      company: "InnovateTech",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&auto=format",
    },
    project: {
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop&auto=format",
      demoLink: "#demo-mobile",
      category: "פיתוח מובייל",
    },
    stats: [
      { metric: "הורדות חודש ראשון", value: "100K" },
      { metric: "דירוג ממוצע", value: "4.8⭐" },
    ],
  },
];

const SuccessStoryCard = ({ story }: { story: SuccessStory }) => (
  <div className="success-story-card box-border group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 hover:border-gold/60 transition-colors duration-400 shadow-xl hover:shadow-gold/10 h-full flex flex-col">
    {/* Project Image (responsive height) */}
    <div className="relative h-40 sm:h-64 overflow-hidden shrink-0">
      <img
        src={story.project.image}
        alt={story.title}
        className="w-full h-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
      <div className="absolute top-6 right-6">
        <span className="px-4 py-2 bg-tech-blue/95 text-white text-sm font-semibold rounded-full backdrop-blur-md shadow-lg border border-tech-blue/30">
          {story.project.category}
        </span>
      </div>
      <div className="absolute bottom-6 left-6">
        <a
          href={story.project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-tech-blue to-cyan-500 text-dark font-bold rounded-xl hover:from-cyan-500 hover:to-tech-blue transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-tech-blue/30 border border-tech-blue/20"
        >
          <Play size={18} />
          צפה בדמו
        </a>
      </div>
    </div>
    {/* Content */}
    <div className="p-4 sm:p-8 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-3 sm:mb-6">
        <div className="relative shrink-0">
          <img
            src={story.client.image}
            alt={story.client.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gold/40 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-lg mb-1 leading-snug truncate">
            {story.client.name}
          </h4>
          <p className="text-gray-300 text-sm leading-tight truncate">
            {story.client.role}
          </p>
          <p className="text-gold text-sm font-medium leading-tight truncate">
            {story.client.company}
          </p>
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug line-clamp-2 min-h-[3.2rem]">
        {story.title}
      </h3>
      <p className="text-gray-300 text-sm mb-5 leading-relaxed line-clamp-3 min-h-[4.2rem]">
        {story.description}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-6">
        {story.stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-gold/30 transition-colors duration-300 min-h-[88px] flex flex-col justify-center"
          >
            <div className="text-gold font-bold text-xl mb-0.5 leading-none">
              {stat.value}
            </div>
            <div className="text-gray-400 text-xs font-medium leading-tight px-1">
              {stat.metric}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 mt-auto mb-4 min-h-[4.5rem]">
        {story.results.slice(0, 3).map((result, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-xs text-gray-300 hover:text-white transition-colors duration-200"
          >
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-cyan-400 rounded-full flex-shrink-0 mt-1" />
            <span className="leading-relaxed line-clamp-2">{result}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tech-blue via-cyan-400 to-tech-blue opacity-60" />
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const AUTOPLAY_MS = 3000;
  const [uniformHeight, setUniformHeight] = useState<number | null>(null);
  const [heightLocked, setHeightLocked] = useState(false);
  const [computedSlideWidth, setComputedSlideWidth] = useState<string | null>(
    null
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start",
    dragFree: false,
    skipSnaps: false,
    containScroll: "keepSnaps",
  });

  // const recalcSlideWidth = useCallback(() => {
  //   if (!emblaApi) return;
  //   const viewport = emblaApi.rootNode(); // Embla viewport element
  //   if (!viewport) return;
  //   const innerWidth = viewport.clientWidth - 2 * GAP_PX; // subtract horizontal padding (edge gaps)
  //   if (innerWidth <= 0) return;
  //   const width = (innerWidth - (VISIBLE_COUNT - 1) * GAP_PX) / VISIBLE_COUNT; // exact float
  //   if (width > 0) setComputedSlideWidth(`${width}px`); // keep full precision to minimize accumulated leftover
  // }, [emblaApi]);
  // useEffect(() => {
  //   recalcSlideWidth();
  // }, [recalcSlideWidth]);
  // useEffect(() => {
  //   if (!emblaApi) return;
  //   emblaApi.on("reInit", recalcSlideWidth);
  //   const viewport = emblaApi.rootNode();
  //   if (!viewport || typeof ResizeObserver === "undefined") return;
  //   const ro = new ResizeObserver(() => recalcSlideWidth());
  //   ro.observe(viewport);
  //   return () => {
  //     ro.disconnect();
  //   };
  // }, [emblaApi, recalcSlideWidth]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    const id = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [emblaApi, isPlaying]);

  const measure = useCallback(() => {
    const cards = document.querySelectorAll<HTMLElement>(".success-story-card");
    if (!cards.length) return;
    let max = 0;
    cards.forEach((c) => {
      c.style.height = "auto";
      const h = c.offsetHeight;
      if (h > max) max = h;
    });
    if (max && max !== uniformHeight) setUniformHeight(max);
  }, [uniformHeight]);
  useEffect(() => {
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>(".success-story-card img")
    );
    Promise.allSettled(
      imgs.map((img) =>
        img.decode ? img.decode().catch(() => {}) : Promise.resolve()
      )
    ).finally(() => {
      measure();
      setTimeout(measure, 100);
      setTimeout(() => {
        measure();
        setHeightLocked(true);
      }, 400);
    });
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", () => !heightLocked && measure());
  }, [emblaApi, measure, heightLocked]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  return (
    <section
      id="success-stories"
      className="py-32 bg-gradient-to-b from-dark via-slate-900 to-gray-900 text-white overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-tech-blue rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-tech-blue via-cyan-300 to-speedleads-gold bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            סיפורי הצלחה מרשימים
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-tech-blue via-cyan-400 to-speedleads-gold mx-auto mb-8 rounded-full shadow-lg shadow-tech-blue/30" />
          <p
            className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            גלו איך{" "}
            <span className="text-gold font-semibold">SpeedLeads.AI</span> הוביל
            עסקים להצלחות יוצאות דופן עם פתרונות AI מתקדמים
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
              <span className="text-sm">
                {successStories.length} פרויקטים מובילים
              </span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-tech-blue rounded-full animate-pulse"></div>
              <span className="text-sm">תוצאות מוכחות</span>
            </div>
          </div>
        </div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Viewport WITH horizontal padding; track only manages internal gaps */}
          <div
            className="overflow-hidden rounded-3xl mx-4 sm:mx-0"
            ref={emblaRef}
            style={{ direction: "ltr" }}
          >
            <div className="flex items-stretch will-change-transform transform-gpu">
              {successStories.map((story, index) => (
                <div
                  key={story.id}
                  className="embla__slide min-w-0 flex flex-col h-full box-border testimonial-slide"
                  style={{
                    height: uniformHeight || undefined,
                    paddingRight: index < successStories.length - 1 ? GAP_PX : 0
                  }}
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
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/60 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/60 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight size={26} />
          </button>

          <div className="flex justify-center mt-10 gap-3">
            {scrollSnaps.map((_, i) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`h-3 rounded-full transition-all ${
                    active
                      ? "w-10 bg-gradient-to-r from-tech-blue to-cyan-400"
                      : "w-3 bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              );
            })}
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-xl text-gray-300 mb-8">
            מוכנים לכתוב את סיפור ההצלחה הבא שלכם?
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-tech-blue to-cyan-500 hover:from-cyan-500 hover:to-tech-blue text-dark font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ transformOrigin: 'center', transition: 'all 0.3s ease', transform: 'scale(1)' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Rocket className="w-5 h-5 ml-2" />
            בואו נתחיל לעבוד ביחד
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
