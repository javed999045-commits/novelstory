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
import { ArrowLeft, UploadCloud, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  title: z.string().min(1, 'Episode title is required.'),
  description: z.string().optional(),
  price: z.string(),
  customPrice: z.coerce.number().min(1).max(100).optional(),
  status: z.string().default('publish'),
});

export default function AddEpisodePage() {
  const params = useParams<{ novelId: string }>();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '10',
      status: 'publish',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Episode Added!',
      description: `"${values.title}" has been added to the novel.`,
    });
    router.push(`/creator/novels/${params.novelId}/edit`);
  }

  const priceOption = form.watch('price');

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
          <h1 className="text-2xl font-bold font-headline">Add New Episode</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 max-w-2xl">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Episode 9: Dark Horror Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Episode Title*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., The Haunted Villa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormItem>
                  <FormLabel>Upload Audio File*</FormLabel>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> (MP3, M4A)</p>
                            <p className="text-xs text-muted-foreground">Max size: 100MB</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                   <FormDescription>Duration will be auto-detected after upload.</FormDescription>
                </FormItem>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Episode Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A brief summary of this episode." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-bold">Set Episode Coin Price*</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="0" /></FormControl><FormLabel className="font-normal">FREE Episode</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="5" /></FormControl><FormLabel className="font-normal">5 Coins</FormLabel></FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="8" /></FormControl><FormLabel className="font-normal">8 Coins</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="10" /></FormControl><FormLabel className="font-normal">10 Coins</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="12" /></FormControl><FormLabel className="font-normal">12 Coins</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="15" /></FormControl><FormLabel className="font-normal">15 Coins</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="20" /></FormControl><FormLabel className="font-normal">20 Coins</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="25" /></FormControl><FormLabel className="font-normal">25 Coins</FormLabel></FormItem>
                          
                          <div className="flex items-center space-x-3 space-y-0 col-span-full sm:col-span-1">
                              <RadioGroupItem value="custom" />
                              <FormLabel className="font-normal">Custom:</FormLabel>
                               <FormField
                                control={form.control}
                                name="customPrice"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="1-100"
                                            className="w-24 h-9"
                                            disabled={priceOption !== 'custom'}
                                            {...field}
                                        />
                                    </FormControl>
                                    </FormItem>
                                )}
                                />
                                <FormLabel className="font-normal">Coins</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-bold">Status*</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="publish" /></FormControl>
                            <FormLabel className="font-normal">Publish Now</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="draft" /></FormControl>
                            <FormLabel className="font-normal">Save as Draft</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full font-bold">Add Episode to Novel</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
