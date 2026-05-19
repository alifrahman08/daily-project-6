"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';
import CourierDashboard from './components/CourierDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (!savedRole) {
      router.push('/');
    } else {
      setRole(savedRole);
    }
  }, [router]);

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 bg-blue-500 rounded-full" />
          <p className="text-neutral-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (role === 'admin') {
    return <AdminDashboard />;
  }
  
  if (role === 'kurir') {
    return <CourierDashboard />;
  }

  return <CustomerDashboard />;
}
