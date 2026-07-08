import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface ContactSectionProps {
  currentLang: Language;
}

export default function ContactSection({ currentLang }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const t = TRANSLATIONS[currentLang];

  const handlePhoneChange = (val: string) => {
    if (!val.startsWith('+7 ')) {
      setPhone('+7 ');
    } else {
      setPhone(val);
    }
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      alert(currentLang === 'ru' ? 'Пожалуйста, заполните имя и телефон' : 'Атыңыз бен телефон нөміріңізді толтырыңыз');
      return;
    }

    // Save to simulated contacts storage
    const list = JSON.parse(localStorage.getItem('piala_feedback') || '[]');
    list.push({
      id: Date.now(),
      name,
      phone,
      email,
      message,
      date: new Date().toLocaleDateString('ru-RU'),
    });
    localStorage.setItem('piala_feedback', JSON.stringify(list));

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setPhone('+7 ');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  const contactCards = [
    {
      icon: <MapPin className="w-6 h-6 text-gold-500" />,
      label: t.contactAddress,
      val: currentLang === 'ru' ? 'г. Талдыкорган, ул. Тауелсыздык, 142' : 'Талдықорған қ., Тәуелсіздік көшесі, 142',
      sub: currentLang === 'ru' ? 'Рядом со сквером Жетысу' : 'Жетісу скверінің жанында',
    },
    {
      icon: <Phone className="w-6 h-6 text-gold-500" />,
      label: t.contactPhone,
      val: '+7 (7282) 40-50-60',
      sub: '+7 (701) 500-11-22 (WhatsApp)',
    },
    {
      icon: <Clock className="w-6 h-6 text-gold-500" />,
      label: t.contactHours,
      val: 'Пн - Вс: 12:00 - 02:00',
      sub: currentLang === 'ru' ? 'Без выходных и перерывов' : 'Демалыссыз және үзіліссіз',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-zinc-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-700 uppercase block mb-3 font-semibold">
            Contact Information
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-emerald-950">
            {t.contactTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-600 mx-auto mt-4 mb-3" />
          <p className="font-sans text-emerald-950/75 italic">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Info Blocks */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {contactCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 bg-zinc-50 border border-gold-500/15 p-6 rounded-none shadow-sm hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="bg-emerald-950 w-12 h-12 rounded-none flex items-center justify-center border border-gold-600/20 shrink-0">
                    {card.icon}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/40 block font-semibold">
                      {card.label}
                    </span>
                    <span className="font-serif text-base md:text-lg font-bold text-emerald-950 block leading-tight">
                      {card.val}
                    </span>
                    <span className="font-sans text-xs text-emerald-950/60 block">
                      {card.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Email card */}
            <div className="flex items-center space-x-3 bg-gold-50 border border-gold-500/20 p-5 rounded-none">
              <Mail className="w-5 h-5 text-gold-700 shrink-0" />
              <div className="text-xs font-mono text-gold-900">
                <span>Email: info@piala-restaurant.kz</span>
              </div>
            </div>
          </div>

          {/* Column 2: Feedback Form */}
          <div className="lg:col-span-7 bg-emerald-950 text-white p-6 md:p-8 rounded-none shadow-xl border border-gold-500/25 relative overflow-hidden flex flex-col justify-between">
            {/* Decors */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-600/5 rounded-none blur-[80px]" />
            
            <div className="space-y-6">
              <h3 className="font-serif text-xl md:text-2xl font-bold border-b border-white/10 pb-4 flex items-center space-x-2">
                <Send className="w-5 h-5 text-gold-500" />
                <span>{t.contactFormTitle}</span>
              </h3>

              <form onSubmit={handleSubmitFeedback} className="space-y-4 relative z-10">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-white/50 block">
                      {currentLang === 'ru' ? 'Ваше имя' : 'Есіміңіз'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Арман"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-none border border-gold-500/15 bg-emerald-900/40 text-white placeholder:text-white/30 text-sm focus:border-gold-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-white/50 block">
                      {currentLang === 'ru' ? 'Номер телефона' : 'Телефон нөмірі'} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (701) 000-00-00"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-none border border-gold-500/15 bg-emerald-900/40 text-white placeholder:text-white/30 text-sm font-mono focus:border-gold-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-white/50 block">
                    Email ({currentLang === 'ru' ? 'необязательно' : 'міндетті емес'})
                  </label>
                  <input
                    type="email"
                    placeholder="arman@mail.kz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-gold-500/15 bg-emerald-900/40 text-white placeholder:text-white/30 text-sm focus:border-gold-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-white/50 block">
                    {currentLang === 'ru' ? 'Ваше сообщение' : 'Хабарламаңыз'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={currentLang === 'ru' ? 'Напишите ваши вопросы, пожелания или предложения...' : 'Сұрақтарыңызды, ұсыныстарыңызды жазыңыз...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-gold-500/15 bg-emerald-900/40 text-white placeholder:text-white/30 text-sm focus:border-gold-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-none bg-[#d4af37] hover:bg-gold-400 text-emerald-950 border border-gold-600 font-sans text-xs font-bold tracking-widest uppercase hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {t.contactFormSubmit}
                </button>
              </form>
            </div>

            {/* Success overlay inside form */}
            {isSent && (
              <div className="absolute inset-0 bg-emerald-950 text-gold-400 p-8 flex flex-col justify-center items-center text-center space-y-4 animate-fade-in z-20">
                <CheckCircle2 className="w-16 h-16 text-gold-500 animate-bounce" />
                <h4 className="font-serif text-2xl font-bold tracking-tight text-white">
                  {currentLang === 'ru' ? 'Отправлено успешно!' : 'Сәтті жіберілді!'}
                </h4>
                <p className="font-sans text-xs text-gold-100/70 max-w-xs leading-relaxed">
                  {t.contactSuccess}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
