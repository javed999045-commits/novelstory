
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(1, 'Episode title is required.'),
  episodeNumber: z.coerce.number().min(1),
  totalEpisodes: z.coerce.number().min(1),
  category: z.string().min(1, 'Please select a category.'),
  price: z.string(),
  customPrice: z.coerce.number().min(1).max(100).optional(),
  isFirstEpisodeFree: z.boolean().default(false),
  isBundle: z.boolean().default(false),
});

export default function CreatorDashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      episodeNumber: 1,
      totalEpisodes: 1,
      category: '',
      price: '15',
      isFirstEpisodeFree: false,
      isBundle: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Episode Saved!',
      description: `"${values.title}" settings have been updated.`,
    });
  }

  const priceOption = form.watch('price');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Creator Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Episode Settings</CardTitle>
            <CardDescription>
              Configure the details and pricing for your new episode.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Episode Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., The Awakening" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                        control={form.control}
                        name="episodeNumber"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Episode Number</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="totalEpisodes"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Total Episodes</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input value="Auto-detected: 28 min" readOnly className="bg-muted"/>
                            </FormControl>
                        </FormItem>
                    </div>
                     <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="horror">Horror</SelectItem>
                                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                                <SelectItem value="comedy">Comedy</SelectItem>
                                <SelectItem value="thriller">Thriller</SelectItem>
                                <SelectItem value="fantasy">Fantasy</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">Set Episode Price (in Coins)</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="5" />
                            </FormControl>
                            <FormLabel className="font-normal">5 Coins <span className="text-muted-foreground text-xs">(under 5 min)</span></FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="10" />
                            </FormControl>
                            <FormLabel className="font-normal">10 Coins <span className="text-muted-foreground text-xs">(5-10 min)</span></FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="15" />
                            </FormControl>
                            <FormLabel className="font-normal">15 Coins <span className="text-muted-foreground text-xs">(10-20 min)</span></FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="20" />
                            </FormControl>
                            <FormLabel className="font-normal">20 Coins <span className="text-muted-foreground text-xs">(20-30 min)</span></FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="25" />
                            </FormControl>
                            <FormLabel className="font-normal">25 Coins <span className="text-muted-foreground text-xs">(30-45 min)</span></FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="30" />
                            </FormControl>
                            <FormLabel className="font-normal">30 Coins <span className="text-muted-foreground text-xs">(45+ min)</span></FormLabel>
                          </FormItem>
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
                
                <Separator />
                
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="isFirstEpisodeFree"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                            First Episode Free?
                            </FormLabel>
                            <FormDescription>
                                Make the first episode of this series free for all users.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="isBundle"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                            Episode Bundle Discount?
                            </FormLabel>
                            <FormDescription>
                            Offer a special price for a bundle of 3 episodes for 40 coins.
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                    />
                </div>

                <Button type="submit" size="lg" className="w-full font-bold">Save Changes</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
