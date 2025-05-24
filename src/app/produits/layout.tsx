import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tous les Produits | SuperGaming',
  description: 'Découvrez notre sélection complète de jeux, consoles et accessoires gaming. Des dernières nouveautés aux classiques intemporels.',
  openGraph: {
    title: 'Tous les Produits | SuperGaming',
    description: 'Découvrez notre sélection complète de jeux, consoles et accessoires gaming. Des dernières nouveautés aux classiques intemporels.',
    images: [
      {
        url: '/og-products.jpg', // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'SuperGaming - Collection de Produits Gaming',
      },
    ],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 