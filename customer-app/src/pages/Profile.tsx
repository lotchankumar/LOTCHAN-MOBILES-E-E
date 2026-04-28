import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/integrations/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNav from '@/components/BottomNav';
import { Copy, Gift, LogOut, Moon, Sun, Wallet, Package, Wrench, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBookings();
      fetchOrders();
      fetchReferrals();
      fetchTransactions();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/customer/profile');
      setProfile(data);
      setTransactions(data.wallet_transactions || []);
      setReferrals(data.referrals || []);
    } catch (error) { console.error(error); }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/customer/bookings');
      setBookings(data);
    } catch (error) { console.error(error); }
  };

  const fetchOrders = async () => {
    // Orders Endpoint not implemented yet, placeholder
    setOrders([]);
  };

  const fetchReferrals = async () => { /* Fetched in profile */ };
  const fetchTransactions = async () => { /* Fetched in profile */ };

  const copyReferralCode = () => {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code);
      toast({ title: 'Copied!', description: 'Referral code copied to clipboard' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/auth')}>Login to Continue</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-r from-accent to-primary text-white p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {profile?.full_name?.[0] || 'U'}
              </div>
              <div>
                <h1 className="text-xl font-bold">{profile?.full_name || 'User'}</h1>
                <p className="text-sm opacity-90">{profile?.phone}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-white">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-90">Wallet Balance</p>
                <p className="text-3xl font-bold">₹{profile?.wallet_balance || 0}</p>
              </div>
              <Wallet className="h-8 w-8 opacity-80" />
            </div>
          </Card>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Referral Card */}
        <Card className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm opacity-90">Your Referral Code</p>
              <p className="text-2xl font-bold">{profile?.referral_code}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={copyReferralCode}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <p className="opacity-90">Total Referrals</p>
              <p className="font-bold text-lg">{referrals.length}</p>
            </div>
            <div>
              <p className="opacity-90">Total Earned</p>
              <p className="font-bold text-lg">
                ₹{referrals.reduce((sum, r) => sum + (r.total_earned || 0), 0)}
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Repairs</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-3 mt-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{booking.repair_categories?.name}</h3>
                    <p className="text-sm text-muted-foreground">{booking.device_model}</p>
                    <p className="text-xs text-muted-foreground mt-1">{booking.issue_description}</p>
                  </div>
                  <Badge>{booking.status}</Badge>
                </div>
                {booking.final_price && (
                  <p className="text-sm font-bold text-primary mt-2">₹{booking.final_price}</p>
                )}
              </Card>
            ))}
            {bookings.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No repair bookings yet</p>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-3 mt-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{order.total_amount}</p>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
            {orders.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No orders yet</p>
            )}
          </TabsContent>

          <TabsContent value="wallet" className="space-y-3 mt-4">
            {transactions.map((txn) => (
              <Card key={txn.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{txn.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(txn.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    className={`font-bold ${
                      txn.transaction_type === 'credit' ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {txn.transaction_type === 'credit' ? '+' : '-'}₹{txn.amount}
                  </p>
                </div>
              </Card>
            ))}
            {transactions.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No transactions yet</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Sign Out */}
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
