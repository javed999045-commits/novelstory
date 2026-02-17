
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Crown, LayoutDashboard, BadgeCheck, Landmark, FileText, User, LogOut, Settings, KeySquare } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, loading } = useAuth();


  useEffect(() => {
    if (!loading && (role !== 'admin')) {
      router.replace('/login');
    }
  }, [user, role, loading, router]);

  if (loading || role !== 'admin') {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <p>Loading admin panel...</p>
         </div>
      )
  }

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/keys', label: 'Manage Keys', icon: KeySquare },
    { href: '/admin/verify', label: 'Verify Payments', icon: BadgeCheck },
    { href: '/admin/reconciliation', label: 'Reconciliation', icon: Landmark },
    { href: '/admin/reports', label: 'Reports', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
                <Crown className="w-8 h-8 text-primary" />
                <span className="text-lg font-bold">Admin Panel</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <User />
                        <span>Creator</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/login">
                            <LogOut/>
                            <span>Logout</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-xl font-bold">Welcome, Creator</h1>
        </header>
        <main className="p-4 md:p-6 bg-secondary/30 min-h-full">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
