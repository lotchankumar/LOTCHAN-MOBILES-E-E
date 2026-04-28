import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/integrations/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import BottomNav from '@/components/BottomNav';
import { Calendar, MapPin, Wrench } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Repair = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deviceModel, setDeviceModel] = useState('');
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/customer/categories');
      setCategories(data.repairs || []);
    } catch (error) { console.error(error); }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!selectedCategory || !deviceModel || !issue) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await api.post('/customer/bookings', {
        repairCategoryId: selectedCategory,
        deviceModel,
        issueDescription: issue,
        location
      });

      toast({ title: 'Success!', description: 'Your repair request has been booked!' });
      navigate('/home');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-card border-b border-border z-40 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold">Book Repair Service</h1>
          <p className="text-sm text-muted-foreground">Fast, reliable repairs with warranty</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Repair Categories */}
        <div className="space-y-3">
          <Label>Select Repair Type</Label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className="text-3xl mb-2">{cat.icon || '🔧'}</div>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.estimated_time}</p>
                <p className="text-sm font-bold text-primary mt-2">
                  From ₹{cat.base_price}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Device Model */}
        <div className="space-y-2">
          <Label htmlFor="deviceModel">Device Model</Label>
          <Input
            id="deviceModel"
            placeholder="e.g., iPhone 14 Pro"
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
          />
        </div>

        {/* Issue Description */}
        <div className="space-y-2">
          <Label htmlFor="issue">Describe the Issue</Label>
          <Textarea
            id="issue"
            placeholder="Please describe what's wrong with your device..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            rows={4}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Pickup Location (Optional)</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="Enter your address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Service Info */}
        <Card className="p-4 bg-muted/50">
          <h3 className="font-semibold mb-2">Service Includes:</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✓ Free pickup within 5km</li>
            <li>✓ 1-year warranty</li>
            <li>✓ Original spare parts</li>
            <li>✓ Live repair tracking</li>
            <li>✓ 24-hour turnaround</li>
          </ul>
        </Card>

        <Button onClick={handleBooking} disabled={loading} className="w-full h-12">
          <Wrench className="h-4 w-4 mr-2" />
          {loading ? 'Booking...' : 'Book Repair Now'}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Repair;
