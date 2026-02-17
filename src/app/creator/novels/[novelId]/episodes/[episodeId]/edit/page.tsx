'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  title: z.string().min(1, 'Episode title is required.'),
  description: z.string().optional(),
  priceOption: z.string().default('keep'),
  newPrice: z.string().optional(),
  status: z.string().default('published'),
});

export default function EditEpisodePage() {
  const params = useParams<{ novelId: string, episodeId: string }>();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'The Dark Room',
      description: 'An old dark room holds a terrifying secret. Two friends decide to spend a night, a decision they will regret forever. What they find inside will change their lives.',
      priceOption: 'keep',
      status: 'published',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Episode Updated!',
      description: `"${values.title}" has been saved.`,
    });
    router.push(`/creator/novels/${params.novelId}/edit`);
  }

  const priceChangeOption = form.watch('priceOption');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/creator/novels/${params.novelId}/edit`}>
              <ArrowLeft />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Edit Episode</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 max-w-2xl">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Episode 2: The Dark Room</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Episode Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormItem>
                  <FormLabel>Current Audio</FormLabel>
                  <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">dark_room_ep2.mp3</p>
                  <Button variant="outline" className="w-full">
                    <UploadCloud className="mr-2 h-4 w-4" /> Replace Audio File (Optional)
                  </Button>
                </FormItem>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Episode Description</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priceOption"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-bold">Current Coin Price: 8 Coins</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="keep" /></FormControl>
                              <FormLabel className="font-normal">Keep 8 Coins</FormLabel>
                          </FormItem>
                          <div className="flex items-center space-x-3 space-y-0">
                              <RadioGroupItem value="change" />
                              <FormLabel className="font-normal">Change to:</FormLabel>
                               <FormField
                                control={form.control}
                                name="newPrice"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={priceChangeOption !== 'change'}>
                                            <FormControl>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select new price"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="5">5 Coins</SelectItem>
                                                <SelectItem value="10">10 Coins</SelectItem>
                                                <SelectItem value="12">12 Coins</SelectItem>
                                                <SelectItem value="15">15 Coins</SelectItem>
                                                <SelectItem value="20">20 Coins</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    </FormItem>
                                )}
                                />
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>Note: Existing unlocked users will not be affected.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-bold">Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="published" /></FormControl>
                            <FormLabel className="font-normal">Published</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="draft" /></FormControl>
                            <FormLabel className="font-normal">Move to Draft</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-4">
                    <Button type="submit" size="lg" className="w-full font-bold">Save Changes</Button>
                    <Button type="button" variant="destructive" size="lg" className="w-full font-bold">Delete Episode</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
