
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
} from 'lucide-react';

import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function LibraryStoryCard({ story }: { story: ImagePlaceholder }) {
    return (
      <Link href={`/episode/${story.id}`} className="block group">
        <div className="space-y-2">
            <div className="relative aspect-[1/1] overflow-hidden rounded-lg">
                <Image
                    src={story.imageUrl}
                    alt={story.description}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    data-ai-hint={story.imageHint}
                />
            </div>
            <div className="space-y-1">
                <h3 className="font-bold font-headline text-sm truncate">{story.title}</h3>
                <p className="text-xs text-muted-foreground">{story.author}</p>
            </div>
        </div>
      </Link>
    );
  }

  function ListItemCard({ story }: { story: ImagePlaceholder }) {
    return (
      <Link href={`/player/${story.id}`} className="block group">
        <Card className="bg-secondary/50 text-card-foreground overflow-hidden transition-all group-hover:shadow-md group-hover:border-primary/50 w-full flex items-center p-3 gap-4">
            <div className="relative aspect-square w-16 h-16 flex-shrink-0">
                <Image
                    src={story.imageUrl}
                    alt={story.description}
                    fill
                    className="object-cover rounded-md"
                    data-ai-hint={story.imageHint}
                />
            </div>
            <div className="flex-grow space-y-1 overflow-hidden">
                <h3 className="font-bold font-headline text-base truncate">{story.title}</h3>
                <p className="text-sm text-muted-foreground">By {story.author}</p>
                <p className="text-xs text-muted-foreground">{story.duration}</p>
            </div>
             <PlayCircle className="w-8 h-8 text-primary flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
        </Card>
      </Link>
    );
  }


export default function LibraryPage() {
  const router = useRouter();
  const [stories, setStories] = useState<ImagePlaceholder[]>(PlaceHolderImages);

  const unlockedStories = stories.filter(s => s.unlocked);
  const downloadedStories = stories.filter(s => s.isDownloaded);
  const historyStories = stories.filter(s => s.id === 'horror-story-1' || s.id === 'comedy-special-1');

  const totalSpent = unlockedStories.reduce((sum, story) => sum + (story.priceInCoins || 0), 0);

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
                    <p className="text-lg font-bold">{unlockedStories.length}</p>
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

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="library"><BookUser className="mr-2"/>Unlocked</TabsTrigger>
            <TabsTrigger value="downloads"><DownloadCloud className="mr-2"/>Downloads</TabsTrigger>
            <TabsTrigger value="history"><History className="mr-2"/>History</TabsTrigger>
          </TabsList>
          <TabsContent value="library" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {unlockedStories.map(story => (
                    <LibraryStoryCard key={story.id} story={story} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="downloads" className="mt-6 space-y-4">
             <Card className="bg-card text-card-foreground">
                <CardHeader>
                    <CardTitle className="text-base">Storage Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Progress value={25} />
                    <p className="text-xs text-muted-foreground">Using 2.5GB of 10GB</p>
                </CardContent>
             </Card>
             <div className="space-y-3">
                {downloadedStories.map(story => (
                    <ListItemCard key={story.id} story={story} />
                ))}
             </div>
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <div className="space-y-3">
                {historyStories.map(story => (
                    <ListItemCard key={story.id} story={story} />
                ))}
             </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
