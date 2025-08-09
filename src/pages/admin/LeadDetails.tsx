
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, Building, Calendar, MessageSquare, Tag } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';

// Mock lead data (same as in LeadManagement)
const mockLeads = [
  {
    id: '1',
    fullName: 'יעל כהן',
    company: 'טכנולוגיות מתקדמות בע"מ',
    email: 'yael@techadvanced.co.il',
    phone: '054-1234567',
    message: 'מעוניינת בהקמת אתר חדש לחברה שלנו',
    date: '2025-05-10T14:30:00',
    source: 'טופס יצירת קשר',
    status: 'חדש',
    interests: ['בניית אתר', 'תדמית חברה'],
    notes: [
      { id: 1, text: 'שיחה ראשונית נקבעה ליום שלישי', date: '2025-05-11T09:15:00', author: 'מנהל מערכת' }
    ]
  },
  {
    id: '2',
    fullName: 'דניאל לוי',
    company: 'סטארטאפ חדשני',
    email: 'daniel@innovative.co.il',
    phone: '052-9876543',
    message: 'אשמח לשמוע על שירותי האוטומציה העסקית',
    date: '2025-05-10T11:15:00',
    source: 'צ\'אטבוט',
    status: 'נוצר קשר',
    interests: ['אוטומציה עסקית', 'אינטגרציות'],
    notes: [
      { id: 1, text: 'שיחת טלפון ראשונית - מעוניין באוטומציות לתהליך מכירות', date: '2025-05-10T13:30:00', author: 'מנהל מערכת' }
    ]
  }
];

// Extend with more mock data for other IDs

const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  useEffect(() => {
    trackPageView('Admin Lead Details');
    
    // Find the lead in our mock data
    const foundLead = mockLeads.find(l => l.id === id);
    
    // Simulate API call delay
    setTimeout(() => {
      if (foundLead) {
        setLead(foundLead);
        setSelectedStatus(foundLead.status);
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    
    if (lead) {
      // In a real app, this would update the status via an API call
      setLead({ ...lead, status: e.target.value });
    }
  };
  
  const handleAddNote = () => {
    if (newNote.trim() && lead) {
      const newNoteObj = {
        id: (lead.notes.length + 1),
        text: newNote,
        date: new Date().toISOString(),
        author: 'מנהל מערכת'
      };
      
      // In a real app, this would add a note via an API call
      setLead({
        ...lead,
        notes: [...lead.notes, newNoteObj]
      });
      
      setNewNote('');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-tech-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!lead) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">הליד לא נמצא</h2>
        <p className="text-gray-500 mb-6">הליד שחיפשת אינו קיים או שנמחק מהמערכת</p>
        <Button 
          onClick={() => navigate('/admin/leads')}
          className="bg-tech-blue hover:bg-tech-blue/80 text-dark"
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          חזרה לרשימת הלידים
        </Button>
      </div>
    );
  }
  
  const statuses = ['חדש', 'נוצר קשר', 'בטיפול', 'הצעת מחיר נשלחה', 'נסגר - לקוח', 'נסגר - אין עניין', 'לא ניתן להשיג', 'נסגר - לא רלוונטי'];
  
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline"
          onClick={() => navigate('/admin/leads')}
          className="flex items-center"
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          חזרה לרשימת הלידים
        </Button>
        
        <div>
          <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium
            ${lead.status === 'חדש' ? 'bg-yellow-100 text-yellow-800' : 
              lead.status === 'נוצר קשר' ? 'bg-blue-100 text-blue-800' : 
              lead.status === 'בטיפול' ? 'bg-indigo-100 text-indigo-800' :
              lead.status === 'הצעת מחיר נשלחה' ? 'bg-purple-100 text-purple-800' :
              lead.status === 'נסגר - לקוח' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'}`}>
            {lead.status}
          </span>
        </div>
      </div>
      
      {/* Lead details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{lead.fullName}</h1>
                <span className="text-sm font-normal text-gray-500">ID: {lead.id}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">אימייל</p>
                      <p className="font-medium">{lead.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">טלפון</p>
                      <p className="font-medium">{lead.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">חברה</p>
                      <p className="font-medium">{lead.company || 'לא צוין'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">תאריך יצירה</p>
                      <p className="font-medium">{formatDate(lead.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">מקור</p>
                      <p className="font-medium">{lead.source}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Tag className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">תחומי עניין</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {lead.interests?.map((interest: string, i: number) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded-md text-xs font-medium text-gray-700">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">ההודעה המקורית</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p>{lead.message}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">פעולות</h3>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-tech-blue hover:bg-tech-blue/80 text-dark">
                    <Mail className="ml-2 h-4 w-4" />
                    שליחת אימייל
                  </Button>
                  <Button variant="outline">
                    <Phone className="ml-2 h-4 w-4" />
                    יצירת קשר טלפוני
                  </Button>
                  <Button variant="outline">שליחת הצעת מחיר</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>עדכון סטטוס</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>הערות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lead.notes && lead.notes.length > 0 ? (
                    <div className="space-y-4">
                      {lead.notes.map((note: any) => (
                        <div key={note.id} className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm">{note.text}</p>
                          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                            <span>{formatDate(note.date)}</span>
                            <span>{note.author}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-2">אין הערות עדיין</p>
                  )}
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">הוספת הערה חדשה</h4>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="כתוב הערה..."
                    ></textarea>
                    <Button 
                      className="w-full mt-2 bg-tech-blue hover:bg-tech-blue/80 text-dark"
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                    >
                      הוסף הערה
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
