import { useState, useEffect, useMemo } from 'react';
import { Package, ArrowRightLeft, Search, AlertTriangle, RefreshCw } from 'lucide-react';
import { managerService, type ProductInventory } from '../../services/manager.service';
import { useBranchesQuery } from '../../hooks/useManagers';
import './AdminPage.css';

export const AdminInventoryPage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transfer'>('overview');
  const [inventory, setInventory] = useState<ProductInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const { branches } = useBranchesQuery();

  const fetchInventory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await managerService.getInventory();
      setInventory(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filtered = useMemo(() => {
    return inventory.filter((p) => {
      const q = search.toLowerCase();
      return (
        !q ||
        p.sku?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q)
      );
    });
  }, [inventory, search]);

  const getStatusBadge = (product: ProductInventory) => {
    if (product.stockQuantity <= 0)
      return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Out of Stock</span>;
    if (product.needsReorder)
      return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Low Stock</span>;
    return <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">In Stock</span>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">Global Inventory</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Monitor stock levels across all branches and manage transfers</p>
        </div>
        <button
          onClick={fetchInventory}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-[#aec8f0] px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
            activeTab === 'overview' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2"><Package size={16} /> Overview</div>
        </button>
        <button
          onClick={() => setActiveTab('transfer')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
            activeTab === 'transfer' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2"><ArrowRightLeft size={16} /> Stock Transfer</div>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="admin-glass-panel rounded-xl overflow-hidden">
          {/* Filters */}
          <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                className="w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Search by SKU, brand, model..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches?.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mt-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-sm text-red-300">
              <AlertTriangle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[60vh] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-[#3b82f6]/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full border-collapse" style={{ minWidth: '650px' }}>
                <thead className="sticky top-0 z-10 bg-[#0b1e33]">
                  <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#7892b7]">
                    <th className="px-5 py-3 text-left">SKU</th>
                    <th className="px-5 py-3 text-left">Product</th>
                    <th className="px-5 py-3 text-left">Category</th>
                    <th className="px-5 py-3 text-left">Stock Qty</th>
                    <th className="px-5 py-3 text-left">Selling Price</th>
                    <th className="px-5 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-14 text-center text-[#7892b7]">
                        <span className="animate-pulse">Loading inventory...</span>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-14 text-center">
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                          <Package size={36} className="opacity-30" />
                          <p>{search ? `No products matching "${search}"` : 'No products in inventory.'}</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((product) => (
                      <tr key={product.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap text-[#aec8f0] font-mono text-xs">{product.sku}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <p className="font-semibold text-white">{product.brand} {product.model}</p>
                          {product.supplierName && (
                            <p className="text-[10px] text-slate-500">{product.supplierName}</p>
                          )}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-slate-400 capitalize">{product.categoryName || product.category}</td>
                        <td className="px-5 py-4 whitespace-nowrap font-bold text-[#d2e4ff]">{product.stockQuantity}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-slate-300">
                          ₹{product.sellingPrice?.toLocaleString('en-IN')}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">{getStatusBadge(product)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer count */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-white/5 text-xs text-slate-500">
              Showing {filtered.length} of {inventory.length} products
            </div>
          )}
        </div>
      )}

      {/* Stock Transfer Tab */}
      {activeTab === 'transfer' && (
        <div className="max-w-2xl mx-auto admin-glass-panel p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <ArrowRightLeft className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-[#d2e4ff]">Execute Stock Transfer</h3>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#aec8f0] mb-2">From Branch</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Select source branch</option>
                  {branches?.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#aec8f0] mb-2">To Branch</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Select destination branch</option>
                  {branches?.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-2">Product</label>
              <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Select product to transfer</option>
                {inventory
                  .filter((p) => p.stockQuantity > 0)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} {p.model} — SKU: {p.sku} ({p.stockQuantity} available)
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-2">Transfer Quantity</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all flex justify-center items-center gap-2"
            >
              <ArrowRightLeft size={18} /> Initiate Transfer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminInventoryPage;
