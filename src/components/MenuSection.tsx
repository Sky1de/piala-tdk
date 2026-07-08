import { useState, useMemo } from 'react';
import { Search, Sparkles, X, Heart, Clock, Utensils } from 'lucide-react';
import { MENU_ITEMS, TRANSLATIONS } from '../data';
import { Language, MenuItem } from '../types';

interface MenuSectionProps {
  currentLang: Language;
  onOrderDish: (dish: MenuItem) => void;
}

export default function MenuSection({ currentLang, onOrderDish }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const t = TRANSLATIONS[currentLang];

  const categories = [
    { key: 'all', label: t.menuAll },
    { key: 'appetizers', label: t.menuAppetizers },
    { key: 'mains', label: t.menuMains },
    { key: 'tea', label: t.menuTea },
    { key: 'desserts', label: t.menuDesserts },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const nameText = currentLang === 'ru' ? item.name : item.nameKz;
      const descText = currentLang === 'ru' ? item.description : item.descriptionKz;
      const matchesSearch =
        nameText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        descText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, currentLang]);

  return (
    <section id="menu" className="py-24 bg-zinc-50 relative">
      {/* Background Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-emerald-950 to-transparent opacity-10" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-emerald-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-700 uppercase block mb-3 font-semibold">
            Fine Dining Menu
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-emerald-950">
            {t.menuTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-600 mx-auto mt-4 mb-3" />
          <p className="font-sans text-emerald-950/75 italic">
            {t.menuSubtitle}
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-none border border-gold-500/20">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-none text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer border ${
                  activeCategory === cat.key
                    ? 'bg-emerald-950 text-gold-400 border-gold-500'
                    : 'text-emerald-950/70 border-transparent hover:bg-emerald-950/5 hover:text-emerald-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Live Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-950/45" />
            <input
              type="text"
              placeholder={t.menuSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-none border border-gold-500/30 focus:border-gold-500 focus:ring-0 focus:outline-none bg-zinc-50 text-emerald-950 text-sm transition-all placeholder:text-emerald-950/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-950/45 hover:text-emerald-950 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const name = currentLang === 'ru' ? item.name : item.nameKz;
            const desc = currentLang === 'ru' ? item.description : item.descriptionKz;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group flex flex-col justify-between bg-white rounded-none overflow-hidden border border-gold-500/15 hover:border-gold-500/50 transition-all duration-300 cursor-pointer"
              >
                {/* Visual Area */}
                <div className="relative aspect-video md:aspect-square overflow-hidden bg-emerald-900/10 max-h-56">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    // Elegant vector food placeholder if no specific image
                    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950 text-gold-500 p-8 text-center">
                      <Utensils className="w-10 h-10 mb-2 opacity-60 animate-pulse" />
                      <span className="font-serif text-sm tracking-wider uppercase opacity-40">PIALA Culinary Art</span>
                    </div>
                  )}

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    {item.isSignature && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gold-500 text-emerald-950 text-[10px] font-bold tracking-wider uppercase rounded-none border border-gold-400">
                        <Sparkles className="w-3 h-3" />
                        <span>{t.signatureBadge}</span>
                      </span>
                    )}
                    {item.isTraditional && (
                      <span className="inline-flex items-center px-3 py-1 bg-emerald-900 border border-gold-500/40 text-gold-400 text-[10px] font-bold tracking-wider uppercase rounded-none">
                        <span>{t.traditionalBadge}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 flex-1 flex flex-col justify-between border-t border-gold-500/10">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-lg md:text-xl font-bold text-emerald-950 group-hover:text-gold-600 transition-colors duration-300 leading-snug">
                        {name}
                      </h3>
                      <span className="font-mono text-xs font-semibold text-gold-700 bg-gold-50 border border-gold-500/20 px-2.5 py-1 rounded-none shrink-0">
                        {item.price.toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                    <p className="font-sans text-xs text-emerald-950/60 leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gold-500/10 flex items-center justify-between text-xs font-mono text-emerald-950/40">
                    <span className="group-hover:text-gold-700 transition-colors font-semibold uppercase tracking-wider text-[10px]">
                      {currentLang === 'ru' ? 'Подробнее' : 'Толығырақ'} →
                    </span>
                    <span className="flex items-center space-x-1 bg-zinc-100 px-2 py-1 rounded-none">
                      <Clock className="w-3.5 h-3.5 text-emerald-900/60" />
                      <span>{item.category === 'mains' ? '25-30 мин' : '10-15 мин'}</span>
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-emerald-950/5 max-w-md mx-auto">
            <Search className="w-10 h-10 text-emerald-950/20 mx-auto mb-3" />
            <p className="font-sans text-emerald-950/60">
              {currentLang === 'ru' ? 'Блюда не найдены' : 'Тағамдар табылмады'}
            </p>
          </div>
        )}

      </div>

      {/* Gourmet Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-none overflow-hidden shadow-2xl max-w-2xl w-full border-4 border-gold-500 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Cover Image */}
            <div className="relative aspect-video bg-emerald-950">
              {selectedItem.image ? (
                <img
                  src={selectedItem.image}
                  alt={currentLang === 'ru' ? selectedItem.name : selectedItem.nameKz}
                  className="w-full h-full object-cover filter contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gold-500">
                  <Utensils className="w-12 h-12 mb-2" />
                  <span className="font-serif tracking-widest uppercase">PIALA CULINARY ART</span>
                </div>
              )}
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-[#d4af37] text-emerald-950 p-2 rounded-none hover:bg-gold-400 cursor-pointer transition-colors duration-200 border border-gold-600"
              >
                <X className="w-5 h-5 font-bold" />
              </button>

              {/* Badges inside cover */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {selectedItem.isSignature && (
                  <span className="px-3 py-1 bg-gold-500 text-emerald-950 text-xs font-bold uppercase rounded-none border border-gold-400">
                    {t.signatureBadge}
                  </span>
                )}
                {selectedItem.isTraditional && (
                  <span className="px-3 py-1 bg-emerald-950 border border-gold-500/40 text-gold-400 text-xs font-bold uppercase rounded-none">
                    {t.traditionalBadge}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-700 uppercase block mb-1">
                    {selectedItem.category === 'mains' ? t.menuMains : selectedItem.category === 'appetizers' ? t.menuAppetizers : selectedItem.category === 'tea' ? t.menuTea : t.menuDesserts}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-emerald-950">
                    {currentLang === 'ru' ? selectedItem.name : selectedItem.nameKz}
                  </h3>
                </div>
                <div className="font-mono text-lg font-bold text-gold-700 bg-gold-50 border border-gold-500/20 px-4 py-2 rounded-none text-center self-start sm:self-auto shrink-0">
                  {selectedItem.price.toLocaleString('ru-RU')} ₸
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono tracking-wider uppercase text-emerald-950/40">
                  {currentLang === 'ru' ? 'Описание шедевра' : 'Тағам сипаттамасы'}
                </h4>
                <p className="font-sans text-emerald-950/80 leading-relaxed text-sm md:text-base italic border-l-2 border-gold-500 pl-4 py-1">
                  {currentLang === 'ru' ? selectedItem.description : selectedItem.descriptionKz}
                </p>
              </div>

              {/* Preparation & Ingredients metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold-500/10">
                <div className="flex items-center space-x-3 bg-zinc-50 p-4 rounded-none border border-gold-500/20">
                  <Clock className="w-5 h-5 text-gold-600" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-950/40 block">
                      {currentLang === 'ru' ? 'Время ожидания' : 'Дайын уақыты'}
                    </span>
                    <span className="text-xs font-sans font-medium text-emerald-950">
                      {selectedItem.category === 'mains' ? '25-30 минут' : '10-15 минут'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-zinc-50 p-4 rounded-none border border-gold-500/20">
                  <Heart className="w-5 h-5 text-gold-600" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-950/40 block">
                      {currentLang === 'ru' ? 'Особенности' : 'Ерекшелігі'}
                    </span>
                    <span className="text-xs font-sans font-medium text-emerald-950">
                      {selectedItem.isTraditional 
                        ? (currentLang === 'ru' ? '100% Халяль, рецепт предков' : '100% Халал, ата-баба рецепті')
                        : (currentLang === 'ru' ? 'Свежие фермерские продукты Жетысу' : 'Жетісудың жаңа піскен фермер өнімдері')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Order to Table */}
              <div className="pt-6 flex gap-4">
                <button
                  onClick={() => {
                    onOrderDish(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full bg-emerald-950 hover:bg-emerald-900 text-gold-400 hover:text-gold-300 font-sans text-xs font-bold tracking-widest uppercase py-4 rounded-none border border-gold-500 cursor-pointer"
                >
                  {currentLang === 'ru' ? 'Заказать к столику при бронировании' : 'Брондау кезінде үстелге тапсырыс беру'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
