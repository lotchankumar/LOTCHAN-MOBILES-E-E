import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Star, 
  Users, 
  Camera, 
  Wallet,
  Search,
  Bell
} from "lucide-react";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("home");

  const serviceButtons = [
    {
      icon: Wrench,
      title: "Book Service",
      subtitle: "Quick & Easy Booking",
      action: () => onNavigate?.("book"),
      className: "service-button"
    },
    {
      icon: Search,
      title: "Track Order",
      subtitle: "Real-time Updates", 
      action: () => onNavigate?.("track"),
      className: "service-button"
    },
    {
      icon: Users,
      title: "Refer Friends",
      subtitle: "Earn 10% Commission",
      action: () => onNavigate?.("refer"),
      className: "service-button service-button-accent"
    },
    {
      icon: Camera,
      title: "Gallery",
      subtitle: "Before & After",
      action: () => onNavigate?.("gallery"),
      className: "service-button"
    }
  ];

  const currentOffers = [
    { text: "🎯 10% OFF on Screen Repairs", valid: "Valid till Oct 31" },
    { text: "💝 Free Pickup & Delivery", valid: "For orders above ₹500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-primary">LOTCHAN</h1>
              <p className="text-sm text-muted-foreground">Mobile Repair Center</p>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-muted-foreground" />
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Banner */}
      <div className="bg-primary text-white px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Somanur, Coimbatore - Tamil Nadu</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <Card className="p-6 bg-gradient-to-r from-primary to-primary-light text-white">
          <h2 className="text-lg font-semibold mb-2">Welcome Back!</h2>
          <p className="text-sm opacity-90">Your trusted mobile repair partner</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-bold">4.8</div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs">Rating</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">500+</div>
              <div className="text-xs">Repairs Done</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">24hr</div>
              <div className="text-xs">Quick Service</div>
            </div>
          </div>
        </Card>

        {/* Current Offers */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Current Offers</h3>
          {currentOffers.map((offer, index) => (
            <div key={index} className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
              <p className="font-medium text-sm">{offer.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{offer.valid}</p>
            </div>
          ))}
        </div>

        {/* Service Buttons Grid */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {serviceButtons.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={index}
                  onClick={service.action}
                  className={service.className}
                >
                  <Icon className="h-8 w-8 text-white mb-3" />
                  <h4 className="font-semibold text-white text-sm mb-1">
                    {service.title}
                  </h4>
                  <p className="text-xs text-white/80">{service.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Your Account</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <Wallet className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-success">₹150</div>
              <div className="text-xs text-muted-foreground">Referral Wallet</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <Wrench className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Services Done</div>
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-4 bg-destructive/5 border-destructive/20">
          <h3 className="font-semibold text-destructive mb-2">Emergency Service</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Need urgent repair? Call us directly for faster service.
          </p>
          <Button variant="destructive" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Call Now: +91 98765 43210
          </Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-2">
        <div className="flex justify-around">
          {[
            { key: "home", icon: "🏠", label: "Home", action: () => {} },
            { key: "book", icon: "📱", label: "Book", action: () => onNavigate?.("book") },
            { key: "track", icon: "📍", label: "Track", action: () => onNavigate?.("track") },
            { key: "refer", icon: "👥", label: "Refer", action: () => onNavigate?.("refer") },
            { key: "profile", icon: "👤", label: "Profile", action: () => {} }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={tab.action}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === tab.key ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;