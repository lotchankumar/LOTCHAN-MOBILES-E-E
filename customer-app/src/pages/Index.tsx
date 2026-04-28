import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-warning/20 to-primary/20 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent via-warning to-primary bg-clip-text text-transparent">
            LOTCHAN
          </h1>
          <p className="text-xl text-foreground font-medium">Mobile Repair Center</p>
          <p className="text-muted-foreground">
            Your trusted partner for mobile repairs & accessories in Somanur, Coimbatore
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate("/auth")} className="w-full h-12 text-lg">
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground">
            Join us for fast repairs, quality accessories, and earn rewards!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center pt-8">
          <div>
            <p className="text-2xl font-bold text-primary">⭐ 4.8</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">500+</p>
            <p className="text-xs text-muted-foreground">Repairs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">24hr</p>
            <p className="text-xs text-muted-foreground">Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
