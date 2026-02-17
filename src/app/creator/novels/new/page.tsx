
'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, UploadCloud } from 'lucide-react';


const formSchema = z.object({
  title: z.string().min(5, 'Novel title must be at least 5 characters.'),
  category: z.string().min(1, 'Please select a category.'),
  language: z.string().min(1, 'Please select a language.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  tags: z.string().optional(),
});

export default function CreateNovelPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      language: '',
      description: '',
      tags: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Novel Created!',
      description: `"${values.title}" is ready for episodes.`,
    });
    router.push('/creator/novels/some-novel-id/edit');
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/creator/dashboard">
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Create New Novel</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 max-w-2xl">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Novel Details</CardTitle>
            <CardDescription>
              Fill in the information about your new novel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <FormItem>
                  <FormLabel>Novel Cover Image*</FormLabel>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (REC. 1000x1000px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                  <FormDescription>This is the main image for your novel.</FormDescription>
                </FormItem>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Novel Title*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., The Midnight Mysteries" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="horror">Horror</SelectItem>
                                    <SelectItem value="romance">Romance</SelectItem>
                                    <SelectItem value="comedy">Comedy</SelectItem>
                                    <SelectItem value="motivational">Motivational</SelectItem>
                                    <SelectItem value="crime">Crime</SelectItem>
                                    <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                                    <SelectItem value="fantasy">Fantasy</SelectItem>
                                    <SelectItem value="kids">Kids</SelectItem>
                                    <SelectItem value="thriller">Thriller</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Language*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="hindi">Hindi</SelectItem>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="tamil">Tamil</SelectItem>
                                    <SelectItem value="telugu">Telugu</SelectItem>
                                    <SelectItem value="bengali">Bengali</SelectItem>
                                    <SelectItem value="marathi">Marathi</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Novel Description*</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell listeners what your novel is about..." className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="horror, ghost, thriller" {...field} />
                      </FormControl>
                       <FormDescription>Comma-separated tags to help with discovery.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full font-bold">Create Novel</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Note: After creating the novel, you can start adding episodes from the novel's edit mode.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
