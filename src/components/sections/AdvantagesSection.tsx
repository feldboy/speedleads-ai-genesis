
import React from 'react';

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AdvantageCard = ({ title, description, icon }: AdvantageCardProps) => (
  <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-2 border-tech-blue">
    <div className="text-tech-blue mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-4 text-dark">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">למה SpeedLeads.AI?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            אנחנו לא רק בונים אתרים ופתרונות דיגיטליים, אנחנו יוצרים חוויות שמובילות להצלחה
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AdvantageCard 
            title="חדשנות טכנולוגית"
            description="אנחנו חיים ונושמים AI. הפתרונות שלנו תמיד בחזית הטכנולוגיה, משתמשים בכלים החדשניים ביותר."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
          />

          <AdvantageCard 
            title="התאמה אישית מלאה"
            description="לא עוד פתרונות 'מדף'. כל פרויקט נתפר בדיוק למידות ולמטרות שלכם, עם תשומת לב לכל פרט."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            }
          />

          <AdvantageCard 
            title="תוצאות מדידות"
            description="ההצלחה שלכם היא ההצלחה שלנו. אנחנו מתמקדים ביצירת פתרונות שמביאים ROI ומאפשרים מדידה מדויקת."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />

          <AdvantageCard 
            title="צוות מומחים"
            description="מאחורי SpeedLeads.AI עומד צוות של מפתחים, מעצבים ואנשי AI מהשורה הראשונה, עם ניסיון עשיר וראייה חדשנית."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>
        
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">למי השירות שלנו מתאים?</h3>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-2/3 md:pr-8">
              <p className="text-lg text-gray-600 mb-6">
                אנחנו עובדים עם <span className="font-bold">עסקים שאפתניים</span>, <span className="font-bold">סטארטאפים פורצי דרך</span>, 
                ו<span className="font-bold">יזמים</span> שרוצים למנף את כוחה של הבינה המלאכותית כדי לצמוח.
              </p>
              <p className="text-lg text-gray-600">
                בין אם אתם בתחילת הדרך או מחפשים את הקפיצה הבאה – אנחנו כאן כדי לבנות אתכם את העתיד.
              </p>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-tech-blue/20 to-gold/20 rounded-full flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full border-2 border-dashed border-tech-blue flex items-center justify-center p-4">
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">מוכנים להתחיל?</h4>
                    <button 
                      id="ideal_client_cta_button"
                      className="mt-2 text-tech-blue font-semibold hover:underline transition-all"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      צרו קשר עכשיו
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
