"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchStore } from '@/store/searchStore';
import SearchFilters from '@/components/search/SearchFilters';
import ProductCard from '@/components/product/ProductCard';
import { Search } from 'lucide-react';

// Mock products data - Replace with API call later
const mockProducts = [
  {
    id: '1',
    name: 'PlayStation 5',
    price: 499500,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2832&auto=format&fit=crop',
    category: 'Consoles'
  },
  {
    id: '2',
    name: 'Xbox Series X',
    price: 499500,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2832&auto=format&fit=crop',
    category: 'Consoles'
  },
  {
    id: '3',
    name: 'Nintendo Switch OLED',
    price: 349500,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=2832&auto=format&fit=crop',
    category: 'Consoles'
  },
  {
    id: '4',
    name: 'Manette PS5 DualSense',
    price: 69500,
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2832&auto=format&fit=crop',
    category: 'Accessoires',
    isNew: true
  },
  {
    id: '5',
    name: 'Casque Gaming Razer',
    price: 129500,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2832&auto=format&fit=crop',
    category: 'Accessoires'
  },
  {
    id: '6',
    name: 'God of War Ragnarök',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2832&auto=format&fit=crop',
    category: 'Jeux',
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

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(true);
  const { query, setQuery, filters } = useSearchStore();

  // Filter products based on search query and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesQuery = !query || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = !filters.category || 
      product.category.toLowerCase() === filters.category.toLowerCase();

    const matchesPrice = (!filters.minPrice || product.price >= filters.minPrice) &&
      (!filters.maxPrice || product.price <= filters.maxPrice);

    return matchesQuery && matchesCategory && matchesPrice;
  });

  // Sort products based on filters
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-deepBlack pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-48 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
              Tous les <span className="text-primary">Produits</span>
            </h1>
            <p className="text-gray-300 max-w-xl">
              Découvrez notre sélection complète de jeux, consoles et accessoires gaming
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full bg-cardBlack border-2 border-borderBlack focus:border-primary pl-12 pr-4 py-3 rounded-lg text-lg font-exo2 text-gray-200 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-400 hover:text-primary transition-colors md:hidden"
          >
            {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <SearchFilters />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 italic">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 