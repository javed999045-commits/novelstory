
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
  Wand2,
  KeySquare,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Logo } from '@/components/icons/Logo';
import { novels as novelsData, type Novel } from '@/lib/novels';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { personalizedRecommendations, type PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';


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
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput['recommendations'] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast({ title: 'Logged out successfully.' });
    router.push('/login');
  };

  const handleGetRecommendations = async () => {
    setIsGenerating(true);
    setRecommendations(null);

    const listeningHistory = novelsData.flatMap(novel =>
      novel.episodes
        .filter(episode => episode.unlocked || (episode.progress && episode.progress > 0))
        .map(episode => ({
          title: `${novel.title} - ${episode.title}`,
          genre: novel.genres.join(', '),
          author: novel.author,
          description: novel.description,
        }))
    ).slice(0, 5);

    if (listeningHistory.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Not enough listening history',
        description: 'Listen to some episodes to get personalized recommendations.',
      });
      setIsGenerating(false);
      return;
    }

    try {
      const result = await personalizedRecommendations({ listeningHistory });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Failed to get recommendations',
        description: 'There was an error while generating recommendations. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };


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
                                <AvatarFallback>{user ? (role === 'admin' ? <Crown/> : <User/>) : <KeySquare />}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {user ? (
                            <>
                                <DropdownMenuLabel>
                                    <span className="capitalize">{role}</span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {role === 'user' && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/library">
                                            <BookUser className="mr-2 h-4 w-4" />
                                            <span>My Library</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                {role === 'admin' && (
                                     <DropdownMenuItem asChild>
                                        <Link href="/admin/dashboard">
                                            <Crown className="mr-2 h-4 w-4" />
                                            <span>Creator Panel</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}
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
                                    <Link href="/login">
                                        <KeySquare className="mr-2 h-4 w-4" />
                                        <span>Login with Key</span>
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
        <section>
          <Card className="bg-primary/10 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 />
                For You
              </CardTitle>
              <CardDescription>
                Get personalized recommendations based on your listening history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGetRecommendations} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Recommendations'}
              </Button>
            </CardContent>
          </Card>
        </section>

        {isGenerating && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Just For You...</h2>
            <Card><CardContent className="p-4 pt-4"><p>Generating recommendations...</p></CardContent></Card>
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Personalized Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="bg-secondary/50">
                  <CardHeader>
                    <CardTitle>{rec.title}</CardTitle>
                    <CardDescription>by {rec.author} • {rec.genre}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <p className="text-sm">{rec.summary}</p>
                    <div className="p-3 bg-background/50 rounded-md">
                      <p className="text-xs font-bold text-primary">Why you'll like it:</p>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
        
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
