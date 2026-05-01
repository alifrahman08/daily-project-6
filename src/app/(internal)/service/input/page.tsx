"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, Sparkles, AlertCircle } from 'lucide-react';

export default function InputPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ material: string; dirtLevel: string; issues: string[] } | null>(null);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResult({
        material: 'Suede / Leather Mix',
        dirtLevel: 'High',
        issues: ['Yellowing sole', 'Mud stains'],
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">AI Shoe Diagnosis</h1>
      </div>

      {!result ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
          <div 
            className={`mx-auto w-48 h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
              scanning ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-600 bg-neutral-800/50 hover:border-blue-400 hover:bg-neutral-800'
            }`}
          >
            {scanning ? (
              <div className="flex flex-col items-center animate-pulse">
                <Sparkles size={40} className="text-blue-400 mb-3" />
                <span className="text-sm font-medium text-blue-400">Analyzing Fabric...</span>
              </div>
            ) : (
              <button onClick={simulateScan} className="flex flex-col items-center w-full h-full justify-center">
                <Camera size={40} className="text-neutral-400 mb-3" />
                <span className="text-sm font-medium text-neutral-300">Tap to Scan Shoe</span>
              </button>
            )}
          </div>
          <p className="text-neutral-400 text-sm mt-6 max-w-sm mx-auto">
            Our AI will automatically detect the material and dirt level to recommend the best treatment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-emerald-950/30 border border-emerald-900 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-emerald-400" size={24} />
              <h2 className="text-lg font-bold text-emerald-400">Diagnosis Complete</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Detected Material</p>
                <p className="font-semibold text-white">{result.material}</p>
              </div>
              <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Dirt Level</p>
                <p className="font-semibold text-red-400">{result.dirtLevel}</p>
              </div>
            </div>

            <div className="mt-4 bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Identified Issues</p>
              <ul className="space-y-2">
                {result.issues.map((issue: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                    <AlertCircle size={14} className="text-amber-500" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button 
            onClick={() => router.push('/service/estimation')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            See Recommended Treatments
          </button>
        </div>
      )}
    </div>
  );
}
