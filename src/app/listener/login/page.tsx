
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Logo } from "@/components/icons/Logo";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Mail } from "lucide-react";
import Link from "next/link";
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithRedirect, sendSignInLinkToEmail } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function ListenerLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleGoogleLogin = async () => {
    if (!auth) {
        toast({ variant: 'destructive', title: 'Firebase not configured.', description: 'Please add your API keys to .env file' });
        return;
    }
    const provider = new GoogleAuthProvider();
    try {
        await signInWithRedirect(auth, provider);
    } catch (error: any) {
        if (error.code === 'auth/configuration-not-found') {
             toast({
                variant: 'destructive',
                title: 'Google Sign-In Not Configured',
                description: 'Please enable Google Sign-In and set a support email in your Firebase project settings.',
                duration: 9000,
            });
        } else {
            toast({ variant: 'destructive', title: `Google login failed: ${error.code}`, description: error.message });
        }
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
        toast({ variant: 'destructive', title: 'Firebase not configured.', description: 'Please add your API keys to .env file' });
        return;
    }
    if (!email) {
        toast({ variant: 'destructive', title: 'Email is required.' });
        return;
    }
    const actionCodeSettings = {
        url: `${window.location.origin}/home`,
        handleCodeInApp: true,
    };
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        setEmailSent(true);
        toast({ title: 'Check your email', description: 'A sign-in link has been sent to your email address.' });
    } catch (error: any) {
        console.error(error);
        toast({ variant: 'destructive', title: `Failed to send email: ${error.code}`, description: error.message });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-border bg-card text-card-foreground">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold text-card-foreground">
            HearHere
          </CardTitle>
          <CardDescription>Sign in or create an account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={handleGoogleLogin} size="lg" variant="secondary" className="w-full font-bold">
            <GoogleIcon className="mr-2 h-5 w-5" /> Continue with Google
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          {emailSent ? (
            <div className="text-center p-4 bg-secondary rounded-md">
                <p className="font-bold">Email Sent!</p>
                <p className="text-sm text-muted-foreground">Please check your inbox for the login link.</p>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="grid gap-3">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="sr-only">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button type="submit" size="lg" className="w-full font-bold">
                    <Mail className="mr-2 h-5 w-5" /> Continue with Email
                </Button>
            </form>
          )}

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Button asChild variant="link" className="text-accent font-bold">
            <Link href="/home">Explore as Guest</Link>
          </Button>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground justify-center px-4">
          <p>
            By continuing, you agree to HearHere's{" "}
            <Link href="#" className="underline hover:text-accent">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-accent">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
