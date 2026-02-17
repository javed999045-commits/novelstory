
'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Crown className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-bold mt-4">Admin Panel</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button asChild className="w-full font-bold mt-2">
            <Link href="/admin/dashboard">Login</Link>
          </Button>
        </CardContent>
        <CardFooter>
             <p className="text-xs text-muted-foreground">
                This is a restricted area. Only authorized personnel are allowed.
             </p>
        </CardFooter>
      </Card>
    </main>
  );
}
