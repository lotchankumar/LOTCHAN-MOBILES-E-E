import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Key, ArrowLeft } from 'lucide-react';

export const AdminVerifyOtpPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(searchParams.get('email') || 'lotchansm1612@gmail.com');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || otp.length !== 6) return;
    setStatus('verifying');
    setError('');
    try {
      const response = await fetch('/api/auth/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Verification failed');
      }
      const data = await response.json();
      localStorage.setItem('resetToken', data.resetToken);
      localStorage.setItem('resetEmail', email);
      setStatus('success');
      setTimeout(() => navigate('/admin/reset-password'), 1500);
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 space-y-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </button>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent via-warning to-primary bg-clip-text text-transparent">
            Verify OTP
          </h1>
          <p className="text-muted-foreground">Enter the 6-digit code sent to your email</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleVerify}>
          {status === 'error' && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="lotchansm1612@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">OTP Code</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\\D/g, ''))}
                  className="input-field pl-10 text-center tracking-widest font-mono"
                  placeholder="123456"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'verifying' || otp.length !== 6}
            className="btn-primary w-full py-2.5 font-medium disabled:opacity-50"
          >
            {status === 'verifying' ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {status === 'success' && (
          <div className="p-4 bg-success/10 border border-success/30 rounded-md text-center">
            <p className="text-sm font-medium text-success">Verified! Redirecting to set new password...</p>
          </div>
        )}
      </div>
    </div>
  );
};

