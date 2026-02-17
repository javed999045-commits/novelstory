
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function CreatorLoginPage() {
    const router = useRouter();
  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
       <Button variant="ghost" size="icon" className="absolute top-4 left-4" onClick={() => router.push('/login')}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
        </Button>
      <Card className="w-full max-w-sm border-border bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline font-bold text-card-foreground">
            Creator Login
          </CardTitle>
          <CardDescription>Enter your details to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email or Phone</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button asChild className="w-full font-bold mt-2">
            <Link href="/creator/dashboard">Login to Dashboard</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
            <Link href="#" className="underline hover:text-accent">
              Forgot Password?
            </Link>
            <p className="text-muted-foreground">
              New creator?{" "}
              <Link href="/creator/signup" className="underline font-bold hover:text-accent">
                Sign up
              </Link>
            </p>
        </CardFooter>
      </Card>
    </main>
  );
}
