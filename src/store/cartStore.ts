import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  get totalItems(): number;
  get totalPrice(): number;
}

interface PersistedState {
  items: CartItem[];
  version?: number;
}

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const quantity = Math.max(0, parseInt(String(item.quantity)) || 0);
    return total + quantity;
  }, 0);
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = parseFloat(String(item.price)) || 0;
    const quantity = Math.max(0, parseInt(String(item.quantity)) || 0);
    return total + (price * quantity);
  }, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        const price = parseFloat(String(item.price).replace(/\s/g, '')) || 0;

        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { 
                    ...i, 
                    quantity: Math.max(0, parseInt(String(i.quantity)) || 0) + 1,
                    price // Ensure price is always a number
                  }
                : i
            ),
          };
        }
        return { 
          items: [...state.items, { 
            ...item, 
            quantity: 1,
            price // Ensure price is always a number
          }] 
        };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),

      updateQuantity: (id, newQuantity) => set((state) => {
        const quantity = Math.max(0, parseInt(String(newQuantity)) || 0);
        
        if (quantity === 0) {
          return {
            items: state.items.filter((i) => i.id !== id),
          };
        }

        return {
          items: state.items.map((i) =>
            i.id === id 
              ? { 
                  ...i, 
                  quantity,
                  price: parseFloat(String(i.price).replace(/\s/g, '')) || 0 // Ensure price is always a number
                } 
              : i
          ),
        };
      }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const { items } = get();
        return calculateTotalItems(items);
      },

      getTotalPrice: () => {
        const { items } = get();
        return calculateTotalPrice(items);
      },

      get totalItems() {
        return calculateTotalItems(get().items);
      },

      get totalPrice() {
        return calculateTotalPrice(get().items);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as PersistedState;
        if (version === 0 || !state || !Array.isArray(state.items)) {
          return {
            items: [],
          };
        }
        // Clean up any invalid items and ensure proper number values
        return {
          ...state,
          items: state.items
            .filter((item: CartItem) => (
              item &&
              typeof item === 'object' &&
              typeof item.id === 'string'
            ))
            .map((item: CartItem) => ({
              ...item,
              price: parseFloat(String(item.price)) || 0,
              quantity: Math.max(0, parseInt(String(item.quantity)) || 0)
            }))
        };
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // Ensure methods are properly bound after rehydration
        state.getTotalItems = () => calculateTotalItems(state.items);
        state.getTotalPrice = () => calculateTotalPrice(state.items);

        // Clean up any invalid values in the current state
        state.items = state.items.map(item => ({
          ...item,
          price: parseFloat(String(item.price)) || 0,
          quantity: Math.max(0, parseInt(String(item.quantity)) || 0)
        }));
      }
    }
  )
); 