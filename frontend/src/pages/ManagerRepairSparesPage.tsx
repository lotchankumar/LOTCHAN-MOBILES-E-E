import React, { useState, useEffect } from 'react';
import { managerService } from '../services/manager.service';
import type { RepairSpareProduct, ProductCategory } from '../types';

const ManagerRepairSparesPage: React.FC = () => {
  const [products, setProducts] = useState<RepairSpareProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '',
    sku: '',
    description: '',
    categoryId: '',
    brand: 'Generic',
    model: '',
    compatibleDevices: '',
    purchasePrice: 0,
    sellingPrice: 0,
    stockQty: 0,
    minStock: 5,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [productsData, categoriesData] = await Promise.all([
        managerService.getRepairSpareProducts(),
        managerService.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      sku: '',
      description: '',
      categoryId: '',
      brand: 'Generic',
      model: '',
      compatibleDevices: '',
      purchasePrice: 0,
      sellingPrice: 0,
      stockQty: 0,
      minStock: 5,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.sku.trim()) {
      setError('Name and SKU are required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      if (editingId) {
        await managerService.updateRepairSpareProduct(editingId, form);
      } else {
        await managerService.createRepairSpareProduct(form);
      }

      resetForm();
      setShowForm(false);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: RepairSpareProduct) => {
    setForm({
      name: product.name,
      sku: product.sku,
      description: product.description || '',
      categoryId: product.categoryId || '',
      brand: product.brand,
      model: product.model || '',
      compatibleDevices: product.compatibleDevices || '',
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      stockQty: product.stockQuantity,
      minStock: product.minStock || 5,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this spare product?')) return;
    try {
      setError('');
      await managerService.deleteRepairSpareProduct(id);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" /></div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Repair Spare Products</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Spare Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg"
              placeholder="Search by name, SKU or brand..."
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Spare Product' : 'New Spare Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SKU *</label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => setForm({...form, sku: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({...form, categoryId: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="">No Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => setForm({...form, brand: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <input
                  type="text"
                  value={form.model}
                  onChange={(e) => setForm({...form, model: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Compatible Devices</label>
                <input
                  type="text"
                  value={form.compatibleDevices}
                  onChange={(e) => setForm({...form, compatibleDevices: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="e.g. iPhone 12, Samsung S21"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Purchase Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.purchasePrice}
                  onChange={(e) => setForm({...form, purchasePrice: parseFloat(e.target.value) || 0})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.sellingPrice}
                  onChange={(e) => setForm({...form, sellingPrice: parseFloat(e.target.value) || 0})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Initial Stock</label>
                <input
                  type="number"
                  min="0"
                  value={form.stockQty}
                  onChange={(e) => setForm({...form, stockQty: parseInt(e.target.value) || 0})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Min Stock Level</label>
                <input
                  type="number"
                  min="0"
                  value={form.minStock}
                  onChange={(e) => setForm({...form, minStock: parseInt(e.target.value) || 0})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
              >
                {submitting ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => { resetForm(); setShowForm(false); }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name/SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand/Model</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purchase Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.sku}</div>
                </td>
                <td className="px-4 py-3 text-sm">
                  {product.brand} {product.model ? `/ ${product.model}` : ''}
                </td>
                <td className="px-4 py-3 text-sm">{product.categoryName || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${product.stockQuantity <= (product.minStock || 5) ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stockQuantity}
                  </span>
                  {product.stockQuantity <= (product.minStock || 5) && (
                    <span className="ml-1 text-xs text-red-500">Low!</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm font-mono">₹{product.purchasePrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm font-mono">₹{product.sellingPrice.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No spare products found. Add your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerRepairSparesPage;
