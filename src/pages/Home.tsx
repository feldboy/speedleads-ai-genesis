import React from 'react';
// Removed Navbar and Footer imports
import Hero from '@/components/home/Hero'; // Updated import path
import SeasonalTip from '@/components/home/SeasonalTip'; // New import
import FeaturedProducts from '@/components/home/FeaturedProducts'; // New import
import About from '@/components/home/About'; // New import
import FeaturedPosts from '@/components/home/FeaturedPosts'; // New import
import Testimonials from '@/components/home/Testimonials'; // New import
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Removed outer div and Navbar
  return (
    <> {/* Use Fragment */}
        {/* Render components in the specified order */}
        <Hero />
        <SeasonalTip />
        <FeaturedProducts />
        <About />
        <FeaturedPosts />
        <Testimonials />

        {/* Keeping the original Call to Action section */}
        <section className="garden-section bg-garden-medium-green text-white py-16">
          <div className="garden-container text-center">
            <h2 className="text-3xl font-heebo font-bold mb-4">
              בואו לבקר אותנו במשתלה
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              אנחנו מזמינים אתכם לבקר במשתלה, להתרשם ממגוון הצמחים והמוצרים, וליהנות מייעוץ מקצועי. צוות המשתלה ישמח לעזור לכם למצוא את הצמחים המושלמים עבורכם.
            </p>
            <Link to="/contact" className="garden-button bg-white text-garden-dark-green hover:bg-garden-cream">
              לשעות הפתיחה והכתובת
            </Link>
          </div>
        </section>
      {/* Removed main closing tag and Footer */}
    </> // Close Fragment
  );
};

export default Home;
