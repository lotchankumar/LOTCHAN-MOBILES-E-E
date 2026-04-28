import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/integrations/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { Bell, Search, Zap, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [banners, setBanners] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchBanners();
    if (user) fetchProfile();
  }, [user]);

  const fetchBanners = async () => {
    try {
      const { data } = await api.get('/customer/banners');
      setBanners(data);
    } catch (error) { console.error(error); }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/customer/profile');
      setProfile(data);
    } catch (error) { console.error(error); }
  };

  const services = [
    { title: 'Screen Repair', icon: '📱', color: 'from-blue-500 to-blue-600' },
    { title: 'Battery', icon: '🔋', color: 'from-green-500 to-green-600' },
    { title: 'Charging', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
    { title: 'Software', icon: '💾', color: 'from-purple-500 to-purple-600' },
  ];

  const offers = [
    { title: '10% OFF', subtitle: 'On First Repair', badge: 'NEW' },
    { title: 'Free Pickup', subtitle: 'Within 5km', badge: 'HOT' },
    { title: '1 Year Warranty', subtitle: 'On All Repairs', badge: 'TRUSTED' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-40 px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h1 className="text-xl font-bold bg-gradient-to-r from-accent via-warning to-primary bg-clip-text text-transparent">
            LOTCHAN
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Wallet Banner */}
        {profile && (
          <Card className="p-4 bg-gradient-to-r from-accent to-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Wallet Balance</p>
                <p className="text-2xl font-bold">₹{profile.wallet_balance || 0}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => navigate('/profile')}>
                View Details
              </Button>
            </div>
          </Card>
        )}

        {/* Banner Carousel */}
        {banners.length > 0 && (
          <div className="overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide">
            {banners.map((banner) => (
              <Card key={banner.id} className="min-w-full snap-center overflow-hidden">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-full h-48 object-cover"
                />
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Services</h2>
          <div className="grid grid-cols-4 gap-3">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => navigate('/repair')}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-muted transition-colors"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl`}>
                  {service.icon}
                </div>
                <span className="text-xs text-center font-medium">{service.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Special Offers</h2>
            <Zap className="h-5 w-5 text-warning" />
          </div>
          <div className="grid gap-3">
            {offers.map((offer, idx) => (
              <Card key={idx} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-primary">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
                </div>
                <Badge variant="secondary">{offer.badge}</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Trending Accessories</h2>
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden" onClick={() => navigate('/shop')}>
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm">Premium Case</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">₹499</span>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span>4.5</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Referral CTA */}
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center">
          <h3 className="font-bold text-lg mb-2">Refer & Earn 10%!</h3>
          <p className="text-sm opacity-90 mb-4">Earn lifetime commission on every referral</p>
          <Button variant="secondary" onClick={() => navigate('/profile')}>
            Get Your Code
          </Button>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
