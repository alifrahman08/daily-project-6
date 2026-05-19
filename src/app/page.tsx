"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Silakan masukkan email dan kata sandi.');
      return;
    }

    // Simulasi Autentikasi Berdasarkan Role
    if (email === 'admin@admin.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      router.push('/dashboard');
    } else if (email === 'kurir@kurir.com' && password === 'kurir123') {
      localStorage.setItem('userRole', 'kurir');
      router.push('/dashboard');
    } else if (email === 'customer@customer.com' && password === 'customer123') {
      localStorage.setItem('userRole', 'customer');
      router.push('/dashboard');
    } else {
      setError('Email/sandi salah! Coba: admin@admin.com (admin123), kurir@kurir.com (kurir123), atau customer@customer.com (customer123).');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Smart Shoe Care
          </h1>
          <p className="text-neutral-400 mt-2 text-center text-sm">
            AI-Powered Shoe Care Ecosystem Platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-2 rounded-lg text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Kata Sandi</label>
            <input 
              type="password" 
              required
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-4 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <LogIn size={20} />
            Masuk
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Daftar di sini
          </Link>
        </div>
      </div>

    </div>
  );
}
