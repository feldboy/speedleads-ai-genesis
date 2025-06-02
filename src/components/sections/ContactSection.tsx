import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    interest: 'general'
  });

  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      toast({
        title: "הפנייה נשלחה בהצלחה!",
        description: "אנחנו ניצור איתך קשר בהקדם.",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        interest: 'general'
      });
      
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">מוכנים לקחת את העסק שלכם לשלב הבא?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            מלאו את הפרטים ונחזור אליכם בהקדם לשיחת ייעוץ ללא התחייבות
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div data-aos="fade-right">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">שם מלא *</label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="השם המלא שלך"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">שם החברה (אופציונלי)</label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="שם החברה או העסק"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">אימייל *</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="האימייל שלך"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">טלפון *</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="מספר הטלפון שלך"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">במה אתה מתעניין?</label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tech-blue focus:border-transparent"
                >
                  <option value="general">ייעוץ כללי</option>
                  <option value="website">בניית אתר</option>
                  <option value="landing">דף נחיתה</option>
                  <option value="ecommerce">חנות אונליין</option>
                  <option value="ai">אינטגרציות AI</option>
                  <option value="automations">אוטומציות עסקיות</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">הודעה</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="ספר לנו קצת על הפרויקט שלך"
                  rows={4}
                />
              </div>
              
              <Button
                id="submit_contact_form_button"
                type="submit"
                className="w-full bg-tech-blue hover:bg-tech-blue/80 text-dark font-bold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <title>Loading Spinner</title>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    שולח...
                  </>
                ) : 'שלח פנייה'}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                * שדות חובה
              </p>
            </form>
          </div>
          
          <div className="bg-dark text-white rounded-lg shadow-lg p-8" data-aos="fade-left">
            <h3 className="text-2xl font-bold mb-6">דרכי התקשרות נוספות</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-tech-blue/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Phone Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">טלפון</h4>
                  <p className="text-gray-300">03-1234567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Email Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">אימייל</h4>
                  <p className="text-gray-300">info@speedleads.ai</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Location Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">כתובת</h4>
                  <p className="text-gray-300">רחוב הטכנולוגיה 1, תל אביב</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-lg font-semibold mb-4">שעות פעילות</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-300">ראשון - חמישי:</div>
                <div className="text-white">9:00 - 18:00</div>
                <div className="text-gray-300">שישי:</div>
                <div className="text-white">9:00 - 13:00</div>
                <div className="text-gray-300">שבת:</div>
                <div className="text-white">סגור</div>
              </div>
            </div>
            {/* Original WhatsApp button block removed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
