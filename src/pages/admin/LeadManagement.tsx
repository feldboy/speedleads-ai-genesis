
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';

// Mock lead data
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
  },
  {
    id: '3',
    fullName: 'מיכל אברהם',
    company: '',
    email: 'michal@gmail.com',
    phone: '050-1112233',
    message: 'מחפשת לבנות דף נחיתה לקמפיין שיווקי',
    date: '2025-05-09T16:45:00',
    source: 'וואטסאפ',
    status: 'בטיפול',
  },
  {
    id: '4',
    fullName: 'אלון ברק',
    company: 'חנות אופנה אונליין',
    email: 'alon@fashionstore.co.il',
    phone: '053-4455667',
    message: 'מעוניין בהקמת חנות אונליין לעסק שלי',
    date: '2025-05-09T09:20:00',
    source: 'טופס יצירת קשר',
    status: 'הצעת מחיר נשלחה',
  },
  {
    id: '5',
    fullName: 'שירה נוי',
    company: 'שירה יועצת עסקית',
    email: 'shira@business.co.il',
    phone: '050-7788990',
    message: 'אשמח לדעת עוד על שירותי בניית אתר תדמיתי',
    date: '2025-05-08T13:10:00',
    source: 'טופס יצירת קשר',
    status: 'נסגר - לקוח',
  },
  // Adding more mock data items
  {
    id: '6',
    fullName: 'אורי גולן',
    company: 'מסעדת גורמה',
    email: 'uri@gourmet.co.il',
    phone: '054-6677889',
    message: 'מעוניין באתר הזמנות למסעדה',
    date: '2025-05-08T10:05:00',
    source: 'וואטסאפ',
    status: 'נסגר - אין עניין',
  },
  {
    id: '7',
    fullName: 'נועה שרון',
    company: '',
    email: 'noa@gmail.com',
    phone: '052-3344556',
    message: 'מחפשת מישהו שיבנה לי אתר לפורטפוליו',
    date: '2025-05-07T15:30:00',
    source: 'צ\'אטבוט',
    status: 'לא ניתן להשיג',
  },
  {
    id: '8',
    fullName: 'דן ישראלי',
    company: 'יועץ פיננסי',
    email: 'dan@finance.co.il',
    phone: '050-8877665',
    message: 'מעוניין בשיפור האתר הקיים של העסק',
    date: '2025-05-07T11:45:00',
    source: 'טופס יצירת קשר',
    status: 'חדש',
  }
];

const LeadManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('הכל');
  const [sourceFilter, setSourceFilter] = useState('הכל');
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;
  
  useEffect(() => {
    trackPageView('Admin Lead Management');
  }, []);
  
  const statuses = ['הכל', 'חדש', 'נוצר קשר', 'בטיפול', 'הצעת מחיר נשלחה', 'נסגר - לקוח', 'נסגר - אין עניין', 'לא ניתן להשיג', 'נסגר - לא רלוונטי'];
  const sources = ['הכל', 'טופס יצירת קשר', 'צ\'אטבוט', 'וואטסאפ'];
  
  // Filter and search leads
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === 'הכל' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'הכל' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });
  
  // Pagination logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  
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
  
  const handleViewLead = (id: string) => {
    navigate(`/admin/leads/${id}`);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ניהול לידים</h1>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="חיפוש לפי שם, אימייל, טלפון..."
                className="pl-3 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                {sources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Button className="w-full bg-tech-blue hover:bg-tech-blue/80 text-dark">
                <Filter className="h-4 w-4 ml-2" />
                סנן
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>רשימת לידים</span>
            <span className="text-sm font-normal text-gray-500">סה"כ: {filteredLeads.length} לידים</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-right bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 font-medium text-gray-500">שם</th>
                  <th className="py-3 px-4 font-medium text-gray-500">אימייל</th>
                  <th className="py-3 px-4 font-medium text-gray-500">טלפון</th>
                  <th className="py-3 px-4 font-medium text-gray-500">תאריך</th>
                  <th className="py-3 px-4 font-medium text-gray-500">מקור</th>
                  <th className="py-3 px-4 font-medium text-gray-500">סטטוס</th>
                  <th className="py-3 px-4 font-medium text-gray-500">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{lead.fullName}</div>
                        {lead.company && <div className="text-sm text-gray-500">{lead.company}</div>}
                      </div>
                    </td>
                    <td className="py-3 px-4">{lead.email}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{lead.phone}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{formatDate(lead.date)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium
                        ${lead.source === 'טופס יצירת קשר' ? 'bg-blue-100 text-blue-800' : 
                          lead.source === 'צ\'אטבוט' ? 'bg-purple-100 text-purple-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium
                        ${lead.status === 'חדש' ? 'bg-yellow-100 text-yellow-800' : 
                          lead.status === 'נוצר קשר' ? 'bg-blue-100 text-blue-800' : 
                          lead.status === 'בטיפול' ? 'bg-indigo-100 text-indigo-800' :
                          lead.status === 'הצעת מחיר נשלחה' ? 'bg-purple-100 text-purple-800' :
                          lead.status === 'נסגר - לקוח' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewLead(lead.id)}
                      >
                        צפייה
                      </Button>
                    </td>
                  </tr>
                ))}
                
                {currentLeads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-500">
                      לא נמצאו לידים התואמים את החיפוש
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredLeads.length > leadsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                מציג {indexOfFirstLead + 1}-{Math.min(indexOfLastLead, filteredLeads.length)} מתוך {filteredLeads.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <div className="text-sm">{currentPage} / {totalPages}</div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadManagement;
