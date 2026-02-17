
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle } from "lucide-react";

const pendingPayments = [
    { id: 1, user: "Vikram Sharma", amount: "₹500", coins: 550, utr: "HDFC123456789", time: "10:45 AM Today", method: "UPI (Google Pay)", isNew: true },
    { id: 2, user: "Priya Singh", amount: "₹100", coins: 100, utr: "ICICI987654321", time: "10:30 AM Today", method: "UPI" },
    { id: 3, user: "Rajesh Kumar", amount: "₹50", coins: 50, utr: "PNB112233445", time: "10:15 AM Today", method: "Bank Transfer" },
    { id: 4, user: "Neha Gupta", amount: "₹500", coins: 550, utr: "ABC123", time: "09:50 AM Today", method: "UPI", flagged: "Possible Fake: Invalid UTR Format, screenshot seems edited." },
];

export default function VerifyPaymentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Verify Payments</h1>
            <p className="text-muted-foreground">Review and approve pending coin purchase transactions.</p>
            
            <div className="flex items-center gap-4">
                 <Button>Pending (12)</Button>
                 <Button variant="outline">Verified (25)</Button>
                 <Button variant="outline">Rejected (3)</Button>
            </div>

            <div className="space-y-4">
                {pendingPayments.map(payment => (
                    <Card key={payment.id} className={payment.flagged ? "border-destructive" : ""}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-lg">
                                <span>{payment.user} - {payment.amount}</span>
                                {payment.isNew && <Badge>NEW PAYMENT</Badge>}
                                {payment.flagged && <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> FLAGGED</Badge>}
                            </CardTitle>
                            <CardDescription>
                                {payment.time} • {payment.coins} Coins
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm space-y-1 bg-secondary/50 p-3 rounded-md">
                                <p><strong>UTR:</strong> <span className="font-mono">{payment.utr}</span></p>
                                <p><strong>Method:</strong> {payment.method}</p>
                            </div>
                            {payment.flagged && <p className="text-destructive text-sm font-semibold">{payment.flagged}</p>}
                            <div className="flex justify-between items-center">
                                <Button variant="outline" size="sm">View Screenshot</Button>
                                <div className="flex gap-2">
                                     <Button variant="destructive" size="sm">
                                        <X className="mr-2"/> Reject
                                    </Button>
                                    <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                        <Check className="mr-2"/> Verify
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="mt-8 text-center">
                 <Button variant="outline">Load More</Button>
            </div>
        </div>
    )
}
