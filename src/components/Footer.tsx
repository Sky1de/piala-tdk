import { Instagram, Send, Phone, ArrowUp } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = TRANSLATIONS[currentLang];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-emerald-950 text-white border-t border-gold-600/10 relative overflow-hidden">
      {/* Decorative Traditional Patterns inside vector footer lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 border border-gold-500 rounded-none">
                <span className="font-serif text-xl font-bold text-gold-500">P</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold tracking-widest text-gold-500 block leading-none">
                  PIALA
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 block mt-1 uppercase">
                  Taldykorgan
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-gold-100/60 leading-relaxed max-w-sm">
              {currentLang === 'ru'
                ? 'Ресторан высокой казахской фьюжн-кухни. Объединяем традиции кочевников и душевное тепло великой степи с европейским сервисом.'
                : 'Жоғары қазақ фьюжн-асханасының мейрамханасы. Көшпенділер дәстүрі мен ұлы даланың жылулығын еуропалық қызмет көрсету деңгейімен үйлестіреміз.'}
            </p>

            {/* Socials Link Row */}
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-gold-500/25 bg-emerald-900/40 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500 hover:border-gold-500 hover:shadow-lg hover:shadow-gold-500/15 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-gold-500/25 bg-emerald-900/40 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500 hover:border-gold-500 hover:shadow-lg hover:shadow-gold-500/15 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/77015001122"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-gold-500/25 bg-emerald-900/40 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500 hover:border-gold-500 hover:shadow-lg hover:shadow-gold-500/15 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold-400">
              {t.contactHours}
            </h4>
            <div className="space-y-2 text-xs font-sans text-gold-100/70">
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span>{currentLang === 'ru' ? 'Понедельник - Пятница:' : 'Дүйсенбі - Жұма:'}</span>
                <span className="font-mono text-gold-400 font-semibold">12:00 - 02:00</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span>{currentLang === 'ru' ? 'Суббота - Воскресенье:' : 'Сенбі - Жексенбі:'}</span>
                <span className="font-mono text-gold-400 font-semibold">12:00 - 02:00</span>
              </p>
              <p className="text-[10px] italic text-white/45">
                {currentLang === 'ru' 
                  ? '* Кухня принимает заказы до 01:30' 
                  : '* Асхана тапсырыстарды 01:30-ға дейін қабылдайды'}
              </p>
            </div>
          </div>

          {/* Column 3: Scroll To Top Button & Accents */}
          <div className="md:col-span-3 flex flex-col justify-between items-end self-stretch">
            <button
              onClick={handleScrollToTop}
              className="px-4 py-3 bg-emerald-900/60 border border-gold-500/35 text-gold-400 hover:text-emerald-950 hover:bg-gold-500 hover:border-gold-500 rounded-none transition-all duration-300 cursor-pointer flex items-center space-x-2 text-xs font-mono tracking-wider uppercase"
            >
              <span>{currentLang === 'ru' ? 'Наверх' : 'Жоғары'}</span>
              <ArrowUp className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono tracking-widest text-white/35 mt-8 md:mt-0 text-right">
              Талдыкорган, ул. Тауелсыздык, 142
            </span>
          </div>

        </div>

        <div className="h-[1px] bg-white/10 my-12" />

        {/* Legal Disclaimer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40">
          <span>
            © 2026 PIALA Restaurant. All rights reserved.
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-none bg-gold-500" />
            <span>Premium Dining Space in Kazakhstan</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
