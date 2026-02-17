
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Coins,
  Lock,
  PlayCircle,
  Wallet,
  Star,
  Sparkles,
  ArrowRight,
  PenSquare,
} from 'lucide-react';

import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [stories, setStories] = useState<ImagePlaceholder[]>(PlaceHolderImages);
  const [coinBalance, setCoinBalance] = useState(45);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold font-headline text-primary">
            HearHere
          </h1>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" title="Creator Dashboard">
              <Link href="/creator/dashboard">
                <PenSquare className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-primary/50">
              <Link href="/wallet" className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="font-bold">{coinBalance}</span>
                <Coins className="h-5 w-5 text-yellow-400" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-primary" />
            For You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stories.map((story) => (
              <Card
                key={story.id}
                className={cn(
                  'bg-card text-card-foreground overflow-hidden transition-all hover:shadow-lg hover:border-primary/50',
                  story.isBundle && 'sm:col-span-2 lg:col-span-1 xl:col-span-2'
                )}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={story.imageUrl}
                      alt={story.description}
                      fill
                      className="object-cover"
                      data-ai-hint={story.imageHint}
                    />
                    {story.isBundle && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        BUNDLE
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold font-headline text-lg truncate">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      By {story.author} &bull; {story.duration}
                    </p>

                    {story.unlocked ? (
                      <Button asChild className="w-full font-bold">
                        <Link href={`/player/${story.id}`}>
                          <PlayCircle className="mr-2" />
                          {story.priceInCoins === 0 ? 'Listen for Free' : 'Listen Now'}
                        </Link>
                      </Button>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <Separator />
                        <div className="flex justify-between items-center text-sm">
                          <p className="text-muted-foreground">Your Balance</p>
                          <div className="flex items-center gap-1 font-semibold">
                            <Wallet className="w-4 h-4 text-primary" />
                            <span>{coinBalance} Coins</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleUnlock(story.id)}
                          className="w-full font-bold bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                        >
                          <Lock className="mr-2" />
                          Unlock for {story.priceInCoins} coins
                        </Button>
                        <Button asChild variant="link" size="sm" className="w-full">
                           <Link href="/recharge">Need more coins? Buy Now <ArrowRight className="ml-1 w-4 h-4" /></Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
