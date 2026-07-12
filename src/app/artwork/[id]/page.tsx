import { Artwork } from '@/lib/types';
import ArtworkDetailClient from './ArtworkDetailClient';

import config from '@/../public/config.json';

export async function generateStaticParams() {
  return config.map((artwork) => ({
    id: artwork.id.toString(),
  }));
}

interface ArtworkDetailPageProps {
  params: {
    id: string;
  };
}

export default function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
  const id = Number(params.id);
  const artwork = config.find((item) => item.id === id) as Artwork;
  
  return <ArtworkDetailClient artwork={artwork} />;
}
