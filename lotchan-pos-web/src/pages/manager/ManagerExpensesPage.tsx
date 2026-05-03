import { useState, useEffect } from 'react';
import { managerService, type Expense, type CreateExpenseRequest, type Supplier } from '../../services/manager.service';
import { useAuthStore } from '../../store/auth.store';
import { AlertTriangle, Receipt, CreditCard } from 'lucide-react';

export const ManagerExpensesPage = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyAverage, setMonthlyAverage] = useState(0);

  const [formData, setFormData] = useState<CreateExpenseRequest>({
    managerId: user?.id || '',
    description: '',
    amount: 0,
  });

  // Supplier Payment State
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplierForPayment, setSelectedSupplierForPayment] = useState<Supplier | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentType: 'DEBIT' as 'CREDIT' | 'DEBIT',
    reference: '',
    description: '',
  });
  const [submittingPayment, setSubmittingPayment] = useState(false);

  // Fetch expenses and suppliers
  useEffect(() => {
    fetchExpenses();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [expenses]);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await managerService.getExpenses();
      setExpenses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await managerService.getSuppliers();
      setSuppliers(data);
    } catch (err: any) {
      console.error('Failed to load suppliers:', err);
    }
  };

  const calculateTotals = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
    
    // Calculate monthly average
    if (expenses.length > 0) {
      const firstDate = new Date(Math.min(...expenses.map(e => new Date(e.expenseDate).getTime())));
      const lastDate = new Date(Math.max(...expenses.map(e => new Date(e.expenseDate).getTime())));
      const monthsDiff = Math.max(1, (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + 
        (lastDate.getMonth() - firstDate.getMonth()) + 1);
      setMonthlyAverage(total / monthsDiff);
    } else {
      setMonthlyAverage(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim() || formData.amount <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    setLoading(true);
    try {
      await managerService.createExpense({
        ...formData,
        managerId: user?.id || '',
      });
      
      // Reset form
      setFormData({
        managerId: user?.id || '',
        description: '',
        amount: 0,
      });
      setShowForm(false);
      fetchExpenses();
      
      alert('Expense recorded successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create expense');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplierForPayment) return;
    try {
      setSubmittingPayment(true);
      await managerService.recordSupplierPayment({
        supplierId: selectedSupplierForPayment.id,
        amount: Number(paymentForm.amount),
        paymentType: paymentForm.paymentType,
        reference: paymentForm.reference,
        description: paymentForm.description,
      });
      await fetchSuppliers(); // Refresh balances
      await fetchExpenses(); // Refresh expense list
      setShowSupplierModal(false);
      resetPaymentForm();
      alert('Supplier payment recorded successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to record payment');
    } finally {
      setSubmittingPayment(false);
    }
  };

  const resetPaymentForm = () => {
    setPaymentForm({ amount: '', paymentType: 'DEBIT', reference: '', description: '' });
    setSelectedSupplierForPayment(null);
  };

  // Group expenses by month for chart
  const expensesByMonth = expenses.reduce((acc, expense) => {
    const date = new Date(expense.expenseDate);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedMonths = Object.keys(expensesByMonth).sort();

  return (
    <div className="space-y-6 pos-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#d2e4ff]">Expenses Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              resetPaymentForm();
              setShowSupplierModal(true);
            }}
            className="pos-btn-secondary py-2 px-4 text-sm font-medium flex items-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Supplier Payment
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="pos-btn-primary py-2 px-4 text-sm font-medium"
          >
            {showForm ? 'Cancel' : 'New Expense'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="pos-glass rounded-xl p-4">
          <div className="text-sm text-slate-400">Total Expenses</div>
          <div className="text-2xl font-bold text-red-400">₹{totalExpenses.toFixed(2)}</div>
          <div className="text-xs text-slate-400 mt-1">All-time total</div>
        </div>
        <div className="pos-glass rounded-xl p-4">
          <div className="text-sm text-slate-400">Monthly Average</div>
          <div className="text-2xl font-bold text-yellow-400">₹{monthlyAverage.toFixed(2)}</div>
          <div className="text-xs text-slate-400 mt-1">Average per month</div>
        </div>
        <div className="pos-glass rounded-xl p-4">
          <div className="text-sm text-slate-400">Total Records</div>
          <div className="text-2xl font-bold text-[#d2e4ff]">{expenses.length}</div>
          <div className="text-xs text-slate-400 mt-1">Expense entries</div>
        </div>
      </div>

      {/* Expense Form */}
      {showForm && (
        <div className="pos-glass rounded-xl p-6">
          <h3 className="text-lg font-medium text-[#d2e4ff] mb-6">Record New Expense</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="pos-input sm:text-sm"
                  placeholder="Describe the expense (e.g., Office supplies, Electricity bill, etc.)"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="pos-input sm:text-sm"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Category
                </label>
                <select
                  className="pos-input sm:text-sm"
                  onChange={(e) => {
                    const category = e.target.value;
                    if (category) {
                      setFormData(prev => ({ 
                        ...prev, 
                        description: `${category}: ${prev.description}` 
                      }));
                    }
                  }}
                >
                  <option value="">Select category (optional)</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Rent">Rent</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Travel">Travel</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="pos-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="pos-btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Record Expense'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expenses History */}
      <div className="pos-glass rounded-xl p-6">
        <h3 className="text-lg font-medium text-[#d2e4ff] mb-6">Recent Expenses</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sm text-slate-400">Loading expenses...</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-8">
            <Receipt className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 text-sm text-slate-400">No expenses recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden border border-white/10 rounded-lg">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-[#0c2b49]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Recorded By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#00213d] divide-y divide-white/5">
                {expenses.slice(0, 20).map((expense) => (
                  <tr key={expense.id} className="hover:bg-[#0c2b49]">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">
                      {new Date(expense.expenseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#d2e4ff]">
                      <div className="max-w-md">
                        {expense.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-400">
                      ₹{expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      Manager
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#0c2b49]">
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-sm font-medium text-[#d2e4ff] text-right">
                    Total (Last 20):
                  </td>
                  <td colSpan={2} className="px-6 py-4 text-lg font-bold text-red-400">
                    ₹{expenses.slice(0, 20).reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Monthly Breakdown */}
      <div className="pos-glass rounded-xl p-6">
        <h3 className="text-lg font-medium text-[#d2e4ff] mb-6">Monthly Expense Breakdown</h3>
        
        {sortedMonths.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-slate-400">No expense data available for analysis.</p>
          </div>
        ) : (
          <div className="space-y-6 pos-fade-in">
            {/* Simple bar chart using divs */}
            <div className="space-y-4">
              {sortedMonths.slice(-6).map((month) => {
                const amount = expensesByMonth[month];
                const maxAmount = Math.max(...Object.values(expensesByMonth));
                const percentage = maxAmount > 0 ? (amount / maxAmount * 100) : 0;
                
                return (
                  <div key={month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        {new Date(`${month}-01`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <span className="font-medium">₹{amount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-[#0c2b49] rounded-full h-4">
                      <div 
                        className="bg-red-600 rounded-full h-4" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-3">Expense Trends</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Highest Month</span>
                    <span className="text-sm font-medium">
                      {sortedMonths.length > 0 
                        ? (() => {
                            const highestMonth = Object.keys(expensesByMonth).reduce((a, b) => expensesByMonth[a] > expensesByMonth[b] ? a : b);
                            return `${new Date(`${highestMonth}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}: ₹${expensesByMonth[highestMonth].toFixed(2)}`;
                          })()
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Lowest Month</span>
                    <span className="text-sm font-medium">
                      {sortedMonths.length > 0 
                        ? (() => {
                            const lowestMonth = Object.keys(expensesByMonth).reduce((a, b) => expensesByMonth[a] < expensesByMonth[b] ? a : b);
                            return `${new Date(`${lowestMonth}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}: ₹${expensesByMonth[lowestMonth].toFixed(2)}`;
                          })()
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Average Monthly</span>
                    <span className="text-sm font-medium">₹{monthlyAverage.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Last 30 Days</span>
                    <span className="text-sm font-medium">
                      ₹{expenses
                        .filter(e => {
                          const expenseDate = new Date(e.expenseDate);
                          const thirtyDaysAgo = new Date();
                          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                          return expenseDate >= thirtyDaysAgo;
                        })
                        .reduce((sum, e) => sum + e.amount, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Last 7 Days</span>
                    <span className="text-sm font-medium">
                      ₹{expenses
                        .filter(e => {
                          const expenseDate = new Date(e.expenseDate);
                          const sevenDaysAgo = new Date();
                          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                          return expenseDate >= sevenDaysAgo;
                        })
                        .reduce((sum, e) => sum + e.amount, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Today</span>
                    <span className="text-sm font-medium">
                      ₹{expenses
                        .filter(e => {
                          const expenseDate = new Date(e.expenseDate);
                          const today = new Date();
                          return expenseDate.toDateString() === today.toDateString();
                        })
                        .reduce((sum, e) => sum + e.amount, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Supplier Payment Modal */}
      {showSupplierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071A2F]/80 backdrop-blur-sm">
          <div className="bg-[#00213d] border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-white/10 bg-blue-600/5">
              <h3 className="text-xl font-bold text-[#d2e4ff]">Record Supplier Payment</h3>
              <p className="text-sm text-slate-400 mt-1">
                Update credit balances for suppliers
              </p>
              {selectedSupplierForPayment && (
                <div className="mt-4 p-3 bg-[#00213d] rounded-md border border-white/10 flex justify-between items-center">
                  <span className="text-sm font-medium">Current Credit Balance:</span>
                  <span className={`font-bold ${selectedSupplierForPayment.creditBalance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    ₹{selectedSupplierForPayment.creditBalance.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#d2e4ff] mb-1">Select Supplier *</label>
                <select
                  required
                  value={selectedSupplierForPayment?.id || ''}
                  onChange={(e) => {
                    const s = suppliers.find(sup => sup.id === e.target.value);
                    setSelectedSupplierForPayment(s || null);
                  }}
                  className="pos-input"
                >
                  <option value="">-- Choose Supplier --</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedSupplierForPayment && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#d2e4ff] mb-1">Payment Type *</label>
                    <select
                      value={paymentForm.paymentType}
                      onChange={(e) => setPaymentForm({ ...paymentForm, paymentType: e.target.value as 'CREDIT' | 'DEBIT' })}
                      className="pos-input"
                    >
                      <option value="DEBIT">Debit (We pay supplier)</option>
                      <option value="CREDIT">Credit (Supplier gives us goods/refund)</option>
                    </select>
                    <p className="text-xs text-slate-400 mt-1">
                      {paymentForm.paymentType === 'DEBIT' 
                        ? 'Records a payment made TO the supplier, decreasing the credit balance.'
                        : 'Records goods received or a refund FROM the supplier, increasing the credit balance.'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#d2e4ff] mb-1">Amount (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                      className="pos-input font-mono text-lg"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#d2e4ff] mb-1">Reference (Optional)</label>
                    <input
                      type="text"
                      value={paymentForm.reference}
                      onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                      className="pos-input"
                      placeholder="e.g. Transaction ID, Cheque No."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#d2e4ff] mb-1">Notes (Optional)</label>
                    <textarea
                      value={paymentForm.description}
                      onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                      className="pos-input"
                      placeholder="Any additional details..."
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowSupplierModal(false);
                    resetPaymentForm();
                  }}
                  className="pos-btn-secondary"
                  disabled={submittingPayment}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pos-btn-primary"
                  disabled={submittingPayment || !selectedSupplierForPayment || !paymentForm.amount || Number(paymentForm.amount) <= 0}
                >
                  {submittingPayment ? 'Processing...' : 'Record Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};