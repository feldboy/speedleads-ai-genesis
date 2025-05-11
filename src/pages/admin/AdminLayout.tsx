
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, MessageCircle, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    
    toast({
      title: 'התנתקת בהצלחה',
    });
    
    navigate('/admin/login');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenuOnSelection = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" dir="rtl">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="flex items-center">
                <span className="text-xl font-bold text-tech-blue">SpeedLeads.AI</span>
                <span className="text-sm font-medium text-gray-600 mr-2">| ניהול</span>
              </Link>
            </div>
            
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-tech-blue focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="תפריט"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              
              {/* Desktop Logout Button */}
              <Button 
                variant="ghost"
                className="hidden md:flex items-center text-gray-600 hover:text-tech-blue"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 ml-2" />
                התנתק
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-3">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => `flex items-center p-3 rounded-md ${isActive ? 'bg-tech-blue/10 text-tech-blue' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={closeMobileMenuOnSelection}
                >
                  <LayoutDashboard className="h-5 w-5 ml-3" />
                  דשבורד
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/leads"
                  className={({ isActive }) => `flex items-center p-3 rounded-md ${isActive ? 'bg-tech-blue/10 text-tech-blue' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={closeMobileMenuOnSelection}
                >
                  <Users className="h-5 w-5 ml-3" />
                  ניהול לידים
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/chatbot"
                  className={({ isActive }) => `flex items-center p-3 rounded-md ${isActive ? 'bg-tech-blue/10 text-tech-blue' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={closeMobileMenuOnSelection}
                >
                  <MessageCircle className="h-5 w-5 ml-3" />
                  הגדרות צ'אטבוט
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 ml-3" />
                  התנתק
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 flex-shrink-0 bg-white border-l border-gray-200">
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => `flex items-center p-3 rounded-md ${isActive ? 'bg-tech-blue/10 text-tech-blue' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <LayoutDashboard className="h-5 w-5 ml-3" />
                  דשבורד
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/leads"
                  className={({ isActive }) => `flex items-center p-3 rounded-md ${isActive ? 'bg-tech-blue/10 text-tech-blue' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Users className="h-5 w-5 ml-3" />
                  ניהול לידים
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/chatbot"
                  className={({ isActive }) => `flex items-center p-3 rounded-md ${isActive ? 'bg-tech-blue/10 text-tech-blue' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <MessageCircle className="h-5 w-5 ml-3" />
                  הגדרות צ'אטבוט
                </NavLink>
              </li>
              <li className="border-t border-gray-200 mt-6 pt-6">
                <a href="/" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100">
                  <Settings className="h-5 w-5 ml-3" />
                  לאתר הראשי
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
