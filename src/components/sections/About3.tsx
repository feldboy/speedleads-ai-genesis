import { Button } from "@/components/ui/button";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultCompanies = [
  {
    src: "https://www.shadcnblocks.com/images/block/logos/microsoft.svg",
    alt: "Microsoft",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/logos/google.svg",
    alt: "Google",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/logos/amazon.svg",
    alt: "Amazon",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/logos/netflix.svg",
    alt: "Netflix",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/logos/paypal.svg",
    alt: "PayPal",
  },
  {
    src: "https://www.shadcnblocks.com/images/block/logos/slack.svg",
    alt: "Slack",
  },
];

const defaultAchievements = [
  {
    label: "עסקים שעוברים אוטומציה",
    value: "300+",
  },
  {
    label: "תיקי לקוחות מוצלחים",
    value: "1.2M+",
  },
  {
    label: "שיפור בביצועים",
    value: "99%",
  },
  {
    label: "שעות חיסכון בחודש",
    value: "300+",
  },
];

export const About3 = ({
  title = "למה SpeedLeads.AI?",
  description = "פתרונות AI מתקדמים שחוסכים זמן, משפרים דיוק ומאפשרים לכם להתמקד במה שחשוב באמת",
  mainImage = {
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    alt: "פתרונות AI מתקדמים וחדשנות טכנולוגית",
  },
  secondaryImage = {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&auto=format&fit=crop&q=80",
    alt: "עבודת צוות מקצועית וטכנולוגית",
  },
  breakout = {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    alt: "אנליטיקה עסקית וצמיחה מבוססת נתונים",
    title: "התוצאות דוברות בעד עצמן",
    description: "300+ עסקים כבר חוסכים שעות עבודה כל יום בזכות הפתרונות שלנו. בואו נראה איך אנחנו יכולים לעזור גם לכם.",
    buttonText: "בואו נתחיל לעבוד יחד",
    buttonUrl: "#contact",
  },
  companiesTitle = "מובילים בתחום ה-AI",
  companies = defaultCompanies,
  achievementsTitle = "הנתונים שלנו",
  achievementsDescription = "מעל 3 שנים של ניסיון בפיתוח פתרונות AI לעסקים",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header - Improved text alignment and spacing */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Images Grid - Enhanced with better proportions */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 mb-20">
          <div className="lg:col-span-2 group">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="h-80 md:h-96 lg:h-[500px] w-full rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="group">
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="h-80 md:h-96 lg:h-[500px] w-full rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Breakout Section - Enhanced styling */}
        <div className="relative mb-20 grid gap-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-8 lg:p-12 lg:grid-cols-3 shadow-xl border border-blue-100 dark:border-blue-800">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-center lg:text-right">
              {breakout.title}
            </h3>
            <p className="mb-6 text-muted-foreground text-lg leading-relaxed text-center lg:text-right">
              {breakout.description}
            </p>
            <div className="flex justify-center lg:justify-end">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <a href={breakout.buttonUrl}>{breakout.buttonText}</a>
              </Button>
            </div>
          </div>
          <div className="group">
            <img
              src={breakout.src}
              alt={breakout.alt}
              className="h-64 lg:h-80 w-full rounded-xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Features Section - Improved card design and spacing */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">מה מייחד אותנו</h2>
            <p className="text-muted-foreground text-lg">ארבעה עמודי התווך שלנו להצלחה שלכם</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {/* Feature 1 - שירות אישי */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="שירות אישי ושותפות עסקית אמיתית"
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">שירות אישי</h3>
                <h4 className="mb-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
                  שותפות אמיתית והתחייבות
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  אתם מקבלים מנהל פרויקט ייעודי, זמינות גבוהה ותמיכה הרבה אחרי ההשקה. אנחנו השותפים שלכם בכל שלב - מאסטרטגיה ראשונית ועד תחזוקה שוטפת.
                </p>
              </div>
            </div>

            {/* Feature 2 - ניהול מוצר אסטרטגי */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="אנליטיקה ואסטרטגיה מבוססת נתונים"
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">ניהול מוצר אסטרטגי</h3>
                <h4 className="mb-4 text-lg font-semibold text-purple-600 dark:text-purple-400">
                  אסטרטגיה ברורה, תוצאות מדידות
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  אנחנו מגדירים את המוצר שלכם יחד, בונים MVP מהיר ומניעים צמיחה דרך איטרציות מבוססות נתונים. עם מדדי הצלחה ברורים, תמיד תדעו מה הסטטוס וה-ROI של הפרויקט.
                </p>
              </div>
            </div>

            {/* Feature 3 - איכות וביצועים */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="תשתית יציבה ובטוחה לביצועים מיטביים"
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">איכות וביצועים</h3>
                <h4 className="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">
                  יציב, מאובטח ומהיר
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  אנחנו בונים לפי הסטנדרטים הגבוהים ביותר עם בדיקות אוטומטיות, פרוטוקולי אבטחה מקיפים וזמני טעינה מהירים מותאמים להצלחה ב-SEO.
                </p>
              </div>
            </div>

            {/* Feature 4 - שקיפות מלאה */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="שקיפות מלאה ובקרה על הפרויקט"
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">שקיפות מלאה</h3>
                <h4 className="mb-4 text-lg font-semibold text-orange-600 dark:text-orange-400">
                  אתם תמיד על ההגה
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  מקבלים גישה מלאה לקוד המקור, תשתית ודוחות התקדמות. אנחנו שומרים אתכם על ההגה עם מידע מלא ותהליכי החלטה שקופים.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Section - Enhanced styling */}
        <div className="mb-20 text-center">
          <h3 className="mb-8 text-lg font-semibold text-muted-foreground uppercase tracking-wider">
            {companiesTitle}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60 hover:opacity-80 transition-opacity duration-300">
            {companies.map((company, index) => (
              <img
                key={index}
                src={company.src}
                alt={company.alt}
                className="h-8 lg:h-12 max-w-28 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        {/* Achievements - Better alignment and spacing */}
        <div className="mb-16 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            {achievementsTitle}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {achievementsDescription}
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <dd className="text-3xl lg:text-4xl font-bold leading-9 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {achievement.value}
                </dd>
                <dt className="mt-2 text-base leading-7 text-muted-foreground">
                  {achievement.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA Button - Enhanced positioning and styling */}
        <div className="text-center">
          <Button
            size="lg"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 border-0"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            בואו נתחיל לעבוד יחד
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};