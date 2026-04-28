import React, { useState } from 'react';
import { api } from '../services/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OrderTracking: React.FC = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [repairData, setRepairData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRepairData(null);
    setLoading(true);

    try {
      // Assuming a GET /api/repairs route accepts ticketNumber as a query param
      const response = await api.get(`/repairs?ticketNumber=${encodeURIComponent(ticketNumber)}`);
      if (response.data && response.data.length > 0) {
        setRepairData(response.data[0]);
      } else {
        setError('No repair found with this ticket number.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch repair information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="max-w-xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Track Your Repair</h1>
          <p className="text-muted-foreground">
            Enter your ticket number to see the real-time status of your device repair.
          </p>

          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input 
              type="text" 
              placeholder="e.g. REP-2026-0001" 
              value={ticketNumber} 
              onChange={(e) => setTicketNumber(e.target.value)} 
              required 
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </Button>
          </form>

          {error && <div className="text-destructive font-semibold">{error}</div>}

          {repairData && (
            <div className="bg-card p-6 border rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-bold">Ticket: {repairData.ticketNumber}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Device</p>
                  <p className="font-medium">{repairData.deviceModel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-primary">{repairData.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Cost</p>
                  <p className="font-medium">₹{repairData.estimatedCost}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Issue</p>
                  <p className="font-medium">{repairData.issueDescription}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
