import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HappyCustomerBg from "@/components/HappyCustomerBg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <HappyCustomerBg />

      {/* Glassmorphism Card */}
      <div className="card w-full max-w-md p-8 space-y-8 text-center bg-black/30 border-white/20 backdrop-blur-xl relative z-10">
        <div className="space-y-4">
          <div className="flex justify-center items-center py-2">
            <img src="/logo.png" alt="Lotchan Mobiles Logo" className="h-28 w-auto object-contain logo-drive-in" />
          </div>
          <p className="text-xl text-white font-bold mt-2 drop-shadow-md">Mobile Repair Center</p>
          <p className="text-white/90 font-medium drop-shadow-md">
            Your trusted partner for mobile repairs.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate("/auth")} className="w-full h-12 text-lg shadow-lg border border-white/20">
            Get Started
          </Button>
          <p className="text-sm text-white/80 drop-shadow-sm">
            Join us for fast repairs, quality accessories, and earn rewards!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center pt-8 border-t border-white/20">
          <div>
            <p className="text-2xl font-bold text-white drop-shadow-md">⭐ 4.8</p>
            <p className="text-xs text-white/80 font-medium uppercase tracking-wider mt-1 drop-shadow-sm">Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white drop-shadow-md">500+</p>
            <p className="text-xs text-white/80 font-medium uppercase tracking-wider mt-1 drop-shadow-sm">Repairs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white drop-shadow-md">24hr</p>
            <p className="text-xs text-white/80 font-medium uppercase tracking-wider mt-1 drop-shadow-sm">Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

