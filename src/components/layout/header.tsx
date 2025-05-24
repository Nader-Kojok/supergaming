"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import MobileNav from './MobileNav';
import SearchOverlay from './SearchOverlay';
import { useCartStore } from '@/store/cartStore';
import CartSidebar from '../cart/CartSidebar';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-deepBlack/80 backdrop-blur-lg border-b border-borderBlack">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-orbitron font-black tracking-wider">
                <span className="text-primary">SUPER</span>
                <span className="text-white">GAMING</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/produits"
                className="font-exo2 text-sm uppercase tracking-wide hover:text-primary transition-colors"
              >
                Produits
              </Link>
              <Link 
                href="/categories"
                className="font-exo2 text-sm uppercase tracking-wide hover:text-primary transition-colors"
              >
                Catégories
              </Link>
              <Link 
                href="/nouveautes"
                className="font-exo2 text-sm uppercase tracking-wide hover:text-primary transition-colors"
              >
                Nouveautés
              </Link>
              <Link 
                href="/promotions"
                className="font-exo2 text-sm uppercase tracking-wide hover:text-primary transition-colors"
              >
                Promotions
              </Link>
              <Link 
                href="/contact"
                className="font-exo2 text-sm uppercase tracking-wide hover:text-primary transition-colors"
              >
                Contact
              </Link>


            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-cardBlack rounded-lg transition-colors"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5 text-gray-400 hover:text-primary" />
              </button>

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-cardBlack rounded-lg transition-colors group"
                aria-label="Panier"
              >
                <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs font-bold flex items-center justify-center text-white">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-cardBlack rounded-lg transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5 text-gray-400 hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header; 