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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent via-warning to-primary bg-clip-text text-transparent">
            LOTCHAN
          </h1>
          <p className="text-muted-foreground">Mobile Repair & Accessories</p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <Button variant="ghost" onClick={() => setIsLogin(!isLogin)} className="w-full">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </Card>
    </div>
  );
};

export default Auth;
