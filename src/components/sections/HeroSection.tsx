import React from 'react';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center bg-hero-pattern bg-cover bg-center bg-fixed overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue rounded-full opacity-10 filter blur-3xl animate-pulse-slow" />
        <div className="absolute top-3/4 left-3/4 w-96 h-96 bg-gold rounded-full opacity-5 filter blur-3xl animate-pulse-slow" />
      </div>
      
      <div className="container mx-auto py-20 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-right mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4" data-aos="fade-up">
              SpeedLeads.AI:
              <br />
              <span className="gradient-text">העתיד של הנוכחות הדיגיטלית שלך</span>
              <br />
              <span className="text-white">כבר כאן</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="100">
              פתרונות AI מתקדמים לבניית אתרים, אוטומציות עסקיות ואינטגרציות חכמות – 
              שנועדו להזניק את העסק שלך קדימה.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse rtl:space-x-reverse" data-aos="fade-up" data-aos-delay="200">
              <Button id="hero_cta_button" size="lg" className="bg-tech-blue hover:bg-tech-blue/80 text-dark font-bold" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                בואו נדבר על הפרויקט שלכם
              </Button>
              <Button id="hero_services_button" size="lg" variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({
              behavior: 'smooth'
            })} className="border-white font-semibold rounded-none text-zinc-50 bg-white/[0.27]">
                גלו את השירותים שלנו
              </Button>
            </div>
          </div>
          <div className="md:w-1/2" data-aos="fade-left" data-aos-delay="300">
            <div className="relative">
              {/* Note: The animate-float class remains on the inner div for now, as it's a different type of animation */}
              <div className="bg-gradient-to-br from-dark to-transparent p-8 rounded-2xl border border-gray-800 animate-float">
                <div className="flex justify-center items-center mb-6">
                  <div className="h-3 w-3 rounded-full bg-red-500 mx-1" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mx-1" />
                  <div className="h-3 w-3 rounded-full bg-green-500 mx-1" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-700 rounded-full w-full" />
                  <div className="h-4 bg-gray-700 rounded-full w-5/6" />
                  <div className="h-4 bg-gray-700 rounded-full w-4/5" />
                  <div className="h-4 bg-tech-blue/30 rounded-full w-2/3" />
                  <div className="mt-6 h-10 bg-tech-blue/20 rounded-md w-1/2 mb-4" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gold/30 rounded-full blur-xl" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl" />
              </div>
              <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-gold to-tech-blue rounded-full opacity-50 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
