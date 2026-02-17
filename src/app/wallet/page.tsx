"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Coins, History, ArrowLeft } from "lucide-react";
import Link from "next/link";

const transactionHistory = [
  {
    id: 1,
    description: "Purchased 100 coins",
    date: "Today",
    amount: "100",
    type: "purchase",
  },
  {
    id: 2,
    description: "Unlocked Episode: Horror Story",
    date: "1 day ago",
    amount: "15",
    type: "spend",
  },
  {
    id: 3,
    description: "Purchased 50 coins",
    date: "Yesterday",
    amount: "50",
    type: "purchase",
  },
];

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/login">
              <ArrowLeft />
              <span className="sr-only">Back to Login</span>
            </Link>
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
                <span>150</span>
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
            <div className="space-y-4">
              {transactionHistory.map((item, index) => (
                <div key={item.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.description}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div
                      className={`font-bold flex items-center gap-1 ${
                        item.type === "purchase"
                          ? "text-emerald-500"
                          : "text-destructive"
                      }`}
                    >
                      {item.type === 'purchase' ? '+' : '-'}{item.amount}
                      <Coins className="h-4 w-4" />
                    </div>
                  </div>
                  {index < transactionHistory.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
