"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: "consoles",
    name: "Consoles",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=2578&auto=format&fit=crop",
    description: "PS5, Xbox Series X, Nintendo Switch",
    itemCount: 15
  },
  {
    id: "peripheriques",
    name: "Périphériques",
    image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?q=80&w=2071&auto=format&fit=crop",
    description: "Claviers, Souris, Casques",
    itemCount: 42
  },
  {
    id: "pc-gaming",
    name: "PC Gaming",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2574&auto=format&fit=crop",
    description: "PC Gamer, Composants, Accessoires",
    itemCount: 28
  },
  {
    id: "jeux",
    name: "Jeux Vidéo",
    image: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?q=80&w=2574&auto=format&fit=crop",
    description: "PS5, Xbox, Switch, PC",
    itemCount: 156
  },
  {
    id: "streaming",
    name: "Streaming",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    description: "Micros, Webcams, Capture",
    itemCount: 23
  },
  {
    id: "mobilier",
    name: "Mobilier Gaming",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2570&auto=format&fit=crop",
    description: "Chaises, Bureaux, Supports",
    itemCount: 19
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

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-deepBlack relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-primary/20" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-t border-primary/20" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-orbitron font-black text-white mb-4"
          >
            Nos <span className="text-primary">Catégories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Découvrez l&apos;univers gaming
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
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
      </div>
    </section>
  );
};

export default CategoriesSection; 