import React, { useState, useEffect } from 'react';

// Helper function to determine the season based on the month (0-indexed)
const getSeason = (month: number): 'spring' | 'summer' | 'fall' | 'winter' => {
  if (month >= 2 && month <= 4) return 'spring'; // March, April, May
  if (month >= 5 && month <= 7) return 'summer'; // June, July, August
  if (month >= 8 && month <= 10) return 'fall';   // September, October, November
  return 'winter'; // December, January, February
};

// Define tips and styles for each season
const seasonalTipsData = {
  spring: {
    title: "טיפים לאביב פורח",
    tip: "האביב הוא זמן מצוין לשתול פרחים עונתיים צבעוניים, לדשן את הגינה לקראת הקיץ, ולבדוק את תקינות מערכת ההשקיה.",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-300",
    icon: "🌱", // Example icon
  },
  summer: {
    title: "טיפים לקיץ חם",
    tip: "הקפידו על השקיה סדירה ועמוקה בשעות הבוקר המוקדמות או הערב. הגנו על צמחים רגישים מפני שמש ישירה וחזקה באמצעות רשת צל.",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-300",
    icon: "☀️", // Example icon
  },
  fall: {
    title: "טיפים לסתיו נעים",
    tip: "זה הזמן המושלם לשתול פקעות ובצלים שיפרחו באביב. אספו עלים יבשים ליצירת קומפוסט עשיר והכינו את הגינה לחורף.",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
    borderColor: "border-orange-300",
    icon: "🍂", // Example icon
  },
  winter: {
    title: "טיפים לחורף גשום",
    tip: "הגנו על צמחים עדינים מפני קור ורוחות. זהו זמן טוב לגיזום עצים ושיחים נשירים, ולתכנון השינויים בגינה לשנה הבאה.",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-300",
    icon: "❄️", // Example icon
  },
};

const SeasonalTip: React.FC = () => {
  // State to hold the current season, default to spring
  const [currentSeason, setCurrentSeason] = useState<'spring' | 'summer' | 'fall' | 'winter'>('spring');

  // Effect to set the season based on the current date when the component mounts
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setCurrentSeason(getSeason(currentMonth));
  }, []);

  // Get the data for the current season
  const { title, tip, bgColor, textColor, borderColor, icon } = seasonalTipsData[currentSeason];

  return (
    // Using garden-section for consistency if defined globally, otherwise adjust as needed
    <section className="garden-section"> 
      <div className="garden-container"> {/* Assuming garden-container provides padding/max-width */}
        <div className={`p-6 rounded-lg border-l-4 ${borderColor} ${bgColor} shadow-md flex items-start gap-4`}>
          <span className="text-3xl mt-1">{icon}</span>
          <div>
            <h3 className={`text-2xl font-heebo font-semibold mb-2 ${textColor}`}>
              {title}
            </h3>
            <p className={`${textColor} text-base`}>
              {tip}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalTip;
