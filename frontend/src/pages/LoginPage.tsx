import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuthStore } from '../store/auth.store';
import { Mail, Lock, UserCog } from 'lucide-react';

type LoginRole = 'STAFF' | 'MANAGER' | 'ADMIN';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<LoginRole>('STAFF');
  const [roleError, setRoleError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [resetError, setResetError] = useState('');
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetStatus('sending');
    setResetError('');
    try {
      const response = await fetch('/api/auth/admin/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Request failed');
      }
      setResetStatus('success');
    } catch (err: any) {
      setResetError(err.message);
      setResetStatus('error');
    }
  };

  const closeModal = () => {
    setShowForgotModal(false);
    setResetEmail('');
    setResetStatus('idle');
    setResetError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setRoleError(null);

    // Check for admin credentials restriction
    const adminEmail = 'lotchansm1612@gmail.com';
    const adminPassword = 'MSLMlk$2402';
    if (email === adminEmail && password === adminPassword) {
      if (selectedRole !== 'ADMIN') {
        setRoleError('This credential is restricted to Administrator access only.');
        return;
      }
    }

    try {
      await login({ email, password, role: selectedRole });
      const { user } = useAuthStore.getState();

      const isManagerOrAdmin = user?.role === 'MANAGER' || user?.role === 'ADMIN';
      const isAdmin = user?.role === 'ADMIN';

      if (selectedRole === 'ADMIN') {
        if (isAdmin) {
          navigate('/admin');
        } else {
          setRoleError('Administrator access is only available for admin accounts. Redirecting to your default portal...');
          navigate(isManagerOrAdmin ? '/manager' : '/staff/sales');
        }
        return;
      }

      if (selectedRole === 'MANAGER') {
        if (isManagerOrAdmin) {
          navigate('/manager');
        } else {
          setRoleError('Manager access requires a manager or admin account. Redirecting to staff portal...');
          navigate('/staff/sales');
        }
        return;
      }

      navigate('/staff/sales');
    } catch {
      // Error is already handled by store
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent via-warning to-primary bg-clip-text text-transparent">
            LOTCHAN MOBILES
          </h1>
          <p className="text-muted-foreground">POS & Management Dashboard</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {(error || roleError) && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
              <div className="text-sm text-destructive">{error || roleError}</div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email-address" className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="******"
                />
              </div>
              {selectedRole === 'ADMIN' && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-sm text-primary hover:text-primary/80 underline font-medium flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-foreground">
                Login Role
              </label>
              <div className="relative">
                <UserCog className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  id="role"
                  name="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as LoginRole)}
                  className="input-field pl-10"
                >
                  <option value="STAFF">Staff</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2.5 mt-2 font-medium disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-border mt-6">
          <p className="text-sm text-muted-foreground">
            Admin credentials: lotchansm1612@gmail.com / MSLMlk$2402
          </p>
        </div>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-background rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Reset Admin Password</h2>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="lotchansm1612@gmail.com"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={resetStatus === 'sending'}
                className="btn-primary w-full py-2.5 font-medium disabled:opacity-50"
              >
                {resetStatus === 'sending' ? 'Sending...' : 'Send Reset OTP'}
              </button>
            </form>
            {resetStatus === 'success' && (
              <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-md">
                <p className="text-sm font-medium text-success mb-2">✅ OTP sent successfully!</p>
                <p className="text-xs text-muted-foreground mb-3">Check console or email. OTP expires in 15 min.</p>
                <div className="text-xs bg-muted p-3 rounded space-y-2">
                  <p><strong>Next: </strong><Link to={`/admin/verify-otp?email=${resetEmail}`} className="text-primary hover:underline font-medium">Verify OTP in UI</Link></p>
                  <p className="text-xs text-muted-foreground">Click link to enter OTP and set new password.</p>
                </div>
              </div>
            )}
            <div className="flex gap-2 mt-6">
              <button onClick={closeModal} className="flex-1 btn-secondary py-2">Close</button>
            </div>
            {resetStatus === 'error' && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md">
                <p className="text-sm text-destructive">{resetError}</p>
              </div>
            )}
            <div className="flex gap-2 mt-6">
              <button onClick={closeModal} className="flex-1 btn-secondary py-2">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
