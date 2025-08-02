export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  description: string;
  style: string;
  prompt: string;
  imageUrl?: string;
}

export type Step = 'museum' | 'contribution'|'poem'|'learning';