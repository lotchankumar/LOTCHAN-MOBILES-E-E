import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export const AdminResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem('resetEmail') || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'resetting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('resetToken');
    if (!token || !email) {
      navigate('/admin/verify-otp');
      return;
    }
  }, [navigate, email]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword || newPassword.length < 8) {
      setError('Passwords must match and be at least 8 characters');
      return;
    }
    const token = localStorage.getItem('resetToken');
    setStatus('resetting');
    setError('');
    try {
      const response = await fetch('/api/auth/admin/reset-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          email, 
          newPassword, 
          confirmPassword 
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Reset failed');
      }
      localStorage.removeItem('resetToken');
      localStorage.removeItem('resetEmail');
      setStatus('success');
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 space-y-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </button>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent via-warning to-primary bg-clip-text text-transparent">
            New Password
          </h1>
          <p className="text-muted-foreground">Set your new admin password</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleReset}>
          {status === 'error' && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="lotchansm1612@gmail.com"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="New secure password"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <Check className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'resetting' || newPassword !== confirmPassword || newPassword.length < 8}
            className="btn-primary w-full py-2.5 font-medium disabled:opacity-50"
          >
            {status === 'resetting' ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {status === 'success' && (
          <div className="p-4 bg-success/10 border border-success/30 rounded-md text-center">
            <p className="text-sm font-medium text-success">Password reset successful! Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

