import React, { useState, useEffect } from 'react';
import { managerService } from '../services/manager.service';
import { useAuthStore } from '../store/auth.store';
import type { RepairSpareProduct, RepairSparePurchase, ProductCategory } from '../types';

const ManagerRepairSparePurchasesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [purchases, setPurchases] = useState<RepairSparePurchase[]>([]);
  const [products, setProducts] = useState<RepairSpareProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [supplier, setSupplier] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<{
    spareProductId: string;
    quantity: number;
    unitCost: number;
    sellingPrice: number;
    product?: RepairSpareProduct;
  }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [purchasesData, productsData, categoriesData] = await Promise.all([
        managerService.getRepairSparePurchases(),
        managerService.getRepairSpareProducts(),
        managerService.getCategories()
      ]);
      setPurchases(purchasesData);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier.trim()) { setError('Supplier is required'); return; }
    if (!invoiceNo.trim()) { setError('Invoice number is required'); return; }
    if (items.length === 0) { setError('Add at least one item'); return; }

    for (const item of items) {
      if (!item.spareProductId) { setError('Please select a product for each item'); return; }
      if (item.quantity <= 0) { setError('Quantity must be greater than 0'); return; }
      if (item.unitCost <= 0) { setError('Unit cost must be greater than 0'); return; }
      if (item.sellingPrice <= 0) { setError('Selling price must be greater than 0'); return; }
    }

    try {
      setSubmitting(true);
      setError('');
      await managerService.createRepairSparePurchase({
        supplier: supplier.trim(),
        invoiceNo: invoiceNo.trim(),
        notes: notes.trim() || undefined,
        items: items.map(({ spareProductId, quantity, unitCost, sellingPrice }) => ({
          spareProductId,
          quantity,
          unitCost,
          sellingPrice,
        })),
      });
      setSupplier('');
      setInvoiceNo('');
      setNotes('');
      setItems([]);
      setShowForm(false);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to create purchase');
    } finally {
      setSubmitting(false);
    }
  };

  const addItem = () => {
    setItems([...items, { spareProductId: '', quantity: 1, unitCost: 0, sellingPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: 'spareProductId' | 'quantity' | 'unitCost' | 'sellingPrice',
    value: string | number
  ) => {
    const newItems = [...items];
    if (field === 'spareProductId') {
      const product = products.find(p => p.id === value);
      newItems[index] = {
        ...newItems[index],
        spareProductId: value as string,
        product,
        unitCost: product?.purchasePrice || newItems[index].unitCost,
        sellingPrice: product?.sellingPrice || newItems[index].sellingPrice,
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: Number(value) };
    }
    setItems(newItems);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = !categoryFilter || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" /></div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Repair Spare Purchases</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          New Spare Purchase
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">New Repair Spare Purchase</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Supplier *</label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="Supplier name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Invoice No *</label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="SP-INV-001"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="Optional notes"
                />
              </div>
            </div>

            {/* Filters for items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
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
                <label className="block text-sm font-medium mb-1">Search Products</label>
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="Search by name, SKU or brand..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-3">Items</label>
              {items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium mb-1">Spare Product</label>
                      <select
                        value={item.spareProductId}
                        onChange={(e) => updateItem(index, 'spareProductId', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg"
                        required
                      >
                        <option value="">Select spare product...</option>
                        {filteredProducts.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.sku}) - Stock: {p.stockQuantity}
                          </option>
                        ))}
                      </select>
                      {item.product && (
                        <div className="text-xs text-gray-500 mt-1">
                          Brand: {item.product.brand} | Cost: ₹{item.product.purchasePrice}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Unit Cost (₹)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => updateItem(index, 'unitCost', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Selling Price (₹)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.sellingPrice}
                        onChange={(e) => updateItem(index, 'sellingPrice', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">₹{(item.quantity * item.unitCost).toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800 font-medium ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addItem} className="text-blue-600 hover:text-blue-800 font-medium">
                + Add Item
              </button>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
              >
                {submitting ? 'Creating...' : 'Create Purchase'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError('');
                  setSupplier('');
                  setInvoiceNo('');
                  setNotes('');
                  setItems([]);
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Purchases List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{purchase.invoiceNo}</td>
                <td className="px-4 py-3 text-sm">{purchase.supplier}</td>
                <td className="px-4 py-3 text-sm font-medium text-green-700">₹{purchase.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">{purchase.items.length} items</td>
                <td className="px-4 py-3 text-sm text-gray-500 max-w-[150px] truncate">{purchase.notes || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(purchase.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="max-w-xs truncate">
                    {purchase.items.map((item, i) => (
                      <span key={i} className="inline-block bg-gray-100 rounded px-2 py-0.5 mr-1 mb-1 text-xs">
                        {item.spareProduct?.name || 'Product'} × {item.quantity}
                        {item.sellingPrice ? ` @₹${item.sellingPrice}` : ''}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {purchases.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No repair spare purchases yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerRepairSparePurchasesPage;
