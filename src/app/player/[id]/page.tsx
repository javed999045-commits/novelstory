'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Lock,
  AlertTriangle,
  Wind,
  Timer,
  Share2,
} from 'lucide-react';

export default function PlayerPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const storyId = params.id as string;
  const story = PlaceHolderImages.find((img) => img.id === storyId);

  useEffect(() => {
    document.body.classList.add('prevent-screenshot');
    return () => {
      document.body.classList.remove('prevent-screenshot');
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }
    }, 1000 / playbackSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    let resizeCount = 0;
    const handleResize = () => {
      resizeCount++;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (resizeCount > 2) {
          setIsPlaying(false);
          toast({
            variant: 'destructive',
            title: 'Screen Recording Detected',
            description: 'Playback has been paused to protect content.',
          });
        }
        resizeCount = 0;
      }, 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [toast]);
  
  const handleDownload = () => {
    toast({
      title: 'Download Started',
      description: 'Downloaded securely. Available for offline playback in-app only.',
    });
  };

  const handleSleepTimer = (minutes: number) => {
    toast({
      title: 'Sleep Timer Set',
      description: `Playback will stop in ${minutes} minutes.`,
    });
  };

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold font-headline truncate">
            {story.title}
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <Card className="bg-card text-card-foreground">
          <CardContent className="p-6 pt-6 space-y-6">
            <div className="aspect-square relative w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
              <Image
                src={story.imageUrl}
                alt={story.description}
                fill
                className="object-cover"
                data-ai-hint={story.imageHint}
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold font-headline">{story.title}</h2>
              <p className="text-muted-foreground">By {story.author}</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {Math.floor((progress * 0.6 * (60 * (parseInt(story.duration) / 100))) / 60)}:
                  {Math.round((progress * 0.6 * (60 * (parseInt(story.duration) / 100))) % 60).toString().padStart(2, '0')}
                </span>
                <span>{story.duration}</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <Button
                size="lg"
                className="w-20 h-20 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10 ml-1" />
                )}
              </Button>
            </div>

            <div className="flex justify-center items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-bold">
                    <Wind className="mr-2 h-4 w-4" />
                    {playbackSpeed}x
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setPlaybackSpeed(0.75)}>0.75x</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setPlaybackSpeed(1)}>1x (Normal)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setPlaybackSpeed(1.5)}>1.5x</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setPlaybackSpeed(2)}>2x</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Timer className="mr-2 h-4 w-4" />
                    Sleep Timer
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="flex flex-col">
                    <Button variant="ghost" className="justify-start" onClick={() => handleSleepTimer(15)}>End in 15 minutes</Button>
                    <Button variant="ghost" className="justify-start" onClick={() => handleSleepTimer(30)}>End in 30 minutes</Button>
                    <Button variant="ghost" className="justify-start" onClick={() => handleSleepTimer(60)}>End in 60 minutes</Button>
                  </div>
                </PopoverContent>
              </Popover>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline" size="icon" disabled>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sharing is disabled for protected content.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button size="lg" className="w-full font-bold" onClick={handleDownload}>
              <Download className="mr-2 h-5 w-5" />
              Secure Download for Offline Playback
            </Button>
            
            <div className="text-center text-xs text-muted-foreground p-4 border border-dashed border-border rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Lock className="w-4 h-4" />
                    <p className="font-bold">Content Protected</p>
                </div>
                <p>To protect the creator's work, screenshots and screen recordings are disabled for this content.</p>
                <p className="mt-1">Downloaded audio is encrypted and can only be played on this device within the app.</p>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}
