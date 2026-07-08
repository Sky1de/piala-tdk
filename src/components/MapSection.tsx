import { useState } from 'react';
import { MapPin, Compass, Navigation, Car, HelpCircle, Check, Info } from 'lucide-react';
import { LANDMARKS, TRANSLATIONS } from '../data';
import { Language, Landmark } from '../types';

interface MapSectionProps {
  currentLang: Language;
}

export default function MapSection({ currentLang }: MapSectionProps) {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(
    LANDMARKS.find((l) => l.id === 'lm_piala') || null
  );
  const [routeFrom, setRouteFrom] = useState<string>('lm_station');
  const [isRouteActive, setIsRouteActive] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang];

  // Turn-by-turn simulation based on start location
  const getDirections = (fromId: string) => {
    switch (fromId) {
      case 'lm_station':
        return currentLang === 'ru' 
          ? [
              '1. Выезжайте со станции Талдыкорган на восток по ул. Биржан Сал.',
              '2. Через 1 км на кольце поверните на 2-й съезд на ул. Тауелсыздык.',
              '3. Двигайтесь прямо мимо Центрального парка (около 800 метров).',
              '4. Ресторан PIALA (дом 142) будет находиться с правой стороны, напротив сквера.'
            ]
          : [
              '1. Талдықорған станциясынан Біржан Сал көшесімен шығысқа қарай жүріңіз.',
              '2. 1 км-ден кейін айналма жолдан Тәуелсіздік көшесіне қарай 2-ші шығысқа бұрылыңыз.',
              '3. Орталық саябақ тұсынан түзу өтіңіз (шамамен 800 метр).',
              '4. PIALA мейрамханасы (142-үй) оң жақта, скверге қарама-қарсы орналасады.'
            ];
      case 'lm_park':
        return currentLang === 'ru'
          ? [
              '1. Выйдите из ворот Центрального парка на ул. Тауелсыздык.',
              '2. Поверните направо и двигайтесь на восток пешком вдоль аллеи.',
              '3. Пройдите около 400 метров, пересекая ул. Гали Орманова.',
              '4. Ресторан PIALA встретит вас великолепным фасадом по правой стороне.'
            ]
          : [
              '1. Орталық саябақтың қақпасынан Тәуелсіздік көшесіне қарай шығыңыз.',
              '2. Оңға бұрылып, аллея бойымен шығысқа қарай жаяу жүріңиз.',
              '3. Ғали Орманов көшесін қиып өтіп, шамамен 400 метр жүріңіз.',
              '4. PIALA мейрамханасы оң жақта сізді керемет қасбетімен қарсы алады.'
            ];
      case 'lm_square':
        return currentLang === 'ru'
          ? [
              '1. От Площади Независимости двигайтесь на запад по ул. Тауелсыздык.',
              '2. Проезжайте мимо областного Акимата и городского Дворца Культуры.',
              '3. Через 600 метров ресторан PIALA будет находиться по левую сторону.',
              '4. Для заезда на парковку совершите безопасный разворот на следующем перекрестке.'
            ]
          : [
              '1. Тәуелсіздік алаңынан Тәуелсіздік көшесімен батысқа қарай бағытталыңыз.',
              '2. Облыстық Әкімдік пен қалалық Мәдениет сарайының тұсынан өтіңіз.',
              '3. 600 метрден кейін PIALA мейрамханасы сол жақта орналасады.',
              '4. Тұраққа кіру үшін келесі қиылыста қауіпсіз бұрылыс жасаңыз.'
            ];
      case 'lm_river':
        return currentLang === 'ru'
          ? [
              '1. Начните движение от набережной реки Каратал на север по ул. Кабанбай Батыра.',
              '2. На пересечении с ул. Тауелсыздык поверните налево (на запад).',
              '3. Проезжайте прямо мимо ТРЦ Каратал и сквера Жетысу.',
              '4. Ресторан PIALA будет находиться слева.'
            ]
          : [
              '1. Қаратал өзені жағалауынан Қабанбай Батыр көшесімен солтүстікке қарай бағытталыңыз.',
              '2. Тәуелсіздік көшесімен қиылыста солға (батысқа қарай) бұрылыңыз.',
              '3. Қаратал СОО мен Жетісу скверінен түзу өтіңіз.',
              '4. PIALA мейрамханасы сол жақта орналасады.'
            ];
      default:
        return [];
    }
  };

  const selectedRouteLandmark = LANDMARKS.find((l) => l.id === routeFrom);

  return (
    <section id="map" className="py-24 bg-emerald-950 text-white relative">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-zinc-50 to-transparent opacity-5" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase block mb-3 font-semibold">
            Taldykorgan Guide
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            {t.mapTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto mt-4 mb-3" />
          <p className="font-sans text-gold-100/70 italic">
            {t.mapSubtitle}
          </p>
        </div>

        {/* Map Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Interactive Vector Map SVG */}
          <div className="lg:col-span-7 bg-emerald-900/40 border border-gold-500/20 p-6 md:p-8 rounded-none flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                  {currentLang === 'ru' ? 'Карта Города (Интерактивная)' : 'Қала картасы (Интерактивті)'}
                </span>
                <span className="text-[10px] font-mono text-white/40">Scale: 1 : 15,000</span>
              </div>

              {/* SVG Vector Map Container */}
              <div className="relative aspect-[4/3] bg-emerald-950 rounded-none border border-gold-500/25 overflow-hidden shadow-inner p-1">
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  {/* Grid Lines for style */}
                  <g opacity="0.05" stroke="#ab8310" strokeWidth="0.1">
                    <line x1="10" y1="0" x2="10" y2="80" />
                    <line x1="20" y1="0" x2="20" y2="80" />
                    <line x1="30" y1="0" x2="30" y2="80" />
                    <line x1="40" y1="0" x2="40" y2="80" />
                    <line x1="50" y1="0" x2="50" y2="80" />
                    <line x1="60" y1="0" x2="60" y2="80" />
                    <line x1="70" y1="0" x2="70" y2="80" />
                    <line x1="80" y1="0" x2="80" y2="80" />
                    <line x1="90" y1="0" x2="90" y2="80" />
                    
                    <line x1="0" y1="10" x2="100" y2="10" />
                    <line x1="0" y1="20" x2="100" y2="20" />
                    <line x1="0" y1="30" x2="100" y2="30" />
                    <line x1="0" y1="40" x2="100" y2="40" />
                    <line x1="0" y1="50" x2="100" y2="50" />
                    <line x1="0" y1="60" x2="100" y2="60" />
                    <line x1="0" y1="70" x2="100" y2="70" />
                  </g>

                  {/* Karatal River representation */}
                  <path
                    d="M-5,78 Q25,82 45,72 T75,68 T105,72"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="4"
                    opacity="0.3"
                  />
                  <text x="75" y="74" fill="#0d9488" fontSize="2" fontFamily="serif" opacity="0.6" letterSpacing="0.1">Р. КАРАТАЛ / ҚАРАТАЛ ӨЗЕНІ</text>

                  {/* Major Roads representation (Tauelsizdik Ave, etc) */}
                  {/* Tauelsizdik Ave (West-East) */}
                  <line x1="-5" y1="40" x2="105" y2="40" stroke="#065f46" strokeWidth="2.5" opacity="0.6" />
                  <text x="8" y="38" fill="#cca515" fontSize="1.8" fontFamily="monospace" opacity="0.5">УЛ. ТАУЕЛСЫЗДЫК / ТӘУЕЛСІЗДІК КӨШЕСІ</text>

                  {/* Birzhan Sal St (North-South, connecting railway) */}
                  <line x1="20" y1="-5" x2="20" y2="85" stroke="#065f46" strokeWidth="1.5" opacity="0.5" />
                  <text x="22" y="15" fill="#cca515" fontSize="1.5" fontFamily="monospace" opacity="0.4" transform="rotate(90, 22, 15)">БИРЖАН САЛ</text>

                  {/* Kabanbay Batyr St */}
                  <line x1="75" y1="-5" x2="75" y2="85" stroke="#065f46" strokeWidth="1.5" opacity="0.5" />

                  {/* Render simulated route line when route is active */}
                  {isRouteActive && selectedRouteLandmark && (
                    <path
                      d={
                        routeFrom === 'lm_station'
                          ? 'M 20 55 L 20 40 L 52 48'
                          : routeFrom === 'lm_park'
                          ? 'M 40 30 L 40 40 L 52 48'
                          : routeFrom === 'lm_square'
                          ? 'M 65 35 L 65 40 L 52 48'
                          : 'M 50 80 L 75 80 L 75 40 L 52 48' // from river
                      }
                      fill="none"
                      stroke="#cca515"
                      strokeWidth="1.2"
                      strokeDasharray="2,2"
                      className="animate-[dash_10s_linear_infinite]"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="20;0"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                    </path>
                  )}

                  {/* Render Landmark Pins */}
                  {LANDMARKS.map((lm) => {
                    const isPiala = lm.id === 'lm_piala';
                    const isSelected = selectedLandmark?.id === lm.id;
                    const isRouteSource = isRouteActive && routeFrom === lm.id;

                    return (
                      <g
                        key={lm.id}
                        onClick={() => {
                          setSelectedLandmark(lm);
                          setIsRouteActive(false);
                        }}
                        className="cursor-pointer group"
                      >
                        {/* Interactive circle hot-zone */}
                        <circle cx={lm.x} cy={lm.y} r="6" fill="transparent" />

                        {/* Visual Ring Indicator */}
                        <circle
                          cx={lm.x}
                          cy={lm.y}
                          r={isSelected ? '4' : '2'}
                          fill="none"
                          stroke={isPiala ? '#cca515' : '#ffffff'}
                          strokeWidth="0.4"
                          opacity={isSelected ? '1' : '0.4'}
                          className="transition-all duration-300 group-hover:opacity-100"
                        />

                        {/* Pulsing visual for selected item */}
                        {isSelected && (
                          <circle
                            cx={lm.x}
                            cy={lm.y}
                            r="5.5"
                            fill="none"
                            stroke={isPiala ? '#cca515' : '#ffffff'}
                            strokeWidth="0.25"
                            className="animate-ping"
                            style={{ animationDuration: '2s' }}
                          />
                        )}

                        {/* Map Pin Mark */}
                        <g transform={`translate(${lm.x - 1.5}, ${lm.y - 3})`}>
                          <path
                            d="M1.5,0 C0.67,0 0,0.67 0,1.5 C0,2.62 1.5,4.5 1.5,4.5 C1.5,4.5 3,2.62 3,1.5 C3,0.67 2.33,0 1.5,0 Z"
                            fill={isPiala ? '#cca515' : isRouteSource ? '#cca515' : isSelected ? '#ffffff' : '#65a30d'}
                            stroke="#022c22"
                            strokeWidth="0.25"
                          />
                          <circle cx="1.5" cy="1.5" r="0.6" fill="#022c22" />
                        </g>

                        {/* Title text for landmark (only shown for important spots or on hover) */}
                        <text
                          x={lm.x}
                          y={lm.y - 4}
                          fill={isPiala ? '#fcf6cd' : '#ffffff'}
                          fontSize="2"
                          fontWeight={isSelected || isPiala ? 'bold' : 'normal'}
                          fontFamily="serif"
                          textAnchor="middle"
                          opacity={isSelected || isPiala ? '1' : '0.65'}
                          className="transition-opacity duration-300 group-hover:opacity-100"
                        >
                          {currentLang === 'ru' ? lm.name.split(' ')[0] : lm.nameKz.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4 bg-emerald-950/60 p-3.5 rounded-none border border-gold-500/20 text-xs text-gold-100/60 leading-relaxed">
              <Info className="w-5 h-5 text-gold-500 shrink-0" />
              <span>
                {currentLang === 'ru'
                  ? 'Карта стилизована под бренд-бук PIALA. Кликните на любую метку, чтобы прочитать описание достопримечательности и её удаленность.'
                  : 'Карта PIALA бренд-бугі стилінде жасалған. Кез келген белгіні басып, көрікті жерлер сипаттамасын және қашықтығын біліңіз.'}
              </span>
            </div>
          </div>

          {/* Column 2: Details & Turn by Turn Generator */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Selected Landmark Details Card */}
            <div className="bg-white text-emerald-950 p-6 md:p-8 rounded-none border border-gold-500/35 space-y-4 shadow-xl">
              <span className="text-[9px] font-mono tracking-widest text-gold-700 uppercase block font-semibold">
                {t.mapSpotTitle}
              </span>
              
              {selectedLandmark && (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-emerald-950">
                      {currentLang === 'ru' ? selectedLandmark.name : selectedLandmark.nameKz}
                    </h3>
                    <div className="p-2 bg-gold-50 border border-gold-500/20 text-gold-700 rounded-none">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-emerald-950/75 leading-relaxed">
                    {currentLang === 'ru' ? selectedLandmark.description : selectedLandmark.descriptionKz}
                  </p>
                  
                  {/* Distance simulation */}
                  {selectedLandmark.id !== 'lm_piala' && (
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gold-500/10">
                      <div className="flex items-center space-x-2 text-xs text-emerald-950/60">
                        <Car className="w-4 h-4 text-gold-600" />
                        <span>
                          {selectedLandmark.id === 'lm_station' ? '5 минут' : '2-3 минуты'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-emerald-950/60">
                        <Compass className="w-4 h-4 text-gold-600" />
                        <span>
                          {selectedLandmark.id === 'lm_station' ? '25 минут' : '5-10 минут'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Route Builder Widget */}
            <div className="bg-emerald-900/35 border border-gold-500/20 p-6 md:p-8 rounded-none shadow-xl flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block">
                  {currentLang === 'ru' ? 'Навигатор маршрутов' : 'Бағыт навигаторы'}
                </span>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-white/50 block">
                    {t.mapDirectionsFrom}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={routeFrom}
                      onChange={(e) => {
                        setRouteFrom(e.target.value);
                        setIsRouteActive(false);
                      }}
                      className="flex-1 px-3 py-2.5 rounded-none border border-gold-500/30 bg-emerald-950 text-gold-100 text-xs focus:border-gold-500 focus:outline-none transition-all"
                    >
                      {LANDMARKS.filter((l) => l.id !== 'lm_piala').map((lm) => (
                        <option key={lm.id} value={lm.id}>
                          {currentLang === 'ru' ? lm.name : lm.nameKz}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setIsRouteActive(true)}
                      className="px-4 py-2.5 bg-[#d4af37] hover:bg-gold-400 text-emerald-950 font-serif font-bold text-xs tracking-wider uppercase rounded-none border border-gold-500 transition-all cursor-pointer flex items-center space-x-1 shrink-0"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t.mapDirectionsBtn}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Turn-by-Turn results */}
              {isRouteActive && (
                <div className="bg-emerald-950/60 p-4 rounded-none border border-gold-500/15 space-y-3 flex-1 flex flex-col justify-start">
                  <div className="flex items-center space-x-2 text-xs font-mono text-gold-400 border-b border-gold-500/10 pb-2">
                    <Check className="w-4 h-4 text-gold-500" />
                    <span>{t.mapDirectionsResult}</span>
                  </div>
                  <ul className="space-y-2 text-[11px] font-sans text-white/80 leading-relaxed overflow-y-auto max-h-[140px] pr-1">
                    {getDirections(routeFrom).map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-gold-500 select-none shrink-0">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Real Google Maps Fallback / Embed */}
        <div className="mt-16 rounded-none overflow-hidden border border-gold-500/25 shadow-xl h-80 bg-emerald-900/10 relative">
          <iframe
            title="Google Map Taldykorgan PIALA"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.7561845195436!2d78.37340061244015!3d45.01168127094254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42fcfb8e0b6bbf23%3A0xe5f543e3f42ef2c2!2sTaldykorgan%2C%20Kazakhstan!5e0!3m2!1sen!2s!4v1720520000000!5m2!1sen!2s"
            className="w-full h-full border-0 grayscale filter contrast-[1.1] brightness-[0.8]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-emerald-950/90 backdrop-blur-sm border border-gold-500/40 px-4 py-2.5 rounded-none pointer-events-none">
            <span className="text-[10px] font-mono text-gold-400 block uppercase tracking-widest">Real Satellite GPS</span>
            <span className="text-xs text-white font-serif italic">ул. Тауелсыздык 142, Талдыкорган</span>
          </div>
        </div>

      </div>
    </section>
  );
}
