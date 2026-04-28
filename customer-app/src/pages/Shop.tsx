import { useState, useEffect } from 'react';
import api from '@/integrations/api';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { Search, ShoppingCart, Star, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/customer/categories');
      setCategories(data.products || []);
    } catch (error) { console.error(error); }
  };

  const fetchProducts = async () => {
    try {
      const url = selectedCategory ? `/customer/products?categoryId=${selectedCategory}` : '/customer/products';
      const { data } = await api.get(url);
      setProducts(data);
    } catch (error) { console.error(error); }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-40 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold mb-3">Shop Accessories</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">📦</span>
                )}
                {product.stock_quantity < 10 && (
                  <Badge className="absolute top-2 right-2" variant="destructive">
                    Low Stock
                  </Badge>
                )}
              </div>
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">₹{product.price}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span>4.5</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    toast({ title: 'Added to Cart!', description: `${product.name} added` });
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;
