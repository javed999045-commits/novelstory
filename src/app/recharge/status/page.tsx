
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Home, ListChecks } from 'lucide-react';

export default function StatusPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const txnid = searchParams.get('txnid');
    const amount = searchParams.get('amount');
    const coins = searchParams.get('coins');
    const submittedAt = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (!txnid || !amount || !coins) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                 <Card className="text-center p-6">
                    <CardTitle className="text-destructive">Error</CardTitle>
                    <CardDescription className="mt-2">Invalid transaction details.</CardDescription>
                    <Button onClick={() => router.push('/recharge')} className="mt-4">Go Back</Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
                <div className="container mx-auto flex items-center gap-4">
                     <Button variant="ghost" size="icon" onClick={() => router.push('/home')}>
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-xl font-bold font-headline">Payment Submitted</h1>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 max-w-lg">
                <Card>
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-secondary rounded-full w-fit">
                            <Clock className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl mt-4">Payment Submitted!</CardTitle>
                        <CardDescription>Your payment is pending verification.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-secondary/50 rounded-lg text-sm space-y-2">
                           <div className="flex justify-between"><span>Transaction ID:</span> <span className="font-mono">{txnid}</span></div>
                           <div className="flex justify-between"><span>Amount:</span> <span className="font-bold">₹{amount}</span></div>
                           <div className="flex justify-between"><span>Coins:</span> <span className="font-bold">{coins}</span></div>
                           <div className="flex justify-between"><span>Submitted:</span> <span className="font-mono">{submittedAt}, Today</span></div>
                        </div>

                        <div className="text-sm text-muted-foreground p-4 border-dashed border rounded-lg space-y-2">
                           <h4 className="font-bold text-foreground">What happens next?</h4>
                           <p>1. Our team will verify your payment (5-30 minutes).</p>
                           <p>2. You'll get a notification when coins are added to your wallet.</p>
                           <p>3. Check "Coin History" for status updates.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button asChild variant="outline">
                                <Link href="/wallet"><ListChecks className="mr-2"/> View Status</Link>
                            </Button>
                             <Button asChild>
                                <Link href="/home"><Home className="mr-2"/> Back to Home</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
