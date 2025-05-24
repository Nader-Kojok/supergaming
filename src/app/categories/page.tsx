"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';

// Mock categories data - Replace with API call later
const categories = [
  {
    id: 'consoles',
    name: 'Consoles',
    description: 'PS5, Xbox Series X, Nintendo Switch et plus',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070',
    itemCount: 24,
    featured: true
  },
  {
    id: 'jeux',
    name: 'Jeux Vidéo',
    description: 'Les dernières sorties et les classiques intemporels',
    image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?q=80&w=2070',
    itemCount: 156,
    featured: true
  },
  {
    id: 'accessoires',
    name: 'Accessoires',
    description: 'Manettes, casques, et autres périphériques gaming',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2070',
    itemCount: 89
  },
  {
    id: 'pc-gaming',
    name: 'PC Gaming',
    description: 'Composants et périphériques pour gamers',
    image: 'https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?q=80&w=2070',
    itemCount: 67,
    featured: true
  },
  {
    id: 'merchandising',
    name: 'Merchandising',
    description: 'Goodies et produits dérivés de vos jeux préférés',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070',
    itemCount: 42
  },
  {
    id: 'retrogaming',
    name: 'Retrogaming',
    description: 'Consoles et jeux rétro pour les nostalgiques',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070',
    itemCount: 31
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-deepBlack pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-48 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
              Nos <span className="text-primary">Catégories</span>
            </h1>
            <p className="text-gray-300 max-w-xl">
              Explorez notre sélection de produits gaming par catégorie
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-12 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une catégorie..."
              className="w-full bg-cardBlack border-2 border-borderBlack focus:border-primary pl-12 pr-4 py-3 rounded-lg text-lg font-exo2 text-gray-200 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-lg bg-cardBlack"
              >
                <Link href={`/categories/${category.id}`} className="block">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cardBlack via-cardBlack/50 to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm text-primary">
                      <span className="font-jetbrains">{category.itemCount} produits</span>
                      <svg
                        className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {category.featured && (
                    <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
                      <span className="text-xs font-bold text-white">VEDETTE</span>
                    </div>
                  )}

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border border-borderBlack rounded-lg">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
                      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 italic">
              Aucune catégorie ne correspond à votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 