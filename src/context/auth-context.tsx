
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }

    // First, check for a redirect result from Google Sign-In
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This is the signed-in user.
          // The `onAuthStateChanged` observer will handle setting the user state.
          toast({ title: 'Logged in successfully!' });
        }
      }).catch((error) => {
        // Handle Errors here.
        console.error(error);
        toast({ variant: 'destructive', title: 'Login failed', description: error.message });
      });
    
    // Then, set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && window.localStorage.getItem('emailForSignIn')) {
          window.localStorage.removeItem('emailForSignIn');
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-48 mt-4" />
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
