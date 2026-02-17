
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const coinPacks = [
  { id: 'mini', name: "Mini Pack", price: 20, coins: 20, description: "Save 0%" },
  { id: 'starter', name: "Starter Pack", price: 50, coins: 50, description: "Save 0%" },
  { id: 'popular', name: "Popular Pack", price: 100, coins: 100, description: "Most bought", popular: true },
  { id: 'premium', name: "Premium Pack", price: 500, coins: 550, description: "Get 50 Bonus!", bonus: 50 },
];

export default function RechargePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Buy Coins</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6 max-w-2xl">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Your Balance: 45 coins</CardTitle>
            <CardDescription>Select a pack to add coins to your wallet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {coinPacks.map((pack) => (
              <Card key={pack.id} className={pack.popular ? "border-primary bg-primary/10" : "bg-secondary/50"}>
                {pack.popular && <div className="bg-primary text-primary-foreground text-xs font-bold text-center p-1 rounded-t-lg">MOST POPULAR</div>}
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Coins className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-bold">{pack.name}</p>
                      <p className="text-sm">₹{pack.price} = {pack.coins} Coins</p>
                      <p className="text-xs text-muted-foreground">{pack.bonus ? `(Get ${pack.bonus} Bonus!)` : pack.description}</p>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/recharge/payment?pack=${pack.id}&price=${pack.price}&coins=${pack.coins + (pack.bonus || 0)}`}>
                      Select
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
             <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-base">Custom Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="Min ₹20" className="w-1/2" />
                    <span className="text-muted-foreground">= [__] Coins</span>
                  </div>
                   <Button className="w-full mt-4" disabled>Continue</Button>
                </CardContent>
              </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
