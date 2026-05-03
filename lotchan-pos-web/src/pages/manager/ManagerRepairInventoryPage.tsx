import { useState, useEffect } from 'react';
import { managerService, type RepairSpareProduct, type CreateRepairSpareProductRequest, type ProductCategory, type Supplier } from '../../services/manager.service';
import { AlertTriangle, Wrench, Plus } from 'lucide-react';

export const ManagerRepairInventoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inventory, setInventory] = useState<RepairSpareProduct[]>([]);
  const [lowStock, setLowStock] = useState<RepairSpareProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CreateRepairSpareProductRequest>>({
    purchasePrice: 0,
    sellingPrice: 0,
    minStock: 0,
    supplierId: '',
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProductForm, setNewProductForm] = useState<CreateRepairSpareProductRequest>({
    sku: `SPARE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: '',
    brand: 'Generic',
    model: '',
    purchasePrice: 0,
    sellingPrice: 0,
    stockQty: 0,
    minStock: 5,
    supplierId: '',
  });

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Fetch inventory and low stock
  useEffect(() => {
    fetchInventory();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await managerService.getSuppliers();
      setSuppliers(data);
    } catch (err: any) {
      console.error('Failed to load suppliers:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await managerService.getCategories();
      setCategories(data);
    } catch (err: any) {
      console.error('Failed to load categories:', err);
    }
  };

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await managerService.getRepairSpareProducts();
      setInventory(data);
      setLowStock(data.filter(p => p.stockQty <= p.minStock));
    } catch (err: any) {
      setError(err.message || 'Failed to load repair inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product: RepairSpareProduct) => {
    setEditingProduct(product.id);
    setEditForm({
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      minStock: product.minStock || 0,
      supplierId: product.supplier?.id || product.supplierId || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({
      purchasePrice: 0,
      sellingPrice: 0,
      minStock: 0,
      supplierId: '',
    });
  };

  const handleSaveEdit = async (productId: string) => {
    if (!editForm.purchasePrice || !editForm.sellingPrice) {
      alert('Please fill in all required fields');
      return;
    }

    if (editForm.purchasePrice <= 0 || editForm.sellingPrice <= 0) {
      alert('Cost and selling price must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      await managerService.updateRepairSpareProduct(productId, editForm);
      setEditingProduct(null);
      fetchInventory();
      alert('Spare product updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateRepairSpareProductRequest, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: field === 'supplierId' 
        ? value 
        : field === 'minStock' 
          ? (value === '' ? null : parseInt(value) || 0) 
          : parseFloat(value) || 0
    }));
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setLoading(true);
      const created = await managerService.createCategory({ name: newCategoryName });
      setCategories(prev => [...prev, created]);
      setNewProductForm(prev => ({ ...prev, categoryId: created.id }));
      setIsNewCategory(false);
      setNewCategoryName('');
    } catch (err: any) {
      alert(err.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || (newProductForm.purchasePrice ?? 0) <= 0 || (newProductForm.sellingPrice ?? 0) <= 0) {
      alert('Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    try {
      await managerService.createRepairSpareProduct(newProductForm);
      setShowNewProduct(false);
      setNewProductForm({
        sku: `SPARE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: '',
        brand: 'Generic',
        model: '',
        purchasePrice: 0,
        sellingPrice: 0,
        stockQty: 0,
        minStock: 5,
        supplierId: '',
      });
      fetchInventory();
      alert('Spare product created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create spare product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pos-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#d2e4ff]">Repair Spare Parts Inventory</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowNewProduct(true)}
            disabled={loading}
            className="pos-btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> New Spare Part
          </button>
          <button
            onClick={fetchInventory}
            disabled={loading}
            className="pos-btn-secondary py-2 px-4 text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      {showNewProduct && (
        <div className="pos-glass rounded-xl p-6 border-2 border-primary/20">
          <h3 className="text-lg font-medium text-[#d2e4ff] mb-6">Add New Spare Part</h3>
          <form onSubmit={handleCreateProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Part Name *</label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm(p => ({ ...p, name: e.target.value }))}
                  className="pos-input"
                  placeholder="e.g. iPhone 13 Battery"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Brand</label>
                <input
                  type="text"
                  value={newProductForm.brand}
                  onChange={(e) => setNewProductForm(p => ({ ...p, brand: e.target.value }))}
                  className="pos-input"
                  placeholder="e.g. Generic / OEM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Compatible Models</label>
                <input
                  type="text"
                  value={newProductForm.compatibleDevices || ''}
                  onChange={(e) => setNewProductForm(p => ({ ...p, compatibleDevices: e.target.value }))}
                  className="pos-input"
                  placeholder="e.g. iPhone 13, iPhone 13 Pro"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-slate-400">Category</label>
                  <button
                    type="button"
                    onClick={() => setIsNewCategory(!isNewCategory)}
                    className="text-xs text-primary hover:underline flex items-center bg-[#0c2b49] px-1 py-0.5 rounded"
                  >
                    {isNewCategory ? 'Cancel' : <><Plus className="h-3 w-3 mr-1" /> Add New</>}
                  </button>
                </div>
                {isNewCategory ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="pos-input sm:text-sm"
                      placeholder="New Name"
                    />
                    <button 
                      type="button" 
                      onClick={handleCreateCategory}
                      disabled={!newCategoryName.trim() || loading}
                      className="pos-btn-primary px-3 py-1 text-xs whitespace-nowrap"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <select
                    value={newProductForm.categoryId || ''}
                    onChange={(e) => setNewProductForm(p => ({ ...p, categoryId: e.target.value || undefined }))}
                    className="pos-input"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">SKU</label>
                <input
                  type="text"
                  value={newProductForm.sku}
                  onChange={(e) => setNewProductForm(p => ({ ...p, sku: e.target.value }))}
                  className="pos-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Supplier</label>
                <select
                  value={newProductForm.supplierId || ''}
                  onChange={(e) => setNewProductForm(p => ({ ...p, supplierId: e.target.value }))}
                  className="pos-input"
                >
                  <option value="">No Supplier</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Purchase Price (₹) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={newProductForm.purchasePrice || ''}
                  onChange={(e) => setNewProductForm(p => ({ ...p, purchasePrice: parseFloat(e.target.value) || 0 }))}
                  className="pos-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={newProductForm.sellingPrice || ''}
                  onChange={(e) => setNewProductForm(p => ({ ...p, sellingPrice: parseFloat(e.target.value) || 0 }))}
                  className="pos-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Initial Stock *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newProductForm.stockQty || ''}
                  onChange={(e) => setNewProductForm(p => ({ ...p, stockQty: parseInt(e.target.value) || 0 }))}
                  className="pos-input font-bold text-primary"
                  title="This will be the starting stock count for this item"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Min Stock Alert</label>
                <input
                  type="number"
                  min="0"
                  value={newProductForm.minStock || ''}
                  onChange={(e) => setNewProductForm(p => ({ ...p, minStock: parseInt(e.target.value) || 0 }))}
                  className="pos-input"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setShowNewProduct(false)}
                className="pos-btn-secondary py-2 px-4 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="pos-btn-primary py-2 px-6 text-sm font-bold"
              >
                {loading ? 'Saving...' : 'Save Spare Part'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="bg-red-500/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-400">Low Stock Alert</h3>
              <div className="mt-2 text-sm text-red-400">
                <p>{lowStock.length} spare part(s) are below reorder level and need attention.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="pos-glass rounded-xl p-6">
        <h3 className="text-lg font-medium text-[#d2e4ff] mb-6">Spare Parts Inventory</h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sm text-slate-400">Loading inventory...</p>
          </div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-8">
            <Wrench className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 text-sm text-slate-400">No spare parts found in inventory.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-[#0c2b49]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Part Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Brand & Models
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Purchase Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Selling Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Reorder Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#00213d] divide-y divide-white/5">
                {inventory.map((product) => {
                  const isLowStock = product.stockQty <= product.minStock;
                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-[#0c2b49] ${isLowStock ? 'bg-red-600/5' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-[#d2e4ff]">
                              {product.name}
                            </div>
                            <div className="text-sm text-slate-400">
                              SKU: {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="text-sm text-[#d2e4ff]">
                             {product.brand}
                         </div>
                         <div className="text-xs text-slate-400 truncate max-w-[150px]">
                             {product.compatibleDevices || 'Universal'}
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#d2e4ff]">{product.stockQty}</div>
                        {product.minStock !== null && (
                          <div className="text-xs text-slate-400">
                            Reorder at: {product.minStock}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">
                        {editingProduct === product.id ? (
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={editForm.purchasePrice}
                            onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                            className="pos-input w-32 sm:text-sm"
                          />
                        ) : (
                          `₹${product.purchasePrice.toFixed(2)}`
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">
                        {editingProduct === product.id ? (
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={editForm.sellingPrice}
                            onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                            className="pos-input w-32 sm:text-sm"
                          />
                        ) : (
                          `₹${product.sellingPrice.toFixed(2)}`
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">
                        {editingProduct === product.id ? (
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={editForm.minStock || ''}
                            onChange={(e) => handleInputChange('minStock', e.target.value)}
                            className="pos-input w-24 sm:text-sm"
                            placeholder="Optional"
                          />
                        ) : product.minStock !== null ? (
                          product.minStock
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">
                        {editingProduct === product.id ? (
                          <select
                            value={editForm.supplierId || ''}
                            onChange={(e) => handleInputChange('supplierId', e.target.value)}
                            className="pos-input w-32 sm:text-sm"
                          >
                            <option value="">None</option>
                            {suppliers.map(s => (
                              <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                          </select>
                        ) : (
                          product.supplier?.name || <span className="text-slate-400 italic text-xs">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isLowStock
                            ? 'bg-red-500/20 text-red-400'
                            : product.stockQty <= (product.minStock || 0) + 5
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                          {isLowStock ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingProduct === product.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveEdit(product.id)}
                              disabled={loading}
                              className="text-green-400 hover:text-green-400 disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-slate-400 hover:text-[#d2e4ff]"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(product)}
                            className="text-primary hover:text-blue-300"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="pos-glass rounded-xl p-4">
          <div className="text-sm text-slate-400">Total Spare Parts</div>
          <div className="text-2xl font-bold text-[#d2e4ff]">{inventory.length}</div>
        </div>
        <div className="pos-glass rounded-xl p-4">
          <div className="text-sm text-slate-400">Low Stock Parts</div>
          <div className="text-2xl font-bold text-red-400">{lowStock.length}</div>
        </div>
        <div className="pos-glass rounded-xl p-4">
          <div className="text-sm text-slate-400">Total Inventory Value</div>
          <div className="text-2xl font-bold text-[#d2e4ff]">
            ₹{inventory.reduce((sum, product) => sum + (product.purchasePrice * product.stockQty), 0).toFixed(2)}
          </div>
        </div>
        <div className="pos-glass rounded-xl p-4">
          <div className="text-sm text-slate-400">Avg. Margin</div>
          <div className="text-2xl font-bold text-green-400">
            {inventory.length > 0
              ? `${((inventory.reduce((sum, product) => sum + ((product.sellingPrice - product.purchasePrice) / (product.purchasePrice || 1) * 100), 0) / inventory.length) || 0).toFixed(1)}%`
              : '0%'
            }
          </div>
        </div>
      </div>
    </div>
  );
};
