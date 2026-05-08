import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Mail, Lock } from 'lucide-react';
import { HappyCustomerBg } from '../components/HappyCustomerBg';

type LoginRole = 'STAFF' | 'MANAGER' | 'ADMIN' | 'TECHNICIAN';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<LoginRole>('STAFF');
  const [roleError, setRoleError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetStep, setResetStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [resetEmail, setResetEmail] = useState('');
  const [resetRoleHint, setResetRoleHint] = useState(''); // message from server about who received OTP
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
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || 'Request failed');
      setResetRoleHint(data.message || '');
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
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || 'Verification failed');
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
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resetToken}` },
        body: JSON.stringify({ email: resetEmail, newPassword, confirmPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || 'Reset failed');
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
    setResetRoleHint('');
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
    <div className="text-[#d2e4ff] font-sans selection:bg-[#aec8f0]/30 selection:text-[#aec8f0] relative min-h-screen overflow-hidden">
      <style>{`
        body {
          background-image: none !important;
          background-color: #001429 !important;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glow-overlay {
            background: radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.15) 0%, rgba(7, 26, 47, 0) 70%);
        }
        .signature-gradient {
            background: linear-gradient(135deg, #aec8f0 0%, #11487a 100%);
        }
      `}</style>

      {/* Happy Customer Background Carousel */}
      <HappyCustomerBg />

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#071A2F]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-blue-900/20 antialiased tracking-tight">
        <div className="text-xl font-black italic tracking-tighter text-blue-500">
          LOTCHAN MOBILES
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-blue-300 transition-all duration-300 active:scale-95">
            <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
          </button>
        </div>
      </nav>

      {/* Hero / Login Section */}
      <main className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 z-[2]">
        {/* Glow Overlay */}
        <div className="absolute inset-0 glow-overlay pointer-events-none"></div>

        {/* Login Card */}
        <div className="w-full max-w-md glass-panel p-6 rounded-xl shadow-2xl relative z-10">
          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-10">
            <div className="mb-4 flex items-center justify-center">
              <img src="/logo.png" alt="Lotchan Mobiles Logo" className="h-28 w-auto object-contain relative z-10 logo-drive-in" />
            </div>
            <h1 className="text-[32px] font-bold leading-tight text-[#aec8f0] mb-1">Command Center</h1>
            <p className="text-[14px] leading-relaxed font-light text-[#c4c6cf]">Authorized Performance Access Only</p>
          </div>

          {(error || roleError) && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4 mb-4">
              <div className="text-sm text-destructive">{error || roleError}</div>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="space-y-1">
              <label className="text-[12px] font-medium leading-none text-[#c4c6cf] uppercase tracking-wider block ml-1">System Role</label>
              <div className="relative">
                <select
                  className="w-full bg-[#001c37] border border-[#8d9198]/20 rounded-lg py-3 px-4 text-[#d2e4ff] text-base focus:ring-2 focus:ring-[#aec8f0] focus:border-transparent outline-none appearance-none transition-all"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as LoginRole)}
                >
                  <option value="TECHNICIAN">Technician</option>
                  <option value="STAFF">Staff</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8d9198]">
                  <span className="material-symbols-outlined" data-icon="expand_more">expand_more</span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[12px] font-medium leading-none text-[#c4c6cf] uppercase tracking-wider block ml-1">Operator Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#8d9198] text-lg" data-icon="alternate_email">alternate_email</span>
                <input
                  className="w-full bg-[#001c37] border border-[#8d9198]/20 rounded-lg py-3 pl-12 pr-4 text-[#d2e4ff] text-base focus:ring-2 focus:ring-[#aec8f0] focus:border-transparent outline-none transition-all placeholder:text-[#8d9198]/50"
                  placeholder="name@lotchan.mobi"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[12px] font-medium leading-none text-[#c4c6cf] uppercase tracking-wider">Access Code</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[10px] text-[#aec8f0] hover:text-[#a0c9ff] transition-colors font-medium uppercase tracking-tighter"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#8d9198] text-lg" data-icon="lock_open">lock_open</span>
                <input
                  className="w-full bg-[#001c37] border border-[#8d9198]/20 rounded-lg py-3 pl-12 pr-4 text-[#d2e4ff] text-base focus:ring-2 focus:ring-[#aec8f0] focus:border-transparent outline-none transition-all placeholder:text-[#8d9198]/50"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full signature-gradient py-4 rounded-lg text-[#153152] text-[15px] font-medium leading-none tracking-wide shadow-lg shadow-[#aec8f0]/20 hover:shadow-[#aec8f0]/40 hover:-translate-y-0.5 transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'INITIALIZING...' : 'INITIALIZE SESSION'}</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform" data-icon="bolt">bolt</span>
            </button>
          </form>

          {/* Status Info */}
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[10px] font-medium leading-none text-[#c4c6cf] uppercase tracking-widest">Mainframe Online</span>
            </div>
            <div className="text-[10px] text-[#8d9198] font-light">v2.4.0-STABLE</div>
          </div>
        </div>

        {/* Visual Elements */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full relative z-10 pb-16">
          <div className="glass-panel p-4 rounded-lg flex items-center gap-4">
            <div className="p-2 bg-[#0b2a4a]/30 rounded border border-[#aec8f0]/10">
              <span className="material-symbols-outlined text-[#aec8f0]" data-icon="precision_manufacturing">precision_manufacturing</span>
            </div>
            <div>
              <h3 className="text-[12px] font-medium leading-none text-[#aec8f0]">Performance</h3>
              <p className="text-[10px] text-[#c4c6cf] mt-1">Real-time shop metrics</p>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-lg flex items-center gap-4">
            <div className="p-2 bg-[#0b2a4a]/30 rounded border border-[#aec8f0]/10">
              <span className="material-symbols-outlined text-[#aec8f0]" data-icon="verified_user">verified_user</span>
            </div>
            <div>
              <h3 className="text-[12px] font-medium leading-none text-[#aec8f0]">Secure</h3>
              <p className="text-[10px] text-[#c4c6cf] mt-1">Encrypted diagnostics</p>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-lg flex items-center gap-4">
            <div className="p-2 bg-[#0b2a4a]/30 rounded border border-[#aec8f0]/10">
              <span className="material-symbols-outlined text-[#aec8f0]" data-icon="speed">speed</span>
            </div>
            <div>
              <h3 className="text-[12px] font-medium leading-none text-[#aec8f0]">Zero Lag</h3>
              <p className="text-[10px] text-[#c4c6cf] mt-1">Direct API interface</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 flex flex-col md:flex-row justify-between items-center px-8 gap-4 bg-[#071A2F] border-t border-white/5 text-xs font-medium uppercase tracking-widest relative z-10">
        <div className="text-slate-500">
          © 2026 LOTCHAN MOBILES. PERFORMANCE TUNED.
        </div>
        <div className="flex gap-6">
          <a className="text-slate-500 hover:text-blue-400 transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
          <a className="text-slate-500 hover:text-blue-400 transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
          <a className="text-slate-500 hover:text-blue-400 transition-colors opacity-80 hover:opacity-100" href="#">System Status</a>
        </div>
      </footer>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="glass-panel bg-[#001c37]/95 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-[#aec8f0]/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-1 text-[#aec8f0]">Reset Password</h2>
            <p className="text-xs text-slate-400 mb-5">
              {resetStep === 'request' && 'Enter your account email. An OTP will be sent to your manager or admin.'}
              {resetStep === 'verify' && 'Enter the OTP you received from your authority.'}
              {resetStep === 'reset' && 'Set your new password below.'}
            </p>

            {resetStep === 'request' && (
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#c4c6cf]">Your Account Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#8d9198]" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full bg-[#001429] border border-[#8d9198]/20 rounded-lg py-2.5 pl-10 pr-4 text-[#d2e4ff] focus:ring-2 focus:ring-[#aec8f0] focus:border-transparent outline-none transition-all placeholder:text-[#8d9198]/50"
                      placeholder="your-email@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-400/20 rounded-md text-xs text-slate-400">
                  <span className="text-blue-300 font-semibold">How it works: </span>
                  Staff &amp; Technicians → OTP sent to branch manager.<br/>
                  Managers → OTP sent to admin.<br/>
                  Admin → OTP sent to your own email.
                </div>
                <button
                  type="submit"
                  disabled={resetStatus === 'loading'}
                  className="signature-gradient w-full py-2.5 rounded-lg text-[#153152] font-medium shadow-lg shadow-[#aec8f0]/20 hover:shadow-[#aec8f0]/40 transition-all active:scale-95 disabled:opacity-50"
                >
                  {resetStatus === 'loading' ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            )}

            {resetStep === 'verify' && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                {resetRoleHint && (
                  <div className="p-3 bg-green-900/20 border border-green-400/30 rounded-md text-sm text-green-300">
                    ✅ {resetRoleHint}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#c4c6cf]">Enter OTP</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#8d9198]" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#001429] border border-[#8d9198]/20 rounded-lg py-2.5 pl-10 pr-4 text-[#d2e4ff] focus:ring-2 focus:ring-[#aec8f0] focus:border-transparent outline-none transition-all placeholder:text-[#8d9198]/50 tracking-widest text-lg font-mono"
                      placeholder="000000"
                      required
                      maxLength={6}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={resetStatus === 'loading' || otp.length < 6}
                  className="signature-gradient w-full py-2.5 rounded-lg text-[#153152] font-medium shadow-lg shadow-[#aec8f0]/20 hover:shadow-[#aec8f0]/40 transition-all active:scale-95 disabled:opacity-50"
                >
                  {resetStatus === 'loading' ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button type="button" onClick={() => { setResetStep('request'); setOtp(''); setResetError(''); }} className="w-full text-xs text-slate-400 hover:text-[#aec8f0] transition-colors py-1">
                  ← Resend OTP / Change Email
                </button>
              </form>
            )}

            {resetStep === 'reset' && resetStatus !== 'success' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#c4c6cf]">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#8d9198]" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#001429] border border-[#8d9198]/20 rounded-lg py-2.5 pl-10 pr-4 text-[#d2e4ff] focus:ring-2 focus:ring-[#aec8f0] focus:border-transparent outline-none transition-all placeholder:text-[#8d9198]/50"
                      placeholder="New password"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#c4c6cf]">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#8d9198]" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#001429] border border-[#8d9198]/20 rounded-lg py-2.5 pl-10 pr-4 text-[#d2e4ff] focus:ring-2 focus:ring-[#aec8f0] focus:border-transparent outline-none transition-all placeholder:text-[#8d9198]/50"
                      placeholder="Confirm new password"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={resetStatus === 'loading'}
                  className="signature-gradient w-full py-2.5 rounded-lg text-[#153152] font-medium shadow-lg shadow-[#aec8f0]/20 hover:shadow-[#aec8f0]/40 transition-all active:scale-95 disabled:opacity-50"
                >
                  {resetStatus === 'loading' ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            {resetStatus === 'success' && resetStep === 'reset' && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-md">
                <p className="text-sm font-medium text-green-400 mb-2">✅ Password Reset Successful!</p>
                <p className="text-xs text-[#8d9198]">You can now sign in with your new password.</p>
              </div>
            )}

            {resetStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md">
                <p className="text-sm text-red-400">{resetError}</p>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <button onClick={closeModal} className="flex-1 bg-[#0b2a4a] text-[#aec8f0] hover:bg-[#11487a] py-2 rounded-lg font-medium transition-colors">
                {resetStatus === 'success' && resetStep === 'reset' ? 'Close' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

