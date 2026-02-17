
'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, User, signInAnonymously, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import allKeys from '@/lib/keys.json';

type Role = 'user' | 'admin' | null;

type AuthContextType = {
  user: User | null;
  role: Role;
  loading: boolean;
  loginWithKey: (key: string) => Promise<{ success: boolean; role?: Role; message?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const masterKey = process.env.NEXT_PUBLIC_CREATOR_MASTER_KEY || 'r5h6f3jnngy';

  const validateKey = useCallback((key: string): { valid: boolean; role: Role; message?: string } => {
    if (key === masterKey) {
        return { valid: true, role: 'admin' };
    }
    
    const userKey = allKeys.keys.find(k => k.key === key);
    
    if (userKey) {
        if (!userKey.enabled) {
            return { valid: false, role: null, message: "This key has been disabled." };
        }
        if (userKey.expires && new Date(userKey.expires) < new Date()) {
            return { valid: false, role: null, message: "This key has expired." };
        }
        if (userKey.limit !== -1 && userKey.uses >= userKey.limit) {
            return { valid: false, role: null, message: "This key has reached its usage limit." };
        }
        return { valid: true, role: 'user' };
    }

    return { valid: false, role: null, message: "Invalid Key. Please contact creator." };
  }, [masterKey]);

  const loginWithKey = useCallback(async (key: string) => {
    if (!auth) {
        return { success: false, message: 'Firebase not configured.' };
    }

    const validation = validateKey(key.trim());

    if (validation.valid) {
        try {
            const userCredential = await signInAnonymously(auth);
            setUser(userCredential.user);
            setRole(validation.role);
            if (typeof window !== 'undefined') {
                localStorage.setItem('userRole', validation.role as string);
            }
            return { success: true, role: validation.role };
        } catch (error: any) {
            console.error("Anonymous sign-in failed:", error);
            return { success: false, message: `Firebase error: ${error.message}` };
        }
    } else {
        return { success: false, message: validation.message };
    }
  }, [validateKey]);

  const logout = useCallback(async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userRole');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Logout failed', description: error.message });
    }
  }, [toast]);

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const storedRole = localStorage.getItem('userRole') as Role;
        setRole(storedRole);
      } else {
        setRole(null);
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-48 mt-4" />
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, loginWithKey, logout }}>
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
