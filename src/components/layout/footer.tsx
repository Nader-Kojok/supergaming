"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const navigation = {
    produits: [
      { name: 'Nouveautés', href: '/nouveautes' },
      { name: 'Promotions', href: '/promotions' },
      { name: 'Meilleures ventes', href: '/meilleures-ventes' },
      { name: 'Précommandes', href: '/precommandes' },
    ],
    categories: [
      { name: 'Consoles', href: '/categories/consoles' },
      { name: 'Jeux vidéo', href: '/categories/jeux' },
      { name: 'Accessoires', href: '/categories/accessoires' },
      { name: 'Gaming PC', href: '/categories/pc-gaming' },
    ],
    support: [
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Livraison', href: '/livraison' },
      { name: 'Retours', href: '/retours' },
    ],
  };

  return (
    <footer className="bg-deepBlack border-t border-borderBlack">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <h2 className="text-xl font-orbitron font-bold text-white mb-4">
            Newsletter
          </h2>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="flex-1 bg-cardBlack border border-borderBlack rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                S&apos;inscrire
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Products */}
          <div>
            <h3 className="font-orbitron font-bold text-white mb-4">Produits</h3>
            <ul className="space-y-2">
              {navigation.produits.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-orbitron font-bold text-white mb-4">Catégories</h3>
            <ul className="space-y-2">
              {navigation.categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-orbitron font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-borderBlack pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Supergaming. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 