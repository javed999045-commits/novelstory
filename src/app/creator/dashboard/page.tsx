
'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Book, Coins, Edit, Eye, PlusCircle, Calendar, Mic } from 'lucide-react';

const novels = [
    {
        id: 'dark-horror-stories',
        title: 'Dark Horror Stories',
        createdDate: '15 Jan 2024',
        episodes: 8,
        plays: '45K',
        earnings: 25450,
    },
    {
        id: 'love-stories-vol-1',
        title: 'Love Stories - Vol 1',
        createdDate: '10 Jan 2024',
        episodes: 12,
        plays: '62K',
        earnings: 42350,
    },
    {
        id: 'motivational-tales',
        title: 'Motivational Tales',
        createdDate: '05 Jan 2024',
        episodes: 4,
        plays: '12K',
        earnings: 7900,
    },
];

export default function CreatorDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold font-headline">Creator Dashboard</h1>
                <p className="text-muted-foreground">Welcome, Vikram Singh</p>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-8">
        <Card className="bg-primary/10 border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle />
                    Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg">
                    <Link href="/creator/novels/new">
                        <Book className="mr-2" /> Create New Novel
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <Separator />

        <div>
            <h2 className="text-2xl font-bold mb-4">Your Novels</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {novels.map(novel => (
                    <Card key={novel.id} className="bg-card text-card-foreground flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Book className="text-primary"/> {novel.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 pt-1"><Calendar className="w-4 h-4"/>Created: {novel.createdDate}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 flex-grow">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span className="flex items-center gap-2"><Mic/> Episodes:</span>
                                <span>{novel.episodes}</span>
                            </div>
                             <div className="flex justify-between text-sm text-muted-foreground">
                                <span className="flex items-center gap-2"><Eye/> Plays:</span>
                                <span>{novel.plays}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span className="flex items-center gap-2"><Coins className="text-yellow-400"/> Earnings:</span>
                                <span>{novel.earnings.toLocaleString()}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/creator/novels/${novel.id}/edit`}>
                                    <Edit className="mr-2" /> Edit Novel
                                </Link>
                            </Button>
                             <Button asChild className="w-full">
                                <Link href={`/creator/novels/${novel.id}/episodes/new`}>
                                    <PlusCircle className="mr-2" /> Add Episode
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center">
                 <Button variant="outline">View All Novels</Button>
            </div>
        </div>
      </main>
    </div>
  );
}
