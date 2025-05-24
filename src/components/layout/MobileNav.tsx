import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const menuItems = [
    { href: '/produits', label: 'Produits' },
    { href: '/categories', label: 'Catégories' },
    { href: '/nouveautes', label: 'Nouveautés' },
    { href: '/promotions', label: 'Promotions' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-deepBlack border-l border-borderBlack z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-borderBlack">
              <h2 className="font-orbitron text-xl font-bold text-primary">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cardBlack rounded-lg transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-primary" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2 px-4 font-exo2 text-lg uppercase tracking-wide text-gray-300 hover:text-primary hover:bg-cardBlack rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-borderBlack">
              <p className="text-sm text-gray-400 text-center">
                © 2024 Supergaming
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav; 