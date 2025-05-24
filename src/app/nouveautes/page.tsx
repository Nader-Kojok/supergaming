"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';

// Mock new products data - Replace with API call later
const newProducts = [
  {
    id: 'ps5-slim',
    name: 'PS5 Slim Edition',
    category: 'Consoles',
    price: 449990,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2070',
    isNew: true
  },
  {
    id: 'zelda-totk',
    name: 'The Legend of Zelda: Tears of the Kingdom',
    category: 'Jeux Vidéo',
    price: 59990,
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=2070',
    isNew: true
  },
  {
    id: 'razer-blackwidow',
    name: 'Razer BlackWidow V4 Pro',
    category: 'Accessoires',
    price: 199990,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2070',
    isNew: true
  },
  {
    id: 'rtx-4080',
    name: 'NVIDIA RTX 4080 Super',
    category: 'PC Gaming',
    price: 899990,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070',
    isNew: true
  },
  {
    id: 'pokemon-plush',
    name: 'Peluche Pikachu Édition Limitée',
    category: 'Merchandising',
    price: 39990,
    image: 'https://images.unsplash.com/photo-1609372332255-611485350f25?q=80&w=2070',
    isNew: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function NouveautesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(newProducts.map(product => product.category))];
  
  const filteredProducts = selectedCategory === 'all'
    ? newProducts
    : newProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-deepBlack pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-48 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
              Nos <span className="text-primary">Nouveautés</span>
            </h1>
            <p className="text-gray-300 max-w-xl">
              Découvrez nos derniers produits gaming fraîchement arrivés
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-exo2 text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-cardBlack text-gray-400 hover:bg-borderBlack'
                }`}
              >
                {category === 'all' ? 'Tous les produits' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
} 