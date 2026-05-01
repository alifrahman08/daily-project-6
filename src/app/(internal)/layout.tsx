"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Clock, History, Store, Users, Bell } from 'lucide-react';

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'New Order', path: '/service/input', icon: Camera },
    { name: 'Tracking', path: '/tracking', icon: Clock },
    { name: 'History', path: '/history', icon: History },
    { name: 'Store', path: '/dashboard', icon: Store }, // Currently points to dashboard for demo
    { name: 'Community', path: '/dashboard', icon: Users }, // Currently points to dashboard for demo
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      {/* Sidebar for Desktop / Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 w-full md:w-64 md:relative md:h-screen bg-neutral-900 border-t md:border-t-0 md:border-r border-neutral-800 z-50 overflow-x-auto md:overflow-x-hidden scrollbar-hide">
        <div className="hidden md:flex p-6 items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
              <span className="font-bold text-sm">SC</span>
            </div>
            <span className="font-bold text-lg tracking-wide whitespace-nowrap">Shoe Care</span>
          </div>
          
          <button className="relative text-neutral-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        
        <div className="flex md:flex-col justify-start p-2 md:p-4 gap-2 min-w-max md:min-w-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            // Make Store and Community items look a bit different to denote they are new ecosystem parts
            const isEcosystemLink = item.name === 'Store' || item.name === 'Community';
            
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:p-3 rounded-lg transition-colors ${
                  isActive && !isEcosystemLink
                    ? 'text-blue-400 bg-blue-500/10' 
                    : isEcosystemLink 
                      ? 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon size={20} className={isEcosystemLink ? 'opacity-70' : ''} />
                <span className="text-[10px] md:text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pb-[72px] md:pb-0 h-screen overflow-y-auto relative">
        {/* Mobile Header with Notifications */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/50 sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="font-bold text-[10px]">SC</span>
            </div>
            <span className="font-bold text-sm">Shoe Care</span>
          </div>
          <button className="relative text-neutral-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full border border-neutral-900"></span>
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
