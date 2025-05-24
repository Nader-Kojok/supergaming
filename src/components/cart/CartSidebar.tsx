"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import WhatsAppOrderForm from './WhatsAppOrderForm';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const [mounted, setMounted] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const clearCart = useCartStore(state => state.clearCart);
  const storeTotalPrice = useCartStore(state => state.totalPrice);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force re-render when items change
  useEffect(() => {
    if (mounted) {
      // This empty effect will trigger re-render when items change
    }
  }, [items, mounted]);

  if (!mounted) return null;

  // Calculate total items
  const totalItems = items.reduce((total, item) => total + (parseInt(String(item.quantity)) || 0), 0);

  // Calculate total price locally as fallback
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      const itemPrice = parseFloat(String(item.price)) || 0;
      const itemQuantity = Math.max(0, parseInt(String(item.quantity)) || 0);
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  const formatPrice = (price: number): string => {
    // Ensure price is a valid number and convert to float
    const validPrice = parseFloat(String(price)) || 0;
    
    // Format with French locale and no decimals
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true // This ensures thousand separators
    }).format(validPrice);
  };

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    const quantity = Math.max(0, parseInt(String(newQuantity)) || 0);
    if (quantity >= 0) {
      updateQuantity(id, quantity);
    }
  };

  const formatWhatsAppMessage = () => {
    const itemsList = items
      .map((item) => {
        const price = parseFloat(String(item.price)) || 0;
        const quantity = Math.max(0, parseInt(String(item.quantity)) || 0);
        return `- ${quantity}x ${item.name} (${formatPrice(price)} F)`;
      })
      .join('\n');
    
    const total = formatPrice(totalPrice);
    
    return encodeURIComponent(
      `Bonjour, je souhaite commander les articles suivants :\n\n${itemsList}\n\nTotal : ${total} F`
    );
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    setIsOrderFormOpen(true);
  };

  // Use store total price, fallback to calculated total if store returns 0 or undefined
  const totalPrice = storeTotalPrice > 0 ? storeTotalPrice : calculateTotalPrice();
  const hasItems = items.length > 0;

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="cart-overlay"
            className="fixed inset-0 z-[45]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-[100dvh] w-full sm:w-96 bg-deepBlack border-l border-borderBlack"
            >
              {/* Header */}
              <div className="p-6 border-b border-borderBlack flex items-center justify-between">
                <h2 className="text-xl font-orbitron font-bold text-white">
                  Votre Panier {hasItems && `(${totalItems})`}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {!hasItems ? (
                  <div className="text-center text-gray-400">
                    Votre panier est vide
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => {
                      const itemPrice = parseFloat(String(item.price)) || 0;
                      const itemQuantity = Math.max(0, parseInt(String(item.quantity)) || 0);
                      
                      return (
                        <div key={item.id} className="flex gap-4 bg-cardBlack rounded-lg p-4">
                          {/* Product Image */}
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="font-orbitron text-white">{item.name}</h3>
                            <p className="text-sm text-primary">{item.category}</p>
                            <div className="font-jetbrains text-white mt-1">
                              {formatPrice(itemPrice)} F
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityUpdate(item.id, itemQuantity - 1)}
                                className="p-1 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={itemQuantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-jetbrains text-white w-6 text-center">
                                {itemQuantity}
                              </span>
                              <button
                                onClick={() => handleQuantityUpdate(item.id, itemQuantity + 1)}
                                className="p-1 hover:text-primary transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-primary transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {hasItems && (
                <div className="border-t border-borderBlack p-6 space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between text-white">
                    <span className="font-orbitron">Total</span>
                    <span className="font-jetbrains text-xl">
                      {formatPrice(totalPrice)} F
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full bg-accent-green hover:bg-accent-green/90 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!hasItems}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Commander via WhatsApp
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full bg-cardBlack hover:bg-borderBlack text-white font-bold py-3 px-4 rounded-lg transition-colors border border-borderBlack disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!hasItems}
                    >
                      Vider le panier
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppOrderForm 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
      />
    </>
  );
};

export default CartSidebar;