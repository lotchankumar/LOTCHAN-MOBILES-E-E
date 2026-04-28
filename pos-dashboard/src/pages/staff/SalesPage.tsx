import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { staffService, type Product, type SaleItem } from '../../services/staff.service';
import { Trash2, Search, X } from 'lucide-react';

export const SalesPage = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Cart state
  const [cart, setCart] = useState<Array<SaleItem & { product: Product }>>([]);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'UPI'>('CASH');
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'ACCESSORIES', value: 'ACCESSORY' },
    { label: 'MOBILES', value: 'MOBILE' },
    { label: 'SIM', value: 'SIM_CARD' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // Apply search and filter logic when products or filters change
  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, minPrice, maxPrice, inStockOnly]);

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

  const applyFilters = () => {
    let filtered = products;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    if (minPrice || maxPrice) {
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    // Apply stock availability filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.stockQty > 0);
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
  };

  const hasActiveFilters = searchQuery || minPrice || maxPrice || inStockOnly;

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Increase quantity if already in cart
      if (existingItem.quantity < product.stockQty) {
        setCart(cart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
    } else {
      // Add new item to cart
      if (product.stockQty > 0) {
        const newItem: SaleItem & { product: Product } = {
          productId: product.id,
          product,
          quantity: 1,
          price: product.price
        };
        setCart([...cart, newItem]);
      }
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (product && quantity >= 1 && quantity <= product.stockQty) {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0 || !user) return;
    
    try {
      setIsProcessing(true);
      const saleData = {
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        paymentMethod,
        totalAmount: getTotalAmount(),
        staffId: user.id
      };

      await staffService.createSale(saleData);
      
      // Clear cart and show success
      setCart([]);
      setError(null);
      alert('Sale completed successfully!');
      
      // Refresh products to update stock
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to complete sale');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Sales Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Cart: {cart.length} items | Total: ₹{getTotalAmount().toFixed(2)}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              selectedCategory === category.value
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="card p-4">
        <div className="flex gap-3 items-end flex-wrap">
          {/* Search Bar */}
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              showFilters || hasActiveFilters
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
          >
            Filters {hasActiveFilters && '●'}
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Min Price</label>
              <input
                type="number"
                placeholder="₹ Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Max Price</label>
              <input
                type="number"
                placeholder="₹ Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* Stock Availability Filter */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm font-medium text-foreground">In Stock Only</span>
              </label>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium rounded-md btn-secondary hover:bg-secondary/80"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Filter Results Summary */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
          <div className="text-sm text-destructive">{error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Grid */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-muted-foreground">Loading products...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {hasActiveFilters ? 'No products match your search and filters' : 'No products found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="card hover:shadow-md transition-shadow p-4"
                >
                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.stockQty > 0
                          ? 'bg-success/20 text-success'
                          : 'bg-destructive/20 text-destructive'
                      }`}>
                        Stock: {product.stockQty}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stockQty === 0}
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                        product.stockQty > 0
                          ? 'btn-primary'
                          : 'bg-secondary text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      {product.stockQty > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h2 className="text-lg font-bold text-foreground mb-4">Shopping Cart</h2>
            
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.productId} className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.product.name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-foreground">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stockQty}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-primary font-medium">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-2 text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-2">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(['CASH', 'CARD', 'UPI'] as const).map(method => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 text-sm font-medium rounded-md ${
                          paymentMethod === method
                            ? 'btn-primary'
                            : 'btn-secondary'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-foreground">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary-dark">₹{getTotalAmount().toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleCompleteSale}
                    disabled={isProcessing || cart.length === 0}
                    className="btn-primary w-full py-3 px-4 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Sale'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};