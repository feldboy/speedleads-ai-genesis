import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SpotlightCard from '@/components/effects/SpotlightCard';

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
      toast({
        title: 'הפנייה נשלחה בהצלחה!',
        description: 'אנחנו ניצור איתך קשר בהקדם.',
      });

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

  const fieldClass = 'input-lux w-full min-h-[46px] px-3.5 py-3 text-sm';
  const labelClass = 'block text-xs font-tech tracking-[0.12em] text-ivory/50 mb-2';

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="section-index text-champagne">06 / 06</span>
            <span className="h-px w-12 bg-champagne/40" />
            <span className="eyebrow text-ivory/50">Contact</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-he display-lg text-ivory mb-6"
          >
            העסק שלך מוכן <br />
            <span className="serif-lux gradient-text">לעבוד 24/7?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-ivory/55 max-w-2xl mx-auto"
          >
            מלאו את הפרטים ונחזור אליכם בהקדם לשיחת ייעוץ ללא התחייבות.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            <SpotlightCard corners className="p-7 sm:p-9 w-full rounded">
              <form onSubmit={handleSubmit} className="flex flex-col h-full relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>שם מלא *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="השם המלא שלך"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>שם החברה</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="שם החברה או העסק"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>אימייל *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="האימייל שלך"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>טלפון *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="מספר הטלפון שלך"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="interest" className={labelClass}>במה אתם מתעניינים?</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    <option value="general">ייעוץ כללי</option>
                    <option value="website">בניית אתר</option>
                    <option value="landing">דף נחיתה</option>
                    <option value="ecommerce">חנות אונליין</option>
                    <option value="ai">אינטגרציות AI</option>
                    <option value="automations">אוטומציות עסקיות</option>
                  </select>
                </div>

                <div className="mb-7">
                  <label htmlFor="message" className={labelClass}>הודעה</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClass} resize-none`}
                    placeholder="ספרו לנו קצת על הפרויקט שלכם"
                    rows={4}
                  />
                </div>

                <div className="flex-grow" />

                <button
                  id="submit_contact_form_button"
                  type="submit"
                  className="btn-lux w-full min-h-[48px] py-3.5 text-sm tracking-wide disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      שולח...
                    </>
                  ) : 'שלחו פנייה ←'}
                </button>

                <p className="text-xs text-ivory/35 mt-4 text-center font-tech tracking-wider">
                  * שדות חובה · מענה תוך יום עסקים
                </p>
              </form>
            </SpotlightCard>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            <SpotlightCard className="p-7 sm:p-9 w-full flex flex-col rounded">
              <h3 className="heading-he text-ivory mb-8" style={{ fontSize: '1.5rem' }}>
                דרכי התקשרות נוספות
              </h3>

              <div className="space-y-6 relative z-10">
                {[
                  { icon: Phone, label: 'טלפון', value: '03-1234567', dir: 'ltr' as const },
                  { icon: Mail, label: 'אימייל', value: 'info@speedleads-ai.com', dir: 'ltr' as const },
                  { icon: MapPin, label: 'כתובת', value: 'רחוב הטכנולוגיה 1, תל אביב', dir: 'rtl' as const },
                ].map(({ icon: Icon, label, value, dir }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-11 h-11 border border-champagne/25 flex items-center justify-center shrink-0" style={{ borderRadius: '2px' }}>
                      <Icon className="w-5 h-5 text-tech-blue" />
                    </div>
                    <div>
                      <div className="text-xs font-tech tracking-[0.14em] text-ivory/40 mb-0.5">{label}</div>
                      <div className="text-ivory/85 text-sm" dir={dir}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-9 mb-9 relative z-10">
                <div className="w-full h-44 overflow-hidden border border-ivory/10" style={{ borderRadius: '2px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.0772851683395!2d34.78177641543686!3d32.07530518116768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0x4e4b5e5e5e5e5e5e!2sTel%20Aviv-Yafo%2C%20Israel!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(0.92) hue-rotate(190deg) saturate(0.4) brightness(0.9)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="מיקום משרדי SpeedLeads AI"
                  />
                </div>
              </div>

              <div className="mt-auto relative z-10">
                <div className="eyebrow text-champagne mb-4">Hours</div>
                <div className="grid grid-cols-2 gap-y-2 text-sm border-t border-ivory/10 pt-4">
                  <div className="text-ivory/50">ראשון – חמישי</div>
                  <div className="text-ivory/85 font-tech text-left" dir="ltr">09:00 – 18:00</div>
                  <div className="text-ivory/50">שישי</div>
                  <div className="text-ivory/85 font-tech text-left" dir="ltr">09:00 – 13:00</div>
                  <div className="text-ivory/50">שבת</div>
                  <div className="text-ivory/85 text-left">סגור</div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
