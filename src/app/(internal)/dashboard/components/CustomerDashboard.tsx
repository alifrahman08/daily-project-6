"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Camera, Clock, Award, Package, ChevronRight, Store, Users, ShieldCheck } from 'lucide-react';

export default function CustomerDashboard() {
  const [activeOrders, setActiveOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('smartShoeOrders') || '[]');
    const myName = localStorage.getItem('customerName') || 'Pelanggan (Tanpa Nama)';
    
    // Ambil pesanan milik customer ini yang belum selesai
    const myOrders = savedOrders.filter((o: any) => o.customer === myName && o.laundryStatus !== 'selesai');
    setActiveOrders(myOrders);
  }, []);

  return (
    <div className="space-y-6 pb-6">
      {/* Gamification & Membership Header */}
      <div className="bg-gradient-to-br from-blue-900/40 to-neutral-900 border border-blue-800/50 rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Selamat datang kembali, Sneakerhead!</h1>
            <p className="text-neutral-400 text-sm">Anda memiliki 2 pasang sepatu yang sedang dibersihkan.</p>
          </div>
          
          <div className="bg-neutral-950/50 border border-amber-500/30 p-3 rounded-xl flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-tr from-amber-600 to-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-400">Member Gold</span>
                <span className="text-xs font-bold text-white">2,450 / 3,000 pts</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 w-[80%] rounded-full" />
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">550 pts menuju Platinum (Gratis Penjemputan!)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/20 border border-emerald-800/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-colors">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" size={24} />
          <div>
            <p className="font-bold text-white text-sm">Langganan Shoe Care+ Aktif</p>
            <p className="text-xs text-neutral-400">Nikmati prioritas proses & diskon 10% untuk produk.</p>
          </div>
        </div>
        <ChevronRight className="text-neutral-500" size={20} />
      </div>

      {/* Core Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/service/input" className="group bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-blue-500/50 transition-all hover:bg-neutral-800">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Camera size={24} />
            </div>
            <ChevronRight className="text-neutral-600 group-hover:text-blue-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Diagnosis Sepatu AI</h3>
          <p className="text-sm text-neutral-400">Pindai sepatu Anda untuk deteksi material dan rekomendasi perawatan otomatis.</p>
        </Link>

        <Link href="/tracking" className="group bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all hover:bg-neutral-800">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <ChevronRight className="text-neutral-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Pelacakan Langsung 2.0</h3>
          <p className="text-sm text-neutral-400">Lihat status real-time dan foto sebelum-sesudah sepatu Anda.</p>
        </Link>
      </div>

      {/* Ecosystem Links */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-neutral-800 cursor-pointer transition-colors">
          <Store className="text-purple-400 mb-2" size={24} />
          <p className="font-bold text-white text-sm">Marketplace</p>
          <p className="text-xs text-neutral-500">Beli produk perawatan</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-neutral-800 cursor-pointer transition-colors">
          <Users className="text-rose-400 mb-2" size={24} />
          <p className="font-bold text-white text-sm">Komunitas</p>
          <p className="text-xs text-neutral-500">Tips & Forum</p>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Package size={20} className="text-blue-400" />
          Pesanan Aktif
        </h2>
        <div className="space-y-3">
          {activeOrders.length === 0 ? (
            <div className="text-center p-4 bg-neutral-950 rounded-lg border border-neutral-800">
              <p className="text-neutral-500 text-sm">Belum ada pesanan aktif. Yuk pesan sekarang!</p>
            </div>
          ) : (
            activeOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg border border-neutral-800/50">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-neutral-800 rounded flex items-center justify-center text-xs font-bold text-neutral-500">
                    IMG
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{order.service}</h4>
                    <p className="text-xs text-neutral-400">{order.id} • {order.laundryStatus === 'sedang_dicuci' ? 'Proses Cuci' : 'Menunggu Pickup'}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  order.laundryStatus === 'sedang_dicuci' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {order.laundryStatus === 'sedang_dicuci' ? 'Sedang Dicuci' : 'Menunggu Pickup'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
