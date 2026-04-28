import { useState, useEffect } from 'react';
import { managerService } from '../services/manager.service';

export const SalesDashboardPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const data = await managerService.getSales({});
        setSales(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sales');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading sales data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>
      {sales.length === 0 ? (
        <div className="text-gray-500">No sales data available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-left">Sale ID</th>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Customer</th>
                <th className="border p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale: any) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="border p-2">{sale.id}</td>
                  <td className="border p-2">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="border p-2">{sale.customerName || 'N/A'}</td>
                  <td className="border p-2 text-right">${sale.total?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesDashboardPage;
