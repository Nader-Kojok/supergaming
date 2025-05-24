"use client";

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

// Mock data - This would typically come from an API or database
const similarProducts = [
  {
    id: "2",
    name: "Xbox Series X",
    price: 499500,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2832&auto=format&fit=crop",
    category: "Consoles"
  },
  {
    id: "3",
    name: "Nintendo Switch OLED",
    price: 349500,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=2832&auto=format&fit=crop",
    category: "Consoles"
  },
  {
    id: "4",
    name: "Manette PS5 DualSense",
    price: 69500,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2832&auto=format&fit=crop",
    category: "Accessoires",
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

const SimilarProducts = () => {
  return (
    <section className="py-16 bg-deepBlack">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-orbitron font-black text-white mb-4">
            Produits <span className="text-primary">Similaires</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez d&apos;autres produits qui pourraient vous intéresser
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {similarProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SimilarProducts; 