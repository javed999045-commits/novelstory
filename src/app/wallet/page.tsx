
"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Coins, History, ArrowLeft, CheckCircle, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const transactionHistory = [
  {
    id: 1,
    description: "Purchased 550 coins",
    date: "Today, 10:45 AM",
    amount: "500",
    type: "purchase",
    status: "completed",
    utr: "HDFC123456789"
  },
  {
    id: 2,
    description: "Purchased 100 coins",
    date: "Today, 10:30 AM",
    amount: "100",
    type: "purchase",
    status: "pending",
    utr: "ICICI987654321"
  },
  {
    id: 3,
    description: "Unlocked Episode: The Midnight Forest",
    date: "1 day ago",
    amount: "15",
    type: "spend",
    status: "completed"
  },
  {
    id: 4,
    description: "Purchased 500 coins",
    date: "15 Feb 2024",
    amount: "500",
    type: "purchase",
    status: "rejected",
    reason: "UTR mismatch"
  },
   {
    id: 5,
    description: "Purchased 50 coins",
    date: "Yesterday",
    amount: "50",
    type: "purchase",
    status: "completed"
  },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return <CheckCircle className="h-5 w-5 text-emerald-500" />;
        case 'pending':
            return <Clock className="h-5 w-5 text-yellow-500" />;
        case 'rejected':
            return <AlertCircle className="h-5 w-5 text-destructive" />;
        default:
            return null;
    }
}

export default function WalletPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Wallet</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <Card className="mb-6 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Coins</span>
              <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <Coins className="h-6 w-6" />
                <span>135</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/recharge">Buy Coins</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6" />
              <span>Coin History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
             <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="purchase">Purchases</TabsTrigger>
                    <TabsTrigger value="spend">Spends</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="space-y-2 mt-4">
              {transactionHistory.map((item) => (
                <div key={item.id} className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                        {getStatusIcon(item.status)}
                        <div>
                          <p className="font-semibold capitalize">{item.status}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                          {item.utr && <p className="text-xs text-muted-foreground font-mono">UTR: {item.utr}</p>}
                          {item.status === 'rejected' && item.reason && <p className="text-xs text-destructive">{item.reason}</p>}
                        </div>
                    </div>
                    <div className={cn('font-bold flex items-center gap-1 text-lg', item.type === 'purchase' ? 'text-emerald-500' : 'text-destructive')}>
                      {item.type === 'purchase' ? '+' : '-'}{item.type === 'purchase' ? `₹${item.amount}` : `${item.amount}`}
                      {item.type === 'spend' && <Coins className="h-4 w-4" />}
                    </div>
                  </div>
                   {item.status === 'rejected' && <Button variant="link" size="sm" className="p-0 h-auto mt-1">Contact Support</Button>}
                </div>
              ))}
            </div>
             <Button variant="outline" className="w-full mt-4">Load More</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
