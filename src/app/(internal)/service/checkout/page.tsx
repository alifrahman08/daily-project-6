"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Truck, Ticket, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const basePrice = 75000;
  const discount = promoApplied ? 15000 : 0;
  const deliveryFee = 15000;
  const insuranceFee = hasInsurance ? 5000 : 0;
  const total = basePrice - discount + deliveryFee + insuranceFee;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'sneaker15') {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="h-24 w-24 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">Order Confirmed!</h2>
        <p className="text-neutral-400">Our courier is on the way to pick up your shoes.</p>
        <p className="text-sm text-neutral-500">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>

      {/* Pickup Request & Routing Mock */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Truck size={20} className="text-blue-400" /> Smart Pickup
        </h2>
        <div className="flex gap-3 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
          <MapPin size={24} className="text-neutral-500 shrink-0" />
          <div>
            <p className="font-semibold text-white">Home Address</p>
            <p className="text-sm text-neutral-400">Jl. Sudirman No. 123, Jakarta Selatan</p>
          </div>
        </div>
        <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg text-sm flex items-center gap-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
          AI Route Optimization: Courier arriving in ~15 mins
        </div>
      </div>

      {/* Promo */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Ticket size={20} className="text-emerald-400" /> Promo & Rewards
        </h2>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter promo code (Try SNEAKER15)" 
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none uppercase"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
          />
          <button 
            onClick={handleApplyPromo}
            disabled={promoApplied || !promoCode}
            className="bg-neutral-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-neutral-700 disabled:opacity-50 transition-colors"
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>

      {/* Trust & Safety */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-1">
            <input 
              type="checkbox" 
              checked={hasInsurance}
              onChange={(e) => setHasInsurance(e.target.checked)}
              className="peer appearance-none w-5 h-5 border-2 border-neutral-600 rounded bg-neutral-900 checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-all"
            />
            <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-400" />
                Shoe Protection Guarantee
              </h3>
              <span className="font-bold text-white">Rp 5.000</span>
            </div>
            <p className="text-sm text-neutral-400 mt-1">Get up to Rp 1.500.000 compensation in case of damage during service or delivery.</p>
          </div>
        </label>
      </div>

      {/* Payment */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CreditCard size={20} className="text-purple-400" /> Payment Summary
        </h2>
        <div className="space-y-2 text-sm text-neutral-300">
          <div className="flex justify-between">
            <span>Deep Clean Treatment</span>
            <span>Rp {basePrice.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Smart Pickup & Delivery</span>
            <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
          </div>
          {hasInsurance && (
            <div className="flex justify-between text-blue-400">
              <span>Protection Guarantee</span>
              <span>Rp {insuranceFee.toLocaleString('id-ID')}</span>
            </div>
          )}
          {promoApplied && (
            <div className="flex justify-between text-emerald-400">
              <span>Promo SNEAKER15</span>
              <span>-Rp {discount.toLocaleString('id-ID')}</span>
            </div>
          )}
          <div className="border-t border-neutral-800 pt-2 flex justify-between font-bold text-lg text-white">
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleCheckout}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
      >
        Confirm Order & Pay
      </button>
    </div>
  );
}
