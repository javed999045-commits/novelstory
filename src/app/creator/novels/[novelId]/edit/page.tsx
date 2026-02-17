
'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { ArrowLeft, Book, PlusCircle, Edit, BarChart, Trash2 } from 'lucide-react';


const episodes = [
    { id: 'ep1', title: 'The Beginning', duration: '12 min', price: 'FREE', status: 'Published' },
    { id: 'ep2', title: 'The Dark Room', duration: '18 min', price: '8 Coins', status: 'Published' },
    { id: 'ep3', title: 'Whispering Walls', duration: '22 min', price: '12 Coins', status: 'Published' },
    { id: 'ep4', title: 'The Mirror', duration: '25 min', price: '15 Coins', status: 'Published' },
    { id: 'ep5', title: 'The Attic (Draft)', duration: 'Not uploaded', price: 'Not set', status: 'Draft' },
]

export default function NovelEditPage({ params }: { params: { novelId: string } }) {
    const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/creator/dashboard">
              <ArrowLeft />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold font-headline">Novel Edit Mode</h1>
            <p className="text-sm text-muted-foreground">Dark Horror Stories</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Book className="text-primary"/>
                    Dark Horror Stories
                </CardTitle>
                <CardDescription>by Vikram Singh - Created 15 Jan 2024</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" size="lg"><Edit className="mr-2"/>Edit Novel Details</Button>
                <Button asChild size="lg">
                    <Link href={`/creator/novels/${params.novelId}/episodes/new`}>
                        <PlusCircle className="mr-2"/> Add New Episode
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-xl font-bold mb-4">Current Episodes</h2>
            <div className="space-y-4">
                {episodes.map(ep => (
                    <Card key={ep.id}>
                        <CardHeader>
                             <CardTitle className="text-lg">{ep.title}</CardTitle>
                             <CardDescription>Duration: {ep.duration} • Price: {ep.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <Badge variant={ep.status === 'Published' ? 'default' : 'secondary'}>
                                {ep.status}
                            </Badge>
                             <div className="flex items-center gap-2">
                                {ep.status !== 'Draft' && (
                                    <>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/creator/novels/${params.novelId}/episodes/${ep.id}/edit`}>
                                                <Edit className="w-4 h-4"/>
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm"><BarChart className="w-4 h-4"/></Button>
                                    </>
                                )}
                                {ep.status === 'Draft' && (
                                     <Button asChild variant="outline" size="sm">
                                        <Link href={`/creator/novels/${params.novelId}/episodes/${ep.id}/edit`}>
                                            <Edit className="w-4 h-4 mr-2"/> Edit
                                        </Link>
                                    </Button>
                                )}
                                <Button variant="destructive" size="sm"><Trash2 className="w-4 h-4"/></Button>
                             </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center">
                 <Button variant="outline">Load More Episodes</Button>
            </div>
        </div>
      </main>
    </div>
  );
}
