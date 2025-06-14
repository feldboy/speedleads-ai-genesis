
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EnhancedParticles from '@/components/effects/EnhancedParticles';
import FluidBackground from '@/components/effects/FluidBackground';
import TypewriterText from '@/components/effects/TypewriterText';
import AnimatedCode from '@/components/effects/AnimatedCode';
import MagneticButton from '@/components/effects/MagneticButton';

const HeroSection = () => {
  const aiTexts = [
    "בינה מלאכותית מתקדמת",
    "אוטומציות חכמות",
    "פתרונות דיגיטליים",
    "חדשנות טכנולוגית"
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-gray-900 to-dark overflow-hidden">
      {/* Enhanced Background Effects */}
      <FluidBackground />
      <EnhancedParticles />
      
      {/* Additional Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue rounded-full opacity-10 filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-3/4 left-3/4 w-96 h-96 bg-gold rounded-full opacity-5 filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Morphing Shapes */}
        <motion.div 
          className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-tech-blue/20"
          animate={{
            borderRadius: ["0%", "50%", "0%"],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-right mb-10 lg:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px rgba(0,246,255,0.5)",
                    "0 0 40px rgba(0,246,255,0.8)",
                    "0 0 20px rgba(0,246,255,0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                SpeedLeads.AI:
              </motion.span>
              <br />
              <span className="gradient-text">העתיד של</span>
              <br />
              <TypewriterText 
                texts={aiTexts}
                className="gradient-text"
              />
              <br />
              <motion.span 
                className="text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                כבר כאן
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              פתרונות AI מתקדמים לבניית אתרים, אוטומציות עסקיות ואינטגרציות חכמות – 
              שנועדו להזניק את העסק שלך קדימה.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse rtl:space-x-reverse"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MagneticButton>
                <Button 
                  id="hero_cta_button" 
                  size="lg" 
                  className="bg-gradient-to-r from-tech-blue to-blue-600 hover:from-tech-blue/80 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-tech-blue/25 transition-all duration-300"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  בואו נדבר על הפרויקט שלכם
                </Button>
              </MagneticButton>
              
              <MagneticButton>
                <Button 
                  id="hero_services_button" 
                  size="lg" 
                  variant="outline" 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="border-2 border-white/30 font-semibold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-lg hover:shadow-gold/25 transition-all duration-300"
                >
                  גלו את השירותים שלנו
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                className="relative z-10"
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <AnimatedCode />
              </motion.div>
              
              {/* Enhanced floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gold/30 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              
              <motion.div
                className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-gold to-tech-blue rounded-full"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 20px rgba(0,246,255,0.5)",
                    "0 0 40px rgba(176,141,87,0.8)",
                    "0 0 20px rgba(0,246,255,0.5)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-tech-blue to-gold rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
