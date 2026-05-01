"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Check, ChevronRight, TrendingDown, Info } from 'lucide-react';

const treatments = [
  {
    id: 'deep-clean',
    name: 'Deep Clean',
    desc: 'Complete wash for heavy dirt & stains on all materials.',
    basePrice: 65000,
    dynamicSurcharge: 10000,
    time: '3-4 Days',
    recommended: true,
  },
  {
    id: 'fast-clean',
    name: 'Fast Clean',
    desc: 'Quick surface clean for light dirt.',
    basePrice: 45000,
    dynamicSurcharge: 0,
    time: '1 Day',
    recommended: false,
  },
  {
    id: 'whitening',
    name: 'Unyellowing',
    desc: 'Special treatment to restore yellowed soles.',
    basePrice: 90000,
    dynamicSurcharge: 0,
    time: '4-5 Days',
    recommended: true,
  }
];

export default function EstimationPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(['deep-clean']);

  const toggleTreatment = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const totalPrice = selected.reduce((sum, id) => {
    const t = treatments.find(x => x.id === id);
    return sum + (t ? t.basePrice + t.dynamicSurcharge : 0);
  }, 0);

  return (
    <div className="space-y-6 pb-[100px] md:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Select Treatments</h1>
        <p className="text-neutral-400 text-sm">Based on the AI diagnosis, here are our recommendations.</p>
      </div>

      {/* Dynamic Pricing Banner */}
      <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-bold text-white text-sm">Dynamic Pricing Applied</p>
          <p className="text-xs text-neutral-400 mt-1">
            Prices are adjusted based on the <strong className="text-neutral-300">High Dirt Level</strong> detected by AI. A surcharge is applied to deep cleaning.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {treatments.map((t) => {
          const isSelected = selected.includes(t.id);
          const currentPrice = t.basePrice + t.dynamicSurcharge;
          
          return (
            <div 
              key={t.id}
              onClick={() => toggleTreatment(t.id)}
              className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
              }`}
            >
              {t.recommended && (
                <div className="absolute -top-3 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={10} /> AI RECOMMENDED
                </div>
              )}
              <div className="flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="font-bold text-white text-lg">{t.name}</h3>
                  <p className="text-sm text-neutral-400 mt-1">{t.desc}</p>
                </div>
                <div className={`h-6 w-6 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-blue-500 bg-blue-500' : 'border-neutral-600 bg-neutral-800'
                }`}>
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between border-t border-neutral-800/50 pt-3 gap-2">
                <span className="text-neutral-300 text-sm">{t.time}</span>
                
                <div className="flex flex-col items-end">
                  {t.dynamicSurcharge > 0 && (
                    <span className="text-[10px] text-amber-500 flex items-center gap-1 mb-0.5">
                      <TrendingDown size={12} className="rotate-180" /> 
                      High Dirt Surcharge: +Rp {t.dynamicSurcharge.toLocaleString('id-ID')}
                    </span>
                  )}
                  <span className="font-bold text-blue-400 text-lg">Rp {currentPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="fixed bottom-[72px] md:bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800 p-4 md:p-6 z-40 md:relative md:bg-transparent md:border-none md:p-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-400">Estimated Total</p>
            <p className="text-xl font-bold text-white">Rp {totalPrice.toLocaleString('id-ID')}</p>
          </div>
          <button 
            disabled={selected.length === 0}
            onClick={() => router.push('/service/checkout')}
            className="bg-blue-600 disabled:bg-neutral-700 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
          >
            Continue to Checkout <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
