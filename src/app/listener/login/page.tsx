
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ListenerLoginPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/login');
    }, [router]);
    return null;
}
