
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/Logo";
import { KeySquare } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';

export default function KeyLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { loginWithKey } = useAuth();
  const [key, setKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    if (!key) {
        setErrorMessage("Please enter a login key.");
        setIsLoading(false);
        return;
    }

    try {
      const result = await loginWithKey(key);
      if (result.success) {
        if (result.role === 'user') {
          toast({ title: "Login Successful!" });
          router.push('/home');
        } else {
           setErrorMessage("Invalid user key. Please use the Creator Login for master keys.");
           toast({ variant: 'destructive', title: "Login Failed", description: "This appears to be a creator key." });
        }
      } else {
        setErrorMessage(result.message || "An unknown error occurred.");
        toast({ variant: 'destructive', title: "Login Failed", description: result.message });
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred during login.");
      toast({ variant: 'destructive', title: "Login Error", description: error.message });
    } finally {
      setIsLoading(false);
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
            Listener Login
          </CardTitle>
          <CardDescription>Enter your key to access the audio library.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {errorMessage && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 text-destructive text-sm rounded-md">
              <p>{errorMessage}</p>
            </div>
          )}
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="login-key" className="sr-only">Login Key</Label>
              <div className="relative">
                <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="login-key" 
                  type="text" 
                  placeholder="Enter your access key..." 
                  required 
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full font-bold" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Unlock & Listen'}
            </Button>
          </form>
           <div className="text-center text-xs text-muted-foreground">
              Are you a creator?{' '}
              <Link href="/creator/login" className="underline text-primary">
                  Login here
              </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
