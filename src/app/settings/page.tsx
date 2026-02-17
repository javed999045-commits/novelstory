
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, LogOut } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/auth-context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function SettingsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();

    const handleLogout = async () => {
        if (!auth) {
            toast({ variant: 'destructive', title: 'Firebase not configured.' });
            return;
        }
        try {
            await signOut(auth);
            toast({ title: 'Logged out successfully.' });
            router.push('/login');
        } catch (error) {
            toast({ variant: 'destructive', title: 'Logout failed.' });
        }
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                <Card className="text-center p-6">
                    <CardTitle>Please log in</CardTitle>
                    <CardDescription className="mt-2">You need to be logged in to view settings.</CardDescription>
                    <Button asChild className="mt-4"><Link href="/listener/login">Login</Link></Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
                <div className="container mx-auto flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-xl font-bold font-headline">Settings</h1>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-6 space-y-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="username">Username</Label>
                            <span className="text-muted-foreground">{user.displayName ?? "Not set"}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="email">Email</Label>
                            <span className="text-muted-foreground">{user.email}</span>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="change-password">Change Password</Label>
                            <Button variant="outline" size="sm" disabled>Change</Button>
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="device-management">Device Management</Label>
                             <Button variant="ghost" size="icon">
                                <ChevronRight />
                             </Button>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Download Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="download-quality">Download Quality</Label>
                             <Select defaultValue="high">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select quality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="flex items-center justify-between">
                            <div className='space-y-1'>
                                <Label htmlFor="auto-lock">Auto-lock episodes</Label>
                                <p className="text-xs text-muted-foreground">Re-lock episodes after 30 days of inactivity.</p>
                            </div>
                            <Switch id="auto-lock"/>
                        </div>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Account Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Button variant="outline" className="w-full" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" /> Log Out
                        </Button>

                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                 <Button variant="destructive" className="w-full">Delete Account</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
