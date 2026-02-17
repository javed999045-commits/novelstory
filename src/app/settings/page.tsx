
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, LogOut, Copy } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/auth-context';
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
    const { user, role, logout } = useAuth();
    const { toast } = useToast();

    const handleLogout = async () => {
        await logout();
        toast({ title: 'Logged out successfully.' });
        router.push('/login');
    }
    
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard!", description: text });
    };


    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                <Card className="text-center p-6">
                    <CardTitle>Please log in</CardTitle>
                    <CardDescription className="mt-2">You need to be logged in to view settings.</CardDescription>
                    <Button asChild className="mt-4"><Link href="/login">Login</Link></Button>
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
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Role</Label>
                            <span className="text-muted-foreground capitalize">{role}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <Label>User ID (UID)</Label>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground font-mono text-sm truncate max-w-[150px]">{user.uid}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(user.uid)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
