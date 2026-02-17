import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  priceInCoins: number;
  unlocked: boolean;
  duration: string;
  isBundle?: boolean;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
