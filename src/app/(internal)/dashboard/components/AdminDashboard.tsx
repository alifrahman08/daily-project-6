"use client";
import { useState, useEffect } from 'react';
import { DollarSign, Users, Package, FileText, CheckCircle2, List, Settings, Truck, Edit, Trash2, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'couriers' | 'treatments'>('overview');
  const [order8923Status, setOrder8923Status] = useState('Menunggu Validasi (Transfer)');
  const [dynamicOrders, setDynamicOrders] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem('smartShoeOrders');
    if (saved) {
      setDynamicOrders(JSON.parse(saved));
    }
  }, []);

  const handleValidasiDynamic = (id: string) => {
    const updated = dynamicOrders.map(o => o.id === id ? { ...o, status: 'Lunas Terverifikasi' } : o);
    setDynamicOrders(updated);
    localStorage.setItem('smartShoeOrders', JSON.stringify(updated));
    showToast('Pembayaran pesanan berhasil divalidasi!');
  };

  const handleValidasi = () => {
    setOrder8923Status('Lunas Terverifikasi');
    showToast('Pembayaran berhasil divalidasi!');
  };

  const handleAction = (action: string, item: string) => {
    showToast(`Membuka menu ${action} untuk: ${item}`);
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard Admin</h1>
          <p className="text-neutral-400 text-sm">Manajemen Pusat Smart Shoe Care.</p>
        </div>
        <button
          onClick={() => showToast('Mengunduh Laporan_Pendapatan_Bulan_Ini.pdf...')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <FileText size={16} /> Laporan Pendapatan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-neutral-800 scrollbar-hide">
        <button
          onClick={() => setActiveTab('overview')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-400 hover:text-white'}`}
        >
          <List size={16} className="inline mr-2" /> Pesanan & Validasi
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'customers' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-400 hover:text-white'}`}
        >
          <Users size={16} className="inline mr-2" /> Data Customer
        </button>
        <button
          onClick={() => setActiveTab('couriers')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'couriers' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-400 hover:text-white'}`}
        >
          <Truck size={16} className="inline mr-2" /> Data Kurir
        </button>
        <button
          onClick={() => setActiveTab('treatments')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'treatments' ? 'border-blue-500 text-blue-400' : 'border-transparent text-neutral-400 hover:text-white'}`}
        >
          <Settings size={16} className="inline mr-2" /> Treatment Laundry
        </button>
      </div>

      {/* TAB: OVERVIEW (Pesanan, Laporan, Validasi) */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
                  <DollarSign size={20} />
                </div>
                <h3 className="font-semibold text-neutral-400">Pendapatan Hari Ini</h3>
              </div>
              <p className="text-2xl font-bold text-white">Rp 2.450.000</p>
              <p className="text-xs text-emerald-400 mt-1">+15% dari kemarin</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
                  <Package size={20} />
                </div>
                <h3 className="font-semibold text-neutral-400">Pesanan Aktif</h3>
              </div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-xs text-neutral-500 mt-1">12 Pencucian, 8 Pengeringan, 4 Pickup</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h3 className="font-semibold text-neutral-400">Status Kurir</h3>
              </div>
              <p className="text-2xl font-bold text-white">5 / 8</p>
              <p className="text-xs text-neutral-500 mt-1">5 Kurir sedang bertugas</p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-neutral-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Validasi Pembayaran & Pesanan Terbaru</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-400">
                <thead className="bg-neutral-950/50 text-xs uppercase font-semibold text-neutral-500 border-b border-neutral-800">
                  <tr>
                    <th className="px-5 py-3">ID Pesanan</th>
                    <th className="px-5 py-3">Pelanggan</th>
                    <th className="px-5 py-3">Layanan</th>
                    <th className="px-5 py-3">Status Laundry</th>
                    <th className="px-5 py-3">Status Pembayaran</th>
                    <th className="px-5 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {/* Pesanan Dinamis dari Checkout Customer */}
                  {dynamicOrders.map(order => (
                    <tr key={order.id} className="hover:bg-neutral-800/50 transition-colors bg-blue-900/10">
                      <td className="px-5 py-4 font-medium text-white">{order.id} <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded ml-1">BARU</span></td>
                      <td className="px-5 py-4">{order.customer}</td>
                      <td className="px-5 py-4">{order.service}</td>
                      <td className="px-5 py-4">
                        {order.laundryStatus === 'sedang_dicuci' ? (
                          <span className="text-amber-400 font-medium text-xs flex items-center gap-1"><Package size={12} /> Sedang Dicuci</span>
                        ) : (
                          <span className="text-blue-400 font-medium text-xs flex items-center gap-1"><Truck size={12} /> Menunggu Pickup</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${order.status === 'Lunas Terverifikasi'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : order.status === 'COD (Kurir)'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {order.status === 'Menunggu Validasi (Transfer)' && (
                          <button onClick={() => handleValidasiDynamic(order.id)} className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1">
                            <CheckCircle2 size={16} /> Validasi
                          </button>
                        )}
                        {order.status === 'COD (Kurir)' && (
                          <button onClick={() => showToast(`Menampilkan detail pesanan ${order.id}`)} className="text-blue-400 hover:text-blue-300 font-medium">Lihat Detail</button>
                        )}
                        {order.status === 'Lunas Terverifikasi' && (
                          <span className="text-emerald-400 text-xs flex items-center gap-1"><CheckCircle2 size={14} /> Selesai</span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {/* Pesanan Mock Default */}
                  <tr className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-white">ORD-8923</td>
                    <td className="px-5 py-4">Budi Santoso</td>
                    <td className="px-5 py-4">Cuci Mendalam</td>
                    <td className="px-5 py-4">
                      <span className="text-amber-400 font-medium text-xs flex items-center gap-1"><Package size={12} /> Sedang Dicuci</span>
                    </td>
                    <td className="px-5 py-4">
                      {order8923Status === 'Lunas Terverifikasi' ? (
                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium border border-emerald-500/20">{order8923Status}</span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full text-xs font-medium border border-amber-500/20">{order8923Status}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {order8923Status !== 'Lunas Terverifikasi' && (
                        <button onClick={handleValidasi} className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1">
                          <CheckCircle2 size={16} /> Validasi
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-white">ORD-8924</td>
                    <td className="px-5 py-4">Siti Aminah</td>
                    <td className="px-5 py-4">Cuci Cepat</td>
                    <td className="px-5 py-4">
                      <span className="text-emerald-400 font-medium text-xs flex items-center gap-1"><CheckCircle2 size={12} /> Siap Diantar</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full text-xs font-medium border border-blue-500/20">COD (Kurir)</span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => showToast('Menampilkan detail pesanan ORD-8924')} className="text-blue-400 hover:text-blue-300 font-medium">Lihat Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CUSTOMER */}
      {activeTab === 'customers' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-5 border-b border-neutral-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Data Customer</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-400">
              <thead className="bg-neutral-950/50 text-xs uppercase font-semibold text-neutral-500 border-b border-neutral-800">
                <tr>
                  <th className="px-5 py-3">Nama</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Membership</th>
                  <th className="px-5 py-3">Total Pesanan</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">Budi Santoso</td>
                  <td className="px-5 py-4">budi@example.com</td>
                  <td className="px-5 py-4"><span className="text-amber-400">Gold</span></td>
                  <td className="px-5 py-4">12</td>
                  <td className="px-5 py-4 flex gap-3">
                    <button className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                    <button className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: COURIER */}
      {activeTab === 'couriers' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-5 border-b border-neutral-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Data Kurir</h2>
            <button onClick={() => handleAction('Tambah', 'Kurir Baru')} className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors">
              <Plus size={16} /> Tambah Kurir
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-400">
              <thead className="bg-neutral-950/50 text-xs uppercase font-semibold text-neutral-500 border-b border-neutral-800">
                <tr>
                  <th className="px-5 py-3">Nama Kurir</th>
                  <th className="px-5 py-3">Area Tugas</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">Agus Driver</td>
                  <td className="px-5 py-4">Jakarta Selatan</td>
                  <td className="px-5 py-4">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium border border-emerald-500/20">Aktif (2 Tugas)</span>
                  </td>
                  <td className="px-5 py-4 flex gap-3">
                    <button onClick={() => handleAction('Edit', 'Agus Driver')} className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: TREATMENTS */}
      {activeTab === 'treatments' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-5 border-b border-neutral-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Katalog Treatment Laundry</h2>
            <button onClick={() => handleAction('Tambah', 'Treatment Baru')} className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors">
              <Plus size={16} /> Tambah Treatment
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-400">
              <thead className="bg-neutral-950/50 text-xs uppercase font-semibold text-neutral-500 border-b border-neutral-800">
                <tr>
                  <th className="px-5 py-3">Nama Treatment</th>
                  <th className="px-5 py-3">Estimasi Waktu</th>
                  <th className="px-5 py-3">Harga Dasar</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">Cuci Mendalam (Deep Clean)</td>
                  <td className="px-5 py-4">3-4 Hari</td>
                  <td className="px-5 py-4">Rp 65.000</td>
                  <td className="px-5 py-4 flex gap-3">
                    <button className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                    <button className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">Cuci Cepat (Fast Clean)</td>
                  <td className="px-5 py-4">1 Hari</td>
                  <td className="px-5 py-4">Rp 45.000</td>
                  <td className="px-5 py-4 flex gap-3">
                    <button className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                    <button className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
          <CheckCircle2 className="text-emerald-400" size={20} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
