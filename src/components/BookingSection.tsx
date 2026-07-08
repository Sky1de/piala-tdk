import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Users, Clock, Flame, ShieldAlert, Sparkles, CheckCircle2, Trash2 } from 'lucide-react';
import { TABLES, TRANSLATIONS } from '../data';
import { Language, Table, Booking, MenuItem } from '../types';

interface BookingSectionProps {
  currentLang: Language;
  preOrderedDish: MenuItem | null;
  onClearPreOrder: () => void;
}

export default function BookingSection({ currentLang, preOrderedDish, onClearPreOrder }: BookingSectionProps) {
  const [selectedZone, setSelectedZone] = useState<'main' | 'vip' | 'terrace'>('main');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latestBookingCode, setLatestBookingCode] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState(2);

  const t = TRANSLATIONS[currentLang];
  const formRef = useRef<HTMLDivElement>(null);

  // Load bookings on mount
  useEffect(() => {
    const saved = localStorage.getItem('piala_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing bookings', e);
      }
    }
  }, []);

  // Filter tables by zone
  const zoneTables = TABLES.filter((tab) => tab.zone === selectedZone);

  // Handle auto-updating phone mask
  const handlePhoneChange = (val: string) => {
    if (!val.startsWith('+7 ')) {
      setPhone('+7 ');
    } else {
      setPhone(val);
    }
  };

  // Set guests max based on table
  useEffect(() => {
    if (selectedTable) {
      if (guests > selectedTable.seats) {
        setGuests(selectedTable.seats);
      }
    }
  }, [selectedTable]);

  // Handle table click
  const handleTableClick = (table: Table) => {
    // Check if table is booked in local state (simulating occupied tables)
    // For realism, let's say table t-m3 and t-v1 are pre-booked during dinner hours
    if (table.id === 't-m3' || table.id === 't-v1') {
      alert(currentLang === 'ru' ? 'Этот столик уже забронирован на сегодня.' : 'Бұл үстел бүгінге брондалып қойған.');
      return;
    }
    setSelectedTable(table);
    // Scroll form into view if on mobile
    if (window.innerWidth < 768) {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Submit Booking
  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      alert(currentLang === 'ru' ? 'Пожалуйста, выберите столик на схеме зала' : 'Тізімнен үстелді таңдаңыз');
      return;
    }
    if (!name.trim() || phone.trim().length < 10) {
      alert(currentLang === 'ru' ? 'Пожалуйста, укажите имя и контактный телефон' : 'Есіміңізді және телефон нөміріңізді енгізіңіз');
      return;
    }

    const code = 'PIALA-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      email,
      date: date || new Date().toISOString().split('T')[0],
      time,
      guests,
      tableId: selectedTable.id,
      tableNumber: selectedTable.number,
      zone: selectedZone,
      code,
      createdAt: new Date().toLocaleDateString('ru-RU'),
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('piala_bookings', JSON.stringify(updated));

    setLatestBookingCode(code);
    setShowSuccessModal(true);

    // Reset Form
    setName('');
    setPhone('+7 ');
    setEmail('');
    setSelectedTable(null);
  };

  // Handle Cancel Booking
  const handleCancelBooking = (id: string) => {
    if (confirm(currentLang === 'ru' ? 'Вы действительно хотите отменить бронирование?' : 'Брондаудан бас тартқыңыз келеді ме?')) {
      const updated = myBookings.filter((b) => b.id !== id);
      setMyBookings(updated);
      localStorage.setItem('piala_bookings', JSON.stringify(updated));
    }
  };

  // Available times
  const timeSlots = [
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'
  ];

  return (
    <section id="booking" className="py-24 bg-emerald-950 text-white relative">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase block mb-3">
            Online Table Reservation
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            {t.bookingTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto mt-4 mb-3" />
          <p className="font-sans text-gold-100/70 italic">
            {t.bookingSubtitle}
          </p>
        </div>

        {/* Dynamic Zone Buttons */}
        <div className="flex justify-center gap-3 mb-12">
          {(['main', 'vip', 'terrace'] as const).map((zone) => (
            <button
              key={zone}
              onClick={() => {
                setSelectedZone(zone);
                setSelectedTable(null);
              }}
              className={`px-5 py-3 rounded-none font-serif text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer border ${
                selectedZone === zone
                  ? 'bg-[#d4af37] text-[#0b2118] font-bold border-gold-500 shadow-md'
                  : 'bg-emerald-900/40 border border-gold-500/20 text-gold-100/80 hover:bg-emerald-900/80 hover:border-gold-500/50'
              }`}
            >
              {zone === 'main' ? t.bookingZoneMain : zone === 'vip' ? t.bookingZoneVip : t.bookingZoneTerrace}
            </button>
          ))}
        </div>

        {/* Floor Plan and Reservation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Interactive SVG Floor Plan */}
          <div className="lg:col-span-7 bg-emerald-900/35 border border-gold-500/20 rounded-none p-6 md:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-lg text-gold-200 flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-none h-2 w-2 bg-gold-500"></span>
                </span>
                <span>
                  {selectedZone === 'main' ? t.bookingZoneMain : selectedZone === 'vip' ? t.bookingZoneVip : t.bookingZoneTerrace}
                </span>
              </span>
              
              {/* Legend indicators */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono tracking-wider uppercase text-white/50">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-emerald-900/60 border border-gold-500/30 rounded-none" />
                  <span>{t.bookingAvailable}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-gold-500/25 border border-gold-500 rounded-none" />
                  <span>{t.bookingSelected}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-zinc-700/80 border border-zinc-600 rounded-none" />
                  <span>{t.bookingBooked}</span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Container */}
            <div className="relative aspect-[4/3] bg-emerald-950/40 rounded-none border border-gold-500/20 p-2 overflow-hidden">
              
              {/* Zone Specific Background Accents */}
              {selectedZone === 'vip' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <Flame className="w-64 h-64 text-gold-400" />
                </div>
              )}
              {selectedZone === 'terrace' && (
                <div className="absolute bottom-4 left-0 w-full text-center opacity-15 pointer-events-none">
                  <span className="font-serif text-[11px] italic tracking-widest uppercase text-white">
                    ▲ ▲ Вид на хребты Жетісу Алатауы ▲ ▲
                  </span>
                </div>
              )}

              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Simulated Walls / Room Structure */}
                <rect x="2" y="2" width="96" height="96" fill="none" stroke="#ab8310" strokeWidth="0.25" strokeDasharray="1,1" rx="2" />
                
                {/* Master stage / Fireplace indicator */}
                {selectedZone === 'main' && (
                  <g transform="translate(50, 4)">
                    <rect x="-15" y="0" width="30" height="6" fill="#064e3b" stroke="#ab8310" strokeWidth="0.5" rx="1" />
                    <text x="0" y="4" fill="#cca515" fontSize="2.5" fontFamily="serif" textAnchor="middle" letterSpacing="0.2">ЖАНДЫ ДАУЫС / СЦЕНА</text>
                  </g>
                )}
                {selectedZone === 'vip' && (
                  <g transform="translate(50, 4)">
                    <circle cx="0" cy="2" r="3" fill="#6e4e11" opacity="0.3" />
                    <text x="0" y="3" fill="#cca515" fontSize="2.5" fontFamily="serif" textAnchor="middle" letterSpacing="0.2">КАМИННЫЙ ЗАЛ</text>
                  </g>
                )}

                {/* Render tables as SVG groups */}
                {zoneTables.map((table) => {
                  const isSelected = selectedTable?.id === table.id;
                  // Let's hardcode table t-m3 and t-v1 as booked
                  const isBooked = table.id === 't-m3' || table.id === 't-v1';
                  
                  const width = table.width || 14;
                  const height = table.height || 14;
                  const x = table.x - width / 2;
                  const y = table.y - height / 2;

                  return (
                    <g
                      key={table.id}
                      onClick={() => handleTableClick(table)}
                      className="cursor-pointer group"
                    >
                      {/* Decorative outer glow for hovering/selected items */}
                      {isSelected && (
                        <rect
                          x={x - 2}
                          y={y - 2}
                          width={width + 4}
                          height={height + 4}
                          fill="none"
                          stroke="#cca515"
                          strokeWidth="0.5"
                          strokeDasharray="1,1"
                          rx={table.shape === 'circle' ? '999' : '3'}
                        />
                      )}

                      {/* Main Table Base Shape */}
                      {table.shape === 'circle' ? (
                        <circle
                          cx={table.x}
                          cy={table.y}
                          r={width / 2}
                          fill={isBooked ? '#3f3f46' : isSelected ? '#cca515' : '#064e3b'}
                          fillOpacity={isBooked ? '0.8' : isSelected ? '0.3' : '0.5'}
                          stroke={isBooked ? '#52525b' : isSelected ? '#cca515' : '#cca515'}
                          strokeWidth={isSelected ? '1' : '0.5'}
                          className="transition-all duration-300 group-hover:stroke-gold-400"
                        />
                      ) : (
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          rx="2"
                          fill={isBooked ? '#3f3f46' : isSelected ? '#cca515' : '#064e3b'}
                          fillOpacity={isBooked ? '0.8' : isSelected ? '0.3' : '0.5'}
                          stroke={isBooked ? '#52525b' : isSelected ? '#cca515' : '#cca515'}
                          strokeWidth={isSelected ? '1' : '0.5'}
                          className="transition-all duration-300 group-hover:stroke-gold-400"
                        />
                      )}

                      {/* Chairs arranged around table */}
                      {Array.from({ length: table.seats }).map((_, chairIdx) => {
                        const radius = width / 2 + 2;
                        const angle = (chairIdx / table.seats) * Math.PI * 2;
                        const chairX = table.x + Math.cos(angle) * radius;
                        const chairY = table.y + Math.sin(angle) * radius;

                        return (
                          <circle
                            key={chairIdx}
                            cx={chairX}
                            cy={chairY}
                            r="1.2"
                            fill={isBooked ? '#52525b' : isSelected ? '#e4c222' : '#ab8310'}
                            stroke="#022c22"
                            strokeWidth="0.25"
                          />
                        );
                      })}

                      {/* Text Label on Table */}
                      <text
                        x={table.x}
                        y={table.y + 0.8}
                        fill={isBooked ? '#a1a1aa' : '#ffffff'}
                        fontSize="3"
                        fontWeight="bold"
                        fontFamily="serif"
                        textAnchor="middle"
                      >
                        №{table.number}
                      </text>

                      {/* Secondary Label for seating */}
                      <text
                        x={table.x}
                        y={table.y + 3.8}
                        fill={isBooked ? '#71717a' : '#f7eb93'}
                        fontSize="1.8"
                        fontFamily="monospace"
                        textAnchor="middle"
                        opacity="0.8"
                      >
                        {table.seats} {currentLang === 'ru' ? 'МЕСТ' : 'ОРЫН'}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 text-xs font-sans text-white/50 leading-relaxed text-center">
              {currentLang === 'ru' 
                ? 'Нажмите на любой свободный столик на интерактивной схеме, чтобы заполнить форму бронирования.'
                : 'Брондау формасын толтыру үшін интерактивті схемадағы кез келген бос үстелді басыңыз.'}
            </div>
          </div>

          {/* Booking Form Side Panel */}
          <div ref={formRef} className="lg:col-span-5 bg-white text-emerald-950 p-6 md:p-8 rounded-none border border-gold-500/35">
            <h3 className="font-serif text-xl md:text-2xl font-bold border-b border-emerald-950/10 pb-4 mb-6 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gold-600" />
              <span>
                {selectedTable 
                  ? `${t.bookingTableDetails} №${selectedTable.number}` 
                  : (currentLang === 'ru' ? 'Сведения о бронировании' : 'Брондау мәліметтері')}
              </span>
            </h3>

            {/* Error state: No table clicked */}
            {!selectedTable ? (
              <div className="py-12 text-center space-y-4">
                <ShieldAlert className="w-12 h-12 text-gold-600 mx-auto animate-bounce" />
                <p className="font-sans text-sm text-emerald-950/60 max-w-xs mx-auto">
                  {currentLang === 'ru' 
                    ? 'Пожалуйста, выберите свободный столик на схеме зала слева, чтобы начать оформление.'
                    : 'Рәсімдеуді бастау үшін сол жақтағы схемадан бос үстелді таңдаңыз.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookTable} className="space-y-5">
                
                {/* Form fields */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                    {t.bookingFormName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Аскар Асанов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-gold-500/30 bg-zinc-50 focus:border-gold-500 focus:ring-0 focus:outline-none text-emerald-950 text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                    {t.bookingFormPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (777) 123-4567"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-gold-500/30 bg-zinc-50 focus:border-gold-500 focus:ring-0 focus:outline-none text-emerald-950 text-sm font-mono transition-all"
                  />
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                      {t.bookingFormDate}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-none border border-gold-500/30 bg-zinc-50 focus:border-gold-500 focus:ring-0 focus:outline-none text-emerald-950 text-xs transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                      {t.bookingFormTime}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-none border border-gold-500/30 bg-zinc-50 focus:border-gold-500 focus:ring-0 focus:outline-none text-emerald-950 text-xs transition-all"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating slider constrained by Table Seats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 font-semibold">
                    <span>{t.bookingFormGuests}</span>
                    <span className="text-gold-700 font-bold">
                      max {selectedTable.seats} {t.bookingSeats}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 bg-zinc-50 border border-gold-500/20 p-3 rounded-none">
                    <Users className="w-5 h-5 text-emerald-900/60" />
                    <input
                      type="range"
                      min="1"
                      max={selectedTable.seats}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full accent-gold-600 cursor-pointer"
                    />
                    <span className="font-mono text-sm font-bold bg-emerald-950 text-gold-400 w-8 h-8 flex items-center justify-center rounded-none">
                      {guests}
                    </span>
                  </div>
                </div>

                {/* Pre-ordered Dish section */}
                {preOrderedDish && (
                  <div className="bg-gold-50 border border-gold-500/30 p-4 rounded-none flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-none overflow-hidden shrink-0 border border-gold-500/20">
                        {preOrderedDish.image ? (
                          <img
                            src={preOrderedDish.image}
                            alt={preOrderedDish.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-emerald-900 flex items-center justify-center text-[8px] text-white">PIALA</div>
                        )}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-wider uppercase text-gold-800 block">
                          {currentLang === 'ru' ? 'Предоплата при визите' : 'Келгенде төленеді'}
                        </span>
                        <span className="text-xs font-serif font-bold text-emerald-950 block">
                          {currentLang === 'ru' ? preOrderedDish.name : preOrderedDish.nameKz}
                        </span>
                        <span className="text-[10px] font-mono text-gold-700 font-semibold">
                          {preOrderedDish.price.toLocaleString('ru-RU')} ₸
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onClearPreOrder}
                      className="text-emerald-950/40 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-none font-serif text-xs font-bold tracking-widest uppercase bg-emerald-950 text-gold-400 hover:text-gold-300 border border-gold-500 hover:border-gold-400 hover:shadow-lg transition-all duration-300 cursor-pointer mt-6"
                >
                  {t.bookingFormSubmit}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Local Bookings Log */}
        {myBookings.length > 0 && (
          <div className="mt-16 bg-emerald-900/15 border border-gold-500/15 p-6 md:p-8 rounded-none">
            <h4 className="font-serif text-xl font-bold text-gold-400 border-b border-gold-500/10 pb-4 mb-6 flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <span>{t.bookingMyBookings}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myBookings.map((b) => (
                <div key={b.id} className="bg-emerald-950/80 border border-gold-500/20 p-5 rounded-none relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-900 text-gold-400 text-[9px] font-mono rounded-none font-semibold border border-gold-500/30">
                        <span className="w-1.5 h-1.5 rounded-none bg-gold-400 animate-pulse" />
                        <span>{t.bookingStatusActive}</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-gold-500">{b.code}</span>
                    </div>

                    <div className="space-y-1.5">
                      <h5 className="font-serif text-base font-bold text-white">{b.name}</h5>
                      <div className="flex flex-col text-xs text-gold-100/60 font-sans space-y-1">
                        <span>{currentLang === 'ru' ? 'Столик №' : 'Үстел №'}{b.tableNumber} • {b.zone === 'main' ? t.bookingZoneMain : b.zone === 'vip' ? t.bookingZoneVip : t.bookingZoneTerrace}</span>
                        <span>{currentLang === 'ru' ? 'Дата:' : 'Күні:'} {b.date} • {t.bookingFormTime}: {b.time}</span>
                        <span>{currentLang === 'ru' ? 'Гостей:' : 'Қонақтар:'} {b.guests} {t.bookingSeats}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancelBooking(b.id)}
                    className="w-full mt-5 py-2 rounded-none bg-red-950/30 hover:bg-red-900/20 border border-red-500/25 text-red-400 hover:text-red-300 font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer"
                  >
                    {t.bookingCancel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Exquisite success receipt modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-white text-emerald-950 rounded-none p-8 max-w-sm w-full text-center border-4 border-gold-500 shadow-2xl relative overflow-hidden">
            
            {/* Decors */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600" />
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold-500/10 rounded-none" />
            
            <CheckCircle2 className="w-16 h-16 text-gold-600 mx-auto mb-4" />
            
            <h3 className="font-serif text-2xl font-bold tracking-tight mb-2 text-emerald-950">
              {t.bookingSuccessTitle}
            </h3>
            
            <p className="font-sans text-xs text-emerald-950/70 leading-relaxed mb-6">
              {t.bookingSuccessText}
            </p>

            <div className="bg-zinc-50 border border-gold-500/20 p-4 rounded-none space-y-2 mb-6">
              <span className="text-[9px] font-mono tracking-widest text-emerald-950/40 uppercase block">
                {t.bookingSuccessCode}
              </span>
              <span className="font-mono text-xl font-bold tracking-widest text-gold-700 bg-gold-50 px-4 py-1.5 rounded-none border border-gold-500/20">
                {latestBookingCode}
              </span>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                onClearPreOrder();
              }}
              className="w-full py-3.5 bg-emerald-950 text-gold-400 font-sans text-xs font-bold tracking-widest uppercase rounded-none hover:text-white transition-colors cursor-pointer border border-gold-500/20"
            >
              {currentLang === 'ru' ? 'Прекрасно' : 'Тамаша'}
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
