import React, { useState, useEffect, useCallback, useMemo, KeyboardEvent } from 'react';
import { useAuthStore } from '../store/auth.store';
import { staffService, type Product, type SaleItem, type CreateOrderData, type ProductCategory } from '../services/staff.service';
import { Trash2, Search, User, DollarSign, Percent, Edit3, Printer } from 'lucide-react';

interface CartItem extends SaleItem {
  product: Product;
  subtotal: number;
  discountAmount: number;
}

const TAX_RATE = 0.18; // 18% GST

export const SalesPage = () => {
  const { user } = useAuthStore();

  // Product state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalDiscountPercent, setTotalDiscountPercent] = useState(0);
  const [cartNotes, setCartNotes] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'UPI' | 'MIXED'>('CASH');
  const [tenderedAmount, setTenderedAmount] = useState(0);
  const [splitPayments, setSplitPayments] = useState<{ method: string; amount: number }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer state
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  // Debounced search/products load
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProducts();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, selectedCategory]);

  const loadCategories = async () => {
    try {
      const cats = await staffService.getCategories();
      setCategories([{ id: 'All', name: 'All' }, ...cats]);
    } catch (err) {
      console.error('Categories load failed');
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {
        search: searchTerm || undefined,
        categoryId: selectedCategory === 'All' ? undefined : selectedCategory,
      };
      const data = await staffService.getProducts(filters);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Cart calculations
  const subtotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0),
    [cart]
  );

  const discountTotal = useMemo(() => 
    subtotal * (totalDiscountPercent / 100),
    [subtotal, totalDiscountPercent]
  );

  const taxAmount = useMemo(() => 
    (subtotal - discountTotal) * TAX_RATE,
    [subtotal, discountTotal]
  );

  const grandTotal = useMemo(() => 
    subtotal - discountTotal + taxAmount,
    [subtotal, discountTotal, taxAmount]
  );

  const changeDue = useMemo(() => 
    tenderedAmount - grandTotal,
    [tenderedAmount, grandTotal]
  );

  const addToCart = useCallback((product: Product, qty = 1) => {
    if (product.stockQuantity < qty) return;

    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
      if (existing.quantity + qty <= product.stockQuantity) {
        setCart(prev => prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        ));
      }
    } else {
      const newItem: CartItem = {
        productId: product.id,
        product,
        quantity: qty,
        price: product.sellingPrice,
        discountPercent: 0,
        notes: '',
        subtotal: product.sellingPrice * qty,
        discountAmount: 0,
      };
      setCart(prev => [...prev, newItem]);
    }
  }, [cart]);

  const updateCartQty = (productId: string, qty: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || qty < 1 || qty > product.stockQuantity) return;
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newSub = product.sellingPrice * qty;
        return {
          ...item,
          quantity: qty,
          subtotal: newSub,
          discountAmount: newSub * (item.discountPercent || 0) / 100,
        };
      }
      return item;
    }));
  };

  const updateCartDiscount = (productId: string, disc: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newSub = item.product.sellingPrice * item.quantity;
        const newDiscAmt = newSub * (disc / 100);
        return { ...item, discountPercent: disc, discountAmount: newDiscAmt };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const product = products.find(p => 
        p.sku.toLowerCase() === searchTerm.toLowerCase() ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.model?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (product) {
        addToCart(product);
        setSearchTerm('');
      }
    } else if (e.key >= '1' && e.key <= '9') {
      const product = products[0]; // First product quick add
      if (product) addToCart(product, parseInt(e.key));
    }
  };

  const completeSale = async () => {
    if (cart.length === 0 || !user) return;

    try {
      setIsProcessing(true);
      setError(null);

      const orderData: CreateOrderData = {
        customerId: selectedCustomer?.id,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          ...(item.discountPercent && item.discountPercent > 0 && { discountPercent: item.discountPercent }),
          ...(item.notes && item.notes.trim() && { notes: item.notes }),
        })),
        paymentMethod,
        totalAmount: grandTotal,
        tenderedAmount,
        changeDue: Math.max(0, changeDue),
        discountTotal,
        notes: cartNotes,
      };

      await staffService.createOrder(orderData);

      // Success
      alert(`Sale completed! Total: ₹${grandTotal.toFixed(2)}`);
      setCart([]);
      setTotalDiscountPercent(0);
      setCartNotes('');
      setTenderedAmount(0);
      setSelectedCustomer(null);
      loadProducts(); // Refresh stock
      window.print(); // Print receipt
    } catch (err: any) {
      setError(err.message || 'Sale failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 space-y-6">
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">POS Sales</h1>
          <p className="text-muted-foreground">Quick sales with realtime inventory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search SKU, brand, model... (Enter to add)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Customer */}
      <div className="flex items-center gap-2 p-4 bg-card border rounded-lg">
        <User className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">Customer: </span>
        {selectedCustomer ? (
          <span className="font-semibold">{selectedCustomer.name} ({selectedCustomer.phone})</span>
        ) : (
          <button onClick={() => setShowCustomerModal(true)} className="text-primary hover:underline text-sm">
            Select/Add Customer
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
          <p className="text-destructive font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
        {/* Products Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <button
                key={n}
                onClick={() => products[0] && addToCart(products[0], n)}
                className="w-12 h-12 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-lg flex items-center justify-center"
              >
                {n}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2 bg-card rounded-lg">
              {products.map(product => (
                <div key={product.id} className="group bg-card p-4 rounded-xl border hover:shadow-lg hover:border-primary/50 transition-all">
                  <div className="w-full h-24 bg-muted rounded-lg mb-3 flex items-center justify-center group-hover:bg-primary/5">
                    <span className="text-2xl opacity-50">📱</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold line-clamp-1">{product.brand} {product.model}</h4>
                    <p className="text-xs text-muted-foreground">#{product.sku}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">₹{product.sellingPrice.toFixed(0)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        product.stockQuantity === 0 ? 'bg-destructive text-destructive-foreground' :
                        product.stockQuantity <= 5 ? 'bg-warning text-warning-foreground' :
                        'bg-success text-success-foreground'
                      }`}>
                        {product.stockQuantity}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 space-y-1">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stockQuantity === 0}
                      className="w-full py-2 px-3 bg-primary/90 hover:bg-primary text-primary-foreground text-sm font-medium rounded-lg disabled:bg-muted disabled:text-muted-foreground transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart & Payments */}
        <div className="lg:col-span-1 space-y-4">
          {/* Cart List */}
          <div className="card p-4 h-64 overflow-y-auto">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              Cart ({cart.length}) <Printer className="h-4 w-4" />
            </h3>
            {cart.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">Cart empty</div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.productId} className="flex gap-2 items-center p-2 bg-muted/50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm line-clamp-1">{item.product.brand} {item.product.model}</div>
                      <div className="text-xs text-muted-foreground">₹{item.product.sellingPrice} x {item.quantity}</div>
                      <input
                        type="text"
                        placeholder="Notes"
                        value={item.notes || ''}
                        onChange={(e) => setCart(p => p.map(i => i.productId === item.productId ? {...i, notes: e.target.value} : i))}
                        className="w-full mt-1 p-1 text-xs border rounded bg-background"
                      />
                    </div>
                    <div className="flex items-center gap-1 text-right">
                      <button onClick={() => updateCartQty(item.productId, item.quantity - 1)} disabled={item.quantity <= 1} className="p-1 text-muted-foreground hover:text-destructive">-</button>
                      <span className="w-10 text-center font-mono">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.productId, item.quantity + 1)} disabled={item.quantity >= item.product.stockQuantity} className="p-1 text-muted-foreground hover:text-primary">+</button>
                    </div>
                    <div className="text-right font-mono text-sm">₹{item.subtotal.toFixed(0)}</div>
                    <button onClick={() => removeFromCart(item.productId)} className="p-1 text-destructive hover:bg-destructive/10 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="card p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-mono">₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount ({totalDiscountPercent}%):</span>
              <span className="font-mono text-destructive">-₹{discountTotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>GST ({TAX_RATE*100}%):</span>
              <span className="font-mono text-green-600">+₹{taxAmount.toFixed(0)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-2xl text-primary">₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Payments */}
          <div className="card p-4 space-y-3">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              className="w-full p-2 border rounded-lg"
            >
              <option>CASH</option>
              <option>CARD</option>
              <option>UPI</option>
              <option>MIXED</option>
            </select>
            {paymentMethod === 'CASH' && (
              <>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Tendered"
                    value={tenderedAmount || ''}
                    onChange={(e) => setTenderedAmount(parseFloat(e.target.value) || 0)}
                    className="flex-1 p-2 border rounded-lg font-mono"
                  />
                  <span className={`font-bold px-2 py-1 rounded text-sm ${changeDue < 0 ? 'bg-destructive text-white' : 'bg-success text-success-foreground'}`}>
                    {changeDue >= 0 ? 'Change' : 'Due'}: ₹{Math.abs(changeDue).toFixed(0)}
                  </span>
                </div>
              </>
            )}
            <textarea
              placeholder="Order notes"
              value={cartNotes}
              onChange={(e) => setCartNotes(e.target.value)}
              className="w-full p-2 border rounded-lg text-sm h-16"
              rows={3}
            />
            <button
              onClick={completeSale}
              disabled={isProcessing || cart.length === 0 || grandTotal === 0 || (paymentMethod === 'CASH' && changeDue < 0)}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 text-primary-foreground py-3 px-6 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
            >
              {isProcessing ? 'Processing...' : `COMPLETE SALE ₹${grandTotal.toFixed(0)}`}
            </button>
          </div>
        </div>
      </div>

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Select Customer</h3>
              <button onClick={() => setShowCustomerModal(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>
            {/* Search customers logic here - implement searchCustomers */}
            <div>Customer search implementation placeholder</div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 btn-secondary">Quick Guest</button>
              <button className="flex-1 btn-primary">Add New</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

