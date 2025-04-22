
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast'; // Using the existing toast import
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define Zod schema for validation
const contactFormSchema = z.object({
  fullName: z.string().min(1, { message: "שם מלא הוא שדה חובה." }),
  email: z.string().email({ message: "אנא הזן כתובת אימייל תקינה." }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "נושא הוא שדה חובה." }),
  message: z.string().min(10, { message: "ההודעה חייבת להכיל לפחות 10 תווים." })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize react-hook-form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Define the submit handler
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    console.log('Submitting form data:', data); // Log data being sent

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // Attempt to parse JSON regardless of status

      if (response.ok) {
        console.log('Submission successful:', result);
        toast({
          title: "הודעתך נשלחה בהצלחה!",
          description: "תודה שפנית אלינו. נחזור אליך בהקדם האפשרי.",
        });
        form.reset(); // Reset form fields
      } else {
        console.error('Submission failed:', result);
        // Try to show specific validation errors if available
        const errorMessages = result.errors ? Object.values(result.errors).flat().join(', ') : result.message || 'אירעה שגיאה. אנא נסה שוב.';
        toast({
          variant: "destructive",
          title: "שגיאה בשליחת ההודעה",
          description: errorMessages,
        });
      }
    } catch (error) {
      console.error('Network or other error:', error);
      toast({
        variant: "destructive",
        title: "שגיאת רשת",
        description: "לא ניתן היה לשלוח את ההודעה. אנא בדוק את חיבור האינטרנט שלך ונסה שוב.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  const openHours = [
    { days: 'ראשון - חמישי', hours: '8:00 - 19:00' },
    { days: 'שישי', hours: '8:00 - 14:00' },
    { days: 'שבת', hours: 'סגור' }
  ];

  // Removed outer div and Navbar
  return (
    <> {/* Use Fragment */}
        {/* Hero Banner */}
        <div className="bg-garden-dark-green text-white py-12">
          <div className="garden-container text-center">
            <h1 className="text-4xl font-heebo font-bold mb-4">צרו איתנו קשר</h1>
            <p className="text-xl max-w-2xl mx-auto">
              יש לכם שאלה? צריכים עזרה? רוצים לבקר במשתלה? 
              אנחנו כאן לעזור לכם!
            </p>
          </div>
        </div>
        
        {/* Contact Info & Form */}
        <section className="garden-section">
          <div className="garden-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-heebo font-bold text-garden-dark-green mb-6">
                  פרטי יצירת קשר
                </h2>
                
                {/* Contact Cards */}
                <div className="space-y-6">
                  <div className="flex bg-white p-5 rounded-lg shadow-md">
                    <div className="ml-4">
                      <Phone className="h-8 w-8 text-garden-medium-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heebo font-bold text-garden-dark-green mb-1">
                        טלפון
                      </h3>
                      <p className="text-gray-600">
                        <a href="tel:04-1234567" className="garden-link">
                          04-1234567
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex bg-white p-5 rounded-lg shadow-md">
                    <div className="ml-4">
                      <Mail className="h-8 w-8 text-garden-medium-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heebo font-bold text-garden-dark-green mb-1">
                        מייל
                      </h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@laganvelaganan.co.il" className="garden-link">
                          info@laganvelaganan.co.il
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex bg-white p-5 rounded-lg shadow-md">
                    <div className="ml-4">
                      <MapPin className="h-8 w-8 text-garden-medium-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heebo font-bold text-garden-dark-green mb-1">
                        כתובת
                      </h3>
                      <p className="text-gray-600">
                        רחוב הפרחים 123, מושב הגנים, ישראל
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex bg-white p-5 rounded-lg shadow-md">
                    <div className="ml-4">
                      <Clock className="h-8 w-8 text-garden-medium-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heebo font-bold text-garden-dark-green mb-1">
                        שעות פתיחה
                      </h3>
                      <div className="text-gray-600">
                        {openHours.map((item) => ( // Removed index from map parameters
                          <div key={item.days} className="flex justify-between max-w-xs"> {/* Use item.days as key */}
                            <span>{item.days}:</span>
                            <span>{item.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Google Maps Embed */}
                <div className="mt-8">
                  <h2 className="text-2xl font-heebo font-bold text-garden-dark-green mb-4">
                    המיקום שלנו
                  </h2>
                  
                  <div className="rounded-lg overflow-hidden shadow-md h-64 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-600 text-center p-4">
                      כאן יוצג מפת גוגל עם המיקום של המשתלה
                      <br />
                      <span className="text-sm">(בגרסה האמיתית של האתר)</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-heebo font-bold text-garden-dark-green mb-6">
                  שלחו לנו הודעה
                </h2>
                {/* Refactored Form using react-hook-form and Shadcn UI */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-garden-dark-green">שם מלא *</FormLabel>
                            <FormControl>
                              <Input placeholder="השם שלך" {...field} className="border-garden-light-green focus:ring-garden-medium-green" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-garden-dark-green">אימייל *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} className="border-garden-light-green focus:ring-garden-medium-green" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-garden-dark-green">טלפון</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="מספר טלפון (אופציונלי)" {...field} className="border-garden-light-green focus:ring-garden-medium-green" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-garden-dark-green">נושא *</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-garden-light-green focus:ring-garden-medium-green">
                                  <SelectValue placeholder="בחרו נושא" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="שאלה כללית">שאלה כללית</SelectItem>
                                <SelectItem value="ייעוץ מקצועי">ייעוץ מקצועי</SelectItem>
                                <SelectItem value="בדיקת מלאי">בדיקת מלאי</SelectItem>
                                <SelectItem value="תלונה">תלונה</SelectItem>
                                <SelectItem value="אחר">אחר</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-garden-dark-green">הודעה *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="כתבו את הודעתכם כאן..."
                              rows={5}
                              className="resize-none border-garden-light-green focus:ring-garden-medium-green"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="garden-button w-full" // Use existing button style if desired, or default Button style
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"> {/* Added aria-hidden for decorative SVG */}
                            <title>טוען...</title> {/* Added accessible title */}
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /> {/* Self-closing */}
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /> {/* Self-closing */}
                          </svg>
                          שולח...
                        </>
                      ) : (
                        <>
                          <Send className="ml-2 h-5 w-5" />
                          שליחת הודעה
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="garden-section bg-garden-light-green/20">
          <div className="garden-container">
            <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
              שאלות נפוצות
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-3">
                  האם אתם מציעים משלוחים?
                </h3>
                <p className="text-gray-600">
                  כן, אנו מציעים שירות משלוחים לאזור הקרוב למשתלה. עלות המשלוח תלויה במרחק ובנפח ההזמנה. צרו איתנו קשר לקבלת פרטים.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-3">
                  האם ניתן להזמין צמחים מיוחדים?
                </h3>
                <p className="text-gray-600">
                  בהחלט! אם אתם מחפשים צמח ספציפי שאינו נמצא במלאי שלנו, נשמח לנסות להשיג אותו עבורכם. פשוט צרו איתנו קשר עם הפרטים.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-3">
                  האם אתם מציעים שירותי תכנון גינה?
                </h3>
                <p className="text-gray-600">
                  כן, דנה, מתכננת הגינות שלנו, מציעה שירותי תכנון וייעוץ. ניתן לקבוע פגישת ייעוץ במשתלה או בביתכם (בתשלום נוסף).
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-3">
                  האם יש אחריות על הצמחים?
                </h3>
                <p className="text-gray-600">
                  אנו מציעים אחריות של 14 יום על רוב הצמחים שלנו, בתנאי שטופלו לפי ההנחיות. צמחים עונתיים וצמחים רגישים במיוחד עשויים להיות ללא אחריות.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="garden-section bg-garden-cream text-center">
          <div className="garden-container max-w-3xl">
            <h2 className="text-2xl font-heebo font-bold text-garden-dark-green mb-4">
              בחנות שלנו תמיד מחכים לכם, עם כוס קפה ועוגיות
            </h2>
            <p className="text-gray-600 mb-6">
              אנחנו מאמינים בקשר אישי ומזמינים אתכם לבקר במשתלה, להתרשם מהצמחים, ולשוחח עם הצוות המקצועי שלנו. אין תחליף למפגש פנים מול פנים!
            </p>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1524207874394-5ec7c8c8fea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="המשתלה שלנו" 
                className="rounded-lg shadow-lg max-h-96 object-cover"
              />
            </div>
          </div>
        </section>
      {/* Removed main closing tag and Footer */}
    </> // Close Fragment
  );
};

export default Contact;
