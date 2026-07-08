import { motion } from 'motion/react';
import { ChevronDown, Calendar, Menu as MenuIcon } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface HeroProps {
  currentLang: Language;
}

export default function Hero({ currentLang }: HeroProps) {
  const t = TRANSLATIONS[currentLang];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-emerald-950 overflow-hidden"
    >
      {/* Background Image with elegant vignette and dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/piala_interior_1783533662041.jpg"
          alt="PIALA Restaurant Interior"
          className="w-full h-full object-cover scale-105 filter brightness-[0.35] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/45 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-emerald-950/80" />
      </div>

      {/* Decorative Golden Elements */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-gold-500 to-transparent opacity-40 hidden md:block" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-12">
        {/* Floating Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-5 py-2 rounded-none border border-gold-500/40 bg-emerald-950/80 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-none bg-gold-400 animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-gold-400">
            Талдыкорган • Premier Dining
          </span>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.1em] text-white select-none leading-none mb-4"
        >
          PIALA
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-[1px] bg-gold-500 mx-auto mb-8"
        />

        {/* Localized Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-serif text-lg md:text-2xl text-gold-100/90 font-light italic tracking-wider max-w-2xl mx-auto mb-12"
        >
          {t.subtitle}
        </motion.p>

        {/* Actions Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => handleScrollTo('booking')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#d4af37] text-[#0b2118] font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-none hover:bg-gold-400 active:scale-98 transition-all duration-300 border border-gold-500 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.heroButtonBook}</span>
          </button>

          <button
            onClick={() => handleScrollTo('menu')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent text-gold-400 border border-gold-500/60 hover:border-gold-500 hover:bg-gold-500/10 font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-none active:scale-98 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <MenuIcon className="w-4 h-4 text-gold-400" />
            <span>{t.heroButtonMenu}</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Sidings */}
      <div className="absolute left-6 bottom-12 hidden md:flex flex-col items-center space-y-4 text-white/40">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase rotate-95 origin-left">
          EST. 2026
        </span>
        <div className="w-[1px] h-12 bg-white/20" />
      </div>

      <div className="absolute right-6 bottom-12 hidden md:flex flex-col items-center space-y-4 text-white/40">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase rotate-95 origin-left">
          KAZAKHSTAN
        </span>
        <div className="w-[1px] h-12 bg-white/20" />
      </div>

      {/* Chevron down indicator */}
      <div
        onClick={() => handleScrollTo('philosophy')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400 cursor-pointer hover:text-white transition-colors animate-bounce duration-1000 z-10"
      >
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
