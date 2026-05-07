import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { staffService, type Product, type SaleItem, type Repair } from '../../services/staff.service';
import {
  Search, X, ShoppingCart, Wrench, Clock, History, Trash2,
  Smartphone, Cable, Cpu, Package, CardSim, MessageCircle, CheckCircle,
  Plus, Minus, LogOut
} from 'lucide-react';

export const SalesPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state
  const [cart, setCart] = useState<Array<SaleItem & { product: Product }>>([]);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'UPI'>('CASH');
  const [isProcessing, setIsProcessing] = useState(false);

  // Repairs state
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [repairsLoading, setRepairsLoading] = useState(false);

  // Sidebar active view
  const [activeView, setActiveView] = useState('cart');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Accessories', value: 'ACCESSORY' },
    { label: 'Mobiles', value: 'MOBILE' },
    { label: 'SIM', value: 'SIM_CARD' },
  ];

  // ------ Fetch Data ------
  useEffect(() => { fetchProducts(); }, [selectedCategory]);
  useEffect(() => { applyFilters(); }, [products, searchQuery]);
  useEffect(() => { fetchRepairs(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const category = selectedCategory === 'All' ? undefined : selectedCategory;
      const data = await staffService.getProducts(category);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchRepairs = async () => {
    try {
      setRepairsLoading(true);
      const data = await staffService.getRepairs();
      setRepairs(data);
    } catch (err: any) {
      console.error('Failed to fetch repairs:', err);
    } finally {
      setRepairsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = products;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }
    setFilteredProducts(filtered);
  };

  // ------ Cart logic ------
  const addToCart = (product: Product) => {
    const existing = cart.find((i) => i.productId === product.id);
    if (existing) {
      if (existing.quantity < product.stockQty) {
        setCart(
          cart.map((i) =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      }
    } else if (product.stockQty > 0) {
      setCart([
        ...cart,
        { productId: product.id, product, quantity: 1, price: product.price },
      ]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && quantity >= 1 && quantity <= product.stockQty) {
      setCart(
        cart.map((i) => (i.productId === productId ? { ...i, quantity } : i))
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((i) => i.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const getSubtotal = () =>
    cart.reduce((t, i) => t + i.price * i.quantity, 0);

  const getTax = () => getSubtotal() * 0; // No tax for now
  const getTotal = () => getSubtotal() + getTax();

  const handleCompleteSale = async () => {
    if (cart.length === 0 || !user) return;
    try {
      setIsProcessing(true);
      await staffService.createSale({
        items: cart.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
        paymentMethod,
        totalAmount: getTotal(),
        staffId: user.id,
      });
      setCart([]);
      setError(null);
      alert('Sale completed successfully!');
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to complete sale');
    } finally {
      setIsProcessing(false);
    }
  };

  // ------ Repairs helpers ------
  const handleShareWhatsApp = (repair: Repair) => {
    const text = `Hi ${repair.customerName},\n\nYour repair ticket (Device: ${repair.deviceModel}) is currently: ${repair.status}.\nEstimated Cost: ₹${repair.estimatedCost.toFixed(2)}.\n\nThank you for choosing LOTCHAN MOBILES!`;
    const url = `https://wa.me/${repair.customerPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleFinalBilling = async (repairId: string, estimatedCost: number) => {
    const actualCostStr = prompt(
      `Enter final billing amount (Estimated: ₹${estimatedCost}):`,
      estimatedCost.toString()
    );
    if (actualCostStr && !isNaN(parseFloat(actualCostStr))) {
      try {
        await staffService.updateRepairStatus(repairId, 'DELIVERED', parseFloat(actualCostStr));
        fetchRepairs();
        alert('Repair marked as DELIVERED and final billing recorded.');
      } catch (err: any) {
        setError(err.message || 'Failed to complete final billing');
      }
    }
  };

  const getRepairBorderClass = (status: string) => {
    switch (status) {
      case 'PENDING': return 'staff-repair-yellow';
      case 'IN_PROGRESS': return 'staff-repair-blue';
      case 'COMPLETED': return 'staff-repair-green';
      case 'DELIVERED': return 'staff-repair-cyan';
      default: return 'staff-repair-blue';
    }
  };

  const getRepairBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return { cls: 'staff-badge-yellow', label: 'Pending' };
      case 'IN_PROGRESS': return { cls: 'staff-badge-blue', label: 'In Progress' };
      case 'COMPLETED': return { cls: 'staff-badge-green', label: 'Completed' };
      case 'DELIVERED': return { cls: 'staff-badge-purple', label: 'Delivered' };
      default: return { cls: 'staff-badge-blue', label: status };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'MOBILE': return <Smartphone className="w-5 h-5" />;
      case 'ACCESSORY': return <Cable className="w-5 h-5" />;
      case 'SIM_CARD': return <CardSim className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const txnId = `TXN-${Date.now().toString().slice(-6)}`;

  const sideNavItems = [
    { id: 'cart', icon: <ShoppingCart className="w-5 h-5" />, label: 'Active Cart' },
    { id: 'repairs', icon: <Wrench className="w-5 h-5" />, label: 'Work Orders' },
    { id: 'parts', icon: <Cpu className="w-5 h-5" />, label: 'Parts Queue' },
    { id: 'history', icon: <History className="w-5 h-5" />, label: 'History' },
  ];

  return (
    <div className="staff-theme">
      {/* ===== TOP NAV BAR ===== */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 staff-topnav">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Lotchan Mobiles
          </span>
          <nav className="hidden md:flex gap-6 items-center">
            <span className="text-xs font-medium text-blue-400 border-b-2 border-blue-500 pb-1 cursor-default">
              Dashboard
            </span>
            {['Inventory', 'Repairs', 'Customers'].map((tab) => (
              <span
                key={tab}
                className="text-xs font-medium text-slate-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                {tab}
              </span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              className="staff-search rounded-full pl-10 pr-4 py-1.5 text-sm w-64"
              placeholder="Global search..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Welcome,</span>
            <span className="text-sm font-medium text-blue-300">{user?.email}</span>
          </div>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="h-8 w-8 rounded-full border border-blue-500/30 overflow-hidden bg-[#0c2b49] flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer"
            >
              <span className="text-xs font-bold text-blue-400">
                {user?.email?.charAt(0).toUpperCase() || 'S'}
              </span>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 top-10 w-56 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a1e36]/95 backdrop-blur-xl z-50 staff-fade-in">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-medium text-blue-300 truncate mt-0.5">{user?.email}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== SIDE NAV BAR ===== */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex flex-col z-40 staff-sidenav">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-[#d2e4ff]">Order Hub</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            Sales Staff
          </p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {sideNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                activeView === item.id
                  ? 'staff-nav-active'
                  : 'staff-nav-link'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
              {item.id === 'cart' && cart.length > 0 && (
                <span className="ml-auto text-[10px] font-bold bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4">
          <button
            onClick={handleCompleteSale}
            disabled={isProcessing || cart.length === 0}
            className="w-full py-3 staff-cta rounded-lg text-sm disabled:opacity-40"
          >
            {isProcessing ? 'Processing...' : 'Complete Transaction'}
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="ml-64 mt-16 p-6 min-h-[calc(100vh-64px)]">
        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-300 text-sm flex items-center justify-between staff-fade-in">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search & Command Bar */}
        <div className="staff-glass p-4 rounded-xl flex items-center justify-between mb-6 staff-fade-in">
          <div className="flex-1 max-w-2xl flex items-center gap-4">
            <Search className="text-blue-400 w-5 h-5 flex-shrink-0" />
            <input
              className="w-full bg-transparent border-none text-[#d2e4ff] placeholder:text-slate-500 focus:outline-none text-base"
              placeholder="Scan barcode or type to search products, IMEI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="hidden md:flex gap-2">
            <span className="staff-kbd">F1 - Quick Search</span>
            <span className="staff-kbd">F2 - New Ticket</span>
          </div>
        </div>

        {/* 3-COLUMN GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* ===== LEFT: Quick Sale ===== */}
          <section className="col-span-12 lg:col-span-5 space-y-5 staff-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#d2e4ff]">Quick Sale</h3>
              <span className="text-xs text-slate-500">
                {filteredProducts.length} products
              </span>
            </div>

            {/* Category chips */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`staff-chip ${
                    selectedCategory === cat.value
                      ? 'staff-chip-active'
                      : 'staff-chip-inactive'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-slate-500 staff-pulse">Loading products...</div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-48 staff-glass rounded-xl">
                <p className="text-slate-500">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="staff-product-card p-4 space-y-3"
                    onClick={() => addToCart(product)}
                  >
                    {/* Icon + stock badge */}
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-lg bg-[#0c2b49] flex items-center justify-center text-blue-400">
                        {getCategoryIcon(product.category)}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          product.stockQty > 0
                            ? 'bg-blue-600 text-white'
                            : 'bg-red-900/50 text-red-300'
                        }`}
                      >
                        {product.stockQty > 0
                          ? `${product.stockQty} IN STOCK`
                          : 'OUT OF STOCK'}
                      </span>
                    </div>
                    {/* Info */}
                    <div>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                        {product.category === 'SIM_CARD'
                          ? 'SIM Cards'
                          : product.category === 'MOBILE'
                          ? 'Smartphones'
                          : 'Accessories'}
                      </p>
                      <p className="text-sm font-semibold text-[#d2e4ff] truncate mt-0.5">
                        {product.name}
                      </p>
                      {product.description && (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {product.description}
                        </p>
                      )}
                    </div>
                    {/* Price + Add */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-400">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <button
                        className={`p-2 rounded-full transition-all ${
                          product.stockQty > 0
                            ? 'bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white'
                            : 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                        }`}
                        disabled={product.stockQty === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ===== MIDDLE: Service Desk (Repairs) ===== */}
          <section className="col-span-12 lg:col-span-4 space-y-5 staff-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#d2e4ff]">Service Desk</h3>
              <div className="flex gap-2">
                <button
                  onClick={fetchRepairs}
                  className="p-1.5 rounded-md bg-[#00213d] text-slate-400 hover:text-blue-400 transition-colors"
                  title="Refresh repairs"
                >
                  <Clock className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {repairsLoading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="text-slate-500 staff-pulse">Loading repairs...</div>
                </div>
              ) : repairs.length === 0 ? (
                <div className="staff-glass rounded-xl p-8 text-center">
                  <Wrench className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No repair tickets found</p>
                </div>
              ) : (
                repairs.map((repair) => {
                  const badge = getRepairBadge(repair.status);
                  return (
                    <div
                      key={repair.id}
                      className={`staff-glass p-4 rounded-xl ${getRepairBorderClass(repair.status)}`}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className={`staff-badge ${badge.cls}`}>
                            {badge.label}
                          </span>
                          <h4 className="text-sm font-bold text-[#d2e4ff] mt-1">
                            {repair.deviceModel} — {repair.deviceType}
                          </h4>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">
                          #{repair.id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      {/* Customer */}
                      <p className="text-xs text-slate-400 mb-3">
                        Customer: {repair.customerName} • {repair.customerPhone}
                      </p>
                      {/* Complaint */}
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                        {repair.complaint}
                      </p>
                      {/* Cost info */}
                      <div className="flex items-center gap-3 mb-3 text-xs">
                        <span className="text-slate-400">
                          Est: <span className="text-[#d2e4ff] font-medium">₹{repair.estimatedCost.toFixed(2)}</span>
                        </span>
                        {repair.actualCost && (
                          <span className="text-green-400">
                            Paid: ₹{repair.actualCost.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {/* Progress for in-progress */}
                      {repair.status === 'IN_PROGRESS' && (
                        <div className="staff-progress-track mb-3">
                          <div className="staff-progress-fill" style={{ width: '50%' }} />
                        </div>
                      )}
                      {/* Actions */}
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleShareWhatsApp(repair)}
                          className="staff-action-btn flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" /> Notify
                        </button>
                        {repair.status === 'COMPLETED' && (
                          <button
                            onClick={() => handleFinalBilling(repair.id, repair.estimatedCost)}
                            className="staff-action-btn flex items-center gap-1 !text-green-400 !border-green-500/30"
                          >
                            <CheckCircle className="w-3 h-3" /> Final Billing
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* ===== RIGHT: Active Order (Cart) ===== */}
          <section className="col-span-12 lg:col-span-3 staff-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="staff-order-panel h-full flex flex-col">
              {/* Header */}
              <div className="p-5 border-b border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-[#d2e4ff]">Active Order</h3>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                      title="Clear cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  Transaction ID: #{txnId}
                </p>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <ShoppingCart className="w-10 h-10 text-slate-600 mb-3" />
                    <p className="text-slate-500 text-sm">Your cart is empty</p>
                    <p className="text-slate-600 text-xs mt-1">Click a product to add it</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#1a3654] flex-shrink-0 flex items-center justify-center text-blue-400">
                        {getCategoryIcon(item.product.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h5 className="text-sm font-semibold text-[#d2e4ff] truncate pr-2">
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              className="staff-qty-btn"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium text-[#d2e4ff] w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              className="staff-qty-btn"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stockQty}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-[#d2e4ff]">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Totals & Checkout */}
              <div className="p-5 bg-[#001429]/40 border-t border-white/10 rounded-b-2xl space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-[#d2e4ff]">₹{getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl pt-2 border-t border-white/5">
                    <span className="text-[#d2e4ff] font-semibold">Total</span>
                    <span className="text-blue-400 font-bold">₹{getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="grid grid-cols-3 gap-2">
                  {(['CASH', 'CARD', 'UPI'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`staff-pay-btn ${
                        paymentMethod === method
                          ? 'staff-pay-active'
                          : 'staff-pay-inactive'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {/* Complete button */}
                <button
                  onClick={handleCompleteSale}
                  disabled={isProcessing || cart.length === 0}
                  className="w-full py-4 staff-cta rounded-xl text-base"
                >
                  {isProcessing ? 'PROCESSING...' : 'COMPLETE TRANSACTION'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
