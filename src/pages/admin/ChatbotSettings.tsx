
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Bot, Upload, Key, Database, Save } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';

const ChatbotSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // General settings state
  const [botName, setBotName] = useState('SpeedLeads AI צ\'אטבוט');
  const [welcomeMessage, setWelcomeMessage] = useState('היי! 👋 אני הבוט החכם של SpeedLeads.AI. איך אני יכול לעזור לך היום?');
  const [isEnabled, setIsEnabled] = useState(true);
  
  // API settings state
  const [apiProvider, setApiProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('gpt-4');
  
  // Knowledge base state
  const [knowledgeItems, setKnowledgeItems] = useState([
    { id: 1, name: 'מידע על החברה', content: 'SpeedLeads.AI הינה חברה המתמחה בפיתוח אתרים ודפי נחיתה מבוססי בינה מלאכותית...' },
    { id: 2, name: 'מחירון שירותים', content: 'בניית אתר תדמית: החל מ-5,000 ש"ח. דף נחיתה: החל מ-3,000 ש"ח. חנות אונליין: החל מ-8,000 ש"ח...' }
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemContent, setNewItemContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  useEffect(() => {
    trackPageView('Admin Chatbot Settings');
  }, []);
  
  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend
    toast({
      title: "ההגדרות נשמרו בהצלחה",
      description: "הגדרות הצ'אטבוט עודכנו ונשמרו במערכת",
    });
  };
  
  const handleAddKnowledgeItem = () => {
    if (newItemName && newItemContent) {
      setKnowledgeItems([
        ...knowledgeItems, 
        { 
          id: knowledgeItems.length + 1, 
          name: newItemName, 
          content: newItemContent 
        }
      ]);
      setNewItemName('');
      setNewItemContent('');
      
      toast({
        title: "מידע נוסף בהצלחה",
        description: "פריט הידע נוסף למאגר הצ'אטבוט"
      });
    }
  };
  
  const handleDeleteItem = (id: number) => {
    setKnowledgeItems(knowledgeItems.filter(item => item.id !== id));
    
    toast({
      title: "פריט ידע נמחק",
      description: "הפריט הוסר ממאגר הידע של הצ'אטבוט"
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleFileUpload = () => {
    if (selectedFile) {
      // In a real app, this would upload the file to the server
      toast({
        title: "הקובץ הועלה בהצלחה",
        description: `הקובץ "${selectedFile.name}" הועלה ועובד למאגר הידע של הצ'אטבוט`
      });
      
      setSelectedFile(null);
      
      // Reset file input (not perfect but works in most cases)
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">הגדרות צ'אטבוט</h1>
      
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="general" className="flex items-center">
            <Bot className="h-4 w-4 ml-2" />
            כללי
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center">
            <Key className="h-4 w-4 ml-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center">
            <Database className="h-4 w-4 ml-2" />
            מאגר ידע
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {/* General Settings Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>הגדרות כלליות</CardTitle>
                <CardDescription>
                  הגדר את התצורה הבסיסית של הצ'אטבוט באתר שלך
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">שם הבוט</label>
                    <Input
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="הכנס את שם הבוט"
                    />
                    <p className="text-sm text-gray-500">השם שיוצג למשתמשים כאשר הבוט מגיב</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">סטטוס</label>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="enabled"
                          name="status"
                          checked={isEnabled}
                          onChange={() => setIsEnabled(true)}
                          className="ml-2"
                        />
                        <label htmlFor="enabled">פעיל</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="disabled"
                          name="status"
                          checked={!isEnabled}
                          onChange={() => setIsEnabled(false)}
                          className="ml-2"
                        />
                        <label htmlFor="disabled">כבוי</label>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">האם הצ'אטבוט יהיה זמין באתר</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">הודעת פתיחה</label>
                  <textarea
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                    placeholder="הכנס הודעת פתיחה..."
                  />
                  <p className="text-sm text-gray-500">ההודעה הראשונה שתוצג למשתמש כשהוא פותח את הצ'אט</p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="bg-tech-blue hover:bg-tech-blue/80 text-dark"
                    onClick={handleSaveSettings}
                  >
                    <Save className="h-4 w-4 ml-2" />
                    שמור הגדרות
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>תצוגה מקדימה</CardTitle>
                <CardDescription>
                  כך ייראה הצ'אטבוט שלך באתר
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 max-w-md">
                  <div className="bg-tech-blue/10 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <div className="bg-tech-blue/20 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-tech-blue" />
                      </div>
                      <div className="mr-3">
                        <p className="text-sm font-semibold mb-1">{botName}</p>
                        <p className="text-sm">{welcomeMessage}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border rounded-l-lg p-2">
                      <p className="text-gray-400 text-sm">הקלד הודעה...</p>
                    </div>
                    <button className="bg-tech-blue text-dark px-4 py-2 rounded-r-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Settings Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>הגדרות API</CardTitle>
                <CardDescription>
                  הגדר את ה-API ל-AI שישמש את הצ'אטבוט
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">ספק AI</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer ${apiProvider === 'openai' ? 'border-tech-blue bg-tech-blue/5' : 'border-gray-200'}`}
                      onClick={() => setApiProvider('openai')}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">OpenAI</h3>
                        {apiProvider === 'openai' && <div className="bg-tech-blue h-3 w-3 rounded-full"></div>}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">מודלים כמו GPT-3.5, GPT-4</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer ${apiProvider === 'google' ? 'border-tech-blue bg-tech-blue/5' : 'border-gray-200'}`}
                      onClick={() => setApiProvider('google')}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Google AI</h3>
                        {apiProvider === 'google' && <div className="bg-tech-blue h-3 w-3 rounded-full"></div>}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">מודלים כמו Gemini</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">מפתח API</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`הכנס את מפתח ה-API של ${apiProvider === 'openai' ? 'OpenAI' : 'Google AI'}`}
                  />
                  <p className="text-sm text-gray-500">
                    מפתח ה-API שלך מאובטח ומוצפן במערכת.{' '}
                    <a 
                      href={apiProvider === 'openai' ? 'https://platform.openai.com/account/api-keys' : 'https://aistudio.google.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tech-blue hover:underline"
                    >
                      קבל מפתח API
                    </a>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">מודל</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                  >
                    {apiProvider === 'openai' ? (
                      <>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-4o">GPT-4o</option>
                      </>
                    ) : (
                      <>
                        <option value="gemini-pro">Gemini Pro</option>
                        <option value="gemini-ultra">Gemini Ultra</option>
                      </>
                    )}
                  </select>
                  <p className="text-sm text-gray-500">המודל אליו יתחבר הצ'אטבוט שלך</p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="bg-tech-blue hover:bg-tech-blue/80 text-dark"
                    onClick={handleSaveSettings}
                  >
                    <Save className="h-4 w-4 ml-2" />
                    שמור הגדרות
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>מאגר הידע של הצ'אטבוט</CardTitle>
                <CardDescription>
                  נהל את המידע שהצ'אטבוט משתמש בו כדי לענות על שאלות
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">טקסט קיים</h3>
                  
                  {knowledgeItems.length > 0 ? (
                    <div className="space-y-4">
                      {knowledgeItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{item.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              מחק
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">לא נוספו פריטי ידע עדיין</p>
                  )}
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">הוסף מידע חדש</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">כותרת</label>
                      <Input
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="לדוגמה: מידע על שירותי בניית אתרים"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">תוכן</label>
                      <textarea
                        value={newItemContent}
                        onChange={(e) => setNewItemContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md min-h-[150px]"
                        placeholder="הכנס את המידע שברצונך שהצ'אטבוט יוכל להשתמש בו..."
                      />
                    </div>
                    
                    <Button 
                      className="bg-tech-blue hover:bg-tech-blue/80 text-dark"
                      onClick={handleAddKnowledgeItem}
                      disabled={!newItemName || !newItemContent}
                    >
                      הוסף למאגר הידע
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">העלאת קובץ PDF</h3>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500 mb-4">העלה קבצי PDF המכילים מידע שברצונך שהצ'אטבוט ילמד</p>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        בחר קובץ
                      </Button>
                      {selectedFile && (
                        <div className="mt-4 text-sm">
                          <p className="font-medium">נבחר: {selectedFile.name}</p>
                        </div>
                      )}
                    </div>
                    
                    {selectedFile && (
                      <Button 
                        className="bg-tech-blue hover:bg-tech-blue/80 text-dark"
                        onClick={handleFileUpload}
                      >
                        <Upload className="h-4 w-4 ml-2" />
                        העלה למאגר הידע
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ChatbotSettings;
