
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Coins,
  Lock,
  PlayCircle,
  Star,
  Sparkles,
  PenSquare,
  Bell,
  Search,
  PlusCircle,
  TrendingUp,
  Zap,
  User,
} from 'lucide-react';

import { Logo } from '@/components/icons/Logo';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


const categories = ['All', 'Stories', 'Podcasts', 'Horror', 'Romance', 'Sci-Fi', 'Comedy'];

function StoryCard({ story, onUnlock }: { story: ImagePlaceholder, onUnlock: (id: string) => void }) {
  return (
    <Card
      className={cn(
        'bg-card text-card-foreground overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 w-full flex flex-col',
        story.isBundle && 'sm:col-span-2 lg:col-span-2'
      )}
    >
      <CardContent className="p-0 flex flex-col flex-grow">
        <Link href={`/episode/${story.id}`} className="block">
          <div className="relative aspect-[16/9]">
            <Image
              src={story.imageUrl}
              alt={story.description}
              fill
              className="object-cover"
              data-ai-hint={story.imageHint}
            />
            {story.priceInCoins > 0 && !story.unlocked && !story.isBundle && (
              <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Coins className="w-3 h-3 text-yellow-400" />
                  {story.priceInCoins}
              </div>
            )}
            {story.isBundle && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                BUNDLE
              </div>
            )}
          </div>
        </Link>
        <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
          <div>
            <Link href={`/episode/${story.id}`} className="block">
              <h3 className="font-bold font-headline text-lg truncate hover:underline">
                {story.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              By {story.author} &bull; {story.duration}
            </p>
          </div>

          <div className="pt-2">
            {story.unlocked ? (
              <Button asChild className="w-full font-bold">
                <Link href={`/player/${story.id}`}>
                  <PlayCircle className="mr-2" />
                  {story.priceInCoins === 0 ? 'Listen for Free' : 'Play'}
                </Link>
              </Button>
            ) : (
              <Button
                  onClick={() => onUnlock(story.id)}
                  className="w-full font-bold"
                >
                  <Lock className="mr-2" />
                  Unlock
                </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export default function HomePage() {
  const [stories, setStories] = useState<ImagePlaceholder[]>(PlaceHolderImages);
  const [coinBalance, setCoinBalance] = useState(150);
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');

  const handleUnlock = (storyId: string) => {
    const storyToUnlock = stories.find((s) => s.id === storyId);
    if (!storyToUnlock) return;

    if (coinBalance >= storyToUnlock.priceInCoins) {
      setCoinBalance((prev) => prev - storyToUnlock.priceInCoins);
      setStories((prevStories) =>
        prevStories.map((s) =>
          s.id === storyId ? { ...s, unlocked: true } : s
        )
      );
      toast({
        title: 'Story Unlocked!',
        description: `You can now listen to "${storyToUnlock.title}".`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Insufficient Coins',
        description: 'You need more coins to unlock this story.',
        action: (
          <Button asChild variant="secondary" size="sm">
            <Link href="/recharge">Buy Coins</Link>
          </Button>
        ),
      });
    }
  };
  
  const freeEpisode = stories.find((s) => s.priceInCoins === 0);
  const trendingStories = stories.filter(s => ['horror-story-1', 'thriller-bundle-1'].includes(s.id));
  const newReleases = stories.filter(s => !['horror-story-1', 'thriller-bundle-1'].includes(s.id) && s.id !== freeEpisode?.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                <Link href="/home">
                    <Logo className="h-8 w-8 text-primary" />
                </Link>
                <div className="hidden md:flex items-center gap-2 text-lg font-bold">
                    <Coins className="h-5 w-5 text-yellow-400" />
                    <span>{coinBalance}</span>
                </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link href="/recharge">
                        <PlusCircle className="h-4 w-4" />
                        <span className="hidden md:inline ml-2">Add Coins</span>
                    </Link>
                </Button>
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1 md:mx-2" />
                <Button asChild variant="ghost" size="icon" title="Creator Dashboard">
                  <Link href="/creator/dashboard">
                    <PenSquare className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" title="My Library">
                  <Link href="/library">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-8">
        <div className="overflow-x-auto">
            <div className="flex space-x-2 pb-2">
                {categories.map((category) => (
                <Button 
                    key={category} 
                    variant={activeCategory === category ? 'default' : 'outline'} 
                    size="sm" 
                    className="rounded-full flex-shrink-0"
                    onClick={() => setActiveCategory(category)}
                >
                    {category}
                </Button>
                ))}
            </div>
        </div>

        {freeEpisode && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-primary" />
              Free Episode of the Day
            </h2>
             <Card className="bg-card text-card-foreground overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-0 md:flex md:items-center">
                    <Link href={`/episode/${freeEpisode.id}`} className="block md:w-1/3 md:flex-shrink-0">
                      <div className="relative aspect-[16/9] md:aspect-square">
                          <Image
                          src={freeEpisode.imageUrl}
                          alt={freeEpisode.description}
                          fill
                          className="object-cover"
                          data-ai-hint={freeEpisode.imageHint}
                          />
                      </div>
                    </Link>
                    <div className="p-4 md:p-6 space-y-3 flex-grow">
                      <Link href={`/episode/${freeEpisode.id}`}>
                        <h3 className="font-bold font-headline text-xl md:text-2xl hover:underline">
                          {freeEpisode.title}
                        </h3>
                      </Link>
                        <p className="text-sm text-muted-foreground">
                        By {freeEpisode.author} &bull; {freeEpisode.duration}
                        </p>
                        <p className="text-sm text-foreground/80 hidden md:block">
                            {freeEpisode.description}
                        </p>
                        <Button asChild className="w-full md:w-auto font-bold" size="lg">
                            <Link href={`/player/${freeEpisode.id}`}>
                                <PlayCircle className="mr-2" />
                                Listen for Free
                            </Link>
                        </Button>
                    </div>
                </CardContent>
             </Card>
          </div>
        )}
        
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-primary" />
            Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingStories.map((story) => (
              <StoryCard key={story.id} story={story} onUnlock={handleUnlock} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-primary" />
            New Releases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newReleases.map((story) => (
              <StoryCard key={story.id} story={story} onUnlock={handleUnlock} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
