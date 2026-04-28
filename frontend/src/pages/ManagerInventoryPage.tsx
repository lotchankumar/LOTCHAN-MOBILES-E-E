import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Edit3, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { managerService } from '../services/manager.service';
import type { InventoryProduct, Supplier, ProductCategory } from '../types';
import { useAuthStore } from '../store/auth.store';

const ManagerInventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryProduct[]>([]);
  const [lowStock, setLowStock] = useState<InventoryProduct[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<InventoryProduct>>({});
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({});
  const { user } = useAuthStore();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [inv, ls, sup, cat] = await Promise.all([
        managerService.getInventory({ category: filterCategory || undefined, search: searchTerm || undefined }),
        managerService.getLowStock(),
        managerService.getSuppliers(),
        managerService.getCategories()
      ]);
      setInventory(inv);
      setLowStock(ls);
      setSuppliers(sup);
      setCategories(cat);
    } catch (err) {
      console.error('Load data error:', err);
    } finally {
      setLoading(false);
    }
  }, [filterCategory, searchTerm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEdit = (product: InventoryProduct) => {
    setEditingId(product.id);
    setEditForm({
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      reorderLevel: product.reorderLevel || 0
    });
  };

  const saveEdit = async () => {
    if (!editingId || !editForm.costPrice || !editForm.sellingPrice) return;
    try {
      await managerService.updateProduct(editingId, editForm);
      loadData();
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const filteredInventory = inventory.filter(p => 
    (!filterSupplier || p.supplierName?.includes(filterSupplier)) &&
    true
  );

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddSupplier(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Add Supplier
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              onKeyPress={(e) => e.key === 'Enter' && loadData()}
            />
          </div>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select 
            value={filterSupplier} 
            onChange={(e) => setFilterSupplier(e.target.value)}
            className="input-field"
          >
            <option value="">All Suppliers</option>
            {suppliers.map(sup => (
              <option key={sup.id} value={sup.name}>{sup.name}</option>
            ))}
          </select>
        </div>
        <button onClick={loadData} className="btn-secondary mt-2 flex items-center gap-2">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-primary">{inventory.length}</div>
          <div className="text-sm text-muted-foreground">Total Products</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-destructive">{lowStock.length}</div>
          <div className="text-sm text-muted-foreground">Low Stock Alerts</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-primary">{suppliers.length}</div>
          <div className="text-sm text-muted-foreground">Suppliers</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-primary">{categories.length}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="card bg-destructive/10 border-destructive p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-destructive w-6 h-6" />
            <h3 className="text-lg font-semibold text-destructive">Low Stock Warning</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStock.slice(0, 8).map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="font-medium">{product.brand} {product.model}</div>
                <div className="text-sm text-muted-foreground">{product.sku}</div>
                <div className="text-2xl font-bold text-destructive">{product.stockQuantity}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="card overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Products ({filteredInventory.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Product</th>
                <th className="table-header">Supplier</th>
                <th className="table-header">Category</th>
                <th className="table-header">Stock</th>
                <th className="table-header">Cost</th>
                <th className="table-header">Price</th>
                <th className="table-header">Reorder</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map(product => (
                <tr key={product.id} className="border-b hover:bg-muted/50">
                  <td className="table-cell font-medium">
                    <div>{product.brand} {product.model}</div>
                    <div className="text-sm text-muted-foreground">{product.sku}</div>
                  </td>
                  <td className="table-cell">{product.supplierName || 'N/A'}</td>
                  <td className="table-cell">{product.categoryName || product.category}</td>
                  <td className="table-cell">
                    <span className={product.needsReorder ? 'text-destructive font-bold' : ''}>
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="table-cell font-mono">₹{product.costPrice.toLocaleString()}</td>
                  <td className="table-cell font-mono">₹{product.sellingPrice.toLocaleString()}</td>
                  <td className="table-cell font-mono">{product.reorderLevel || 0}</td>
                  <td className="table-cell">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="text-primary hover:text-primary/80 p-1"
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button className="text-destructive hover:text-destructive/80 p-1" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Product Prices</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cost Price</label>
                <input
                  type="number"
                  value={editForm.costPrice || ''}
                  onChange={(e) => setEditForm({...editForm, costPrice: parseFloat(e.target.value) || 0 })}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Selling Price</label>
                <input
                  type="number"
                  value={editForm.sellingPrice || ''}
                  onChange={(e) => setEditForm({...editForm, sellingPrice: parseFloat(e.target.value) || 0 })}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reorder Level</label>
                <input
                  type="number"
                  value={editForm.reorderLevel || ''}
                  onChange={(e) => setEditForm({...editForm, reorderLevel: parseInt(e.target.value) || 0 })}
                  className="input-field w-full"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveEdit} className="btn-primary flex-1">
                Save
              </button>
              <button onClick={() => { setEditingId(null); setEditForm({}); }} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Supplier Modal */}
      {showAddSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Supplier</h3>
            <div className="space-y-4">
              <input
                placeholder="Supplier Name *"
                value={newSupplier.name || ''}
                onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value })}
                className="input-field w-full"
              />
              <input
                placeholder="Contact Person"
                value={newSupplier.contactName || ''}
                onChange={(e) => setNewSupplier({...newSupplier, contactName: e.target.value })}
                className="input-field w-full"
              />
              <input
                placeholder="Phone"
                value={newSupplier.phone || ''}
                onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value })}
                className="input-field w-full"
              />
              <input
                placeholder="Email"
                type="email"
                value={newSupplier.email || ''}
                onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value })}
                className="input-field w-full"
              />
              <textarea
                placeholder="Address"
                value={newSupplier.address || ''}
                onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value })}
                className="input-field h-20"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={async () => {
                  if (newSupplier.name) {
                    await managerService.createSupplier(newSupplier as any);
                    setShowAddSupplier(false);
                    setNewSupplier({});
                    loadData();
                  }
                }}
                className="btn-primary flex-1"
              >
                Add Supplier
              </button>
              <button 
                onClick={() => setShowAddSupplier(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerInventoryPage;


