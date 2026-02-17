
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatorSignupPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/listener/login');
    }, [router]);
    return null;
}
