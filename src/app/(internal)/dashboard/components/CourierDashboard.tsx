"use client";
import { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle2, Package, Camera, Bell, MessageSquare, History, List, Map, Phone, XCircle, Power, Send } from 'lucide-react';

export default function CourierDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'tugas' | 'antrean' | 'riwayat' | 'chat'>('tugas');
  
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [antreanTugas, setAntreanTugas] = useState<any[]>([]);
  const [tugasAktif, setTugasAktif] = useState<any>(null);
  const [riwayat, setRiwayat] = useState<any[]>([]);
  
  // Chat States
  const [activeChat, setActiveChat] = useState<'customer' | 'admin'>('customer');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState({
    customer: [
      { id: 1, sender: 'customer', text: 'Halo Pak Kurir, alamat rumah saya patokannya pagar warna hitam ya, bukan yang coklat.', time: '10:42 AM' },
      { id: 2, sender: 'me', text: 'Baik kak, saya sedang meluncur ke lokasi sesuai Maps. Estimasi 10 menit lagi sampai.', time: '10:43 AM' }
    ],
    admin: [
      { id: 1, sender: 'admin', text: 'Perhatian: Ada tugas pengantaran prioritas untuk ORD-8921.', time: '09:00 AM' }
    ]
  });

  // Load orders
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('smartShoeOrders') || '[]');
    
    // Antrean: Menunggu Pickup atau Siap Diantar
    const available = savedOrders.filter((o: any) => 
      o.laundryStatus === 'menunggu_pickup' || o.laundryStatus === 'siap_diantar'
    );
    setAntreanTugas(available);
    
    // Load existing active task if any
    const savedAktif = localStorage.getItem('courierActiveTask');
    if (savedAktif) {
      setTugasAktif(JSON.parse(savedAktif));
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTerimaTugas = (order: any) => {
    setTugasAktif(order);
    localStorage.setItem('courierActiveTask', JSON.stringify(order));
    setAntreanTugas(prev => prev.filter(o => o.id !== order.id));
    setActiveTab('tugas');
    setPhotoUploaded(false);
    showToast(`Tugas ${order.id} diterima! Memulai pelacakan lokasi...`);
  };

  const handleTolakTugas = (orderId: string) => {
    setAntreanTugas(prev => prev.filter(o => o.id !== orderId));
    showToast('Tugas ditolak.');
  };

  const handleBukaMaps = () => {
    window.open('https://maps.google.com/?q=Jakarta', '_blank');
  };

  const handleSelesaikanTugas = () => {
    if (!tugasAktif) return;

    const savedOrders = JSON.parse(localStorage.getItem('smartShoeOrders') || '[]');
    const newStatus = tugasAktif.laundryStatus === 'menunggu_pickup' ? 'sedang_dicuci' : 'selesai';
    
    const updatedOrders = savedOrders.map((o: any) => 
      o.id === tugasAktif.id ? { ...o, laundryStatus: newStatus, status: newStatus === 'selesai' ? 'Selesai' : o.status } : o
    );
    localStorage.setItem('smartShoeOrders', JSON.stringify(updatedOrders));

    setRiwayat(prev => [{...tugasAktif, statusAkhir: newStatus, waktuSelesai: new Date().toLocaleTimeString()}, ...prev]);
    setTugasAktif(null);
    localStorage.removeItem('courierActiveTask');
    setPhotoUploaded(false);
    
    showToast(`Tugas selesai! Status di sistem admin terupdate.`);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...prev[activeChat], newMessage]
    }));
    
    setChatInput('');
  };

  return (
    <div className="space-y-6 pb-6 max-w-lg mx-auto md:max-w-none">
      
      {/* Header & Online/Offline Status */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Kurir App</h1>
          <p className="text-neutral-400 text-xs">Agus Driver • ID: DRV-092</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative text-neutral-400 hover:text-white transition-colors">
            <Bell size={24} />
            {antreanTugas.length > 0 && isOnline && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse border-2 border-neutral-900"></span>
            )}
          </button>
          
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-lg ${
              isOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
            }`}
          >
            <Power size={16} />
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-neutral-900 rounded-xl p-1 border border-neutral-800 overflow-x-auto scrollbar-hide">
        {[
          { id: 'tugas', icon: Navigation, label: 'Tugas Aktif' },
          { id: 'antrean', icon: List, label: `Daftar (${isOnline ? antreanTugas.length : 0})` },
          { id: 'riwayat', icon: History, label: 'Riwayat' },
          { id: 'chat', icon: MessageSquare, label: 'Chat' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {!isOnline && activeTab !== 'riwayat' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center mt-4">
          <Power size={48} className="text-neutral-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Anda Sedang Offline</h2>
          <p className="text-neutral-400 text-sm">Aktifkan status Online di kanan atas untuk mulai menerima tugas penjemputan & pengantaran baru.</p>
        </div>
      )}

      {isOnline && activeTab === 'antrean' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Bell size={18} className="text-blue-400" />
            Notifikasi Tugas Baru
          </h2>
          {antreanTugas.length === 0 ? (
            <div className="text-center p-8 bg-neutral-900 rounded-xl border border-neutral-800">
              <p className="text-neutral-500">Belum ada tugas baru di area Anda.</p>
            </div>
          ) : (
            antreanTugas.map(order => (
              <div key={order.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-bold border ${
                    order.laundryStatus === 'menunggu_pickup' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                  }`}>
                    {order.laundryStatus === 'menunggu_pickup' ? 'PENJEMPUTAN BARU' : 'PENGANTARAN BARU'}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">{order.id}</span>
                </div>
                <h3 className="font-bold text-white mb-1">{order.customer}</h3>
                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">Jl. Contoh Alamat No. 123, Jakarta Selatan (Est. 4.5 km)</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleTolakTugas(order.id)}
                    className="flex-1 py-2 rounded-lg border border-red-500/30 text-red-400 font-semibold text-sm hover:bg-red-500/10 transition-colors"
                  >
                    Tolak
                  </button>
                  <button 
                    onClick={() => handleTerimaTugas(order)}
                    disabled={tugasAktif !== null}
                    className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-semibold text-sm transition-colors"
                  >
                    {tugasAktif ? 'Selesaikan Tugas Aktif Dulu' : 'Terima Tugas'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isOnline && activeTab === 'tugas' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {!tugasAktif ? (
            <div className="text-center p-8 bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg">
              <Navigation size={48} className="text-neutral-700 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Tidak Ada Tugas Aktif</h2>
              <p className="text-neutral-400 text-sm">Silakan periksa Daftar Tugas untuk menerima orderan.</p>
            </div>
          ) : (
            <div className="bg-blue-900/10 border border-blue-800/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  {tugasAktif.laundryStatus === 'menunggu_pickup' ? <MapPin size={20} /> : <Package size={20} />}
                  <h2>{tugasAktif.laundryStatus === 'menunggu_pickup' ? 'Tugas: Penjemputan' : 'Tugas: Pengantaran'}</h2>
                </div>
                <span className="text-xs font-mono bg-neutral-900 px-2 py-1 rounded-md text-neutral-400 border border-neutral-800">{tugasAktif.id}</span>
              </div>

              {/* Customer Info & Tracking */}
              <div className="bg-neutral-950/80 rounded-xl p-4 border border-neutral-800 mb-4">
                <p className="font-bold text-white text-lg">{tugasAktif.customer}</p>
                <p className="text-sm text-neutral-400 mt-1">Jl. Contoh Alamat No. 123, RT 01/02, Jakarta Selatan</p>
                <div className="flex items-center gap-4 mt-4">
                  <button onClick={handleBukaMaps} className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-700">
                    <Map size={16} className="text-emerald-400" /> Buka Maps
                  </button>
                  <button onClick={() => {setActiveTab('chat'); showToast('Membuka chat dengan pelanggan...');}} className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-700">
                    <MessageSquare size={16} className="text-blue-400" /> Chat User
                  </button>
                </div>
              </div>

              {/* Upload Proof */}
              <div className="border border-neutral-800 bg-neutral-900/50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-2">
                  {tugasAktif.laundryStatus === 'menunggu_pickup' ? 'Upload Foto Sepatu (Kondisi Awal)' : 'Upload Bukti Pengantaran (Paket Diterima)'}
                </h3>
                {!photoUploaded ? (
                  <button 
                    onClick={() => setPhotoUploaded(true)}
                    className="w-full h-24 border-2 border-dashed border-neutral-700 hover:border-blue-500 bg-neutral-950 rounded-lg flex flex-col items-center justify-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors"
                  >
                    <Camera size={24} />
                    <span className="text-xs font-medium">Buka Kamera</span>
                  </button>
                ) : (
                  <div className="w-full h-24 bg-emerald-900/20 border border-emerald-800/50 rounded-lg flex flex-col items-center justify-center gap-2 text-emerald-400">
                    <CheckCircle2 size={24} />
                    <span className="text-xs font-medium">Foto Bukti Berhasil Disimpan</span>
                  </div>
                )}
                
                <button 
                  disabled={!photoUploaded}
                  onClick={handleSelesaikanTugas}
                  className="w-full mt-4 bg-blue-600 disabled:bg-neutral-800 disabled:text-neutral-500 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] disabled:shadow-none"
                >
                  {tugasAktif.laundryStatus === 'menunggu_pickup' ? 'Konfirmasi Selesai Penjemputan' : 'Konfirmasi Selesai Pengantaran'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'riwayat' && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="font-bold text-white">Riwayat Hari Ini</h2>
          {riwayat.length === 0 ? (
            <div className="text-center p-6 bg-neutral-900 rounded-xl border border-neutral-800">
              <p className="text-neutral-500 text-sm">Belum ada riwayat tugas hari ini.</p>
            </div>
          ) : (
            riwayat.map((item, idx) => (
              <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between opacity-80">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{item.customer}</p>
                    <p className="text-xs text-neutral-400">{item.statusAkhir === 'sedang_dicuci' ? 'Penjemputan' : 'Pengantaran'} • {item.id}</p>
                  </div>
                </div>
                <div className="text-xs font-medium text-neutral-500">{item.waktuSelesai}</div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg h-[400px] flex flex-col animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-neutral-950 p-3 border-b border-neutral-800 flex items-center justify-center gap-4">
             <button 
               onClick={() => setActiveChat('customer')}
               className={`font-bold text-sm px-2 py-1 ${activeChat === 'customer' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-neutral-500 hover:text-white'}`}
             >
               Chat Customer
             </button>
             <button 
               onClick={() => setActiveChat('admin')}
               className={`font-bold text-sm px-2 py-1 ${activeChat === 'admin' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-neutral-500 hover:text-white'}`}
             >
               Chat Admin
             </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col bg-neutral-900/50">
             {messages[activeChat].map((msg) => (
               <div key={msg.id} className={`text-sm p-3 rounded-2xl max-w-[80%] ${
                 msg.sender === 'me' 
                  ? 'bg-blue-600 text-white rounded-tr-sm self-end' 
                  : 'bg-neutral-800 text-white rounded-tl-sm self-start'
               }`}>
                 {msg.text}
                 <span className={`block text-[10px] mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-neutral-400'}`}>
                   {msg.time}
                 </span>
               </div>
             ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ketik pesan..." 
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-full px-4 text-sm text-white focus:outline-none focus:border-blue-500" 
            />
            <button type="submit" className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 hover:bg-blue-500 transition-colors">
              <Send size={16} className="-ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
          <CheckCircle2 className="text-emerald-400" size={20} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
