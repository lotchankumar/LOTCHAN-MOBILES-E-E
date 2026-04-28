import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Copy, Wallet, Gift, Users, Trophy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralProgramProps {
  onBack: () => void;
}

const ReferralProgram = ({ onBack }: ReferralProgramProps) => {
  const { toast } = useToast();
  const [userCode] = useState("RAVI2024");
  const [referralStats] = useState({
    totalReferrals: 5,
    successfulReferrals: 3,
    walletBalance: 150,
    pendingEarnings: 50
  });

  const [referralHistory] = useState([
    {
      id: 1,
      friendName: "Priya Sharma",
      serviceDate: "2024-01-15",
      commission: 50,
      status: "paid"
    },
    {
      id: 2,
      friendName: "Raj Kumar",
      serviceDate: "2024-01-20",
      commission: 75,
      status: "paid"
    },
    {
      id: 3,
      friendName: "Meera Krishnan",
      serviceDate: "2024-01-25",
      commission: 25,
      status: "paid"
    },
    {
      id: 4,
      friendName: "Suresh Babu",
      serviceDate: "2024-01-28",
      commission: 40,
      status: "pending"
    }
  ]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleShare = () => {
    const shareText = `🔧 Hey! Get your mobile repaired at LOTCHAN Repair Center with my referral code: ${userCode} and save money! 📱✨\n\n📍 Somanur, Coimbatore\n⭐ 4.8 Rating | 500+ Repairs Done\n🚀 24hr Quick Service\n\nDownload: [App Link]`;
    
    if (navigator.share) {
      navigator.share({
        title: 'LOTCHAN Repair Center',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share this message with your friends",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light/20 to-primary-light/20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-semibold">Referral Program</h1>
            <p className="text-sm text-muted-foreground">Earn 10% Commission</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Hero Banner */}
        <Card className="p-6 bg-gradient-to-r from-accent to-accent-light text-white">
          <div className="text-center">
            <Gift className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Refer & Earn!</h2>
            <p className="text-sm opacity-90 mb-4">
              Earn 10% commission on every successful referral
            </p>
            <div className="bg-white/20 rounded-lg p-3 inline-block">
              <span className="text-xs opacity-80">Your Referral Code</span>
              <div className="text-lg font-bold">{userCode}</div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <Wallet className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">₹{referralStats.walletBalance}</div>
            <div className="text-xs text-muted-foreground">Wallet Balance</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{referralStats.successfulReferrals}</div>
            <div className="text-xs text-muted-foreground">Successful Referrals</div>
          </Card>
        </div>

        {/* How it Works */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">How it Works</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">Share Your Code</h4>
                <p className="text-xs text-muted-foreground">Share your referral code with friends</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">Friend Books Service</h4>
                <p className="text-xs text-muted-foreground">Your friend uses your code for any service</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-success text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">Earn Commission</h4>
                <p className="text-xs text-muted-foreground">Get 10% of service amount in your wallet</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Share Section */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Share Your Code</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input value={userCode} readOnly className="flex-1" />
              <Button variant="outline" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleShare} className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share with Friends
            </Button>
          </div>
        </Card>

        {/* Earnings Summary */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Earnings Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-success/10 p-3 rounded-lg text-center">
              <div className="font-bold text-success text-lg">₹{referralStats.walletBalance}</div>
              <div className="text-xs text-muted-foreground">Available Balance</div>
            </div>
            <div className="bg-warning/10 p-3 rounded-lg text-center">
              <div className="font-bold text-warning text-lg">₹{referralStats.pendingEarnings}</div>
              <div className="text-xs text-muted-foreground">Pending Earnings</div>
            </div>
          </div>
        </Card>

        {/* Referral History */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Referral History</h3>
          <div className="space-y-3">
            {referralHistory.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{referral.friendName}</div>
                  <div className="text-xs text-muted-foreground">{referral.serviceDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">₹{referral.commission}</div>
                  <Badge 
                    variant={referral.status === 'paid' ? 'default' : 'secondary'}
                    className={referral.status === 'paid' ? 'bg-success text-white' : ''}
                  >
                    {referral.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Terms */}
        <Card className="p-4 bg-muted/30">
          <h3 className="font-semibold mb-3">Terms & Conditions</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Earn 10% commission on successful service completion</li>
            <li>• Minimum service amount ₹200 for commission eligibility</li>
            <li>• Commission credited within 24 hours of service completion</li>
            <li>• Wallet balance can be used for future services</li>
            <li>• Self-referrals are not allowed</li>
          </ul>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-3">
          <Button className="w-full h-12">
            Withdraw to Bank Account
          </Button>
          <p className="text-xs text-muted-foreground">
            Minimum withdrawal amount: ₹100
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;