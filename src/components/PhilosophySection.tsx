import { motion } from 'motion/react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Award, Compass, Heart } from 'lucide-react';

interface PhilosophySectionProps {
  currentLang: Language;
}

export default function PhilosophySection({ currentLang }: PhilosophySectionProps) {
  const t = TRANSLATIONS[currentLang];

  const features = [
    {
      icon: <Award className="w-6 h-6 text-gold-500" />,
      title: currentLang === 'ru' ? 'Высокая Кухня' : 'Жоғары Асхана',
      desc: currentLang === 'ru' ? 'Локальные продукты степи в авторском переосмыслении бренд-шефа.' : 'Бренд-шефтің авторлық пайымындағы даланың жергілікті өнімдері.',
    },
    {
      icon: <Compass className="w-6 h-6 text-gold-500" />,
      title: currentLang === 'ru' ? 'Традиции Шай' : 'Шай Дәстүрі',
      desc: currentLang === 'ru' ? 'Подача чая в золотых пиалах как дань уважения великому степному гостеприимству.' : 'Алтын пиалаларда шай ұсыну - ұлы дала қонақжайлылығына тағзым.',
    },
    {
      icon: <Heart className="w-6 h-6 text-gold-500" />,
      title: currentLang === 'ru' ? 'Уют и Атмосфера' : 'Жайлылық пен Атмосфера',
      desc: currentLang === 'ru' ? 'Интерьеры изумрудного цвета с живым камином и видом на Джунгарский Алатау.' : 'Жанды камині бар және Жетісу Алатауына қарайтын зүбәржат түсті интерьер.',
    },
  ];

  return (
    <section id="philosophy" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative ambient background lights */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Story Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase block">
                {t.conceptTitle}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {t.conceptSubtitle}
              </h2>
              <div className="w-20 h-[1px] bg-gold-500 mt-2" />
            </div>

            <p className="font-sans text-white/80 leading-relaxed text-base md:text-lg max-w-2xl">
              {t.conceptText}
            </p>

            <p className="font-sans text-gold-100/70 italic text-sm md:text-base border-l-2 border-gold-500 pl-4 py-1 max-w-xl">
              {currentLang === 'ru' 
                ? '«Пиала — это не просто чаша. Это символ круга жизни, бесконечного гостеприимства и тепла, которым мы делимся с каждым гостем города Талдыкорган.»'
                : '«Пиала — бұл жай ғана кесе емес. Бұл өмір шеңберінің, шексіз қонақжайлылық пен Талдықорған қаласының әрбір қонағымен бөлісетін жылулықтың символы.»'}
            </p>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-emerald-900/40 border border-gold-500/20 p-5 rounded-none hover:border-gold-500/50 transition-colors duration-300">
                  <div className="mb-4 bg-emerald-950/60 w-12 h-12 rounded-none flex items-center justify-center border border-gold-600/30">
                    {feat.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gold-400 mb-2">{feat.title}</h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back Gold Accent Frame */}
              <div className="absolute -inset-4 border border-gold-500/35 rounded-none pointer-events-none transform translate-x-3 translate-y-3 z-0" />
              
              {/* Main Image */}
              <div className="relative z-10 rounded-none overflow-hidden shadow-2xl border border-gold-500/25 bg-emerald-900 aspect-square">
                <img
                  src="/images/piala_tea_service_1783533700668.jpg"
                  alt="Traditional Tea Service in Gold Piala"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                
                {/* Embedded floating tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-emerald-950/90 backdrop-blur-md border border-gold-500/40 p-4 rounded-none">
                  <p className="font-serif text-sm italic text-gold-200">
                    {currentLang === 'ru' ? 'Наш фирменный чай "Алтын Пиала"' : 'Біздің фирмалық "Алтын Пиала" шайымыз'}
                  </p>
                  <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase mt-1">
                    Signature Tea Service
                  </p>
                </div>
              </div>

              {/* Decorative Traditional Ornament Accent */}
              <div className="absolute -top-6 -right-6 w-16 h-16 border-t-2 border-r-2 border-gold-500 pointer-events-none opacity-40 rounded-none" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 border-b-2 border-l-2 border-gold-500 pointer-events-none opacity-40 rounded-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
