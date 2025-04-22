
import React from 'react';
// Removed Navbar and Footer imports
import { Calendar, Heart, Users, Sprout } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "גלית ישראלי",
      role: "מייסדת ומנהלת",
      bio: "גלית הקימה את המשתלה לפני 20 שנה מתוך אהבה לצמחים ולטבע. מומחית בתכנון גינות וייעוץ מקצועי.",
      imageSrc: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    },
    {
      name: "עמית ישראלי",
      role: "אגרונום",
      bio: "עמית, בנה של גלית, הצטרף למשתלה אחרי לימודי אגרונומיה. מומחה בהדברה ביולוגית וחקלאות אורגנית.",
      imageSrc: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    },
    {
      name: "רועי כהן",
      role: "מומחה צמחי בית",
      bio: "רועי הצטרף למשפחה לפני 10 שנים. אחראי על מחלקת צמחי הבית וכותב רבים מהמאמרים בבלוג שלנו.",
      imageSrc: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    },
    {
      name: "דנה לוי",
      role: "מתכננת גינות",
      bio: "דנה היא אדריכלית נוף שמתמחה בתכנון גינות ומרפסות. מעניקה ייעוץ אישי ללקוחות המשתלה.",
      imageSrc: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    }
  ];

  const milestones = [
    {
      year: 2003,
      title: "פתיחת המשתלה",
      description: "גלית ובעלה רועי פותחים את המשתלה הקטנה בחצר ביתם."
    },
    {
      year: 2008,
      title: "הרחבת המשתלה",
      description: "עקב הביקוש הגדול, המשתלה עוברת למיקומה הנוכחי ומרחיבה את מבחר הצמחים."
    },
    {
      year: 2015,
      title: "הדור השני מצטרף",
      description: "עמית, בנם של גלית ורועי, מצטרף לעסק המשפחתי אחרי לימודי אגרונומיה."
    },
    {
      year: 2018,
      title: "מעבדת שתילים",
      description: "המשתלה פותחת מעבדת שתילים מתקדמת לגידול זנים ייחודיים."
    },
    {
      year: 2022,
      title: "קורסי גינון",
      description: "התחלנו להציע סדנאות וקורסי גינון למתחילים ומתקדמים."
    },
    {
      year: 2025,
      title: "חגיגת 20 שנה",
      description: "אנחנו חוגגים 20 שנות פעילות, עם מגוון הצמחים הגדול ביותר אי פעם!"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-garden-medium-green" />,
      title: "אהבה לצמחים",
      description: "אנחנו מאמינים שכל צמח צריך אהבה וטיפול אישי. נקפיד לגדל את הצמחים בתנאים אופטימליים."
    },
    {
      icon: <Users className="h-8 w-8 text-garden-medium-green" />,
      title: "שירות אישי",
      description: "אנחנו מכירים את הלקוחות שלנו בשם, ונותנים ייעוץ אישי המותאם לצרכים ולתנאים של כל אחד."
    },
    {
      icon: <Sprout className="h-8 w-8 text-garden-medium-green" />,
      title: "איכות בלתי מתפשרת",
      description: "אנחנו מקפידים על איכות גבוהה של צמחים, אדמה וכל המוצרים שאנחנו מציעים."
    },
    {
      icon: <Calendar className="h-8 w-8 text-garden-medium-green" />,
      title: "עונתיות וקיימות",
      description: "אנחנו עובדים בהתאם לעונות השנה ומקדמים גינון בר-קיימא שמכבד את הסביבה."
    }
  ];

  // Removed outer div and Navbar
  return (
    <> {/* Use Fragment */}
        {/* Hero Banner */}
        <div 
          className="relative py-20 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="garden-container relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-heebo font-bold mb-4">
              הסיפור שלנו
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              משתלת לגן ולגנן היא יותר מסתם עסק. זו משפחה שאוהבת את האדמה, 
              את הצמחים, ואת האנשים שחולקים את התשוקה הזו.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="garden-section">
          <div className="garden-container">
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1558867744-7c0cf23bf6dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                  alt="ההיסטוריה שלנו" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-4">
                  איך הכל התחיל
                </h2>
                
                <p className="text-gray-600 mb-4">
                  הסיפור שלנו התחיל לפני למעלה מ-20 שנה, כאשר גלית ורועי ישראלי, זוג צעיר עם חלום ירוק, החליטו להקים משתלה קטנה בחצר ביתם במושב. 
                </p>
                
                <p className="text-gray-600 mb-4">
                  המשתלה הקטנה מהר מאוד התפרסמה הודות לאיכות הצמחים והשירות החם והאישי. עם השנים, המשתלה גדלה והתרחבה למיקומה הנוכחי, אך שמרה על האופי המשפחתי והחם.
                </p>
                
                <p className="text-gray-600">
                  היום, לגן ולגנן היא משתלה מובילה באזור, עם מגוון עשיר של צמחים, כלי גינון וייעוץ מקצועי. הדור השני של המשפחה כבר מעורב בעסק, ואנחנו גאים להמשיך את המסורת של גידול צמחים באהבה.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="garden-section bg-garden-cream py-16">
          <div className="garden-container">
            <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
              הערכים שלנו
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Timeline */}
        <section className="garden-section">
          <div className="garden-container">
            <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
              ציר הזמן שלנו
            </h2>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute right-1/2 top-0 bottom-0 w-0.5 bg-garden-medium-green"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1/2"></div>
                    
                    {/* Circle on Timeline */}
                    <div className="absolute right-1/2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-garden-medium-green border-4 border-white z-10"></div>
                    
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                      <div className="bg-white rounded-lg p-4 shadow-md">
                        <span className="inline-block bg-garden-light-green px-2 py-1 rounded text-garden-dark-green font-bold mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="garden-section bg-garden-light-green/20">
          <div className="garden-container">
            <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
              הצוות שלנו
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="garden-card overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.imageSrc} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-1">
                      {member.name}
                    </h3>
                    <p className="text-garden-medium-green font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="garden-section bg-garden-medium-green text-white py-16">
          <div className="garden-container text-center">
            <h2 className="text-3xl font-heebo font-bold mb-4">
              בואו להכיר אותנו מקרוב
            </h2>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              אנחנו מזמינים אתכם לבקר במשתלה, להכיר את הצוות שלנו, ולחוות את האווירה המיוחדת של לגן ולגנן. הקפה עלינו!
            </p>
            
            <button className="garden-button bg-white text-garden-dark-green hover:bg-garden-cream">
              לשעות הפתיחה והכתובת
            </button>
          </div>
        </section>
      {/* Removed main closing tag and Footer */}
    </> // Close Fragment
  );
};

export default About;
