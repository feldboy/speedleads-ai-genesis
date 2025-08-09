
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, MessageSquare, MousePointerClick, Eye } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';
import { useEffect } from 'react';

// Mock data for charts
const mockAnalytics = {
  visitsToday: 254,
  visitsGrowth: 12.5,
  leadsToday: 15,
  leadsGrowth: 23.1,
  conversationToday: 42,
  conversationGrowth: -5.2,
  clicksToday: 186,
  clicksGrowth: 8.7,
  weeklyVisits: [152, 142, 168, 184, 172, 212, 254],
  weeklyLeads: [8, 10, 7, 12, 11, 13, 15],
  leadSources: [
    { source: 'טופס יצירת קשר', percentage: 45 },
    { source: 'צ\'אטבוט', percentage: 30 },
    { source: 'וואטסאפ', percentage: 25 },
  ],
  topPages: [
    { page: 'דף הבית', views: 854 },
    { page: 'שירותים', views: 621 },
    { page: 'יצירת קשר', views: 432 },
    { page: 'אודות', views: 287 },
    { page: 'בלוג', views: 145 },
  ]
};

const Dashboard = () => {
  useEffect(() => {
    trackPageView('Admin Dashboard');
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">דשבורד</h1>
        <span className="text-sm text-gray-500">נתונים עדכניים ל-11.05.2025</span>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="מבקרים" 
          value={mockAnalytics.visitsToday} 
          change={mockAnalytics.visitsGrowth} 
          icon={<Eye className="h-8 w-8 text-purple-500" />} 
        />
        <StatCard 
          title="לידים חדשים" 
          value={mockAnalytics.leadsToday} 
          change={mockAnalytics.leadsGrowth} 
          icon={<UserPlus className="h-8 w-8 text-green-500" />} 
        />
        <StatCard 
          title="שיחות צ'אט" 
          value={mockAnalytics.conversationToday} 
          change={mockAnalytics.conversationGrowth} 
          icon={<MessageSquare className="h-8 w-8 text-blue-500" />} 
        />
        <StatCard 
          title="קליקים" 
          value={mockAnalytics.clicksToday} 
          change={mockAnalytics.clicksGrowth} 
          icon={<MousePointerClick className="h-8 w-8 text-amber-500" />} 
        />
      </div>
      
      {/* Traffic & Conversions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>תנועה שבועית</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="w-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">כניסות יומיות לאתר</span>
                  <span className="text-sm font-semibold">ממוצע: {Math.round(mockAnalytics.weeklyVisits.reduce((a, b) => a + b, 0) / 7)}</span>
                </div>
                <div className="flex items-end w-full h-40 gap-2">
                  {mockAnalytics.weeklyVisits.map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-tech-blue/80 w-full rounded-t" 
                        style={{ height: `${value / 3}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">יום {i+1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  תנועת הגולשים נמצאת <span className="text-green-600 font-semibold">במגמת עלייה</span>, עם גידול של 12.5% בשבוע האחרון.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>לידים ומקורות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">לידים לפי מקור</h3>
                <div className="space-y-3">
                  {mockAnalytics.leadSources.map((source, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{source.source}</span>
                        <span className="font-medium">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">לידים שבועיים</h3>
                <div className="flex items-end h-20 gap-2 mb-4">
                  {mockAnalytics.weeklyLeads.map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-gold w-full rounded-t" 
                        style={{ height: `${value * 5}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">יום {i+1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  שיעור המרה ממוצע: <span className="font-semibold">5.9%</span> (גידול של 1.2% מהחודש הקודם)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>דפים נצפים ביותר</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-right border-b border-gray-200">
                  <th className="py-3 px-4 font-medium text-gray-500">דף</th>
                  <th className="py-3 px-4 font-medium text-gray-500">צפיות</th>
                  <th className="py-3 px-4 font-medium text-gray-500">המרות</th>
                  <th className="py-3 px-4 font-medium text-gray-500">זמן ממוצע</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockAnalytics.topPages.map((page, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4">{page.page}</td>
                    <td className="py-3 px-4">{page.views}</td>
                    <td className="py-3 px-4">{Math.round(page.views * (Math.random() * 0.06 + 0.02))}</td>
                    <td className="py-3 px-4">{Math.floor(Math.random() * 2) + 1}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className={`text-xs font-medium mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}% מאתמול
            </p>
          </div>
          <div className="p-2 rounded-full bg-gray-100">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
