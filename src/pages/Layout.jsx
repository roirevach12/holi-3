
import React from "react";
import { Plane, Gift, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children, currentPageName }) {
  const navItems = [
    { name: "קהילה", href: "#" },
    { name: "תמחור", href: "#" },
    { name: "לעסקים", href: "#" },
    { name: "בלוג", href: "#" },
  ];

  return (
    <div className="min-h-screen">
      <style>
        {`
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F7F8FC; 
          }
          
          .hero-gradient {
            background: radial-gradient(circle at 50% 100%, #fef3c7, #f3e8ff, #e0e7ff);
          }
          
          .search-container {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(128, 128, 128, 0.1);
          }
          
          .floating-animation {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 border-b border-gray-200/70">
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Myvection</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6" dir="rtl">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-gray-500 hover:bg-gray-100/80 rounded-md">
                <Gift className="w-4 h-4" />
                <span>קבל קרדיטים</span>
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                <AvatarFallback className="bg-purple-500 text-white">M</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
