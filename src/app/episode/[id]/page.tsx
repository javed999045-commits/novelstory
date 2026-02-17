
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Coins,
  Lock,
  PlayCircle,
  Star,
  ArrowLeft,
  Users,
  AlertTriangle,
  Play,
  Heart,
} from 'lucide-react';

import { Logo } from '@/components/icons/Logo';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

function MiniStoryCard({ story }: { story: ImagePlaceholder }) {
    return (
      <Link href={`/episode/${story.id}`} className="block group">
        <Card className="bg-secondary/50 text-card-foreground overflow-hidden transition-all group-hover:shadow-lg group-hover:border-primary/50 w-full h-full flex items-center p-2 gap-4">
            <div className="relative aspect-square w-20 h-20 flex-shrink-0">
            <Image
                src={story.imageUrl}
                alt={story.description}
                fill
                className="object-cover rounded-md"
                data-ai-hint={story.imageHint}
            />
             {story.priceInCoins > 0 && !story.unlocked && (
                <div className="absolute top-1 left-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <Coins className="w-3 h-3 text-yellow-400" />
                    {story.priceInCoins}
                </div>
            )}
            </div>
            <div className="space-y-1 overflow-hidden">
                <h3 className="font-bold font-headline text-sm truncate">{story.title}</h3>
                <p className="text-xs text-muted-foreground">By {story.author}</p>
                <p className="text-xs text-muted-foreground">{story.duration}</p>
            </div>
        </Card>
      </Link>
    );
  }

export default function EpisodeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  // In a real app, this would come from a global state/context
  const [coinBalance, setCoinBalance] = useState(150);
  const [stories, setStories] = useState<ImagePlaceholder[]>(PlaceHolderImages);

  const storyId = params.id as string;
  const story = stories.find((s) => s.id === storyId);

  const handleUnlock = () => {
    if (!story) return;

    if (coinBalance >= story.priceInCoins) {
      setCoinBalance((prev) => prev - story.priceInCoins);
      setStories((prevStories) =>
        prevStories.map((s) =>
          s.id === storyId ? { ...s, unlocked: true } : s
        )
      );
      toast({
        title: 'Story Unlocked!',
        description: `You can now listen to "${story.title}".`,
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

  const handlePreview = () => {
    toast({
        title: "Playing Preview",
        description: "Playing a 30-second preview.",
    })
  }

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Story not found</h2>
        <p className="text-muted-foreground mb-4">
          The audio story you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/home">Go Back Home</Link>
        </Button>
      </div>
    );
  }

  const relatedStories = stories.filter(s => s.category === story.category && s.id !== story.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold font-headline truncate">
            Episode Details
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <Card className="bg-card text-card-foreground overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={story.imageUrl}
              alt={story.description}
              fill
              className="object-cover"
              data-ai-hint={story.imageHint}
            />
          </div>
          <CardContent className="p-6 space-y-4">
            <Badge variant="outline" className="font-medium">{story.category}</Badge>
            <h2 className="text-3xl font-bold font-headline">{story.title}</h2>
            <p className="text-lg text-muted-foreground">By {story.author}</p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-primary" />
                <span>{story.plays?.toLocaleString() ?? 'N/A'} Plays</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{story.unlocks?.toLocaleString() ?? 'N/A'} Unlocks</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                <span>{story.rating?.toFixed(1) ?? 'N/A'} Rating</span>
              </div>
            </div>
            
            <p className="text-base text-foreground/80 leading-relaxed">
              {story.description}
            </p>
          </CardContent>
        </Card>
        
        {story.unlocked ? (
            <Button asChild size="lg" className="w-full font-bold text-lg">
                <Link href={`/player/${story.id}`}>
                    <PlayCircle className="mr-2" /> Listen Now
                </Link>
            </Button>
        ) : (
            <Card className="bg-card text-card-foreground">
            <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center text-lg">
                <div className="font-bold flex items-center gap-2">
                    <Coins className="w-6 h-6 text-yellow-400" />
                    <span>Price: {story.priceInCoins} Coins</span>
                </div>
                <p className="text-muted-foreground text-sm">
                    Your Balance: {coinBalance} Coins
                </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button size="lg" className="font-bold" onClick={handleUnlock}>
                        <Lock className="mr-2" /> Unlock Now
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="font-bold">
                        <Link href="/recharge">Buy Coins</Link>
                    </Button>
                </div>
            </CardContent>
            </Card>
        )}

        <div className="flex items-center gap-4">
            <Button variant="outline" className="flex-1" onClick={handlePreview}>
                <Play className="mr-2 h-4 w-4" /> 30-sec Preview
            </Button>
            <Button variant="outline" size="icon">
                <Heart />
            </Button>
        </div>

        {relatedStories.length > 0 && (
            <div>
                <Separator className="my-6"/>
                <h3 className="text-xl font-bold mb-4">Related in {story.category}</h3>
                <div className="space-y-4">
                    {relatedStories.map(related => (
                        <MiniStoryCard key={related.id} story={related}/>
                    ))}
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
