
import React from 'react';
import { motion } from 'framer-motion';

const ProductShowcaseSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-dark via-gray-900 to-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-blue/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">טכנולוגיות מתקדמות</span>
            <br />
            במציאות דיגיטלית
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            חוויה אינטראקטיבית של המוצרים והפתרונות הטכנולוגיים שלנו – 
            מפיתוח אפליקציות מובייל ועד פתרונות תוכנה מתקדמים
          </motion.p>
        </motion.div>
      </div>

      {/* Responsive Full Width Video Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
        className="-mx-0 md:-mx-10 lg:-mx-28"
      >
        <div className="w-full">
          <div className="relative w-full aspect-video rounded-none md:rounded-2xl overflow-hidden shadow-glow-blue bg-gradient-to-br from-gray-50 to-white border border-white/50">
            <video
              src="/lovable-uploads/2K.webm"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/placeholder.svg"
              aria-label="Showcase video of products and technology"
            />
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto relative z-10">
        {/* Features grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              title: 'אינטראקטיביות מתקדמת',
              description: 'חוויות משתמש אינטואיטיביות ומותאמות אישית',
              icon: '🚀'
            },
            {
              title: 'עיצוב מקצועי',
              description: 'ממשקים מודרניים ומרשימים ויזואלית',
              icon: '🎨'
            },
            {
              title: 'ביצועים מעולים',
              description: 'אופטימיזציה מלאה לכל הפלטפורמות',
              icon: '⚡'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;

