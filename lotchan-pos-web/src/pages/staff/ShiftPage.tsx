import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { staffService, type CashSession, type DailySummary } from '../../services/staff.service';

export const ShiftPage = () => {
  const { user } = useAuthStore();
  const [cashSession, setCashSession] = useState<CashSession | null>(null);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [openingBalance, setOpeningBalance] = useState('');
  const [closingBalance, setClosingBalance] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCashSession();
      fetchDailySummary();
    }
  }, [user]);

  const fetchCashSession = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const session = await staffService.getCurrentCashSession(user.id);
      setCashSession(session);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cash session');
    } finally {
      setLoading(false);
    }
  };

  const fetchDailySummary = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const summary = await staffService.getDailySummary(user.id, today);
      setDailySummary(summary);
    } catch (err: any) {
      console.error('Failed to fetch daily summary:', err);
    }
  };

  const handleOpenShift = async () => {
    if (!user) return;
    
    const balance = parseFloat(openingBalance);
    if (isNaN(balance) || balance < 0) {
      setError('Please enter a valid opening balance');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await staffService.openCashSession(user.id, balance);
      await fetchCashSession();
      setShowOpenModal(false);
      setOpeningBalance('');
    } catch (err: any) {
      setError(err.message || 'Failed to open shift');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseShift = async () => {
    if (!user) return;
    
    const balance = parseFloat(closingBalance);
    if (isNaN(balance) || balance < 0) {
      setError('Please enter a valid closing balance');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await staffService.closeCashSession(user.id, balance);
      await fetchCashSession();
      await fetchDailySummary();
      setShowCloseModal(false);
      setClosingBalance('');
    } catch (err: any) {
      setError(err.message || 'Failed to close shift');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  const getExpectedClosing = () => {
    if (!cashSession || !dailySummary) return 0;
    
    const expected = cashSession.openingBalance + 
      (dailySummary.totalSales || 0) + 
      (dailySummary.totalCommission || 0);
    
    return expected;
  };

  const getDifference = () => {
    if (!cashSession || !cashSession.closingBalance) return 0;
    
    const expected = getExpectedClosing();
    return cashSession.closingBalance - expected;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">My Shift</h1>
        <div className="text-sm text-muted-foreground">
          Manage your daily cash session and view transactions
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
          <div className="text-sm text-destructive">{error}</div>
        </div>
      )}

      {/* Shift Status Card */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-foreground">Shift Status</h2>
          <div className="flex space-x-4">
            {!cashSession || cashSession.status === 'CLOSED' ? (
              <button
                onClick={() => setShowOpenModal(true)}
                className="btn-primary py-2 px-4 text-sm font-medium"
              >
                Open Shift
              </button>
            ) : (
              <button
                onClick={() => setShowCloseModal(true)}
                className="btn-primary bg-destructive hover:bg-destructive/90 text-destructive-foreground py-2 px-4 text-sm font-medium"
              >
                Close Shift
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Shift Status</h3>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                cashSession?.status === 'OPEN' ? 'bg-success' : 'bg-muted-foreground'
              }`}></div>
              <span className="text-lg font-bold text-foreground">
                {cashSession?.status === 'OPEN' ? 'Shift Open' : 'Shift Closed'}
              </span>
            </div>
            {cashSession?.openedAt && (
              <p className="text-sm text-muted-foreground mt-2">
                Opened: {new Date(cashSession.openedAt).toLocaleString('en-IN')}
              </p>
            )}
            {cashSession?.closedAt && (
              <p className="text-sm text-muted-foreground mt-2">
                Closed: {new Date(cashSession.closedAt).toLocaleString('en-IN')}
              </p>
            )}
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Opening Balance</h3>
            <p className="text-2xl font-bold text-primary-dark">
              {cashSession ? formatCurrency(cashSession.openingBalance) : '₹0.00'}
            </p>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Closing Balance</h3>
            <p className="text-2xl font-bold text-foreground">
              {cashSession?.closingBalance ? formatCurrency(cashSession.closingBalance) : 'Not Closed'}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Summary */}
      {dailySummary && (
        <div className="card p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Today's Transactions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-primary-dark mb-2">Total Sales</h3>
              <p className="text-xl font-bold text-primary-dark">{formatCurrency(dailySummary.totalSales)}</p>
            </div>
            

            <div className="bg-warning/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-warning-foreground mb-2">Total Commission</h3>
              <p className="text-xl font-bold text-warning-foreground">{formatCurrency(dailySummary.totalCommission)}</p>
            </div>
          </div>

          {/* Cash Flow Summary */}
          <div className="border-t border-border pt-6">
            <h3 className="font-medium text-foreground mb-4">Cash Flow Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Opening Balance</span>
                <span className="font-medium">{formatCurrency(cashSession?.openingBalance || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Cash In</span>
                <span className="font-medium text-success">{formatCurrency(dailySummary.totalCashIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Cash Out</span>
                <span className="font-medium text-destructive">{formatCurrency(dailySummary.totalCashOut)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-medium text-foreground">Expected Closing Balance</span>
                <span className="font-bold">{formatCurrency(getExpectedClosing())}</span>
              </div>
              {cashSession?.closingBalance && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Actual Closing Balance</span>
                    <span className="font-medium">{formatCurrency(cashSession.closingBalance)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-medium text-foreground">Difference</span>
                    <span className={`font-bold ${
                      getDifference() >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {getDifference() >= 0 ? '+' : ''}{formatCurrency(getDifference())}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Open Shift Modal */}
      {showOpenModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Open Shift</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="openingBalance" className="block text-sm font-medium text-muted-foreground mb-2">
                    Opening Cash Balance (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-muted-foreground sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      id="openingBalance"
                      value={openingBalance}
                      onChange={(e) => setOpeningBalance(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="input-field pl-7 sm:text-sm"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enter the amount of cash you have at the start of your shift
                  </p>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowOpenModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOpenShift}
                    disabled={submitting}
                    className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
                  >
                    {submitting ? 'Opening...' : 'Open Shift'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close Shift Modal */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Close Shift</h2>
              
              <div className="space-y-6">
                {/* Expected vs Actual */}
                <div className="bg-secondary rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-2">Balance Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expected Closing:</span>
                      <span className="font-medium">{formatCurrency(getExpectedClosing())}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="font-medium text-foreground">Enter Actual Cash:</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="closingBalance" className="block text-sm font-medium text-muted-foreground mb-2">
                    Actual Closing Cash Balance (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-muted-foreground sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      id="closingBalance"
                      value={closingBalance}
                      onChange={(e) => setClosingBalance(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="input-field pl-7 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowCloseModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCloseShift}
                    disabled={submitting}
                    className="btn-primary bg-destructive hover:bg-destructive/90 text-destructive-foreground py-2 px-4 text-sm font-medium disabled:opacity-50"
                  >
                    {submitting ? 'Closing...' : 'Close Shift'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};