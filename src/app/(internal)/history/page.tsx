"use client";
import { useState } from 'react';
import { Search, Filter, Box, Grid, List as ListIcon, Droplet } from 'lucide-react';

const history = [
  { id: 'ORD-7521', item: 'Vans Old Skool', date: '12 Oct 2025', service: 'Fast Clean', price: 45000, status: 'Completed' },
  { id: 'ORD-6399', item: 'Nike Air Force 1', date: '05 Sep 2025', service: 'Deep Clean + Whitening', price: 165000, status: 'Completed' },
];

const closet = [
  { id: 'SHOE-1', brand: 'Nike', name: 'Air Jordan 1 Retro High', type: 'Leather', condition: 'Good', lastCleaned: '12 Oct 2025' },
  { id: 'SHOE-2', brand: 'Adidas', name: 'Yeezy Boost 350', type: 'Knit', condition: 'Excellent', lastCleaned: '20 Sep 2025' },
  { id: 'SHOE-3', brand: 'Vans', name: 'Old Skool', type: 'Canvas / Suede', condition: 'Needs Wash', lastCleaned: '01 Jan 2025' },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'closet' | 'history'>('closet');

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Shoe Care Profile</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-neutral-900 border border-neutral-800 rounded-lg p-1">
        <button 
          onClick={() => setActiveTab('closet')}
          className={`flex-1 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'closet' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Grid size={16} /> Digital Wardrobe
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'history' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ListIcon size={16} /> Order History
        </button>
      </div>

      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input 
            type="text" 
            placeholder={activeTab === 'closet' ? "Search your shoes..." : "Search order ID..."}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="bg-neutral-900 border border-neutral-800 p-2 rounded-lg text-neutral-400 hover:text-white transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Content */}
      {activeTab === 'closet' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {closet.map((shoe) => (
            <div key={shoe.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div className="flex gap-4 mb-4">
                <div className="h-20 w-20 bg-gradient-to-tr from-neutral-800 to-neutral-700 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{shoe.brand}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">{shoe.name}</h3>
                  <p className="text-sm text-neutral-400 mt-1">{shoe.type}</p>
                  
                  <div className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    shoe.condition === 'Needs Wash' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {shoe.condition}
                  </div>
                </div>
              </div>
              <div className="border-t border-neutral-800 pt-3 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Last cleaned: {shoe.lastCleaned}</span>
                {shoe.condition === 'Needs Wash' && (
                  <button className="text-blue-400 text-xs font-bold flex items-center gap-1 hover:text-blue-300">
                    <Droplet size={14} /> Book Wash
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {history.map((order) => (
            <div key={order.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-neutral-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                  <Box size={20} className="text-neutral-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{order.item}</h3>
                  <p className="text-sm text-neutral-400">{order.service} • {order.date}</p>
                  <p className="text-xs text-neutral-500 mt-1">ID: {order.id}</p>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between border-t border-neutral-800 md:border-none pt-3 md:pt-0">
                <div className="bg-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded-full font-medium mb-0 md:mb-2">
                  {order.status}
                </div>
                <p className="font-bold text-white">Rp {order.price.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
