
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { novels as novelsData, type Episode, type Novel } from '@/lib/novels';
import {
  ArrowLeft,
  Coins,
  Play,
  Lock,
  Headphones,
  CheckCircle,
  Star,
  BookCopy,
  ChevronDown,
  Download,
  CircleDotDashed,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

function EpisodeCard({
    episode,
    balance,
    onUnlock,
  }: {
    episode: Episode;
    balance: number;
    onUnlock: (episodeId: string, price: number) => void;
  }) {
    const { toast } = useToast();
    const canAfford = balance >= episode.priceInCoins;
  
    const handlePreview = () => {
      toast({
        title: 'Playing Preview',
        description: `Playing a 30-second preview of "${episode.title}".`,
      });
    };

    if (episode.unlocked) {
        if (episode.progress && episode.progress > 0 && episode.progress < 100) {
           // In-Progress Card
            return (
                <Card className="bg-secondary/30">
                    <CardHeader>
                        <Badge variant="outline" className="w-fit mb-2 flex items-center gap-1"><CircleDotDashed className="w-3 h-3 text-primary animate-spin" /> In Progress</Badge>
                        <CardTitle className="text-lg">
                            {`Episode ${episode.episodeNumber}: ${episode.title}`}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{episode.duration}</span>
                            <span>Progress: {episode.progress}%</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={episode.progress} className="h-2" />
                    </CardContent>
                    <CardFooter className="flex gap-2">
                         <Button asChild className="flex-1">
                            <Link href={`/player/${episode.id}`}><Play className="mr-2" /> Resume</Link>
                        </Button>
                        <Button variant="outline" size="icon" disabled><Download /></Button>
                    </CardFooter>
                </Card>
            )
        }
        // Unlocked Card
        return (
            <Card className="bg-secondary/30">
                 <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> Unlocked</Badge>
                    <CardTitle className="text-lg">
                    {`Episode ${episode.episodeNumber}: ${episode.title}`}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{episode.duration}</span>
                        <span>{episode.listens.toLocaleString()} listens</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3"/>{episode.rating}</span>
                    </div>
                </CardHeader>
                <CardFooter className="flex gap-2">
                    <Button asChild className="flex-1">
                        <Link href={`/player/${episode.id}`}><Play className="mr-2" /> Play Now</Link>
                    </Button>
                     <Button variant="outline" size="icon"><Download /></Button>
                    <Button variant="outline" size="icon"><Star /></Button>
                </CardFooter>
            </Card>
        )
    }

    if (episode.isFree) {
        // Free Card
        return (
             <Card>
                <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">FREE</Badge>
                    <CardTitle className="text-lg">
                        {`Episode ${episode.episodeNumber}: ${episode.title}`}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{episode.duration}</span>
                        <span>{episode.listens.toLocaleString()} listens</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3"/>{episode.rating}</span>
                    </div>
                </CardHeader>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={`/player/${episode.id}`}><Play className="mr-2" /> Play Free Episode</Link>
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    // Locked Card
    return (
        <Card className='border-dashed'>
            <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">
                    {`Episode ${episode.episodeNumber}: ${episode.title}`}
                </CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{episode.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3"/>{episode.rating}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-md">
                    <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-bold flex items-center gap-2 text-lg"><Coins className="w-5 h-5 text-yellow-400" /> {episode.priceInCoins}</p>
                    </div>
                    {!canAfford && <Badge variant="destructive">Balance: {balance} Coins</Badge>}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                {canAfford ? (
                    <Button onClick={() => onUnlock(episode.id, episode.priceInCoins)} className="flex-1">
                        <Lock className="mr-2" /> Unlock for {episode.priceInCoins} Coins
                    </Button>
                ) : (
                    <Button asChild className="flex-1" variant="secondary">
                        <Link href="/recharge"><Coins className="mr-2" /> Buy Coins</Link>
                    </Button>
                )}
                 <Button variant="outline" onClick={handlePreview}>
                    <Headphones className="mr-2" /> Preview
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function EpisodesPage() {
  const router = useRouter();
  const params = useParams();
  const novelId = params.novelId as string;
  const { toast } = useToast();

  const [allNovels, setAllNovels] = useState<Novel[]>(novelsData);
  const [coinBalance, setCoinBalance] = useState(45);

  const novel = allNovels.find((n) => n.id === novelId);

  const handleUnlock = (episodeId: string, price: number) => {
    if (coinBalance >= price) {
        const newBalance = coinBalance - price;
        setCoinBalance(newBalance);

        setAllNovels(currentNovels => 
            currentNovels.map(n => {
                if (n.id === novelId) {
                    return {
                        ...n,
                        episodes: n.episodes.map(e => e.id === episodeId ? {...e, unlocked: true} : e)
                    }
                }
                return n;
            })
        );
        
        const episode = novel?.episodes.find(e => e.id === episodeId);
        toast({
            title: "Episode Unlocked Successfully!",
            description: `You can now listen to "${episode?.title}". Remaining balance: ${newBalance} coins.`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Insufficient Balance",
            description: "You don't have enough coins to unlock this episode.",
            action: (
              <Button asChild variant="secondary" size="sm">
                <Link href="/recharge">Buy Coins</Link>
              </Button>
            ),
          });
    }
  }

  if (!novel) {
    return <div>Novel not found.</div>;
  }

  const unlockedCount = novel.episodes.filter(e => e.unlocked).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between gap-4">
            <div className='flex items-center gap-2'>
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-bold font-headline truncate">{novel.title}</h1>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <Coins className="h-5 w-5" />
                <span>{coinBalance}</span>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                    Episodes
                    <Badge variant="outline">{unlockedCount} / {novel.episodesCount} Unlocked</Badge>
                </CardTitle>
                <CardDescription>{novel.author} • {novel.episodesCount} Total Episodes</CardDescription>
            </CardHeader>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>Season 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {novel.episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} balance={coinBalance} onUnlock={handleUnlock}/>
            ))}
            </CardContent>
        </Card>

        <Card className="bg-secondary/50">
            <CardHeader>
                 <Badge variant="outline" className="w-fit mb-2 flex items-center gap-1"><BookCopy className="w-3 h-3" /> Bulk Offer</Badge>
                <CardTitle className='text-lg'>Buy 5 Episodes Bundle</CardTitle>
                <CardDescription>Normal Price: 65 coins</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="font-bold flex items-center gap-2 text-xl">Offer Price: 50 coins <Badge>Save 15</Badge></div>
            </CardContent>
            <CardFooter>
                <Button className='w-full' disabled>
                    <Lock className='mr-2'/> Unlock Bundle
                </Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}

