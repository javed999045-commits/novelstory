
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpenCheck,
  Calendar,
  ChevronRight,
  Clock,
  Coins,
  Globe,
  Heart,
  Mic,
  Star,
  Tag,
  Users,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { novels as novelsData } from '@/lib/novels';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function NovelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const novelId = params.novelId as string;

  const novel = novelsData.find((n) => n.id === novelId);

  if (!novel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Novel not found</h2>
        <p className="text-muted-foreground mb-4">
          The novel you are looking for does not exist.
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
            {novel.title}
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <Card className="bg-card text-card-foreground overflow-hidden">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            <Image
              src={novel.coverImageUrl}
              alt={novel.title}
              fill
              className="object-cover"
              data-ai-hint={novel.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
          <CardContent className="p-6 space-y-4 relative -mt-16 md:-mt-24 z-0">
            <div className='flex items-end gap-4'>
                <div className='relative w-24 h-32 md:w-32 md:h-44 flex-shrink-0 rounded-md overflow-hidden shadow-lg'>
                     <Image
                        src={novel.coverImageUrl}
                        alt={novel.title}
                        fill
                        className="object-cover"
                        data-ai-hint={novel.imageHint}
                    />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-headline">{novel.title}</h2>
                    <p className="text-md md:text-lg text-muted-foreground">By {novel.author}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div className='flex items-center gap-2'><Star className="w-4 h-4 text-primary" /> <span>{novel.rating} ({novel.ratingsCount/1000}k ratings)</span></div>
                <div className='flex items-center gap-2'><Mic className="w-4 h-4 text-primary" /> <span>{novel.episodesCount} Episodes</span></div>
                <div className='flex items-center gap-2'><Users className="w-4 h-4 text-primary" /> <span>{novel.listenerStats.completionPercentage}% Listeners completed</span></div>
                <div className='flex items-center gap-2'><Tag className="w-4 h-4 text-primary" /> <span>{novel.genres.join(' • ')}</span></div>
                <div className='flex items-center gap-2'><Globe className="w-4 h-4 text-primary" /> <span>{novel.language}</span></div>
                <div className='flex items-center gap-2'><Calendar className="w-4 h-4 text-primary" /> <span>{novel.releaseDate}</span></div>
                <div className='flex items-center gap-2'><Clock className="w-4 h-4 text-primary" /> <span>{novel.totalDuration}</span></div>
                <div className='flex items-center gap-2'><Coins className="w-4 h-4 text-primary" /> <span>{novel.priceRange}</span></div>
            </div>
            
            <Separator/>
            
            <div>
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-base text-foreground/80 leading-relaxed">
                {novel.description}
                </p>
            </div>

            <Button asChild size="lg" className="w-full font-bold">
              <Link href={`/novels/${novel.id}/episodes`}>
                <BookOpenCheck className="mr-2"/> See All Episodes ({novel.episodesCount})
              </Link>
            </Button>
            
             <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className='text-lg'>Listener Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                   <p>• <strong>{novel.listenerStats.completionPercentage}%</strong> listeners completed all episodes</p>
                   <p>• Most popular: <strong>{novel.listenerStats.mostPopularEpisode}</strong></p>
                   <p>• Average rating: <strong>{novel.listenerStats.averageRating}/5</strong></p>
                </CardContent>
             </Card>

             <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className='text-lg'>Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   {novel.reviews.map((review, index) => (
                       <blockquote key={index} className='text-sm p-3 bg-background/50 rounded-md border-l-2 border-primary'>"{review.text}"</blockquote>
                   ))}
                </CardContent>
             </Card>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}
