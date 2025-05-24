"use client";

import { useSearchStore } from '@/store/searchStore';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

const categories = [
  { id: 'consoles', name: 'Consoles' },
  { id: 'jeux', name: 'Jeux' },
  { id: 'accessoires', name: 'Accessoires' },
  { id: 'pc-gaming', name: 'PC Gaming' },
  { id: 'merchandising', name: 'Merchandising' },
];

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'name_asc', label: 'A-Z' },
  { value: 'name_desc', label: 'Z-A' },
];

const SearchFilters = () => {
  const { filters, setFilters } = useSearchStore();

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      minPrice: value[0] * 1000, // Convert to actual price (e.g., 50 -> 50,000)
      maxPrice: value[1] * 1000,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFilters({
      ...filters,
      category: value === 'all' ? undefined : value,
    });
  };

  const handleSortChange = (value: string) => {
    setFilters({
      ...filters,
      sortBy: value as any,
    });
  };

  const handleStockChange = (checked: boolean) => {
    setFilters({
      ...filters,
      inStock: checked,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-cardBlack rounded-lg border border-borderBlack"
    >
      {/* Categories */}
      <div className="space-y-2">
        <label className="text-sm font-orbitron text-gray-400">Catégorie</label>
        <Select
          value={filters.category || 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full bg-deepBlack border-borderBlack">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-orbitron text-gray-400">
          Fourchette de prix (en milliers FCFA)
        </label>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          onValueChange={handlePriceChange}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-gray-400 font-jetbrains">
          <span>{filters.minPrice ? filters.minPrice.toLocaleString() : '0'} F</span>
          <span>{filters.maxPrice ? filters.maxPrice.toLocaleString() : '1,000,000'} F</span>
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-sm font-orbitron text-gray-400">Trier par</label>
        <Select
          value={filters.sortBy || 'newest'}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-full bg-deepBlack border-borderBlack">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* In Stock Only */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-orbitron text-gray-400">En stock uniquement</label>
        <Switch
          checked={filters.inStock || false}
          onCheckedChange={handleStockChange}
        />
      </div>
    </motion.div>
  );
};

export default SearchFilters; 