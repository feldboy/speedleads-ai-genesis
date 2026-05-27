
# Rebranding מלא ל-SpeedLeads.AI

המטרה: שדרוג חזותי וטיפוגרפי בכל האתר, עם שמירה על פלטת הצבעים הנוכחית (כחול-טכנולוגי #00F6FF, זהב #B08D57, נייבי כהה #0D1B2A) והוספת שפה ויזואלית אסימטרית, מודרנית ועדכנית בהשראת אתרי Awwwards.

## עקרונות חזותיים

- **טיפוגרפיה**: Space Grotesk לכותרות (display חד וגיאומטרי), DM Sans לטקסט גוף (קריא ונקי). שימוש דרמטי בקנה מידה — כותרות ענקיות (clamp עד 8rem) לצד מיקרו-טקסט.
- **לייאאוט אסימטרי**: חלוקות 60/40, גרידים שבורים, אלמנטים חופפים, שימוש נדיב במרחב לבן/כהה בצד אחד וצפיפות בצד השני.
- **צבעוניות**: שמירה על אותם tokens — נייבי כעיגון, ציאן ככוח, זהב כפרימיום. הוספת gradient stops עדינים יותר ושימוש מודע יותר בניגודיות.
- **פרטים**: גבולות דקיקים (1px), פינות חדות יותר (radius קטן), shadows ממוקדים, רעש/grain עדין, מספור סקציות בפורמט "01 / 04".

## עבודה לפי קבצים

### 1. בסיס עיצובי
- **`src/index.css`**: החלפת import של Assistant/Heebo ב-Space Grotesk + DM Sans. עדכון `--radius` ל-`0.25rem`. הוספת gradient ו-shadow tokens חדשים (`--gradient-hero`, `--gradient-gold`, `--shadow-elegant`). הוספת utility classes ל-display headlines, section numbers, ו-asymmetric grid.
- **`tailwind.config.ts`**: שינוי `fontFamily.sans` ל-DM Sans ו-`fontFamily.heading` ל-Space Grotesk. הוספת `fontFamily.display`. הוספת keyframes חדשים (marquee, reveal-up).

### 2. סקציות שיעברו redesign אסימטרי
- **`src/components/sections/HeroSection.tsx` + `src/components/hero/HeroContent.tsx`**: פריסה 60/40 חדשה. כותרת ענקית בשמאל/ימין עם eyebrow קטן ומספר סקציה, סאב-טקסט והCTA בעמודה צרה. עדכון הטיפוגרפיה לסגנון display חד.
- **`src/components/sections/ServiceCards.tsx`**: 3 כרטיסים בגדלים לא אחידים (גדול/בינוני/קטן), עם מספור 01/02/03, hover states מעודנים, ושימוש בקווי גריד דקיקים.
- **`src/components/sections/WhySpeedLeadsSection.tsx`**: שמירה על 4 הריבועים עם התמונות אך החלפה ללייאאוט אסימטרי — כותרת ענקית בצד, גריד 2x2 בצד השני.
- **`src/components/sections/TestimonialsSection.tsx`**: ציטוט ענק עם טיפוגרפיה display בולטת, ניווט בין ציטוטים בצורה מינימליסטית.
- **`src/components/sections/FaqSection.tsx`**: כותרת ענקית משמאל, accordions בצד ימין (60/40), קווי הפרדה דקיקים.
- **`src/components/sections/ContactSection.tsx`**: טופס מינימליסטי בעמודה אחת, מידע יצירת קשר ענק בעמודה שנייה.
- **`src/components/sections/VideoSection.tsx`**: עטיפה אסימטרית עם eyebrow + מספר סקציה.
- **`src/components/layout/Header.tsx` + `Footer.tsx`**: עדכון טיפוגרפיה, ניווט נקי יותר, קווים דקיקים במקום צללים.

### 3. רכיבים תומכים
- **`src/components/effects/AnimatedStats.tsx`**: מספרים ענקיים בסגנון display עם labels זעירים.
- **כפתורים**: עדכון variant ראשי לרדיוס חד יותר וטיפוגרפיה uppercase עם letter-spacing.

## בדיקות סיום

- וידוא RTL תקין בכל הסקציות
- בדיקה ש-Space Grotesk תומך בעברית (אם לא — fallback ל-Heebo לטקסט עברי, Space Grotesk רק ל-display באנגלית/SpeedLeads.AI)
- בדיקת responsive במובייל
- וידוא שצבעי המותג נשמרו זהים

## הערה חשובה

Space Grotesk ו-DM Sans לא תומכים מלא בעברית. לכן הפתרון יהיה היברידי: **Space Grotesk לכותרות אנגליות וערכי display**, **Heebo נשמר ככותרות עבריות**, **DM Sans + Assistant לטקסט גוף**. כך נשמרת איכות הקריאה בעברית עם השפה החדשה האנגלית-מודרנית.
