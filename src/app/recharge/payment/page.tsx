'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ClipboardCopy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const price = searchParams.get('price');
    const coins = searchParams.get('coins');

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard!", description: text });
    };

    if (!price || !coins) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                <Card className="text-center p-6">
                    <CardTitle className="text-destructive">Error</CardTitle>
                    <CardDescription className="mt-2">Invalid payment details provided.</CardDescription>
                    <Button onClick={() => router.push('/recharge')} className="mt-4">Go Back</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
                <div className="container mx-auto flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-xl font-bold font-headline">Choose Payment Method</h1>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">Pay ₹{price} for {coins} Coins</CardTitle>
                        <CardDescription className="text-center">Choose your preferred payment method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs defaultValue="upi" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="upi">UPI QR Code</TabsTrigger>
                                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upi" className="mt-6 space-y-4">
                                <CardTitle className="text-lg text-center">Scan QR Code to Pay</CardTitle>
                                <div className="flex justify-center">
                                    <div className="bg-white p-4 rounded-lg">
                                      <Image 
                                        src="https://placehold.co/200x200/fafafa/000000?text=Your+QR+Code"
                                        alt="UPI QR Code"
                                        width={192}
                                        height={192}
                                        className="w-48 h-48"
                                      />
                                    </div>
                                </div>
                                <p className="text-center text-muted-foreground font-semibold">audiobookfm@hdfcbank</p>
                                <div className="text-sm text-muted-foreground p-4 border-dashed border rounded-lg space-y-2">
                                  <h4 className="font-bold text-foreground">How to pay:</h4>
                                  <p>1. Open any UPI app (GPay/PhonePe).</p>
                                  <p>2. Scan the QR code or enter the UPI ID.</p>
                                  <p>3. Enter exact amount: <strong>₹{price}</strong></p>
                                  <p>4. Pay and save the 12-digit UTR number.</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="bank" className="mt-6 space-y-4">
                                <CardTitle className="text-lg text-center">Bank Transfer Details</CardTitle>
                                <div className="space-y-3 text-sm">
                                  <div className="flex justify-between items-center"><span>Account Name:</span> <span className="font-bold">AudioBook FM Pvt Ltd</span></div>
                                  <div className="flex justify-between items-center"><span>Account Number:</span> <Button variant="ghost" size="sm" onClick={() => handleCopy('12345678901')}><span className="font-bold">12345678901</span><ClipboardCopy className="ml-2 w-4 h-4"/></Button></div>
                                  <div className="flex justify-between items-center"><span>IFSC Code:</span> <Button variant="ghost" size="sm" onClick={() => handleCopy('HDFC0001234')}><span className="font-bold">HDFC0001234</span><ClipboardCopy className="ml-2 w-4 h-4"/></Button></div>
                                  <div className="flex justify-between items-center"><span>Bank Name:</span> <span className="font-bold">HDFC Bank</span></div>
                                  <div className="flex justify-between items-center"><span>Account Type:</span> <span className="font-bold">Current Account</span></div>
                                </div>
                                <div className="text-sm text-muted-foreground p-4 border-dashed border rounded-lg space-y-2">
                                  <h4 className="font-bold text-foreground">How to pay:</h4>
                                  <p>1. Open your bank app and add beneficiary.</p>
                                  <p>2. Transfer exact amount: <strong>₹{price}</strong></p>
                                  <p>3. Add note: "Coin Purchase + Your Name"</p>
                                  <p>4. Save the transaction reference number.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                        <Button size="lg" className="w-full font-bold" asChild>
                           <Link href={`/recharge/confirm?price=${price}&coins=${coins}&pack=${searchParams.get('pack')}`}>✅ I Have Paid</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
