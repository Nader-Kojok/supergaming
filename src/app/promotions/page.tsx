"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';

// Mock promotional products data - Replace with API call later
const promoProducts = [
  {
    id: 'ps5-bundle',
    name: 'PS5 + FIFA 24 Bundle',
    category: 'Consoles',
    price: 449990,
    promoPrice: 399990,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2070',
    isPromo: true
  },
  {
    id: 'xbox-controller',
    name: 'Manette Xbox Series X Carbon',
    category: 'Accessoires',
    price: 64990,
    promoPrice: 49990,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=2070',
    isPromo: true
  },
  {
    id: 'gaming-chair',
    name: 'Chaise Gaming PRO RGB',
    category: 'Mobilier',
    price: 299990,
    promoPrice: 199990,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070',
    isPromo: true
  },
  {
    id: 'razer-headset',
    name: 'Casque Razer BlackShark V2',
    category: 'Accessoires',
    price: 129990,
    promoPrice: 89990,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2070',
    isPromo: true
  },
  {
    id: 'gaming-monitor',
    name: 'Écran Gaming 27" 240Hz',
    category: 'Écrans',
    price: 399990,
    promoPrice: 299990,
    image: 'https://images.unsplash.com/photo-1527219525722-f9767a7f2884?q=80&w=2070',
    isPromo: true
  },
  {
    id: 'gaming-bundle',
    name: 'Pack Clavier + Souris RGB',
    category: 'Accessoires',
    price: 149990,
    promoPrice: 99990,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2070',
    isPromo: true
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

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(promoProducts.map(product => product.category))];
  
  const filteredProducts = selectedCategory === 'all'
    ? promoProducts
    : promoProducts.filter(product => product.category === selectedCategory);

  // Calculate discount percentage
  const getDiscountPercentage = (price: number, promoPrice: number) => {
    return Math.round(((price - promoPrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-deepBlack pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-48 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
              Nos <span className="text-primary">Promotions</span>
            </h1>
            <p className="text-gray-300 max-w-xl">
              Profitez de réductions exceptionnelles sur une sélection de produits gaming
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
            <ProductCard 
              key={product.id} 
              {...product} 
              price={product.promoPrice}
              originalPrice={product.price}
              discountPercentage={getDiscountPercentage(product.price, product.promoPrice)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
} 