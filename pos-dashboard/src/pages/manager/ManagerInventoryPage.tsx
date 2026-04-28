import { useState, useEffect } from 'react';
import { managerService, type ProductInventory, type ProductUpdateRequest, type CreateProductRequest, type ProductCategory } from '../../services/manager.service';
import { AlertTriangle, PackageOpen, Plus } from 'lucide-react';

export const ManagerInventoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inventory, setInventory] = useState<ProductInventory[]>([]);
  const [lowStock, setLowStock] = useState<ProductInventory[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProductUpdateRequest>({
    costPrice: 0,
    sellingPrice: 0,
    reorderLevel: 0,
  });

  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProductForm, setNewProductForm] = useState<CreateProductRequest>({
    sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: '',
    brand: '',
    model: '',
    category: 'MOBILE',
    price: 0,
    cost: 0,
    stockQty: 0,
    minStock: 5,
  });

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Fetch inventory and low stock
  useEffect(() => {
    fetchInventory();
    fetchLowStock();
    fetchCategories();
  }, []);

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
      const data = await managerService.getInventory();
      setInventory(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStock = async () => {
    try {
      const data = await managerService.getLowStock();
      setLowStock(data);
    } catch (err: any) {
      console.error('Failed to load low stock products:', err);
    }
  };

  const handleEditClick = (product: ProductInventory) => {
    setEditingProduct(product.id);
    setEditForm({
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      reorderLevel: product.reorderLevel || 0,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({
      costPrice: 0,
      sellingPrice: 0,
      reorderLevel: 0,
    });
  };

  const handleSaveEdit = async (productId: string) => {
    if (!editForm.costPrice || !editForm.sellingPrice) {
      alert('Please fill in all required fields');
      return;
    }

    if (editForm.costPrice <= 0 || editForm.sellingPrice <= 0) {
      alert('Cost and selling price must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      await managerService.updateProduct(productId, editForm);
      setEditingProduct(null);
      fetchInventory();
      fetchLowStock();
      alert('Product updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProductUpdateRequest, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: field === 'reorderLevel' ? (value === '' ? null : parseInt(value) || 0) : parseFloat(value) || 0
    }));
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setLoading(true);
      const created = await managerService.createCategory({ name: newCategoryName });
      setCategories(prev => [...prev, created]);
      setNewProductForm(prev => ({ ...prev, categoryId: created.id, category: 'ACCESSORY' }));
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
    if (!newProductForm.brand || !newProductForm.category || newProductForm.price <= 0 || newProductForm.cost <= 0) {
      alert('Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    try {
      const name = `${newProductForm.brand} ${newProductForm.model || ''}`.trim();
      await managerService.createProduct({
        ...newProductForm,
        name,
      });
      setShowNewProduct(false);
      setNewProductForm({
        sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: '',
        brand: '',
        model: '',
        category: 'MOBILE',
        price: 0,
        cost: 0,
        stockQty: 0,
        minStock: 5,
      });
      fetchInventory();
      alert('Product created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Inventory Management</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowNewProduct(true)}
            disabled={loading}
            className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> New Product
          </button>
          <button
            onClick={fetchInventory}
            disabled={loading}
            className="btn-secondary py-2 px-4 text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        </div>
      )}

      {showNewProduct && (
        <div className="card p-6 border-2 border-primary/20">
          <h3 className="text-lg font-medium text-foreground mb-6">Add New Product</h3>
          <form onSubmit={handleCreateProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Brand *</label>
                <input
                  type="text"
                  required
                  value={newProductForm.brand}
                  onChange={(e) => setNewProductForm(p => ({ ...p, brand: e.target.value }))}
                  className="input-field"
                  placeholder="e.g. Samsung"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Model</label>
                <input
                  type="text"
                  value={newProductForm.model}
                  onChange={(e) => setNewProductForm(p => ({ ...p, model: e.target.value }))}
                  className="input-field"
                  placeholder="e.g. Galaxy S24"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-muted-foreground">Category *</label>
                  <button
                    type="button"
                    onClick={() => setIsNewCategory(!isNewCategory)}
                    className="text-xs text-primary hover:underline flex items-center bg-secondary px-1 py-0.5 rounded"
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
                      className="input-field sm:text-sm"
                      placeholder="New Name"
                    />
                    <button 
                      type="button" 
                      onClick={handleCreateCategory}
                      disabled={!newCategoryName.trim() || loading}
                      className="btn-primary px-3 py-1 text-xs whitespace-nowrap"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <select
                    required
                    value={newProductForm.categoryId || newProductForm.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (['MOBILE', 'ACCESSORY', 'SIM_CARD'].includes(val)) {
                        setNewProductForm(p => ({ ...p, category: val as any, categoryId: undefined }));
                      } else {
                        setNewProductForm(p => ({ ...p, categoryId: val, category: 'ACCESSORY' }));
                      }
                    }}
                    className="input-field"
                  >
                    <option value="MOBILE">Mobile</option>
                    <option value="ACCESSORY">Accessory</option>
                    <option value="SIM_CARD">SIM Card</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">SKU</label>
                <input
                  type="text"
                  value={newProductForm.sku}
                  onChange={(e) => setNewProductForm(p => ({ ...p, sku: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Cost Price (₹) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={newProductForm.cost}
                  onChange={(e) => setNewProductForm(p => ({ ...p, cost: parseFloat(e.target.value) || 0 }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={newProductForm.price}
                  onChange={(e) => setNewProductForm(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Initial Stock *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newProductForm.stockQty}
                  onChange={(e) => setNewProductForm(p => ({ ...p, stockQty: parseInt(e.target.value) || 0 }))}
                  className="input-field font-bold text-primary"
                  title="This will be the starting stock count for this item"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Min Stock Alert</label>
                <input
                  type="number"
                  min="0"
                  value={newProductForm.minStock}
                  onChange={(e) => setNewProductForm(p => ({ ...p, minStock: parseInt(e.target.value) || 0 }))}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setShowNewProduct(false)}
                className="btn-secondary py-2 px-4 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-2 px-6 text-sm font-bold"
              >
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">Low Stock Alert</h3>
              <div className="mt-2 text-sm text-destructive">
                <p>{lowStock.length} product(s) are below reorder level and need attention.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-foreground mb-6">Product Inventory</h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading inventory...</p>
          </div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-8">
            <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No products found in inventory.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Cost Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Selling Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Reorder Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {inventory.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-secondary ${product.needsReorder ? 'bg-destructive/5' : ''
                      }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {product.brand} {product.model}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            SKU: {product.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.category === 'MOBILE' ? 'bg-primary/20 text-primary-dark' :
                          product.category === 'ACCESSORY' ? 'bg-success/20 text-success' :
                            'bg-accent/20 text-accent-dark'
                        }`}>
                        {product.categoryName ? product.categoryName : product.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">{product.stockQuantity}</div>
                      {product.reorderLevel !== null && (
                        <div className="text-xs text-muted-foreground">
                          Reorder at: {product.reorderLevel}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {editingProduct === product.id ? (
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={editForm.costPrice}
                          onChange={(e) => handleInputChange('costPrice', e.target.value)}
                          className="input-field w-32 sm:text-sm"
                        />
                      ) : (
                        `₹${product.costPrice.toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {editingProduct === product.id ? (
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={editForm.sellingPrice}
                          onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                          className="input-field w-32 sm:text-sm"
                        />
                      ) : (
                        `₹${product.sellingPrice.toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {editingProduct === product.id ? (
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={editForm.reorderLevel || ''}
                          onChange={(e) => handleInputChange('reorderLevel', e.target.value)}
                          className="input-field w-24 sm:text-sm"
                          placeholder="Optional"
                        />
                      ) : product.reorderLevel !== null ? (
                        product.reorderLevel
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.needsReorder
                          ? 'bg-destructive/20 text-destructive'
                          : product.stockQuantity <= (product.reorderLevel || 0) + 5
                            ? 'bg-warning/20 text-warning-foreground'
                            : 'bg-success/20 text-success'
                        }`}>
                        {product.needsReorder ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingProduct === product.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveEdit(product.id)}
                            disabled={loading}
                            className="text-success hover:text-success disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-primary hover:text-primary-dark"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Total Products</div>
          <div className="text-2xl font-bold text-foreground">{inventory.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Low Stock Items</div>
          <div className="text-2xl font-bold text-destructive">{lowStock.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Total Inventory Value</div>
          <div className="text-2xl font-bold text-foreground">
            ₹{inventory.reduce((sum, product) => sum + (product.costPrice * product.stockQuantity), 0).toFixed(2)}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Avg. Margin</div>
          <div className="text-2xl font-bold text-success">
            {inventory.length > 0
              ? `${((inventory.reduce((sum, product) => sum + ((product.sellingPrice - product.costPrice) / product.costPrice * 100), 0) / inventory.length) || 0).toFixed(1)}%`
              : '0%'
            }
          </div>
        </div>
      </div>
    </div>
  );
};