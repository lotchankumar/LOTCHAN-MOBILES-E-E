import React, { useState, useEffect } from 'react';
import { managerService } from '../services/manager.service';
import { useAuthStore } from '../store/auth.store';
import type { Purchase, InventoryProduct, PurchaseItemFrontend, ProductCategory, Supplier } from '../types';
import { User } from '../types';

const ManagerPurchasesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [inventory, setInventory] = useState<InventoryProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [supplier, setSupplier] = useState('');
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [items, setItems] = useState<{ productId: string; quantity: number; unitCost: number; sellingPrice: number; product?: InventoryProduct }[]>([]);
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
      const [purchasesData, inventoryData, categoriesData, suppliersData] = await Promise.all([
        managerService.getPurchases(),
        managerService.getInventory(),
        managerService.getCategories(),
        managerService.getSuppliers(),
      ]);
      setPurchases(purchasesData);
      setInventory(inventoryData);
      setCategories(categoriesData);
      setSuppliers(suppliersData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSupplierSelect = (supplierId: string) => {
    setSelectedSupplierId(supplierId);
    const selected = suppliers.find(s => s.id === supplierId);
    setSupplier(selected?.name || '');
  };

  const getCreditBalance = (): number | null => {
    if (!selectedSupplierId) return null;
    const selected = suppliers.find(s => s.id === selectedSupplierId);
    return selected?.creditBalance ?? null;
  };

  const validateForm = (): string | null => {
    if (!supplier.trim()) return 'Supplier is required';
    if (!invoiceNo.trim()) return 'Invoice number is required';
    if (items.length === 0) return 'Add at least one item';
    
    for (const item of items) {
      if (!item.productId) return 'Please fill all item fields with valid values';
      if (item.quantity <= 0) return 'Quantity must be greater than 0';
      if (item.unitCost <= 0) return 'Unit cost must be greater than 0';
      if (item.sellingPrice <= 0) return 'Selling price must be greater than 0';
    }
    return null;
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  const paidVal = parseFloat(paidAmount) || 0;
  const creditAmount = totalAmount - paidVal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!user?.id) {
      setError('Manager ID not found. Please log in.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const purchaseData = {
        managerId: user.id,
        supplier: supplier.trim(),
        supplierId: selectedSupplierId || undefined,
        invoiceNo: invoiceNo.trim(),
        paidAmount: paidVal > 0 ? paidVal : undefined,
        items: items.map(({ productId, quantity, unitCost, sellingPrice }) => ({ productId, quantity, unitCost, sellingPrice }))
      };
      await managerService.createPurchase(purchaseData);
      setSupplier('');
      setSelectedSupplierId('');
      setInvoiceNo('');
      setPaidAmount('');
      setItems([]);
      setShowForm(false);
      await loadData(); // Refresh list
    } catch (err: any) {
      setError(err.message || 'Failed to create purchase');
    } finally {
      setSubmitting(false);
    }
  };

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, unitCost: 0, sellingPrice: 0, product: undefined }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'productId' | 'quantity' | 'unitCost' | 'sellingPrice', value: string | number) => {
    const newItems = [...items];
    if (field === 'productId') {
      const product = inventory.find(p => p.id === value);
      newItems[index] = { 
        ...newItems[index], 
        productId: value as string, 
        product, 
        unitCost: product?.costPrice || newItems[index].unitCost,
        sellingPrice: product?.sellingPrice || newItems[index].sellingPrice
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: Number(value) };
    }
    setItems(newItems);
  };

  // Filter inventory by category and search
  const filteredInventory = inventory.filter(p => {
    const matchesSearch = 
      p.brand.toLowerCase().includes(productSearch.toLowerCase()) || 
      p.model?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = !categoryFilter || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  const credit = getCreditBalance();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Purchases Management</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Record New Purchase
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mb-6">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Record New Purchase</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Supplier Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Supplier</label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => handleSupplierSelect(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Manual Entry --</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} {s.creditBalance ? `(Due: ₹${s.creditBalance.toFixed(2)})` : ''}
                    </option>
                  ))}
                </select>
                {credit !== null && (
                  <div className={`text-xs mt-1 ${credit > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    Outstanding Credit: ₹{credit.toFixed(2)}
                  </div>
                )}
              </div>
              {/* Supplier Name (manual) */}
              <div>
                <label className="block text-sm font-medium mb-2">Supplier Name</label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => {
                    setSupplier(e.target.value);
                    if (!e.target.value) setSelectedSupplierId('');
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Supplier name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Invoice No</label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="INV-001"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Paid Amount (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Credit Summary */}
            {totalAmount > 0 && (
              <div className={`p-3 rounded-lg text-sm font-medium ${
                creditAmount > 0 ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' : 'bg-green-50 text-green-800 border border-green-200'
              }`}>
                Total: ₹{totalAmount.toFixed(2)} | Paid: ₹{paidVal.toFixed(2)} | 
                {creditAmount > 0 ? ` Credit/Unpaid: ₹${creditAmount.toFixed(2)}` : ' Fully Paid'}
                {selectedSupplierId && creditAmount > 0 && (
                  <span className="ml-2">(Will be auto-recorded to supplier credit)</span>
                )}
              </div>
            )}

            {/* Category & Search Filters for Items */}
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
                  placeholder="Search by brand, model or SKU..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-3">
                Items (Product, Category, Cost Price, Selling Price)
              </label>
              {items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product</label>
                      <select
                        value={item.productId}
                        onChange={(e) => updateItem(index, 'productId', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select product...</option>
                        {filteredInventory.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.brand} {p.model} ({p.sku}) - Stock: {p.stockQuantity}
                          </option>
                        ))}
                      </select>
                      {item.product && (
                        <div className="text-xs text-gray-500 mt-1">
                          Category: {item.product.categoryName || item.product.category}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cost Price (₹)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => updateItem(index, 'unitCost', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-lg">
                        ₹{(item.quantity * item.unitCost).toFixed(2)}
                      </span>
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
              <button
                type="button"
                onClick={addItem}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
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
                  setSelectedSupplierId('');
                  setInvoiceNo('');
                  setPaidAmount('');
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

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Detail</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{purchase.invoiceNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">₹{purchase.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(purchase as any).paidAmount > 0 ? `₹${parseFloat((purchase as any).paidAmount).toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.items.length} items</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(purchase.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">
                    {purchase.items.map((item, i) => (
                      <span key={i} className="inline-block bg-gray-100 rounded px-2 py-0.5 mr-1 mb-1 text-xs">
                        {item.product.brand} {item.product.model} × {item.quantity}
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
                  No purchases found. Add your first purchase above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerPurchasesPage;
