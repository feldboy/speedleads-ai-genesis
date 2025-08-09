
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple mock authentication for demo purposes
    // In a real app, this would call an authentication API
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        // Store token in localStorage (would be a real JWT in production)
        localStorage.setItem('admin_token', 'mock-admin-token-12345');
        
        toast({
          title: 'התחברת בהצלחה',
          description: 'ברוך הבא למערכת הניהול',
        });
        
        navigate('/admin/dashboard');
      } else {
        toast({
          title: 'התחברות נכשלה',
          description: 'שם משתמש או סיסמה לא נכונים',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tech-blue mb-2">SpeedLeads.AI</h1>
          <p className="text-gray-600">מערכת ניהול</p>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-tech-blue/10 text-tech-blue">
                <Lock className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-center">התחברות למערכת הניהול</CardTitle>
            <CardDescription className="text-center">הזן את פרטי ההתחברות שלך כדי לגשת לפאנל הניהול</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="username" className="text-sm font-medium">שם משתמש</label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">סיסמה</label>
                    <a href="#" className="text-sm text-tech-blue hover:underline">שכחת סיסמה?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full bg-tech-blue hover:bg-tech-blue/80 text-dark" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      מתחבר...
                    </>
                  ) : 'התחבר'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              * לצורך הדגמה, ניתן להתחבר עם:
              <br />
              שם משתמש: admin | סיסמה: password
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
