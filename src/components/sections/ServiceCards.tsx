import React from "react";
import { Button } from "@/components/ui/button";

// Placeholder images (replace with your own if you want)
// Laptop: Unsplash photo-1488590528505-98d2b5aba04b
// Phone: Unsplash photo-1531297484001-80022131f5a1

const ServiceCards = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-2">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
            השירותים שלנו
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-6" />
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            בחרו את הדרך שהכי מתאימה לכם לבניית הנוכחות הדיגיטלית: פיתוח מלא שלנו, או בעבודה עצמאית בליווי והכוונה.
          </p>
        </div>
        {/* Split layout */}
        <div className="relative flex flex-col md:flex-row items-stretch justify-center max-w-3xl mx-auto gap-8 md:gap-12">
          {/* Left Card */}
          <div
            className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col px-7 py-10 md:py-14 md:px-10 relative overflow-hidden z-10"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center h-full">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-tech-blue shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop"
                  alt="שולחן עבודה עם לפטופ"
                  className="object-cover object-center w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-dark mb-3 text-center">
                בנה עבורי
              </h3>
              <p className="text-gray-600 text-base md:text-lg text-center mb-6">
                פיתוח מלא על ידי הצוות שלנו, עם ליווי אישי <br className="hidden md:block" />
                כל הדרך עד ההשקה והצלחת הפרויקט.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-700 mb-8 text-right w-full max-w-xs mx-auto pr-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-blue rounded-full" />
                  פיתוח מותאם אישית
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-blue rounded-full" />
                  ליווי מקצועי לאורך כל הדרך
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-blue rounded-full" />
                  תמיכה ושירות לאחר ההשקה
                </li>
              </ul>
              <Button
                id="service_build_for_me"
                className="w-full bg-tech-blue hover:bg-gold hover:text-dark text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-auto"
                style={{ fontSize: "1.13rem" }}
              >
                בואו נתחיל בפרויקט
              </Button>
            </div>
          </div>
          {/* Right Card */}
          <div
            className="flex-1 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl border border-gray-100 flex flex-col px-7 py-10 md:py-14 md:px-10 relative overflow-hidden z-10"
            data-aos="fade-right"
          >
            <div className="flex flex-col items-center h-full">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gold shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop"
                  alt="סמארטפון"
                  className="object-cover object-center w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center">
                עשה זאת בעצמך
              </h3>
              <p className="text-gray-200 text-base md:text-lg text-center mb-6">
                קבלו גישה לכל הפלטפורמות והכלים שפותחו על ידינו.<br className="hidden md:block" />
                צרו בעצמכם פתרונות דיגיטליים בליווי מרחוק.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-100 mb-8 text-right w-full max-w-xs mx-auto pr-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  פלטפורמות מתקדמות
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  כלים וטיפים מקצועיים
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  הכוונה אישית אונליין
                </li>
              </ul>
              <Button
                id="service_diy"
                className="w-full bg-gold hover:bg-tech-blue hover:text-dark text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-auto"
                style={{ fontSize: "1.13rem" }}
              >
                גישה לכלים
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
