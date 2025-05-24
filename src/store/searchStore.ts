import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';
  inStock?: boolean;
}

interface SearchState {
  query: string;
  filters: SearchFilters;
  history: string[];
  suggestions: string[];
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  setSuggestions: (suggestions: string[]) => void;
}

// Mock data for suggestions (replace with API data later)
const defaultSuggestions = [
  'PS5',
  'Xbox Series X',
  'Nintendo Switch',
  'Gaming PC',
  'Manettes',
  'Casques Gaming',
  'Jeux PS5',
  'Jeux Xbox',
];

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      filters: {},
      history: [],
      suggestions: defaultSuggestions,

      setQuery: (query) => set({ query }),

      setFilters: (filters) => set({ filters }),

      addToHistory: (query) => {
        if (!query.trim()) return;
        
        const history = get().history;
        const newHistory = [
          query,
          ...history.filter((item) => item !== query)
        ].slice(0, 10); // Keep only last 10 searches
        
        set({ history: newHistory });
      },

      clearHistory: () => set({ history: [] }),

      setSuggestions: (suggestions) => set({ suggestions }),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ history: state.history }), // Only persist search history
    }
  )
); 