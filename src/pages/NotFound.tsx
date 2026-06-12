import { useLocation, Link } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";

const NeuralField = lazy(() => import('@/components/effects/NeuralField'));

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={null}>
        <NeuralField />
      </Suspense>
      <div dir="rtl" lang="he" className="theme-obsidian min-h-screen flex items-center justify-center relative z-[1] bg-transparent">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-tech gradient-text leading-none mb-6"
            style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', fontWeight: 600, letterSpacing: '-0.05em' }}
            dir="ltr"
          >
            404
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-ivory/60 text-lg mb-3"
          >
            הדף הזה עוד לא אוטומטי. בעצם — הוא לא קיים.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="eyebrow text-ivory/30 mb-10"
          >
            Page not found
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="btn-lux px-9 py-4 text-sm tracking-wider inline-flex" id="notfound_home_link">
              חזרה לדף הבית ←
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
