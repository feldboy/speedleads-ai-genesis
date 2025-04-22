
import React, { useState } from 'react';
// Removed Navbar and Footer imports
import { Search, Calendar, User, Tag, ArrowLeft } from 'lucide-react';

interface BlogPostProps {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  imageSrc: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "הכל" },
    { id: "tips", name: "טיפים לגינון" },
    { id: "seasonal", name: "גינון עונתי" },
    { id: "indoor", name: "צמחי בית" },
    { id: "eco", name: "גינון אקולוגי" },
  ];

  const blogPosts: BlogPostProps[] = [
    {
      id: 1,
      title: "איך להכין את הגינה לקיץ הישראלי",
      excerpt: "הקיץ הישראלי יכול להיות אתגר לגינה שלכם. בהדרכה הזו נשתף את הטיפים שלנו להכנת הגינה לחודשים החמים.",
      content: "תוכן מלא של הפוסט...",
      date: "1 ביוני, 2025",
      author: "גלית ישראלי",
      category: "seasonal",
      tags: ["קיץ", "השקיה", "צמחים עמידים לחום"],
      imageSrc: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 2,
      title: "גידול ירקות בגינה ביתית: מדריך למתחילים",
      excerpt: "ללמוד לגדל את הירקות שלכם בבית היא חוויה מספקת ומהנה. אספנו עבורכם את כל המידע שתצטרכו כדי להתחיל.",
      content: "תוכן מלא של הפוסט...",
      date: "15 מאי, 2025",
      author: "רועי כהן",
      category: "tips",
      tags: ["ירקות", "גינה אורגנית", "גידול עצמי"],
      imageSrc: "https://images.unsplash.com/photo-1596371008881-42d807c9fe8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1051&q=80"
    },
    {
      id: 3,
      title: "5 צמחי בית שקשה להרוג",
      excerpt: "חדשים בגידול צמחים? הנה 5 צמחי בית עמידים במיוחד שיצליחו לשרוד גם אם שכחתם מדי פעם להשקות.",
      content: "תוכן מלא של הפוסט...",
      date: "30 אפריל, 2025",
      author: "גלית ישראלי",
      category: "indoor",
      tags: ["צמחי בית", "טיפול קל", "מתחילים"],
      imageSrc: "https://images.unsplash.com/photo-1545165375-8be344615cd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 4,
      title: "הדברה טבעית: להיפטר ממזיקים ללא כימיקלים",
      excerpt: "דרכים טבעיות ובטוחות להתמודד עם מזיקים שונים בגינה, תוך שמירה על הסביבה ועל בריאות המשפחה.",
      content: "תוכן מלא של הפוסט...",
      date: "10 אפריל, 2025",
      author: "רועי כהן",
      category: "eco",
      tags: ["הדברה טבעית", "מזיקים", "גינון אקולוגי"],
      imageSrc: "https://images.unsplash.com/photo-1538358519265-586278a34106?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 5,
      title: "יצירת גינת פרפרים: מדריך למשיכת פרפרים לגינה",
      excerpt: "גינת פרפרים לא רק יפה, אלא גם תורמת לשימור המגוון הביולוגי. למדו איך למשוך פרפרים ודבורים לגינה שלכם.",
      content: "תוכן מלא של הפוסט...",
      date: "20 מרץ, 2025",
      author: "גלית ישראלי",
      category: "eco",
      tags: ["פרפרים", "גינה אקולוגית", "צמחים מושכי פרפרים"],
      imageSrc: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 6,
      title: "צמחי גינה שעובדים מצוין גם בעציץ",
      excerpt: "אין לכם גינה? לא נורא! הנה רשימה של צמחי גינה שגדלים נהדר גם בעציצים, מושלם למרפסות ולמרחבים קטנים.",
      content: "תוכן מלא של הפוסט...",
      date: "5 מרץ, 2025",
      author: "רועי כהן",
      category: "tips",
      tags: ["עציצים", "גינון במרפסת", "חסכון במקום"],
      imageSrc: "https://images.unsplash.com/photo-1534710961216-75c88202f43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1051&q=80"
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    return (
      (activeCategory === "all" || post.category === activeCategory) &&
      (searchQuery === "" || 
       post.title.includes(searchQuery) || 
       post.excerpt.includes(searchQuery) ||
       post.tags.some(tag => tag.includes(searchQuery)))
    );
  });

  // Removed outer div and Navbar
  return (
    <> {/* Use Fragment */}
        {/* Hero Banner */}
        <div className="bg-garden-dark-green text-white py-12">
          <div className="garden-container text-center">
            <h1 className="text-4xl font-heebo font-bold mb-4">טיפים לגינון</h1>
            <p className="text-xl max-w-2xl mx-auto">
              הבלוג שלנו מלא בטיפים, מדריכים ורעיונות לגינון מוצלח. 
              כל המאמרים נכתבים על ידי הצוות המקצועי של לגן ולגנן.
            </p>
          </div>
        </div>
        
        {/* Filter and Search */}
        <div className="bg-garden-cream py-6">
          <div className="garden-container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeCategory === category.id
                        ? "bg-garden-dark-green text-white"
                        : "bg-white text-garden-dark-green hover:bg-garden-light-green"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="חיפוש מאמרים..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-garden-light-green focus:outline-none focus:ring-2 focus:ring-garden-medium-green"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-garden-medium-green h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <section className="garden-section">
          <div className="garden-container">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-heebo font-bold text-garden-dark-green mb-2">לא נמצאו מאמרים</h3>
                <p className="text-gray-600">
                  לא נמצאו מאמרים התואמים את החיפוש שלך. נסו לשנות את הקטגוריה או את מילות החיפוש.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="garden-card hover:shadow-lg overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.imageSrc} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-garden-medium-green text-sm mb-3">
                        <Calendar className="h-4 w-4 ml-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 ml-1" />
                        <span>{post.author}</span>
                      </div>
                      
                      <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center text-xs bg-garden-light-green/30 text-garden-dark-green px-2 py-1 rounded-full"
                          >
                            <Tag className="h-3 w-3 ml-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="flex items-center text-garden-dark-green hover:text-garden-medium-green font-medium transition-colors">
                        המשך קריאה
                        <ArrowLeft className="h-4 w-4 mr-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="garden-section bg-garden-light-green/20">
          <div className="garden-container max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-heebo font-bold text-garden-dark-green mb-4">
              הצטרפו לניוזלטר שלנו
            </h2>
            <p className="text-gray-600 mb-6">
              קבלו טיפים, מבצעים והודעות על מאמרים חדשים ישירות לתיבת הדואר שלכם.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="הזינו את כתובת המייל שלכם" 
                className="flex-grow px-4 py-2 rounded-md border border-garden-light-green focus:outline-none focus:ring-2 focus:ring-garden-medium-green"
              />
              <button className="garden-button whitespace-nowrap">
                הרשמה לניוזלטר
              </button>
            </div>
          </div>
        </section>
      {/* Removed main closing tag and Footer */}
    </> // Close Fragment
  );
};

export default Blog;
