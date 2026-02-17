
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Coins,
  Heart,
  BookOpen,
  Star,
  Bell,
  Search,
  PlusCircle,
  User,
  BookUser,
  PenSquare,
  Settings,
  LogOut,
  Crown,
  Mic,
  Book,
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { Logo } from '@/components/icons/Logo';
import { novels as novelsData, type Novel } from '@/lib/novels';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


function NovelCard({ novel }: { novel: Novel }) {
    const { toast } = useToast();

    const handleWishlist = () => {
        toast({
            title: "Added to Wishlist!",
            description: `"${novel.title}" has been added to your wishlist.`,
        });
    };

  return (
    <Card className="bg-card text-card-foreground overflow-hidden transition-all hover:shadow-lg w-full">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={`/novels/${novel.id}`} className="block sm:w-1/3 flex-shrink-0">
            <div className="relative aspect-[3/4]">
              <Image
                src={novel.coverImageUrl}
                alt={novel.title}
                fill
                className="object-cover rounded-md"
                data-ai-hint={novel.imageHint}
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between sm:w-2/3">
            <div className='space-y-2'>
              <Link href={`/novels/${novel.id}`}>
                <h3 className="font-bold font-headline text-xl leading-tight hover:underline flex items-center gap-2">
                    <Book className="w-5 h-5 text-primary" /> {novel.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">
                By: {novel.author}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{novel.rating} ({novel.ratingsCount / 1000}K ratings)</span>
              </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mic className="w-4 h-4" />
                <span>{novel.episodesCount} Episodes</span>
              </div>
              <p className="text-sm font-semibold text-primary/90 flex items-center gap-2">
                 <Coins className="w-4 h-4 text-yellow-400" /> {novel.tagline}
              </p>
               {novel.badge && <Badge variant="secondary">{novel.badge}</Badge>}
            </div>
            <div className="flex items-stretch gap-2 mt-4">
              <Button asChild className="w-full font-bold">
                <Link href={`/novels/${novel.id}/episodes`}>
                  <BookOpen className="mr-2" /> View Episodes
                </Link>
              </Button>
              <Button variant="outline" size="icon" onClick={handleWishlist}>
                <Heart />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export default function HomePage() {
  const [novels, setNovels] = useState<Novel[]>(novelsData);
  const [coinBalance, setCoinBalance] = useState(150);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (!auth) {
        toast({ variant: 'destructive', title: 'Firebase not configured.' });
        return;
    }
    try {
        await signOut(auth);
        toast({ title: 'Logged out successfully.' });
        router.push('/login');
    } catch (error) {
        toast({ variant: 'destructive', title: 'Logout failed.' });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                <Link href="/home">
                    <Logo className="h-8 w-8 text-primary" />
                </Link>
                {user && (
                    <div className="hidden md:flex items-center gap-2 text-lg font-bold">
                        <Coins className="h-5 w-5 text-yellow-400" />
                        <span>{coinBalance}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-1 md:gap-2">
                {user && (
                    <Button asChild variant="outline" size="sm">
                        <Link href="/recharge">
                            <PlusCircle className="h-4 w-4" />
                            <span className="hidden md:inline ml-2">Add Coins</span>
                        </Link>
                    </Button>
                )}
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                </Button>
                {user && (
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                )}
                <Separator orientation="vertical" className="h-6 mx-1 md:mx-2" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 rounded-full h-8 w-8" title="My Account">
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.photoURL ?? undefined} />
                                <AvatarFallback>{user ? (user.displayName?.[0] ?? user.email?.[0] ?? 'U') : <User className="h-5 w-5" />}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {user ? (
                            <>
                                <DropdownMenuLabel>{user.displayName ?? user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/library">
                                        <BookUser className="mr-2 h-4 w-4" />
                                        <span>My Library</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/creator/dashboard">
                                        <PenSquare className="mr-2 h-4 w-4" />
                                        <span>Creator Mode</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/admin/dashboard">
                                        <Crown className="mr-2 h-4 w-4" />
                                        <span>Admin Mode</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </>
                        ) : (
                             <>
                                <DropdownMenuLabel>Guest</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/listener/login">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Login / Sign Up</span>
                                    </Link>
                                </DropdownMenuItem>
                             </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-8">
        <div>
            <h1 className="text-2xl font-bold mb-4">Featured Novels</h1>
            <div className="space-y-6">
                {novels.map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
