import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Smartphone, Calendar, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServiceBookingProps {
  onBack: () => void;
}

const ServiceBooking = ({ onBack }: ServiceBookingProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    deviceBrand: "",
    deviceModel: "",
    issue: "",
    description: "",
    location: "",
    preferredDate: "",
    preferredTime: "",
    contactNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const deviceBrands = [
    "Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Oppo", "Vivo", "Google", "Nothing", "Others"
  ];

  const commonIssues = [
    "Screen Broken/Cracked",
    "Battery Issues",
    "Charging Problems", 
    "Speaker/Audio Issues",
    "Camera Not Working",
    "Water Damage",
    "Software Issues",
    "Touch Not Working",
    "Others"
  ];

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM", 
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderId = `LRC${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setIsSubmitting(false);

    toast({
      title: "Service Booked Successfully!",
      description: `Your order ID is ${newOrderId}. We'll contact you soon.`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto pt-8">
          <Card className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold text-success mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-4">Your service request has been submitted successfully.</p>
            
            <div className="bg-primary/5 rounded-lg p-4 mb-6">
              <div className="text-sm text-muted-foreground">Order ID</div>
              <div className="text-lg font-bold text-primary">{orderId}</div>
            </div>

            <div className="space-y-3 text-left mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Device:</span>
                <span className="text-sm font-medium">{formData.deviceBrand} {formData.deviceModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Issue:</span>
                <span className="text-sm font-medium">{formData.issue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Preferred Date:</span>
                <span className="text-sm font-medium">{formData.preferredDate}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={onBack} className="w-full">
                Back to Home
              </Button>
              <Button variant="outline" className="w-full">
                Track This Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-semibold">Book Service</h1>
            <p className="text-sm text-muted-foreground">Quick & Easy Booking</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Service Info */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Service Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Free Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>24hr Service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span>Expert Tech</span>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Device Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Device Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deviceBrand">Device Brand *</Label>
                <Select onValueChange={(value) => handleInputChange("deviceBrand", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deviceModel">Device Model *</Label>
                <Input
                  id="deviceModel"
                  placeholder="e.g., iPhone 14, Galaxy S23"
                  value={formData.deviceModel}
                  onChange={(e) => handleInputChange("deviceModel", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="issue">Main Issue *</Label>
                <Select onValueChange={(value) => handleInputChange("issue", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonIssues.map((issue) => (
                      <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Describe the Issue</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about the problem..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Pickup Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Pickup Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Pickup Location *</Label>
                <Input
                  id="location"
                  placeholder="Enter your address"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="preferredTime">Time Slot</Label>
                  <Select onValueChange={(value) => handleInputChange("preferredTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Pricing Info */}
          <Card className="p-4 bg-accent/5 border-accent/20">
            <h3 className="font-semibold mb-3">Pricing Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Inspection Charge:</span>
                <span className="font-medium">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Pickup & Delivery:</span>
                <span className="font-medium">FREE</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <p className="text-xs text-muted-foreground">
                  * Final charges will be informed after device inspection
                </p>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Service Now"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ServiceBooking;