import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Mail, Lock, UserCog } from 'lucide-react';

type LoginRole = 'STAFF' | 'MANAGER' | 'ADMIN' | 'TECHNICIAN';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<LoginRole>('STAFF');
  const [roleError, setRoleError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetStep, setResetStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resetError, setResetError] = useState('');
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetStatus('loading');
    setResetError('');
    try {
      const response = await fetch('/api/auth/admin/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || 'Request failed');
      }
      setResetStatus('idle');
      setResetStep('verify');
    } catch (err: any) {
      setResetError(err.message);
      setResetStatus('error');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setResetStatus('loading');
    setResetError('');
    try {
      const response = await fetch('/api/auth/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, otp }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || 'Verification failed');
      }
      const data = await response.json();
      setResetToken(data.resetToken);
      setResetStatus('idle');
      setResetStep('reset');
    } catch (err: any) {
      setResetError(err.message);
      setResetStatus('error');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
      setResetStatus('error');
      return;
    }
    setResetStatus('loading');
    setResetError('');
    try {
      const response = await fetch('/api/auth/admin/reset-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resetToken}`
        },
        body: JSON.stringify({ email: resetEmail, newPassword, confirmPassword }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || 'Reset failed');
      }
      setResetStatus('success');
    } catch (err: any) {
      setResetError(err.message);
      setResetStatus('error');
    }
  };

  const closeModal = () => {
    setShowForgotModal(false);
    setResetStep('request');
    setResetEmail('');
    setOtp('');
    setResetToken('');
    setNewPassword('');
    setConfirmPassword('');
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

      if (selectedRole === 'TECHNICIAN') {
        if (user?.role === 'TECHNICIAN' || isManagerOrAdmin) {
          navigate('/technician');
        } else {
          setRoleError('Technician access requires technician credentials. Redirecting to your portal...');
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
                  <option value="TECHNICIAN">Technician</option>
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
            
            {resetStep === 'request' && (
              <form onSubmit={handleRequestOTP} className="space-y-4">
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
                  disabled={resetStatus === 'loading'}
                  className="btn-primary w-full py-2.5 font-medium disabled:opacity-50"
                >
                  {resetStatus === 'loading' ? 'Sending...' : 'Send Reset OTP'}
                </button>
              </form>
            )}

            {resetStep === 'verify' && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="p-3 bg-primary/10 text-primary text-sm rounded-md mb-4 border border-primary/20">
                  OTP has been sent to your email (or check terminal in dev mode).
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Enter OTP</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="input-field pl-10"
                      placeholder="6-digit OTP"
                      required
                      maxLength={6}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={resetStatus === 'loading'}
                  className="btn-primary w-full py-2.5 font-medium disabled:opacity-50"
                >
                  {resetStatus === 'loading' ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            )}

            {resetStep === 'reset' && resetStatus !== 'success' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-field pl-10"
                      placeholder="New password"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field pl-10"
                      placeholder="Confirm new password"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={resetStatus === 'loading'}
                  className="btn-primary w-full py-2.5 font-medium disabled:opacity-50"
                >
                  {resetStatus === 'loading' ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            {resetStatus === 'success' && resetStep === 'reset' && (
              <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-md">
                <p className="text-sm font-medium text-success mb-2">✅ Password Reset Successful!</p>
                <p className="text-xs text-muted-foreground">You can now sign in with your new password.</p>
              </div>
            )}

            {resetStatus === 'error' && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md">
                <p className="text-sm text-destructive">{resetError}</p>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <button onClick={closeModal} className="flex-1 btn-secondary py-2">
                {resetStatus === 'success' && resetStep === 'reset' ? 'Close' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
