"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Camera, Clock, History, Store, Users, Bell, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    setRole(savedRole || 'customer');
  }, [pathname]); // Depend on pathname to ensure it checks on route changes too

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/');
  };

  const getNavItems = () => {
    if (!role) return []; // Jangan render sidebar saat loading/SSR

    if (role === 'admin') {
      return [{ name: 'Dashboard Admin', path: '/dashboard', icon: Home }];
    }
    if (role === 'kurir') {
      return [{ name: 'Tugas Kurir', path: '/dashboard', icon: Home }];
    }
    // Customer
    return [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Pesanan Baru', path: '/service/input', icon: Camera },
      { name: 'Pelacakan', path: '/tracking', icon: Clock },
      { name: 'Riwayat', path: '/history', icon: History },
      { name: 'Toko', path: '/dashboard', icon: Store }, 
      { name: 'Komunitas', path: '/dashboard', icon: Users }, 
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      {/* Sidebar for Desktop / Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 w-full md:w-64 md:relative md:h-screen bg-neutral-900 border-t md:border-t-0 md:border-r border-neutral-800 z-50 flex flex-col">
        <div className="hidden md:flex p-6 items-center justify-between border-b border-neutral-800 shrink-0">
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
        
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-hidden scrollbar-hide justify-start p-2 md:p-4 gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            const isEcosystemLink = item.name === 'Toko' || item.name === 'Komunitas';
            
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:p-3 rounded-lg transition-colors min-w-[70px] md:min-w-0 ${
                  isActive && !isEcosystemLink
                    ? 'text-blue-400 bg-blue-500/10' 
                    : isEcosystemLink 
                      ? 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon size={20} className={isEcosystemLink ? 'opacity-70' : ''} />
                <span className="text-[10px] md:text-sm font-medium text-center md:text-left">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Logout Button (Desktop) */}
        <div className="hidden md:block p-4 border-t border-neutral-800 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Keluar</span>
          </button>
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
          <div className="flex items-center gap-4">
            <button className="relative text-neutral-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full border border-neutral-900"></span>
            </button>
            <button onClick={handleLogout} className="text-red-400">
              <LogOut size={20} />
            </button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
