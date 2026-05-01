"use client";
import { CheckCircle2, Clock, Truck, PlaySquare } from 'lucide-react';

const steps = [
  { title: 'Picked Up', time: '10:00 AM', status: 'done', desc: 'Courier picked up your shoes.' },
  { title: 'Diagnosis & Invoice', time: '10:45 AM', status: 'done', desc: 'AI checked and invoice generated.' },
  { title: 'Deep Cleaning', time: 'In Progress', status: 'active', desc: 'Currently washing upper and sole.' },
  { title: 'Drying & Finishing', time: 'Pending', status: 'pending', desc: 'UV sterilization and odor removal.' },
  { title: 'Delivered', time: 'Pending', status: 'pending', desc: 'Ready to be sent back.' },
];

export default function TrackingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Live Tracking</h1>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="bg-neutral-800 p-4 border-b border-neutral-700 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white">Nike Air Jordan 1</h3>
            <p className="text-sm text-neutral-400">ORD-8921</p>
          </div>
          <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30">
            WASHING
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
            <div className="h-20 w-20 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-xs text-neutral-500">Before Photo</span>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Before & After Preview</p>
              <p className="text-xs text-neutral-400 mb-2">Live feed from our workshop</p>
              <button className="text-xs bg-neutral-800 text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-neutral-700">
                <PlaySquare size={14} /> Watch Timelapse
              </button>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-neutral-800" />
            
            <div className="space-y-6 relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`mt-1 shrink-0 bg-neutral-900 rounded-full ${
                    step.status === 'done' ? 'text-emerald-500' :
                    step.status === 'active' ? 'text-blue-500' :
                    'text-neutral-600'
                  }`}>
                    {step.status === 'done' ? <CheckCircle2 size={24} className="bg-neutral-900" /> :
                     step.status === 'active' ? <Clock size={24} className="animate-pulse bg-neutral-900" /> :
                     <div className="h-6 w-6 rounded-full border-2 border-neutral-700 bg-neutral-900" />}
                  </div>
                  <div>
                    <h4 className={`font-bold ${step.status === 'active' ? 'text-white' : step.status === 'done' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${step.status === 'active' ? 'text-blue-400' : 'text-neutral-500'}`}>{step.time}</p>
                    {step.status === 'active' && (
                      <p className="text-xs text-neutral-400 mt-1">{step.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
