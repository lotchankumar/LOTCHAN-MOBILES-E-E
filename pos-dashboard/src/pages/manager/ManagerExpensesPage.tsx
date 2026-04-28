import { useState, useEffect } from 'react';
import { managerService, type Expense, type CreateExpenseRequest } from '../../services/manager.service';
import { useAuthStore } from '../../store/auth.store';
import { AlertTriangle, Receipt } from 'lucide-react';

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

  // Fetch expenses
  useEffect(() => {
    fetchExpenses();
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Expenses Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary py-2 px-4 text-sm font-medium"
        >
          {showForm ? 'Cancel' : 'New Expense'}
        </button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Total Expenses</div>
          <div className="text-2xl font-bold text-destructive">₹{totalExpenses.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-1">All-time total</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Monthly Average</div>
          <div className="text-2xl font-bold text-warning-foreground">₹{monthlyAverage.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-1">Average per month</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Total Records</div>
          <div className="text-2xl font-bold text-foreground">{expenses.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Expense entries</div>
        </div>
      </div>

      {/* Expense Form */}
      {showForm && (
        <div className="card p-6">
          <h3 className="text-lg font-medium text-foreground mb-6">Record New Expense</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field sm:text-sm"
                  placeholder="Describe the expense (e.g., Office supplies, Electricity bill, etc.)"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="input-field sm:text-sm"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Category
                </label>
                <select
                  className="input-field sm:text-sm"
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
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Record Expense'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expenses History */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-foreground mb-6">Recent Expenses</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading expenses...</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-8">
            <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No expenses recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden border border-border rounded-lg">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Recorded By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {expenses.slice(0, 20).map((expense) => (
                  <tr key={expense.id} className="hover:bg-secondary">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {new Date(expense.expenseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      <div className="max-w-md">
                        {expense.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-destructive">
                      ₹{expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      Manager
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-secondary">
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-sm font-medium text-foreground text-right">
                    Total (Last 20):
                  </td>
                  <td colSpan={2} className="px-6 py-4 text-lg font-bold text-destructive">
                    ₹{expenses.slice(0, 20).reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Monthly Breakdown */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-foreground mb-6">Monthly Expense Breakdown</h3>
        
        {sortedMonths.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No expense data available for analysis.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Simple bar chart using divs */}
            <div className="space-y-4">
              {sortedMonths.slice(-6).map((month) => {
                const amount = expensesByMonth[month];
                const maxAmount = Math.max(...Object.values(expensesByMonth));
                const percentage = maxAmount > 0 ? (amount / maxAmount * 100) : 0;
                
                return (
                  <div key={month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {new Date(`${month}-01`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <span className="font-medium">₹{amount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-4">
                      <div 
                        className="bg-destructive rounded-full h-4" 
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
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Expense Trends</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Highest Month</span>
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
                    <span className="text-sm text-muted-foreground">Lowest Month</span>
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
                    <span className="text-sm text-muted-foreground">Average Monthly</span>
                    <span className="text-sm font-medium">₹{monthlyAverage.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last 30 Days</span>
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
                    <span className="text-sm text-muted-foreground">Last 7 Days</span>
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
                    <span className="text-sm text-muted-foreground">Today</span>
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
    </div>
  );
};