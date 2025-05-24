"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import SimilarProducts from '@/components/product/SimilarProducts';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  specs: string[];
  stock: number;
}

interface ClientProductPageProps {
  product: Product;
}

const ClientProductPage = ({ product }: ClientProductPageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  return (
    <main className="pt-24 pb-16 bg-deepBlack min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-cardBlack">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-deepBlack/80 hover:bg-primary text-white p-2 rounded-full transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-deepBlack/80 hover:bg-primary text-white p-2 rounded-full transition-colors"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 aspect-square rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary' : 'border-borderBlack'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Vue ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-orbitron font-black text-white mb-2"
              >
                {product.name}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-jetbrains text-2xl font-bold"
              >
                {product.price.toLocaleString('fr-FR')} F
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert max-w-none"
            >
              <p className="text-gray-400">{product.description}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-orbitron font-bold text-white">Caractéristiques</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center text-gray-400">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                    {spec}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Ajouter au panier</span>
              </button>
              <button
                className="bg-cardBlack hover:bg-borderBlack text-white font-bold p-3 rounded-lg transition-colors border border-borderBlack"
                aria-label="Ajouter aux favoris"
              >
                <Heart className="w-5 h-5" />
              </button>
            </motion.div>

            {product.stock > 0 ? (
              <p className="text-green-500">
                En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})
              </p>
            ) : (
              <p className="text-red-500">Rupture de stock</p>
            )}
          </div>
        </div>

        {/* Similar Products Section */}
        <SimilarProducts />
      </div>
    </main>
  );
};

export default ClientProductPage; 