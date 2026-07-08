import { useState, useEffect } from 'react';
import { Menu, X, Globe, PhoneCall } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ currentLang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      setIsScrolled(window.scrollY > 20);

      // Scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: t.menuTitle, id: 'menu' },
    { name: t.bookingTitle, id: 'booking' },
    { name: t.galleryTitle, id: 'gallery' },
    { name: t.mapTitle, id: 'map' },
    { name: t.reviewsTitle, id: 'reviews' },
    { name: t.contactTitle.split('&')[0], id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
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
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-emerald-950/95 backdrop-blur-md shadow-lg border-b border-gold-600/20 py-3'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Name / Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 border border-gold-500 rounded-none group-hover:bg-gold-500/10 transition-colors duration-300">
            <span className="font-serif text-lg font-bold text-gold-500">P</span>
            <div className="absolute inset-0 border border-gold-400/20 scale-110 group-hover:scale-120 transition-transform duration-300" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-widest text-gold-500 gold-glow block leading-none">
              PIALA
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/60 block mt-0.5">
              TALDYKORGAN
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className="font-sans text-sm font-medium text-white/80 hover:text-gold-400 transition-colors duration-300 tracking-wider uppercase cursor-pointer"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-white/20" />

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gold-500" />
            <button
              onClick={() => setLang('ru')}
              className={`text-xs font-mono px-2 py-0.5 rounded-none cursor-pointer border ${
                currentLang === 'ru'
                  ? 'bg-gold-500 text-emerald-950 border-gold-500 font-bold'
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang('kz')}
              className={`text-xs font-mono px-2 py-0.5 rounded-none cursor-pointer border ${
                currentLang === 'kz'
                  ? 'bg-gold-500 text-emerald-950 border-gold-500 font-bold'
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              KZ
            </button>
          </div>

          {/* Call Widget button */}
          <a
            href="tel:+77282405060"
            className="flex items-center space-x-2 bg-[#d4af37] text-emerald-950 text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-none hover:bg-gold-400 transition-all duration-300 border border-gold-500"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>+7 (7282) 40-50-60</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Mobile Language Selector */}
          <div className="flex items-center space-x-1.5 border border-white/10 rounded-none p-1 bg-white/5">
            <button
              onClick={() => setLang('ru')}
              className={`text-xs font-mono px-2 py-0.5 rounded-none ${
                currentLang === 'ru' ? 'bg-gold-500 text-emerald-950 font-semibold' : 'text-white/60'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang('kz')}
              className={`text-xs font-mono px-2 py-0.5 rounded-none ${
                currentLang === 'kz' ? 'bg-gold-500 text-emerald-950 font-semibold' : 'text-white/60'
              }`}
            >
              KZ
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gold-400 transition-colors p-2 rounded-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-emerald-950 border-b border-gold-500/20 shadow-xl transition-all duration-300 py-6 px-6">
          <ul className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className="w-full text-left font-serif text-lg text-white/90 hover:text-gold-400 py-1 transition-colors block tracking-wide"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="my-5 border-t border-white/10" />
          <a
            href="tel:+77282405060"
            className="flex items-center justify-center space-x-2 w-full bg-gold-500 text-emerald-950 font-bold tracking-wider uppercase py-3 rounded-none hover:bg-gold-400 transition-all duration-300"
          >
            <PhoneCall className="w-4 h-4" />
            <span>+7 (7282) 40-50-60</span>
          </a>
        </div>
      )}
    </nav>
  );
}
