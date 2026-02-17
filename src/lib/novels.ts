import data from './novels.json';

export type Episode = {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string;
  listens: number;
  rating: number;
  reviews: number;
  isFree: boolean;
  priceInCoins: number;
  unlocked: boolean;
  progress?: number;
  isDownloaded?: boolean;
};

export type Novel = {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  imageHint: string;
  rating: number;
  ratingsCount: number;
  episodesCount: number;
  episodes: Episode[];
  tagline: string;
  badge?: string;
  description: string;
  genres: string[];
  language: string;
  releaseDate: string;
  totalDuration: string;
  priceRange: string;
  listenerStats: {
    completionPercentage: number;
    mostPopularEpisode: string;
    averageRating: number;
  };
  reviews: {
    text: string;
  }[];
};

export const novels: Novel[] = data.novels;
