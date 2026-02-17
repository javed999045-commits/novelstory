
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookUser,
  ChevronRight,
  Coins,
  DownloadCloud,
  History,
  PlayCircle,
  Settings,
  BookCheck,
  BookX,
} from 'lucide-react';

import { novels as novelsData, type Novel } from '@/lib/novels';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';


function UnlockedNovelCard({ novel }: { novel: Novel }) {
    const unlockedEpisodes = novel.episodes.filter(e => e.unlocked);
    const totalSpentOnNovel = unlockedEpisodes.reduce((sum, ep) => sum + ep.priceInCoins, 0);
  
    return (
      <Card className="bg-card text-card-foreground">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold font-headline">{novel.title}</h3>
              <p className="text-sm text-muted-foreground">
                Unlocked: {unlockedEpisodes.length}/{novel.episodesCount} episodes
              </p>
              <p className="text-sm text-muted-foreground">
                Total spent: {totalSpentOnNovel} coins
              </p>
            </div>
            <div className="space-y-2">
              {unlockedEpisodes.slice(0, 2).map(episode => (
                <Link key={episode.id} href={`/player/${episode.id}`} className="block">
                    <div className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-secondary/50">
                        {episode.progress && episode.progress < 100 ? <BookCheck className="w-4 h-4 text-primary" /> : <BookX className="w-4 h-4 text-muted-foreground" /> }
                        <span className="truncate flex-grow">{episode.episodeNumber}. {episode.title}</span>
                        <Badge variant="outline" className='flex-shrink-0'>
                            {episode.progress ? `${100 - episode.progress}% left` : (episode.isFree ? 'FREE' : 'UNLOCKED')}
                        </Badge>
                    </div>
                </Link>
              ))}
               {unlockedEpisodes.length > 2 && (
                <p className="text-xs text-muted-foreground px-2">...and {unlockedEpisodes.length - 2} more</p>
               )}
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href={`/novels/${novel.id}/episodes`}>View All Episodes</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }


export default function LibraryPage() {
  const router = useRouter();
  const [novels, setNovels] = useState<Novel[]>(novelsData);

  const unlockedNovels = novels.filter(n => n.episodes.some(e => e.unlocked));
  const totalSpent = novels.flatMap(n => n.episodes).filter(e => e.unlocked).reduce((sum, e) => sum + e.priceInCoins, 0);
  const totalUnlockedEpisodes = novels.flatMap(n => n.episodes).filter(e => e.unlocked).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold font-headline">My Library</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <p className="text-lg font-bold">Alex Doe</p>
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <Coins className="h-5 w-5" />
                        <span>135 Coins</span>
                    </div>
                </div>
                 <Button asChild variant="ghost" size="icon">
                    <Link href="/settings">
                        <Settings />
                        <span className="sr-only">Settings</span>
                    </Link>
                 </Button>
            </CardContent>
        </Card>

         <Card className="bg-card text-card-foreground">
            <CardContent className="p-4 grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-sm text-muted-foreground">You've spent</p>
                    <p className="text-lg font-bold flex items-center justify-center gap-1">{totalSpent} <Coins className="w-4 h-4 text-primary" /></p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Episodes Unlocked</p>
                    <p className="text-lg font-bold">{totalUnlockedEpisodes}</p>
                </div>
            </CardContent>
             <Separator />
             <Link href="/wallet">
                <div className="p-4 flex justify-between items-center text-sm font-semibold hover:bg-secondary/50 rounded-b-lg">
                    <span>Transaction History</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
             </Link>
        </Card>

        <div className="space-y-4">
            <h2 className='text-xl font-bold'>Unlocked Novels</h2>
            {unlockedNovels.map(novel => (
                <UnlockedNovelCard key={novel.id} novel={novel} />
            ))}
        </div>
      </main>
    </div>
  );
}
