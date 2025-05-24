"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

// Form validation schema
const orderFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().regex(/^(70|75|76|77|78)\d{7}$/, "Numéro de téléphone invalide (format: 7X XXX XX XX)"),
  address: z.string().min(10, "L'adresse doit contenir au moins 10 caractères"),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

interface WhatsAppOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppOrderForm = ({ isOpen, onClose }: WhatsAppOrderFormProps) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.getTotalPrice());

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    mode: "onChange"
  });

  const formData = watch();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(price);
  };

  const formatOrderMessage = (data: OrderFormData) => {
    const itemsList = items
      .map((item) => `- ${item.quantity}x ${item.name} (${formatPrice(item.price)} F)`)
      .join('\n');

    return `🎮 *Nouvelle Commande - SUPERGAMING* 🎮\n\n` +
           `*Client*\n` +
           `Nom: ${data.name}\n` +
           `Téléphone: ${data.phone}\n` +
           `Adresse: ${data.address}\n\n` +
           `*Commande*\n${itemsList}\n\n` +
           `*Total: ${formatPrice(totalPrice)} F*`;
  };

  const handleOrder = (data: OrderFormData) => {
    const message = encodeURIComponent(formatOrderMessage(data));
    window.open(`https://wa.me/+221785806410?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[60]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-lg mx-4 bg-deepBlack border border-borderBlack rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-borderBlack">
              <h2 className="font-orbitron text-xl font-bold text-white">
                {isPreviewMode ? 'Aperçu de la commande' : 'Finaliser la commande'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isPreviewMode ? (
                // Preview Mode
                <div className="font-jetbrains text-sm text-gray-300 whitespace-pre-wrap bg-cardBlack rounded-lg p-4 border border-borderBlack">
                  {formatOrderMessage(formData)}
                </div>
              ) : (
                // Form Mode
                <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Nom complet
                    </label>
                    <input
                      {...register('name')}
                      className="w-full bg-cardBlack border-2 border-borderBlack focus:border-primary rounded-lg px-4 py-2 text-white"
                      placeholder="Votre nom"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      {...register('phone')}
                      className="w-full bg-cardBlack border-2 border-borderBlack focus:border-primary rounded-lg px-4 py-2 text-white"
                      placeholder="7X XXX XX XX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Adresse de livraison
                    </label>
                    <textarea
                      {...register('address')}
                      className="w-full bg-cardBlack border-2 border-borderBlack focus:border-primary rounded-lg px-4 py-2 text-white"
                      rows={3}
                      placeholder="Votre adresse complète"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-borderBlack bg-cardBlack">
              {isPreviewMode ? (
                <>
                  <button
                    onClick={() => setIsPreviewMode(false)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={handleSubmit(handleOrder)}
                    className="bg-accent-green hover:bg-accent-green/90 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Commander via WhatsApp</span>
                  </button>
                </>
              ) : (
                <div className="w-full flex justify-end">
                  <button
                    onClick={handleSubmit(() => setIsPreviewMode(true))}
                    disabled={!isValid}
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir le récapitulatif</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppOrderForm; 