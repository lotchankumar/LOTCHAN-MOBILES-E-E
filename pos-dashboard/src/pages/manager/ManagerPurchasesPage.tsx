import { useState, useEffect } from 'react';
import { managerService, type CreatePurchaseRequest, type PurchaseItem, type Supplier, type ProductCategory, type RepairSpareProduct, type RepairSparePurchaseItem } from '../../services/manager.service';
import { useAuthStore } from '../../store/auth.store';
import { AlertTriangle, ShoppingCart, Plus } from 'lucide-react';

export const ManagerPurchasesPage = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unifiedPurchases, setUnifiedPurchases] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [spareProducts, setSpareProducts] = useState<RepairSpareProduct[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddItemSection, setShowAddItemSection] = useState(true);

  const [isNewSupplier, setIsNewSupplier] = useState(false);
  const [newSupplierData, setNewSupplierData] = useState({ name: '', phone: '', email: '' });
  const [isEditingSupplier, setIsEditingSupplier] = useState(false);
  const [editingSupplierData, setEditingSupplierData] = useState({ id: '', name: '', phone: '', email: '' });
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [isNewSpare, setIsNewSpare] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [formData, setFormData] = useState<CreatePurchaseRequest>({
    managerId: user?.id || '',
    supplier: '',
    supplierId: '',
    invoiceNo: '',
    paidAmount: 0,
    notes: '',
    items: [],
    spareItems: [],
  });

  const [itemType, setItemType] = useState<'PRODUCT' | 'SPARE'>('PRODUCT');

  const [newItem, setNewItem] = useState<PurchaseItem>({
    productId: '',
    quantity: 1,
    unitCost: 0,
    isNewProduct: false,
    brand: '',
    model: '',
    category: 'MOBILE',
    sellingPrice: 0,
  });

  const [newSpareItem, setNewSpareItem] = useState<RepairSparePurchaseItem>({
    spareProductId: '',
    quantity: 1,
    unitCost: 0,
    sellingPrice: 0,
  });

  const [newSpareData, setNewSpareData] = useState({
    name: '',
    brand: '',
    model: '',
    sku: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Fetch purchases, products, categories, and suppliers
  useEffect(() => {
    fetchPurchases();
    fetchProducts();
    fetchSpareProducts();
    fetchSuppliers();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '' && filterBrand === 'ALL' && filterCategory === 'ALL') {
      setFilteredProducts([]);
    } else {
      if (itemType === 'PRODUCT') {
        const filtered = products.filter(product => {
          const matchSearch = searchTerm.trim() === '' || 
            (product.model?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (product.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (product.sku?.toLowerCase() || '').includes(searchTerm.toLowerCase());
          const matchBrand = filterBrand === 'ALL' || product.brand === filterBrand;
          const matchCategory = filterCategory === 'ALL' || product.category === filterCategory || product.categoryId === filterCategory;
          return matchSearch && matchBrand && matchCategory;
        });
        setFilteredProducts(filtered.slice(0, 10));
      } else {
        const filtered = spareProducts.filter(product => {
          const matchSearch = searchTerm.trim() === '' || 
            (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (product.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (product.sku?.toLowerCase() || '').includes(searchTerm.toLowerCase());
          const matchBrand = filterBrand === 'ALL' || product.brand === filterBrand;
          return matchSearch && matchBrand;
        });
        setFilteredProducts(filtered.slice(0, 10));
      }
    }
  }, [searchTerm, filterBrand, filterCategory, products, spareProducts, itemType]);

  const fetchPurchases = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await managerService.getPurchases();
      const spareData = await managerService.getRepairSparePurchases();
      
      const combinedMap = new Map();
      
      data.forEach(p => {
        combinedMap.set(p.invoiceNo, {
          id: p.id,
          invoiceNo: p.invoiceNo,
          supplier: p.supplier,
          purchaseDate: p.purchaseDate,
          totalAmount: p.totalAmount,
          items: p.items.map(item => ({
             type: 'PRODUCT',
             name: `${item.product.brand} ${item.product.model}`,
             sku: item.product.sku,
             quantity: item.quantity,
          }))
        });
      });
      
      spareData.forEach(p => {
        if (combinedMap.has(p.invoiceNo)) {
           const existing = combinedMap.get(p.invoiceNo);
           existing.totalAmount += p.totalAmount;
           existing.items.push(...p.items.map(item => ({
             type: 'SPARE',
             name: item.spareProduct?.name || 'Unknown Part',
             sku: item.spareProduct?.sku,
             quantity: item.quantity,
           })));
        } else {
           combinedMap.set(p.invoiceNo, {
             id: p.id,
             invoiceNo: p.invoiceNo,
             supplier: p.supplier,
             purchaseDate: p.purchaseDate,
             totalAmount: p.totalAmount,
             items: p.items.map(item => ({
               type: 'SPARE',
               name: item.spareProduct?.name || 'Unknown Part',
               sku: item.spareProduct?.sku,
               quantity: item.quantity,
             }))
           });
        }
      });
      
      const combinedList = Array.from(combinedMap.values()).sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime());
      setUnifiedPurchases(combinedList);
    } catch (err: any) {
      setError(err.message || 'Failed to load purchases');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await managerService.getInventory();
      setProducts(data);
    } catch (err: any) {
      console.error('Failed to load products:', err);
    }
  };

  const fetchSpareProducts = async () => {
    try {
      const data = await managerService.getRepairSpareProducts();
      setSpareProducts(data);
    } catch (err: any) {
      console.error('Failed to load spare products:', err);
    }
  };

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

  const handleCreateSupplier = async () => {
    if (!newSupplierData.name.trim()) {
      alert('Supplier name is required');
      return;
    }
    try {
      setLoading(true);
      const createdSupplier = await managerService.createSupplier(newSupplierData);
      setSuppliers(prev => [...prev, createdSupplier]);
      setFormData(prev => ({ 
        ...prev, 
        supplierId: createdSupplier.id,
        supplier: createdSupplier.name
      }));
      setIsNewSupplier(false);
      setNewSupplierData({ name: '', phone: '', email: '' });
    } catch (err: any) {
      alert(err.message || 'Failed to create supplier');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSupplier = async () => {
    if (!editingSupplierData.name.trim()) {
      alert('Supplier name is required');
      return;
    }
    try {
      setLoading(true);
      const updatedSupplier = await managerService.updateSupplier(editingSupplierData.id, {
        name: editingSupplierData.name,
        phone: editingSupplierData.phone,
        email: editingSupplierData.email
      });
      setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
      setFormData(prev => ({ 
        ...prev, 
        supplier: updatedSupplier.name
      }));
      setIsEditingSupplier(false);
    } catch (err: any) {
      alert(err.message || 'Failed to update supplier');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setLoading(true);
      const created = await managerService.createCategory({ name: newCategoryName });
      setCategories(prev => [...prev, created]);
      setNewItem(prev => ({ ...prev, categoryId: created.id, category: 'ACCESSORY' }));
      setIsNewCategory(false);
      setNewCategoryName('');
    } catch (err: any) {
      alert(err.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    if (itemType === 'PRODUCT') {
      if (isNewProduct) {
        if (!newItem.brand || !newItem.category || newItem.quantity <= 0 || newItem.unitCost <= 0) {
          alert('Please fill all new product fields correctly');
          return;
        }
      } else {
        if (!newItem.productId || newItem.quantity <= 0 || newItem.unitCost <= 0) {
          alert('Please select an existing product and valid quantities');
          return;
        }
      }

      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { ...newItem, isNewProduct }]
      }));

      // Reset new item
      setNewItem({
        productId: '',
        quantity: 1,
        unitCost: 0,
        isNewProduct: false,
        brand: '',
        model: '',
        category: 'MOBILE',
        categoryId: '',
        sellingPrice: 0,
      });
    } else {
      if (!newSpareItem.spareProductId || newSpareItem.quantity <= 0 || newSpareItem.unitCost <= 0) {
        alert('Please select an existing spare part and valid quantities');
        return;
      }

      setFormData(prev => ({
        ...prev,
        spareItems: [...(prev.spareItems || []), { ...newSpareItem }]
      }));

      setNewSpareItem({
        spareProductId: '',
        quantity: 1,
        unitCost: 0,
        sellingPrice: 0,
      });
    }
    
    setSearchTerm('');
    setFilterBrand('ALL');
    setFilterCategory('ALL');
    setShowProductDropdown(false);
    setIsNewProduct(false);
    setIsNewSpare(false);
  };

  const handleSaveSpare = async () => {
    if (!newSpareData.name || newSpareItem.unitCost <= 0) {
      alert('Please fill all new spare part fields correctly (Name, Unit Cost)');
      return;
    }

    setLoading(true);
    try {
      const sku = `SP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const created = await managerService.createRepairSpareProduct({
        sku,
        name: newSpareData.name,
        brand: newSpareData.brand || 'Generic',
        purchasePrice: newSpareItem.unitCost || 0,
        sellingPrice: newSpareItem.sellingPrice || 0,
        stockQty: 0,
        minStock: 5,
      });
      
      setFormData(prev => ({
        ...prev,
        spareItems: [...(prev.spareItems || []), { ...newSpareItem, spareProductId: created.id }]
      }));
      
      fetchSpareProducts();
      
      setNewSpareItem({
        spareProductId: '',
        quantity: 1,
        unitCost: 0,
        sellingPrice: 0,
      });
      setNewSpareData({ name: '', brand: '', model: '', sku: '' });
      setIsNewSpare(false);
      alert('Spare part saved to catalog and added to purchase!');
    } catch (err: any) {
      alert(err.message || 'Failed to save spare part');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!newItem.brand || !newItem.category || newItem.unitCost <= 0) {
      alert('Please fill all new product fields correctly (Brand, Category, Unit Cost)');
      return;
    }

    setLoading(true);
    try {
      const sku = `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const name = `${newItem.brand} ${newItem.model || ''}`.trim();
      
      const created = await managerService.createProduct({
        sku,
        name,
        brand: newItem.brand,
        model: newItem.model,
        category: newItem.category as any,
        categoryId: newItem.categoryId || undefined,
        price: newItem.sellingPrice || 0,
        cost: newItem.unitCost || 0,
        stockQty: 0,
      });
      
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { ...newItem, productId: created.id, isNewProduct: false }]
      }));
      
      fetchProducts();
      
      setNewItem({
        productId: '',
        quantity: 1,
        unitCost: 0,
        isNewProduct: false,
        brand: '',
        model: '',
        category: 'MOBILE',
        categoryId: '',
        sellingPrice: 0,
      });
      setIsNewProduct(false);
      alert('Product saved to catalog and added to purchase!');
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProductItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveSpareItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      spareItems: (prev.spareItems || []).filter((_, i) => i !== index)
    }));
  };

  const handleProductSelect = (product: any) => {
    if (itemType === 'PRODUCT') {
      setNewItem(prev => ({
        ...prev,
        productId: product.id,
        unitCost: product.costPrice,
      }));
      setSearchTerm(`${product.brand} ${product.model} (${product.sku})`);
    } else {
      setNewSpareItem(prev => ({
        ...prev,
        spareProductId: product.id,
        unitCost: product.purchasePrice,
        sellingPrice: product.sellingPrice,
      }));
      setSearchTerm(`${product.name} (${product.sku})`);
    }
    setShowProductDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasProducts = formData.items.length > 0;
    const hasSpares = (formData.spareItems || []).length > 0;

    if (!hasProducts && !hasSpares) {
      alert('Please add at least one item (product or spare part)');
      return;
    }

    setLoading(true);
    try {
      let finalSupplierId = formData.supplierId;
      let finalSupplierName = formData.supplier;

      // Auto-create supplier if new
      if (isNewSupplier) {
        if (!newSupplierData.name) {
          throw new Error('Supplier name is required for new supplier');
        }
        const createdSupplier = await managerService.createSupplier(newSupplierData);
        finalSupplierId = createdSupplier.id;
        finalSupplierName = createdSupplier.name;
        setSuppliers(prev => [...prev, createdSupplier]);
      } else {
        if (!finalSupplierId) {
           throw new Error('Please select a supplier or create a new one');
        }
      }

      if (!formData.invoiceNo.trim()) {
        throw new Error('Invoice number is required');
      }

      await managerService.createPurchase({
        ...formData,
        supplier: finalSupplierName,
        supplierId: finalSupplierId,
        managerId: user?.id || '',
      });
      
      // Reset form
      setFormData({
        managerId: user?.id || '',
        supplier: '',
        supplierId: '',
        invoiceNo: '',
        paidAmount: 0,
        notes: '',
        items: [],
        spareItems: [],
      });
      setIsNewSupplier(false);
      setNewSupplierData({ name: '', phone: '', email: '' });
      setShowForm(false);
      fetchPurchases();
      fetchProducts();
      fetchSpareProducts();
      
      alert('Purchase recorded successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create purchase');
    } finally {
      setLoading(false);
    }
  };

  const productTotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  const spareTotal = (formData.spareItems || []).reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  const grandTotal = productTotal + spareTotal;

  const availableBrands = Array.from(new Set(
    (itemType === 'PRODUCT' ? products : spareProducts)
      .map(p => p.brand)
      .filter(Boolean)
  )).sort();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Purchases Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) setShowAddItemSection(true);
          }}
          className="btn-primary py-2 px-4 text-sm font-medium"
        >
          {showForm ? 'Cancel' : 'New Purchase'}
        </button>
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

      {/* Purchase Form */}
      {showForm && (
        <div className="card p-6">
          <h3 className="text-lg font-medium text-foreground mb-6">Record New Purchase</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-muted-foreground">
                    Supplier
                  </label>
                  <div className="flex gap-2">
                    {!isNewSupplier && !isEditingSupplier && formData.supplierId && (
                      <button
                        type="button"
                        onClick={() => {
                          const sup = suppliers.find(s => s.id === formData.supplierId);
                          if (sup) {
                            setEditingSupplierData({ id: sup.id, name: sup.name, phone: sup.phone || '', email: sup.email || '' });
                            setIsEditingSupplier(true);
                          }
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (isEditingSupplier) {
                          setIsEditingSupplier(false);
                        } else {
                          setIsNewSupplier(!isNewSupplier);
                        }
                      }}
                      className="text-xs text-primary hover:underline flex items-center"
                    >
                      {isNewSupplier || isEditingSupplier ? 'Cancel' : <><Plus className="h-3 w-3 mr-1" /> Add New</>}
                    </button>
                  </div>
                </div>
                {isNewSupplier ? (
                  <div className="space-y-3 p-3 bg-secondary rounded-lg border border-border">
                    <input
                      type="text"
                      value={newSupplierData.name}
                      onChange={(e) => setNewSupplierData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="Supplier Name *"
                    />
                    <input
                      type="text"
                      value={newSupplierData.phone}
                      onChange={(e) => setNewSupplierData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="Phone Number"
                    />
                    <button 
                      type="button" 
                      onClick={handleCreateSupplier}
                      disabled={!newSupplierData.name.trim() || loading}
                      className="w-full btn-primary py-1.5 px-3 text-sm font-medium"
                    >
                      Save Supplier
                    </button>
                  </div>
                ) : isEditingSupplier ? (
                  <div className="space-y-3 p-3 bg-secondary rounded-lg border border-border">
                    <input
                      type="text"
                      value={editingSupplierData.name}
                      onChange={(e) => setEditingSupplierData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="Supplier Name *"
                    />
                    <input
                      type="text"
                      value={editingSupplierData.phone}
                      onChange={(e) => setEditingSupplierData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="Phone Number"
                    />
                    <button 
                      type="button" 
                      onClick={handleUpdateSupplier}
                      disabled={!editingSupplierData.name.trim() || loading}
                      className="w-full btn-primary py-1.5 px-3 text-sm font-medium"
                    >
                      Update Supplier
                    </button>
                  </div>
                ) : (
                  <select
                    value={formData.supplierId}
                    onChange={(e) => {
                      const sup = suppliers.find(s => s.id === e.target.value);
                      setFormData(prev => ({ 
                        ...prev, 
                        supplierId: e.target.value,
                        supplier: sup ? sup.name : ''
                      }));
                    }}
                    className="input-field sm:text-sm"
                  >
                    <option value="">Select a supplier...</option>
                    {suppliers.map(sup => (
                      <option key={sup.id} value={sup.id}>{sup.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2 mt-7">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={formData.invoiceNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, invoiceNo: e.target.value }))}
                  className="input-field sm:text-sm"
                  placeholder="Enter invoice number"
                />
              </div>
            </div>

            {/* Add Item Section */}
            <div className="bg-secondary p-4 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  Add Items to Purchase
                  {(formData.items.length > 0 || (formData.spareItems && formData.spareItems.length > 0)) && (
                    <button
                      type="button"
                      onClick={() => setShowAddItemSection(!showAddItemSection)}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                    >
                      {showAddItemSection ? 'Done Adding' : 'Add More Items'}
                    </button>
                  )}
                </h4>
                {showAddItemSection && (
                  <div className="flex gap-4 items-center">
                    <select 
                      value={itemType} 
                      onChange={(e) => {
                        setItemType(e.target.value as 'PRODUCT'|'SPARE');
                        setSearchTerm('');
                        setFilterBrand('ALL');
                        setFilterCategory('ALL');
                        setShowProductDropdown(false);
                        setIsNewProduct(false);
                        setIsNewSpare(false);
                      }}
                      className="input-field sm:text-sm py-1 h-auto"
                    >
                      <option value="PRODUCT">Sales Product</option>
                      <option value="SPARE">Repair Spare Part</option>
                    </select>
                    {itemType === 'PRODUCT' ? (
                      <button
                        type="button"
                        onClick={() => setIsNewProduct(!isNewProduct)}
                        className="text-xs text-primary hover:underline flex items-center"
                      >
                        {isNewProduct ? 'Search Existing' : <><Plus className="h-3 w-3 mr-1" /> Add New Product</>}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsNewSpare(!isNewSpare)}
                        className="text-xs text-primary hover:underline flex items-center"
                      >
                        {isNewSpare ? 'Search Existing' : <><Plus className="h-3 w-3 mr-1" /> Add New Spare Part</>}
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {showAddItemSection && (
                <>
                  {itemType === 'PRODUCT' && isNewProduct ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Brand *</label>
                    <input
                      type="text"
                      value={newItem.brand}
                      onChange={(e) => setNewItem(prev => ({ ...prev, brand: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="e.g. Samsung"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Model / Name</label>
                    <input
                      type="text"
                      value={newItem.model}
                      onChange={(e) => setNewItem(prev => ({ ...prev, model: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="e.g. Galaxy S23"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs text-muted-foreground">Category *</label>
                      <button
                        type="button"
                        onClick={() => setIsNewCategory(!isNewCategory)}
                        className="text-xs text-primary hover:underline flex items-center bg-secondary px-1 py-0.5 rounded"
                      >
                        {isNewCategory ? 'Cancel' : <Plus className="h-3 w-3" />}
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
                          className="btn-primary px-3 py-1 text-xs"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <select
                        value={newItem.categoryId || newItem.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (['MOBILE', 'ACCESSORY', 'SIM_CARD'].includes(val)) {
                            setNewItem(prev => ({ ...prev, category: val, categoryId: '' }));
                          } else {
                            setNewItem(prev => ({ ...prev, categoryId: val, category: 'ACCESSORY' }));
                          }
                        }}
                        className="input-field sm:text-sm"
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
                    <label className="block text-xs text-muted-foreground mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={newItem.sellingPrice || ''}
                      onChange={(e) => setNewItem(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                      className="input-field sm:text-sm"
                    />
                  </div>
                </div>
              ) : itemType === 'SPARE' && isNewSpare ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Part Name *</label>
                    <input
                      type="text"
                      value={newSpareData.name}
                      onChange={(e) => setNewSpareData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="e.g. iPhone Screen"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Brand</label>
                    <input
                      type="text"
                      value={newSpareData.brand}
                      onChange={(e) => setNewSpareData(prev => ({ ...prev, brand: e.target.value }))}
                      className="input-field sm:text-sm"
                      placeholder="e.g. Apple"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={newSpareItem.sellingPrice || ''}
                      onChange={(e) => setNewSpareItem(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                      className="input-field sm:text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Search & Filter {itemType === 'PRODUCT' ? 'Product' : 'Spare Part'}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <select
                      value={filterBrand}
                      onChange={(e) => {
                         setFilterBrand(e.target.value);
                         setShowProductDropdown(true);
                      }}
                      className="input-field sm:text-sm sm:w-1/3"
                    >
                      <option value="ALL">All Brands</option>
                      {availableBrands.map(brand => (
                        <option key={brand} value={brand as string}>{brand as string}</option>
                      ))}
                    </select>
                    
                    {itemType === 'PRODUCT' && (
                      <select
                        value={filterCategory}
                        onChange={(e) => {
                           setFilterCategory(e.target.value);
                           setShowProductDropdown(true);
                        }}
                        className="input-field sm:text-sm sm:w-1/3"
                      >
                        <option value="ALL">All Categories</option>
                        <option value="MOBILE">Mobile</option>
                        <option value="ACCESSORY">Accessory</option>
                        <option value="SIM_CARD">SIM Card</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowProductDropdown(true);
                      }}
                      onFocus={() => setShowProductDropdown(true)}
                      className="input-field sm:text-sm"
                      placeholder={itemType === 'PRODUCT' ? "Search by brand, model, or SKU" : "Search by name, brand, or SKU"}
                    />
                    {showProductDropdown && filteredProducts.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-card shadow-lg rounded-md border border-border">
                        {filteredProducts.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => handleProductSelect(product)}
                            className="w-full text-left px-4 py-2 hover:bg-secondary focus:outline-none"
                          >
                            <div className="font-medium text-foreground">
                              {itemType === 'PRODUCT' ? `${product.brand} ${product.model}` : product.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {product.sku} • Stock: {itemType === 'PRODUCT' ? product.stockQuantity : product.stockQty}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Cost: ₹{(itemType === 'PRODUCT' ? product.costPrice : product.purchasePrice)?.toFixed(2) || '0.00'}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-t border-border pt-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={itemType === 'PRODUCT' ? newItem.quantity : newSpareItem.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      if (itemType === 'PRODUCT') setNewItem(prev => ({ ...prev, quantity: val }));
                      else setNewSpareItem(prev => ({ ...prev, quantity: val }));
                    }}
                    className="input-field sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Unit Cost (₹)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={itemType === 'PRODUCT' ? newItem.unitCost : newSpareItem.unitCost}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      if (itemType === 'PRODUCT') setNewItem(prev => ({ ...prev, unitCost: val }));
                      else setNewSpareItem(prev => ({ ...prev, unitCost: val }));
                    }}
                    className="input-field sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {itemType === 'PRODUCT' ? (
                  isNewProduct ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSaveProduct}
                        disabled={loading}
                        className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save Product & Add'}
                      </button>
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="btn-secondary py-2 px-4 text-sm font-medium"
                      >
                        Add Without Saving
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="btn-primary py-2 px-4 text-sm font-medium"
                    >
                      Add Product
                    </button>
                  )
                ) : (
                  isNewSpare ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSaveSpare}
                        disabled={loading}
                        className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save Spare & Add'}
                      </button>
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="btn-secondary py-2 px-4 text-sm font-medium"
                      >
                        Add Without Saving
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="btn-primary py-2 px-4 text-sm font-medium"
                    >
                      Add Spare Part
                    </button>
                  )
                )}
              </div>
              </>
              )}
            </div>

            {/* Items List */}
            {(formData.items.length > 0 || (formData.spareItems && formData.spareItems.length > 0)) && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Items in Purchase</h4>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Item Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Unit Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {formData.items.map((item, index) => {
                        const product = products.find(p => p.id === item.productId);
                        return (
                          <tr key={`prod-${index}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">Product</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-foreground">
                                {product ? `${product.brand} ${product.model}` : 'Product not found'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {product?.sku}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              ₹{item.unitCost.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                              ₹{(item.quantity * item.unitCost).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => handleRemoveProductItem(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {formData.spareItems && formData.spareItems.map((item, index) => {
                        const product = spareProducts.find(p => p.id === item.spareProductId);
                        return (
                          <tr key={`spare-${index}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-secondary text-foreground rounded text-xs font-medium border border-border">Spare Part</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-foreground">
                                {product ? product.name : 'Part not found'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {product?.sku}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              ₹{item.unitCost.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                              ₹{(item.quantity * item.unitCost).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => handleRemoveSpareItem(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-secondary">
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-sm font-medium text-foreground text-right">
                          Grand Total:
                        </td>
                        <td colSpan={2} className="px-6 py-4 text-lg font-bold text-foreground">
                          ₹{grandTotal.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (formData.items.length === 0 && (!formData.spareItems || formData.spareItems.length === 0))}
                className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Record Purchase'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Purchases History */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-foreground mb-6">Purchase History</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading purchases...</p>
          </div>
        ) : unifiedPurchases.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No purchases recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden border border-border rounded-lg">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Invoice No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {unifiedPurchases.map((purchase) => (
                  <tr key={purchase.invoiceNo} className="hover:bg-secondary">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {purchase.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {purchase.invoiceNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      <div className="space-y-1">
                        {purchase.items.map((item: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <span className="text-muted-foreground">
                              {item.type === 'SPARE' && <span className="mr-1 inline-block text-[10px] bg-secondary border border-border px-1 rounded">SPARE</span>}
                              {item.name} ({item.sku})
                            </span>
                            <span className="mx-2">×</span>
                            <span className="text-muted-foreground font-medium">{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                      ₹{purchase.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};