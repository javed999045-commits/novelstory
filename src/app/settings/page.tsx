
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function SettingsPage() {
    const router = useRouter();

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

            <main className="container mx-auto p-4 md:p-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="username">Username</Label>
                            <span className="text-muted-foreground">Alex Doe</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="email">Email</Label>
                            <span className="text-muted-foreground">alex.doe@example.com</span>
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
                            <Button variant="outline" size="sm">Change</Button>
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
                    <CardContent>
                        <Button variant="destructive" className="w-full">Delete Account</Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
