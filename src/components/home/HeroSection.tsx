"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Particle animation effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
    let animationFrameId: number;

    const init = () => {
      canvas.className = 'absolute inset-0 w-full h-full opacity-30 pointer-events-none';
      sectionRef.current?.appendChild(canvas);
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255, 0, 51, 0.1)';
        ctx.lineWidth = 1;
        const gridSize = 50;
        
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Update and draw particles
        ctx.fillStyle = 'rgba(255, 0, 51, 0.5)';
        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Wrap around screen
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
        canvas.remove();
      };
    };

    const cleanup = init();
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070"
          alt="Setup Gaming Professionnel"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-deepBlack/80 via-deepBlack/50 to-deepBlack" />
      </motion.div>

      {/* Cyberpunk Lines Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 z-20">
        <div className="h-full flex flex-col justify-center max-w-2xl relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-black text-white mb-6"
          >
            L&apos;avenir du gaming,{' '}
            <span className="text-primary">aujourd&apos;hui</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Découvrez notre sélection de jeux, consoles et accessoires gaming de dernière génération. 
            Vivez une expérience de jeu unique avec les meilleurs équipements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/categories"
              className="inline-flex justify-center items-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors duration-300 hover:scale-105 transform"
              tabIndex={0}
              role="button"
              aria-label="Découvrir nos catégories"
            >
              Découvrir
            </Link>
            <Link
              href="/nouveautes"
              className="inline-flex justify-center items-center px-8 py-4 bg-cardBlack hover:bg-borderBlack text-white font-bold rounded-lg transition-colors duration-300 hover:scale-105 transform border border-borderBlack"
              tabIndex={0}
              role="button"
              aria-label="Voir les nouveautés"
            >
              Nouveautés
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/30 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 