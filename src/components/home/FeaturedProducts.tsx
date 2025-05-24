"use client";

import { motion } from 'framer-motion';
import ProductCard from '../product/ProductCard';
import Link from 'next/link';

// Temporary mock data - This would typically come from an API or database
const featuredProducts = [
  {
    id: "1",
    name: "PlayStation 5 Digital Edition",
    price: 449500,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2832&auto=format&fit=crop",
    category: "Consoles",
    isNew: true
  },
  {
    id: "2",
    name: "Xbox Series X",
    price: 499500,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2832&auto=format&fit=crop",
    category: "Consoles"
  },
  {
    id: "3",
    name: "Razer BlackWidow V3",
    price: 179500,
    promoPrice: 149500,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2832&auto=format&fit=crop",
    category: "Périphériques",
    isPromo: true
  },
  {
    id: "4",
    name: "Nintendo Switch OLED",
    price: 349500,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=2832&auto=format&fit=crop",
    category: "Consoles"
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

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-deepBlack">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-orbitron font-black text-white mb-4"
          >
            Produits <span className="text-primary">Vedettes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Découvrez l&apos;excellence gaming
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/produits"
            className="inline-flex items-center px-8 py-4 bg-cardBlack hover:bg-borderBlack text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 transform border border-borderBlack group"
          >
            <span>Voir tous les produits</span>
            <svg
              className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute inset-0 border-2 border-primary/20" />
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-l-2 border-primary/20 h-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 