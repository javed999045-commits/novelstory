'use server';
/**
 * @fileOverview Provides a Genkit flow for generating personalized audio story and podcast recommendations.
 *
 * - personalizedRecommendations - A function that generates audio content recommendations based on user listening history.
 * - PersonalizedRecommendationsInput - The input type for the personalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the personalizedRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ListeningHistoryItemSchema = z.object({
  title: z.string().describe('The title of the audio story or podcast.'),
  genre: z.string().describe('The genre of the audio story or podcast.'),
  author: z.string().optional().describe('The author or creator of the content.'),
  description: z.string().optional().describe('A brief description of the content.'),
});

const PersonalizedRecommendationsInputSchema = z.object({
  listeningHistory: z.array(ListeningHistoryItemSchema).describe('A list of audio stories and podcasts the user has listened to.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const RecommendedContentSchema = z.object({
  title: z.string().describe('The title of the recommended audio story or podcast.'),
  genre: z.string().describe('The genre of the recommended content.'),
  author: z.string().optional().describe('The author or creator of the recommended content.'),
  summary: z.string().describe('A brief summary of the recommended content.'),
  reason: z.string().describe('A personalized reason explaining why this content is recommended based on the user\u0027s listening history.'),
});

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendedContentSchema).describe('A list of recommended audio stories and podcasts.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function personalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: { schema: PersonalizedRecommendationsInputSchema },
  output: { schema: PersonalizedRecommendationsOutputSchema },
  prompt: `You are an AI assistant specialized in recommending audio stories and podcasts.
Based on the provided listening history, suggest new audio stories or podcasts that the user might enjoy.
For each recommendation, provide its title, genre, a brief summary, the author (if applicable), and a clear reason why it is being recommended, linking it back to the user's listening preferences.

Listening History:
{{#each listeningHistory}}
- Title: {{{title}}}
  Genre: {{{genre}}}
  {{#if author}}Author: {{{author}}}{{/if}}
  {{#if description}}Description: {{{description}}}{{/if}}
{{/each}}

Please provide 3-5 recommendations.`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await personalizedRecommendationsPrompt(input);
    if (!output) {
      throw new Error('Failed to get recommendations from the prompt.');
    }
    return output;
  }
);
