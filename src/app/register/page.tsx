"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      // In a real app, you would send this to an API
      localStorage.setItem('userRole', 'customer');
      localStorage.setItem('customerName', name);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Buat Akun
          </h1>
          <p className="text-neutral-400 mt-2 text-center text-sm">
            Gabung dengan Ekosistem Smart Shoe Care
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              required
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white transition-all"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white transition-all"
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
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg px-4 py-3 mt-4 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            <UserPlus size={20} />
            Daftar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          Sudah punya akun?{' '}
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
