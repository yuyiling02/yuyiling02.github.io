export interface Artwork {
  id: number;
  author: string;
  title: string;
  modelFile: string;
  thumbnail: string;
}

export type ArtworkConfig = Artwork[];