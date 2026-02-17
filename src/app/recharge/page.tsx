"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Landmark, Wallet, Coins, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const coinPacks = [
  { name: "Mini", price: 20, coins: 20, bonus: 0, popular: false },
  { name: "Starter", price: 50, coins: 50, bonus: 0, popular: false },
  { name: "Popular", price: 100, coins: 100, bonus: 0, popular: true },
  { name: "Premium", price: 500, coins: 550, bonus: 50, popular: false },
];

const paymentOptions = [
  { name: "UPI", icon: Landmark },
  { name: "Card", icon: CreditCard },
  { name: "NetBanking", icon: Landmark },
  { name: "Wallet", icon: Wallet },
];

export default function RechargePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/wallet">
              <ArrowLeft />
              <span className="sr-only">Back to Wallet</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Buy Coins</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Recharge Wallet</CardTitle>
            <CardDescription>Select a pack to add coins.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {coinPacks.map((pack) => (
                <div
                  key={pack.name}
                  className={cn(
                    "relative flex flex-col items-center justify-between p-4 text-center cursor-pointer transition-all rounded-lg border-2 h-full",
                    pack.popular
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                >
                   {pack.popular && (
                    <div className="absolute -top-3 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-bold tracking-wider">
                      POPULAR
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold">{pack.name}</p>
                    <div className="flex items-center gap-2 my-2 justify-center">
                      <Coins className="h-6 w-6 text-primary"/>
                      <p className="text-3xl font-bold text-primary">{pack.coins}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Coins</p>
                    {pack.bonus > 0 && (
                      <p className="text-xs text-emerald-500 font-bold">+ {pack.bonus} Bonus</p>
                    )}
                  </div>
                   <div className="mt-4 w-full">
                     <Button variant={pack.popular ? "default": "outline"} className="w-full font-bold">
                       ₹{pack.price}
                     </Button>
                   </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Payment Options</h3>
              <div className="flex justify-center items-center gap-6 text-center">
                {paymentOptions.map((option) => (
                  <div key={option.name} className="flex flex-col items-center gap-2 text-muted-foreground p-2 rounded-md hover:bg-secondary/50 transition-colors">
                    <option.icon className="h-8 w-8" />
                    <span className="text-xs font-medium">{option.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg">
              Proceed to Pay
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
