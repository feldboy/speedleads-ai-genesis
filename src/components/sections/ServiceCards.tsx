
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ServiceCards = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">השירותים שלנו</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            בחרו את האופציה המתאימה לכם - פיתוח מלא על ידינו או כלים לעבודה עצמאית
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {/* Build for me Card - Light Theme */}
          <Card className="relative overflow-hidden h-96 md:h-[500px] border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-0 h-full relative">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=600&fit=crop)"
                }}
              />
              
              {/* Light Overlay */}
              <div className="absolute inset-0 bg-white/85" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-tech-blue to-blue-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    בנה עבורי
                  </h3>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    הצוות המקצועי שלנו ייקח אחריות מלאה על הפרויקט שלכם - מהרעיון הראשוני ועד להשקה. 
                    פיתוח מותאם אישית עם ליווי צמוד לאורך כל הדרך.
                  </p>
                  
                  <ul className="text-right text-gray-600 space-y-2 mb-8">
                    <li className="flex items-center justify-end">
                      <span>פיתוח מותאם אישית</span>
                      <div className="w-2 h-2 bg-tech-blue rounded-full mr-3"></div>
                    </li>
                    <li className="flex items-center justify-end">
                      <span>ליווי מקצועי מלא</span>
                      <div className="w-2 h-2 bg-tech-blue rounded-full mr-3"></div>
                    </li>
                    <li className="flex items-center justify-end">
                      <span>תמיכה לאחר השקה</span>
                      <div className="w-2 h-2 bg-tech-blue rounded-full mr-3"></div>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  id="service_build_for_me"
                  className="w-full bg-gradient-to-r from-tech-blue to-blue-500 hover:from-blue-500 hover:to-tech-blue text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  בואו נתחיל בפרויקט
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Do it yourself Card - Dark Theme */}
          <Card className="relative overflow-hidden h-96 md:h-[500px] border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-0 h-full relative">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop)"
                }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gray-900/85" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    עשה זאת בעצמך
                  </h3>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    קבלו גישה לכלים המתקדמים שלנו ופלטפורמות בנייה אינטואיטיביות. 
                    צרו בעצמכם פתרונות דיגיטליים מתקדמים עם הכוונה וליווי מרחוק.
                  </p>
                  
                  <ul className="text-right text-gray-300 space-y-2 mb-8">
                    <li className="flex items-center justify-end">
                      <span>פלטפורמות עצמאיות</span>
                      <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    </li>
                    <li className="flex items-center justify-end">
                      <span>כלים מתקדמים</span>
                      <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    </li>
                    <li className="flex items-center justify-end">
                      <span>הכוונה מרחוק</span>
                      <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  id="service_diy"
                  className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  גישה לכלים
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
