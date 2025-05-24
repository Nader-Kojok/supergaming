"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isPromo?: boolean;
  originalPrice?: number;
  discountPercentage?: number;
}

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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price) + ' F';
};

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  isNew, 
  isPromo,
  originalPrice,
  discountPercentage 
}: ProductCardProps) => {
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mounted) {
      addItem({ id, name, price, image, category });
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-cardBlack rounded-lg overflow-hidden"
    >
      <Link href={`/produit/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && (
              <div className="bg-primary px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-white">NOUVEAU</span>
              </div>
            )}
            {isPromo && discountPercentage && (
              <div className="bg-primary px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-white">-{discountPercentage}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-sm text-primary mb-2">{category}</div>
          <h3 className="text-lg font-orbitron font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="font-jetbrains">
            {isPromo && originalPrice ? (
              <div className="space-y-1">
                <div className="text-xl text-primary font-bold">
                  {formatPrice(price)}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </div>
              </div>
            ) : (
              <div className="text-xl text-primary font-bold">
                {formatPrice(price)}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cardBlack via-cardBlack/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              aria-label="Ajouter au panier"
              disabled={!mounted}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Ajouter</span>
            </button>
            <button
              className="bg-cardBlack hover:bg-borderBlack text-white font-bold p-2 rounded-lg transition-colors border border-borderBlack"
              aria-label="Ajouter aux favoris"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

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
  );
};

export default ProductCard; 