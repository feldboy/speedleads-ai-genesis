
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCategory from '@/components/ProductCategory';
import FeaturedTip from '@/components/FeaturedTip';
import TestimonialCard from '@/components/TestimonialCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const categories = [
    {
      title: "צמחי בית",
      description: "צמחים מטהרי אוויר, צמחים פורחים וצמחים ירוקים לבית ולמשרד.",
      imageSrc: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      link: "/catalog"
    },
    {
      title: "צמחי גינה",
      description: "כל מה שתצטרכו לגינה פורחת ומלבלבת, כולל עונתיים, שיחים ועצים.",
      imageSrc: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      link: "/catalog"
    },
    {
      title: "תבלינים וירקות",
      description: "גדלו את המזון שלכם בעצמכם עם מבחר תבלינים טריים וירקות עונתיים.",
      imageSrc: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1051&q=80",
      link: "/catalog"
    },
    {
      title: "אדמה ודישון",
      description: "מצעי גידול, תערובות ייחודיות, חיפויים, דשנים וחומרי הדברה ירוקים.",
      imageSrc: "https://images.unsplash.com/photo-1577639673047-f3ea5c0456bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      link: "/catalog"
    }
  ];

  const testimonials = [
    {
      name: "רונית כהן",
      text: "כבר שנים שאני קונה את הצמחים שלי במשתלת 'לגן ולגנן'. האיכות מעולה והצוות תמיד שמח לייעץ. המקום הפך לביקור שבועי קבוע בשבילי.",
      location: "רמת גן"
    },
    {
      name: "דני לוי",
      text: "גיליתי את המשתלה לפני שנה כשקניתי בית חדש. הצוות עזר לי לתכנן את הגינה מאפס, והתוצאה מדהימה! בכל פעם שאני צריך משהו, אני חוזר אליהם.",
      location: "הרצליה"
    },
    {
      name: "מיכל אברהם",
      text: "האווירה במשתלה פשוט קסומה. הצוות מקצועי, הצמחים איכותיים והמחירים הוגנים. יש סיבה שהם הפכו למוסד באזור!",
      location: "כפר סבא"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Categories Section */}
        <section className="garden-section">
          <div className="garden-container">
            <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
              במה אנחנו מתמחים
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <ProductCategory 
                  key={index}
                  title={category.title}
                  description={category.description}
                  imageSrc={category.imageSrc}
                  link={category.link}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="garden-section bg-garden-cream py-16">
          <div className="garden-container">
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                  alt="המשפחה שלנו במשתלה" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-4">
                  המשפחה שלנו
                </h2>
                
                <p className="text-gray-600 mb-4">
                  כבר למעלה מ-20 שנה שמשפחת ישראלי מגדלת ומטפחת את משתלת "לגן ולגנן". התחלנו כחלום קטן ביישוב הכפרי שלנו, וצמחנו להיות המשתלה האהובה באזור.
                </p>
                
                <p className="text-gray-600 mb-6">
                  אנחנו מאמינים שכל צמח, כמו כל אדם, צריך אהבה וטיפול אישי. לכן אנחנו מגדלים את הצמחים שלנו בקפידה, ומעניקים ייעוץ אישי לכל לקוח.
                </p>
                
                <Link to="/about" className="garden-button">
                  קראו עוד עלינו
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tip */}
        <section className="garden-section">
          <div className="garden-container">
            <FeaturedTip 
              title="איך להכין את הגינה לקיץ הישראלי"
              excerpt="הקיץ הישראלי יכול להיות אתגר לגינה שלכם. בהדרכה הזו נשתף את הטיפים שלנו להכנת הגינה לחודשים החמים, כולל בחירת צמחים עמידים לחום, טכניקות השקיה חסכוניות, ורעיונות להצללה טבעית."
              date="1 ביוני, 2025"
              imageSrc="https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
              link="/blog"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="garden-section bg-garden-light-green/10">
          <div className="garden-container">
            <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
              מה הלקוחות שלנו אומרים
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  text={testimonial.text}
                  location={testimonial.location}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
