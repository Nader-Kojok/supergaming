"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';

const contactInfo = {
  address: "6 Rue FN 48, Dakar, Sénégal",
  phone: "+221 78 346 46 46",
  email: "contact@supergaming.sn",
  hours: [
    "Lundi - Samedi: 10:00 - 19:00",
    "Dimanche: Fermé"
  ],
  social: {
    instagram: "https://www.instagram.com/supergaming_sn",
    whatsapp: "https://wa.me/221783464646"
  },
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.0517242430385!2d-17.4666667!3d14.7166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173c0d0146a45%3A0x7c3e5d543a6d44cd!2s6%20Rue%20FN%2048%2C%20Dakar%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2sfr!4v1709913359411!5m2!1sfr!2sfr"
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-deepBlack pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-48 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
              Nous <span className="text-primary">Contacter</span>
            </h1>
            <p className="text-gray-300 max-w-xl">
              Une question ? N&apos;hésitez pas à nous contacter !
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Info Cards */}
            <motion.div variants={fadeInUp} className="bg-cardBlack rounded-lg p-6 border border-borderBlack">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Adresse</h3>
                  <p className="text-gray-400">{contactInfo.address}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-cardBlack rounded-lg p-6 border border-borderBlack">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Téléphone</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-cardBlack rounded-lg p-6 border border-borderBlack">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Horaires d&apos;ouverture</h3>
                  <ul className="text-gray-400 space-y-1">
                    {contactInfo.hours.map((hour, index) => (
                      <li key={index}>{hour}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={fadeInUp} className="bg-cardBlack rounded-lg p-6 border border-borderBlack">
              <h3 className="text-white font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                </a>
                <a
                  href={contactInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-primary" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Map Card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-cardBlack rounded-lg overflow-hidden border border-borderBlack h-[600px] relative"
          >
            <div className="absolute inset-0">
              <iframe
                src={contactInfo.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale contrast-125 rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 