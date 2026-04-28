import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MapPin, Clock, CheckCircle, Package, Truck, Phone } from "lucide-react";

interface OrderTrackingProps {
  onBack: () => void;
}

const OrderTracking = ({ onBack }: OrderTrackingProps) => {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample tracking data
  const sampleOrders = {
    "LRC123456": {
      orderId: "LRC123456",
      status: "in-progress",
      device: "iPhone 14 Pro",
      issue: "Screen Broken/Cracked",
      estimatedCost: "₹8,500",
      customerName: "Ravi Kumar",
      pickupAddress: "123, Gandhi Street, Somanur",
      contactNumber: "+91 98765 43210",
      timeline: [
        {
          status: "requested",
          title: "Service Requested",
          description: "Your service request has been received",
          timestamp: "Today, 10:30 AM",
          completed: true
        },
        {
          status: "picked",
          title: "Device Picked Up",
          description: "Our technician has collected your device",
          timestamp: "Today, 2:15 PM", 
          completed: true
        },
        {
          status: "diagnosis",
          title: "Diagnosis Complete",
          description: "Issue identified: Screen replacement needed",
          timestamp: "Today, 4:30 PM",
          completed: true
        },
        {
          status: "repair",
          title: "Repair in Progress",
          description: "Our expert is working on your device",
          timestamp: "In Progress",
          completed: false,
          current: true
        },
        {
          status: "quality",
          title: "Quality Check",
          description: "Final testing and quality assurance",
          timestamp: "Pending",
          completed: false
        },
        {
          status: "delivery",
          title: "Ready for Delivery",
          description: "Device ready for pickup/delivery",
          timestamp: "Pending",
          completed: false
        }
      ]
    },
    "LRC789012": {
      orderId: "LRC789012", 
      status: "completed",
      device: "Samsung Galaxy S23",
      issue: "Battery Issues",
      estimatedCost: "₹3,200",
      customerName: "Priya Sharma",
      pickupAddress: "456, Anna Nagar, Somanur",
      contactNumber: "+91 87654 32109",
      timeline: [
        {
          status: "requested",
          title: "Service Requested",
          description: "Your service request has been received",
          timestamp: "Yesterday, 9:00 AM",
          completed: true
        },
        {
          status: "picked",
          title: "Device Picked Up", 
          description: "Our technician has collected your device",
          timestamp: "Yesterday, 11:30 AM",
          completed: true
        },
        {
          status: "diagnosis",
          title: "Diagnosis Complete",
          description: "Issue identified: Battery replacement needed",
          timestamp: "Yesterday, 2:00 PM",
          completed: true
        },
        {
          status: "repair",
          title: "Repair Completed",
          description: "New battery installed and tested",
          timestamp: "Yesterday, 5:30 PM",
          completed: true
        },
        {
          status: "quality",
          title: "Quality Check Passed",
          description: "Device tested and quality approved",
          timestamp: "Today, 9:00 AM",
          completed: true
        },
        {
          status: "delivery",
          title: "Ready for Pickup",
          description: "Device ready - please collect",
          timestamp: "Today, 10:00 AM",
          completed: true,
          current: true
        }
      ]
    }
  };

  const handleTrackOrder = async () => {
    if (!orderId.trim()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = sampleOrders[orderId as keyof typeof sampleOrders];
    setTrackingData(data || null);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "requested": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "delivered": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "requested": return Clock;
      case "in-progress": return Package;
      case "completed": return CheckCircle;
      case "delivered": return Truck;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-semibold">Track Order</h1>
            <p className="text-sm text-muted-foreground">Real-time Order Updates</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Search Section */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Enter Order ID</h3>
          <div className="flex gap-3">
            <Input
              placeholder="e.g., LRC123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTrackOrder} disabled={isLoading || !orderId.trim()}>
              {isLoading ? "Tracking..." : <Search className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-3 flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {setOrderId("LRC123456"); handleTrackOrder();}}
            >
              Try: LRC123456
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {setOrderId("LRC789012"); handleTrackOrder();}}
            >
              Try: LRC789012
            </Button>
          </div>
        </Card>

        {/* No Results */}
        {orderId && trackingData === null && !isLoading && (
          <Card className="p-6 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Order Not Found</h3>
            <p className="text-sm text-muted-foreground">
              Please check your order ID and try again.
            </p>
          </Card>
        )}

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Order Summary</h3>
                <Badge className={getStatusColor(trackingData.status)}>
                  {trackingData.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Order ID:</span>
                  <div className="font-medium">{trackingData.orderId}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Device:</span>
                  <div className="font-medium">{trackingData.device}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Issue:</span>
                  <div className="font-medium">{trackingData.issue}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <div className="font-medium text-primary">{trackingData.estimatedCost}</div>
                </div>
              </div>
            </Card>

            {/* Customer Details */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Customer Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{trackingData.customerName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground flex-1">{trackingData.pickupAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{trackingData.contactNumber}</span>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Order Timeline</h3>
              <div className="space-y-4">
                {trackingData.timeline.map((step: any, index: number) => {
                  const Icon = getStatusIcon(step.status);
                  return (
                    <div key={index} className="flex gap-3">
                      <div className={`rounded-full p-2 ${
                        step.completed ? 'bg-success text-white' : 
                        step.current ? 'bg-primary text-white' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${
                            step.current ? 'text-primary' : ''
                          }`}>
                            {step.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
              {trackingData.status === 'completed' && (
                <Button variant="outline" className="w-full">
                  Schedule Pickup
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;