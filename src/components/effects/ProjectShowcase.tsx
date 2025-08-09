
import React from 'react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';

const ProjectShowcase = () => {
  const projects = [
    {
      id: 1,
      title: "אתר תדמית מתקדם",
      description: "הפיכת אתר סטטי לאתר דינמי עם AI",
      beforeImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "אוטומציה עסקית",
      description: "ייעול תהליכים ידניים באמצעות AI",
      beforeImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            הפרויקטים שלנו
            <span className="gradient-text"> משנים חיים</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            גלו איך אנחנו הופכים רעיונות לפתרונות דיגיטליים מתקדמים
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="space-y-6"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
              
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                className="h-80"
              />
              
              {/* Project Stats */}
              <motion.div 
                className="flex justify-center space-x-8 space-x-reverse rtl:space-x-reverse"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-tech-blue">+300%</div>
                  <div className="text-sm text-gray-400">שיפור ביצועים</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">-80%</div>
                  <div className="text-sm text-gray-400">זמן טעינה</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-tech-blue">+500%</div>
                  <div className="text-sm text-gray-400">המרות</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
