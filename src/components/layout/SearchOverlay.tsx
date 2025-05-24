"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, History, Trash2 } from 'lucide-react';
import { useSearchStore } from '@/store/searchStore';
import SearchFilters from '@/components/search/SearchFilters';
import Link from 'next/link';
import Image from 'next/image';
import { debounce } from 'lodash';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search results - replace with API call later
const mockSearch = async (query: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const results = [
    {
      id: '1',
      name: 'PlayStation 5',
      price: 499500,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2832&auto=format&fit=crop',
      category: 'Consoles'
    },
    {
      id: '2',
      name: 'Xbox Series X',
      price: 499500,
      image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2832&auto=format&fit=crop',
      category: 'Consoles'
    },
  ].filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return results;
};

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  
  const {
    query,
    setQuery,
    filters,
    history,
    suggestions,
    addToHistory,
    clearHistory
  } = useSearchStore();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setShowFilters(false);
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await mockSearch(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Handle search input
  const handleSearch = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    addToHistory(query);
    // Here you would typically redirect to search results page
    onClose();
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50 bg-deepBlack/95 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between pt-4">
              <h2 className="font-orbitron text-xl font-bold text-primary">
                Rechercher
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-cardBlack rounded-lg transition-colors"
                  aria-label="Fermer la recherche"
                >
                  <X className="w-6 h-6 text-gray-400 hover:text-primary" />
                </button>
              </div>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full bg-cardBlack border-2 border-borderBlack focus:border-primary pl-12 pr-4 py-3 rounded-lg text-lg font-exo2 text-gray-200 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
            </form>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Search History */}
                {!query && history.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-orbitron text-sm uppercase text-gray-400 flex items-center gap-2">
                        <History className="w-4 h-4" />
                        Recherches récentes
                      </h3>
                      <button
                        onClick={clearHistory}
                        className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Effacer
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {history.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="px-4 py-2 bg-cardBlack hover:bg-borderBlack rounded-full text-sm font-exo2 text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <History className="w-3 h-3" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                {!query && (
                  <div>
                    <h3 className="font-orbitron text-sm uppercase text-gray-400 mb-4">
                      Recherches populaires
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="px-4 py-2 bg-cardBlack hover:bg-borderBlack rounded-full text-sm font-exo2 text-gray-300 hover:text-primary transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {query && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="font-orbitron text-sm uppercase text-gray-400 mb-4">
                      Résultats
                    </h3>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="animate-pulse flex gap-4 bg-cardBlack rounded-lg p-4"
                          >
                            <div className="w-20 h-20 bg-borderBlack rounded-lg" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-borderBlack rounded w-3/4" />
                              <div className="h-3 bg-borderBlack rounded w-1/2" />
                              <div className="h-3 bg-borderBlack rounded w-1/4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : results.length > 0 ? (
                      <div className="space-y-4">
                        {results.map((result) => (
                          <Link
                            key={result.id}
                            href={`/produit/${result.id}`}
                            onClick={onClose}
                            className="flex gap-4 bg-cardBlack hover:bg-borderBlack rounded-lg p-4 transition-colors group"
                          >
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                              <Image
                                src={result.image}
                                alt={result.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-orbitron text-white group-hover:text-primary transition-colors">
                                {result.name}
                              </h4>
                              <p className="text-sm text-primary">{result.category}</p>
                              <p className="font-jetbrains text-white mt-1">
                                {formatPrice(result.price)} F
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">
                        Aucun résultat trouvé pour &quot;{query}&quot;
                      </p>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Filters Sidebar */}
              <AnimatePresence mode="wait">
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="lg:col-span-1"
                  >
                    <SearchFilters />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay; 