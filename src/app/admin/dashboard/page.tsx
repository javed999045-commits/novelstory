
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Clock, DollarSign, Download, Users, XCircle } from "lucide-react";
import Link from "next/link";

const recentTransactions = [
    { time: '10:45', amount: '₹500', user: 'Vikram', status: 'Pending' },
    { time: '10:30', amount: '₹100', user: 'Priya', status: 'Completed' },
    { time: '10:15', amount: '₹50', user: 'Raj', status: 'Completed' },
    { time: '10:00', amount: '₹500', user: 'Neha', status: 'Rejected' },
];

const getStatusClasses = (status: string) => {
    switch (status) {
        case 'Pending': return 'text-yellow-500';
        case 'Completed': return 'text-emerald-500';
        case 'Rejected': return 'text-destructive';
        default: return 'text-muted-foreground';
    }
}

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <section>
                <h2 className="text-xl font-semibold mb-4">Today's Stats</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">New payments to review</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Amount Today</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹5,450</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last day</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Coins Issued</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6,200</div>
                            <p className="text-xs text-muted-foreground">From 8 completed transactions</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+23</div>
                            <p className="text-xs text-muted-foreground">Listeners and Creators</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

             <section>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:bg-card/80">
                        <Link href="/admin/verify">
                            <CardContent className="p-6 text-center">
                                <Bell className="h-8 w-8 mx-auto text-primary mb-2"/>
                                <p className="font-bold">Verify Payments (12)</p>
                            </CardContent>
                        </Link>
                    </Card>
                    <Card className="hover:bg-card/80">
                        <Link href="/admin/reconciliation">
                             <CardContent className="p-6 text-center">
                                <DollarSign className="h-8 w-8 mx-auto mb-2"/>
                                <p className="font-bold">Bank Reconciliation</p>
                            </CardContent>
                        </Link>
                    </Card>
                     <Card className="hover:bg-card/80">
                        <Link href="/admin/reports">
                             <CardContent className="p-6 text-center">
                                <Download className="h-8 w-8 mx-auto mb-2"/>
                                <p className="font-bold">Export Reports</p>
                            </CardContent>
                        </Link>
                    </Card>
                 </div>
            </section>
            
            <section>
                 <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                 <Card>
                     <CardContent className="p-0">
                         <div className="space-y-4">
                             {recentTransactions.map((tx, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 border-b last:border-0">
                                     <div className="flex items-center gap-4">
                                         <div className={`p-2 rounded-full bg-secondary ${getStatusClasses(tx.status)}`}>
                                             {tx.status === 'Pending' && <Clock className="w-4 h-4"/>}
                                             {tx.status === 'Completed' && <Check className="w-4 h-4"/>}
                                             {tx.status === 'Rejected' && <XCircle className="w-4 h-4"/>}
                                         </div>
                                         <div>
                                            <p className="font-bold">{tx.amount} from {tx.user}</p>
                                            <p className="text-sm text-muted-foreground">{tx.time}</p>
                                         </div>
                                     </div>
                                     <span className={`font-semibold text-sm ${getStatusClasses(tx.status)}`}>
                                        {tx.status}
                                    </span>
                                 </div>
                             ))}
                         </div>
                     </CardContent>
                 </Card>
            </section>
        </div>
    )
}
