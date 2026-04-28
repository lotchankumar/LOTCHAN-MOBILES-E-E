import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Quote, ThumbsUp, Eye } from "lucide-react";

interface GalleryProps {
  onBack: () => void;
}

const Gallery = ({ onBack }: GalleryProps) => {
  const [activeTab, setActiveTab] = useState<"repairs" | "testimonials">("repairs");

  const repairGallery = [
    {
      id: 1,
      device: "iPhone 14 Pro",
      issue: "Screen Replacement",
      beforeImage: "📱💔",
      afterImage: "📱✨",
      rating: 5,
      customerName: "Ravi Kumar",
      date: "Jan 2024"
    },
    {
      id: 2,
      device: "Samsung Galaxy S23",
      issue: "Battery Replacement",
      beforeImage: "🔋❌",
      afterImage: "🔋💚",
      rating: 5,
      customerName: "Priya Sharma",
      date: "Jan 2024"
    },
    {
      id: 3,
      device: "OnePlus 11",
      issue: "Water Damage Repair",
      beforeImage: "📱💧",
      afterImage: "📱🌟",
      rating: 5,
      customerName: "Raj Kumar",
      date: "Dec 2023"
    },
    {
      id: 4,
      device: "Xiaomi 13 Pro",
      issue: "Camera Lens Replacement",
      beforeImage: "📷❌",
      afterImage: "📷✨",
      rating: 5,
      customerName: "Meera Krishnan",
      date: "Dec 2023"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Ravi Kumar",
      rating: 5,
      device: "iPhone 14 Pro",
      review: "Excellent service! My iPhone screen was completely shattered, but they made it look brand new. Very professional and quick service. Highly recommended!",
      date: "2 days ago",
      verified: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 5,
      device: "Samsung Galaxy S23",
      review: "Amazing experience! Battery replacement was done in just 2 hours. The staff is very knowledgeable and friendly. Great value for money.",
      date: "1 week ago",
      verified: true
    },
    {
      id: 3,
      name: "Raj Kumar",
      rating: 5,
      device: "OnePlus 11",
      review: "My phone had water damage and I thought it was gone forever. But LOTCHAN team worked magic! Phone is working perfectly now. Thank you so much!",
      date: "2 weeks ago", 
      verified: true
    },
    {
      id: 4,
      name: "Meera Krishnan",
      rating: 5,
      device: "Xiaomi 13 Pro",
      review: "Camera repair was done perfectly. Photos are crystal clear again! Professional service and reasonable pricing. Will definitely come back.",
      date: "3 weeks ago",
      verified: true
    },
    {
      id: 5,
      name: "Suresh Babu",
      rating: 4,
      device: "Realme GT Neo",
      review: "Good service overall. Charging port replacement was done well. Only suggestion is to improve waiting area comfort.",
      date: "1 month ago",
      verified: true
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-accent text-accent" : "text-muted-foreground"
        }`}
      />
    ));
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
            <h1 className="font-semibold">Gallery & Reviews</h1>
            <p className="text-sm text-muted-foreground">Our Work & Customer Stories</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="px-4 py-2">
          <div className="flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setActiveTab("repairs")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === "repairs"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Repair Gallery
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === "testimonials"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Testimonials
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-xl font-bold text-primary">500+</div>
            <div className="text-xs text-muted-foreground">Repairs Done</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-xl font-bold text-accent">4.8</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-xl font-bold text-success">98%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </Card>
        </div>

        {/* Repair Gallery Tab */}
        {activeTab === "repairs" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Before & After Repairs</h3>
            {repairGallery.map((repair) => (
              <Card key={repair.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{repair.device}</h4>
                    <p className="text-sm text-muted-foreground">{repair.issue}</p>
                  </div>
                  <Badge variant="secondary">{repair.date}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{repair.beforeImage}</div>
                    <div className="text-sm font-medium text-destructive">Before</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{repair.afterImage}</div>
                    <div className="text-sm font-medium text-success">After</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">By {repair.customerName}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(repair.rating)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Reviews</h3>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.device}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="text-xs text-muted-foreground">{testimonial.date}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <Quote className="h-4 w-4 text-muted-foreground mb-2" />
                  <p className="text-sm text-foreground leading-relaxed">
                    {testimonial.review}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  {testimonial.verified && (
                    <Badge variant="secondary" className="text-xs">
                      ✓ Verified Purchase
                    </Badge>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <ThumbsUp className="h-3 w-3" />
                      Helpful
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Eye className="h-3 w-3" />
                      View Details
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <Card className="p-6 text-center bg-gradient-to-r from-primary/10 to-accent/10">
          <h3 className="font-semibold mb-2">Ready to Experience Quality Service?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Join 500+ satisfied customers who trust LOTCHAN for their mobile repairs.
          </p>
          <Button className="w-full" onClick={onBack}>
            Book Your Service Now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Gallery;