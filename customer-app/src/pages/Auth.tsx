import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/integrations/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, User, Lock, Mail } from 'lucide-react';
import HappyCustomerBg from '@/components/HappyCustomerBg';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !phone)) {
      toast({ title: 'Error', description: 'Please fill required fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await api.post('/customer/auth/login', { email, password });
        signIn(data.token, data.user);
        toast({ title: 'Success!', description: 'Welcome back!' });
      } else {
        const { data } = await api.post('/customer/auth/register', { 
          name: fullName, email, phone, password 
        });
        signIn(data.token, data.user);
        toast({ title: 'Success!', description: 'Account created successfully!' });
      }
      navigate('/home');
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Authentication failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <HappyCustomerBg />

      {/* Glassmorphism Card */}
      <Card className="w-full max-w-md p-8 space-y-6 bg-black/30 border-white/20 backdrop-blur-xl relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center py-2">
            <img src="/logo.png" alt="Lotchan Mobiles Logo" className="h-28 w-auto object-contain logo-drive-in" />
          </div>
          <p className="text-white/90 font-medium drop-shadow-md">Mobile Repair & Accessories</p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white drop-shadow-sm">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30 text-foreground placeholder:text-foreground/50"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white drop-shadow-sm">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/50 border-white/30 text-foreground placeholder:text-foreground/50"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white drop-shadow-sm">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-10 bg-white/50 border-white/30 text-foreground placeholder:text-foreground/50"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white drop-shadow-sm">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/50 border-white/30 text-foreground placeholder:text-foreground/50"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full shadow-lg border border-white/20">
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <Button variant="ghost" onClick={() => setIsLogin(!isLogin)} className="w-full text-white hover:text-white hover:bg-white/10">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Button>
        </div>

        <p className="text-xs text-center text-white/70 drop-shadow-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </Card>
    </div>
  );
};

export default Auth;

