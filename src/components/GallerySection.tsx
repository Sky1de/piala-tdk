import { useState } from 'react';
import { Eye, Image as ImageIcon, Layers, Leaf } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface GallerySectionProps {
  currentLang: Language;
}

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  altKz: string;
  category: 'dishes' | 'interior';
  tag: string;
  tagKz: string;
  desc: string;
  descKz: string;
}

export default function GallerySection({ currentLang }: GallerySectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'dishes' | 'interior'>('all');
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);

  const t = TRANSLATIONS[currentLang];

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      src: '/src/assets/images/piala_interior_1783533662041.jpg',
      alt: 'Интерьер ресторана PIALA',
      altKz: 'PIALA мейрамханасының интерьері',
      category: 'interior',
      tag: 'Интерьер',
      tagKz: 'Интерьер',
      desc: 'Премиальный VIP-зал с велюровой мебелью изумрудных оттенков и золотыми светильниками.',
      descKz: 'Зүбәржат реңкті велюр жиһаздары мен алтын шырақтары бар премиум VIP-зал.'
    },
    {
      id: 'g2',
      src: '/src/assets/images/piala_dish_fusion_1783533682456.jpg',
      alt: 'Казахский Фьюжн Бешбармак',
      altKz: 'Қазақ Фьюжн Бесбармағы',
      category: 'dishes',
      tag: 'Авторские Блюда',
      tagKz: 'Авторлық тағамдар',
      desc: 'Нежнейший стейк из конины с домашним соусом на диких степных травах.',
      descKz: 'Жабайы дала шөптерінен жасалған үй соусы қосылған ең нәзік жылқы стейкі.'
    },
    {
      id: 'g3',
      src: '/src/assets/images/piala_tea_service_1783533700668.jpg',
      alt: 'Фирменная подача чая "Алтын Пиала"',
      altKz: '"Алтын Пиала" фирмалық шай ұсынысы',
      category: 'dishes',
      tag: 'Чайная Карта',
      tagKz: 'Шай Картасы',
      desc: 'Джунгарские горные травы, черный чай высшего качества и традиционные орнаменты.',
      descKz: 'Жетісу Алатауының тау шөптері, ең жоғары сапалы қара шай және дәстүрлі ою-өрнектер.'
    },
    {
      id: 'g4',
      src: '/src/assets/images/piala_dessert_1783533719035.jpg',
      alt: 'Шоколадная пиала с жидкой облепихой',
      altKz: 'Сұйық шырғанақпен шоколадты пиала',
      category: 'dishes',
      tag: 'Десерты',
      tagKz: 'Десерттер',
      desc: 'Шоколадная сфера ручной работы с муссом из курта и начинкой из спелой облепихи Коксу.',
      descKz: 'Қолдан жасалған шоколад сферасы, құрт муссы және Көксудың піскен шырғанағынан жасалған салма.'
    }
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-emerald-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-700 uppercase block mb-3 font-semibold">
            Visual Ambiance
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-emerald-950">
            {t.galleryTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-600 mx-auto mt-4 mb-3" />
          <p className="font-sans text-emerald-950/75 italic">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center items-center space-x-3 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-none text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center space-x-1.5 border ${
              activeTab === 'all'
                ? 'bg-emerald-950 text-gold-400 border-gold-500 font-bold'
                : 'bg-zinc-50 hover:bg-zinc-100 text-emerald-950/70 border-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{currentLang === 'ru' ? 'Все фотографии' : 'Барлық фотолар'}</span>
          </button>
          <button
            onClick={() => setActiveTab('dishes')}
            className={`px-4 py-2.5 rounded-none text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center space-x-1.5 border ${
              activeTab === 'dishes'
                ? 'bg-emerald-950 text-gold-400 border-gold-500 font-bold'
                : 'bg-zinc-50 hover:bg-zinc-100 text-emerald-950/70 border-zinc-200'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>{currentLang === 'ru' ? 'Шедевры Кухни' : 'Асхана туындылары'}</span>
          </button>
          <button
            onClick={() => setActiveTab('interior')}
            className={`px-4 py-2.5 rounded-none text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center space-x-1.5 border ${
              activeTab === 'interior'
                ? 'bg-emerald-950 text-gold-400 border-gold-500 font-bold'
                : 'bg-zinc-50 hover:bg-zinc-100 text-emerald-950/70 border-zinc-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{currentLang === 'ru' ? 'Зал & Декор' : 'Зал және декор'}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const tag = currentLang === 'ru' ? item.tag : item.tagKz;
            const alt = currentLang === 'ru' ? item.alt : item.altKz;

            return (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="group relative aspect-square rounded-none overflow-hidden border border-gold-500/15 shadow-md bg-emerald-950 cursor-pointer"
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter group-hover:brightness-[0.4]"
                  referrerPolicy="no-referrer"
                />

                {/* Cover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/30 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Decorative border frame on hover */}
                <div className="absolute inset-4 border border-gold-500/0 group-hover:border-gold-500/35 rounded-none transition-all duration-500 pointer-events-none" />

                {/* Info Text Overlay (Centered in hover, or at bottom initially) */}
                <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-white">
                  <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase font-semibold block mb-1">
                    {tag}
                  </span>
                  <h4 className="font-serif text-lg font-bold leading-tight line-clamp-1 mb-1 group-hover:text-gold-300">
                    {alt}
                  </h4>
                  <p className="font-sans text-[11px] text-white/75 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {currentLang === 'ru' ? item.desc : item.descKz}
                  </p>
                </div>

                {/* Floating zoom indicator icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-none">
                  <Eye className="w-4 h-4 text-gold-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/95 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-emerald-950 rounded-none overflow-hidden border-4 border-gold-500"
          >
            {/* Aspect container for wide view */}
            <div className="aspect-video w-full">
              <img
                src={lightboxImg.src}
                alt={currentLang === 'ru' ? lightboxImg.alt : lightboxImg.altKz}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Close Button on top right */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 bg-[#d4af37] border border-gold-600 text-emerald-950 hover:bg-gold-400 p-2.5 rounded-none cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Bottom info strip */}
            <div className="p-6 md:p-8 bg-emerald-950 text-white space-y-2 border-t border-gold-500/20">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase block font-semibold">
                {currentLang === 'ru' ? lightboxImg.tag : lightboxImg.tagKz}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-200">
                {currentLang === 'ru' ? lightboxImg.alt : lightboxImg.altKz}
              </h3>
              <p className="font-sans text-xs md:text-sm text-gold-100/70 max-w-2xl leading-relaxed">
                {currentLang === 'ru' ? lightboxImg.desc : lightboxImg.descKz}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
