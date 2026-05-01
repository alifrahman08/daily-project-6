"use client";
import Link from 'next/link';
import { Camera, Clock, Award, Package, ChevronRight, Store, Users, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-6">
      {/* Gamification & Membership Header */}
      <div className="bg-gradient-to-br from-blue-900/40 to-neutral-900 border border-blue-800/50 rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Sneakerhead!</h1>
            <p className="text-neutral-400 text-sm">You have 2 pairs currently in cleaning.</p>
          </div>
          
          <div className="bg-neutral-950/50 border border-amber-500/30 p-3 rounded-xl flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-tr from-amber-600 to-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-400">Gold Member</span>
                <span className="text-xs font-bold text-white">2,450 / 3,000 pts</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 w-[80%] rounded-full" />
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">550 pts to Platinum (Free Pickup!)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/20 border border-emerald-800/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-colors">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" size={24} />
          <div>
            <p className="font-bold text-white text-sm">Shoe Care+ Subscription Active</p>
            <p className="text-xs text-neutral-400">Enjoy priority processing & 10% off products.</p>
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
          <h3 className="text-lg font-bold text-white mb-1">AI Shoe Diagnosis</h3>
          <p className="text-sm text-neutral-400">Scan your shoe for automatic material detection and treatment recommendation.</p>
        </Link>

        <Link href="/tracking" className="group bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all hover:bg-neutral-800">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <ChevronRight className="text-neutral-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Live Tracking 2.0</h3>
          <p className="text-sm text-neutral-400">View real-time status and before-after photos of your shoes.</p>
        </Link>
      </div>

      {/* Ecosystem Links */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-neutral-800 cursor-pointer transition-colors">
          <Store className="text-purple-400 mb-2" size={24} />
          <p className="font-bold text-white text-sm">Marketplace</p>
          <p className="text-xs text-neutral-500">Buy care products</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-neutral-800 cursor-pointer transition-colors">
          <Users className="text-rose-400 mb-2" size={24} />
          <p className="font-bold text-white text-sm">Community</p>
          <p className="text-xs text-neutral-500">Tips & Forums</p>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Package size={20} className="text-blue-400" />
          Active Orders
        </h2>
        <div className="space-y-3">
          {[
            { id: 'ORD-8921', item: 'Nike Air Jordan 1', status: 'Washing', time: 'Est. completion: Tomorrow' },
            { id: 'ORD-8922', item: 'Adidas Yeezy Boost', status: 'Drying', time: 'Est. completion: Today' }
          ].map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg border border-neutral-800/50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-neutral-800 rounded flex items-center justify-center text-xs font-bold text-neutral-500">
                  IMG
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{order.item}</h4>
                  <p className="text-xs text-neutral-400">{order.id} • {order.time}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
                {order.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
