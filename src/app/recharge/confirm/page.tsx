'use client';

import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  utr: z.string().min(12, 'UTR must be at least 12 characters.').max(15, 'UTR cannot be more than 15 characters.'),
  paymentMethod: z.string({ required_error: 'Please select a payment method.' }),
  paymentDate: z.string({ required_error: 'Please select the date of payment.' }),
  screenshot: z.any().optional(),
  bankName: z.string().optional(),
  confirmPayment: z.boolean().refine(val => val === true, {
    message: 'You must confirm the payment.',
  }),
});

function ConfirmPaymentForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const price = searchParams.get('price');
    const coins = searchParams.get('coins');
    const pack = searchParams.get('pack') || 'Custom';
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            utr: '',
            paymentDate: new Date().toISOString().split('T')[0],
            confirmPayment: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const txnid = 'TXN' + Math.floor(100000 + Math.random() * 900000);
        toast({ title: "Payment Submitted!", description: "Your payment is now under verification." });
        router.push(`/recharge/status?txnid=${txnid}&amount=${price}&coins=${coins}`);
    }

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
                    <h1 className="text-xl font-bold font-headline">Confirm Your Payment</h1>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Details</CardTitle>
                        <CardDescription>
                            Pack: <span className="capitalize font-bold">{pack}</span> • Amount: <span className="font-bold">₹{price}</span> • Coins: <span className="font-bold">{coins}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="utr"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>UTR/Reference Number*</FormLabel>
                                            <FormControl><Input placeholder="12 digit number from SMS/app" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Payment Method*</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="upi" /></FormControl><FormLabel className="font-normal">UPI (Google Pay/PhonePe)</FormLabel></FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="bank" /></FormControl><FormLabel className="font-normal">Bank Transfer (NEFT/IMPS)</FormLabel></FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="other" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="paymentDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Payment*</FormLabel>
                                            <FormControl><Input type="date" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormItem>
                                    <FormLabel>Upload Screenshot*</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> (JPG/PNG)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                <FormField
                                    control={form.control}
                                    name="bankName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your UPI/Bank Name (Optional)</FormLabel>
                                            <FormControl><Input placeholder="e.g. Google Pay, HDFC" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPayment"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>I confirm that I have sent the exact amount of ₹{price}</FormLabel>
                                            </div>
                                             <FormMessage className="mt-0" />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size="lg" className="w-full font-bold">Submit for Verification</Button>
                                <p className="text-xs text-center text-muted-foreground">Verification takes 5-30 minutes during business hours.</p>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
                <div className="container mx-auto flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-6 w-48" />
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-5 w-3/4 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-8 pt-6">
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <div className="flex flex-col space-y-2">
                             <Skeleton className="h-6 w-3/4" />
                             <Skeleton className="h-6 w-3/4" />
                           </div>
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-32 w-full" />
                        </div>
                        <Skeleton className="h-12 w-full" />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}


export default function ConfirmPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <ConfirmPaymentForm />
        </Suspense>
    );
}
