import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Quote, Check, Sparkles, Award } from 'lucide-react';
import { INITIAL_REVIEWS, TRANSLATIONS } from '../data';
import { Language, Review } from '../types';

interface ReviewsSectionProps {
  currentLang: Language;
}

export default function ReviewsSection({ currentLang }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [tag, setTag] = useState<string>('Гурман');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang];

  // Load reviews on mount
  useEffect(() => {
    const saved = localStorage.getItem('piala_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing reviews', e);
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('piala_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  // Standard predefined tags
  const vibeTags = [
    { key: 'Гурман', label: currentLang === 'ru' ? 'Гурман' : 'Гурман' },
    { key: 'Ценитель Бешбармака', label: currentLang === 'ru' ? 'Ценитель Бешбармака' : 'Бесбармақ сүйер қауым' },
    { key: 'Ценитель чая', label: currentLang === 'ru' ? 'Ценитель чая' : 'Шай құмар' },
    { key: 'Постоянный гость', label: currentLang === 'ru' ? 'Постоянный гость' : 'Тұрақты қонақ' },
    { key: 'Семьянин', label: currentLang === 'ru' ? 'Семьянин' : 'Отбасылық қонақ' },
  ];

  // Submit new review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert(currentLang === 'ru' ? 'Заполните, пожалуйста, все обязательные поля' : 'Барлық міндетті өрістерді толтырыңыз');
      return;
    }

    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('ru-RU'),
      tag,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('piala_reviews', JSON.stringify(updated));

    // Success animation trigger
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);

    // Reset Form
    setName('');
    setComment('');
    setRating(5);
  };

  // Calculate statistics
  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  return (
    <section id="reviews" className="py-24 bg-zinc-50 relative">
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-emerald-950 to-transparent opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-700 uppercase block mb-3 font-semibold">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-emerald-950">
            {t.reviewsTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-600 mx-auto mt-4 mb-3" />
          <p className="font-sans text-emerald-950/75 italic">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Reviews Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Statistics & Feedback Form */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Realtime stats card */}
            <div className="bg-emerald-950 text-white p-6 md:p-8 rounded-none shadow-xl border border-gold-500/25">
              <h3 className="font-serif text-lg font-bold text-gold-400 mb-6 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>{currentLang === 'ru' ? 'Рейтинг нашего ресторана' : 'Рейтинг көрсеткішіміз'}</span>
              </h3>

              <div className="flex items-center space-x-6 pb-6 border-b border-white/10 mb-6">
                <div className="text-center shrink-0">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-white block">
                    {averageRating}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gold-300 block uppercase mt-1">
                    out of 5.0
                  </span>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-1 text-gold-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-5.5 h-5.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-white/60 font-sans">
                    {currentLang === 'ru' 
                      ? `На основе ${reviews.length} искренних отзывов наших гостей в Талдыкоргане.`
                      : `Талдықорғандағы қонақтарымыздың ${reviews.length} шынайы пікірі негізінде.`}
                  </p>
                </div>
              </div>

              {/* Progress bars for stars */}
              <div className="space-y-2">
                {ratingCounts.map(({ stars, count }) => {
                  const percent = ((count / (reviews.length || 1)) * 100).toFixed(0);
                  return (
                    <div key={stars} className="flex items-center space-x-3 text-xs font-mono text-white/65">
                      <span className="w-3 shrink-0 text-right">{stars}</span>
                      <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500 shrink-0" />
                      <div className="flex-1 h-2 bg-emerald-900 rounded-none overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-right shrink-0">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leave a review Form */}
            <div className="bg-white text-emerald-950 p-6 md:p-8 rounded-none shadow-xl border border-gold-500/25 relative overflow-hidden">
              <h3 className="font-serif text-xl font-bold text-emerald-950 border-b border-emerald-950/10 pb-4 mb-6 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-gold-600" />
                <span>{t.reviewsAddTitle}</span>
              </h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                
                {/* Rating select (Gold stars clickable) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                    {t.reviewsFormRating}
                  </label>
                  <div className="flex items-center space-x-2 bg-zinc-50 border border-emerald-950/10 p-3 rounded-none justify-center">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const value = idx + 1;
                      const isHighlighted = hoveredRating !== null ? value <= hoveredRating : value <= rating;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRating(value)}
                          onMouseEnter={() => setHoveredRating(value)}
                          onMouseLeave={() => setHoveredRating(null)}
                          className="text-gold-500 hover:scale-115 active:scale-95 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-8 h-8 ${isHighlighted ? 'fill-current' : 'opacity-25'}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                    {t.reviewsFormName}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Елена Пак"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-emerald-950/15 bg-zinc-50 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 focus:outline-none text-emerald-950 text-sm transition-all"
                  />
                </div>

                {/* Vibe Selection Tag */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                    {t.reviewsFormTag}
                  </label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-emerald-950/15 bg-zinc-50 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 focus:outline-none text-emerald-950 text-xs transition-all"
                  >
                    {vibeTags.map((v) => (
                      <option key={v.key} value={v.key}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-950/50 block font-semibold">
                    {t.reviewsFormComment}
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder={currentLang === 'ru' ? 'Поделитесь впечатлениями об авторских блюдах...' : 'Авторлық тағамдар туралы әсеріңізбен бөлісіңіз...'}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-emerald-950/15 bg-zinc-50 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 focus:outline-none text-emerald-950 text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-none bg-emerald-950 text-gold-400 hover:text-gold-300 border border-gold-600/35 hover:border-gold-500 font-sans text-xs font-bold tracking-widest uppercase hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {t.reviewsAddBtn}
                </button>
              </form>

              {/* Toast banner inside card on success */}
              {showSuccess && (
                <div className="absolute inset-0 bg-emerald-950 text-gold-400 p-8 flex flex-col justify-center items-center text-center space-y-4 animate-fade-in z-20">
                  <div className="w-16 h-16 rounded-none bg-gold-500/10 border border-gold-500 flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8 text-gold-500" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold tracking-tight text-white">
                    {currentLang === 'ru' ? 'Отзыв опубликован!' : 'Пікір жарияланды!'}
                  </h4>
                  <p className="font-sans text-xs text-gold-100/70 max-w-xs leading-relaxed">
                    {t.reviewsSuccess}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Column 2: Testimonials List */}
          <div className="lg:col-span-7 space-y-6 max-h-[760px] overflow-y-auto pr-2">
            {reviews.map((rev) => {
              const text = currentLang === 'ru' ? rev.comment : (rev.commentKz || rev.comment);
              return (
                <div
                  key={rev.id}
                  className="bg-white border border-gold-500/15 p-6 md:p-8 rounded-none shadow-sm hover:shadow-md transition-all duration-300 relative space-y-4"
                >
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-emerald-950/5 pointer-events-none" />

                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-lg font-bold text-emerald-950">
                          {rev.name}
                        </span>
                        {rev.tag && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-gold-50 border border-gold-500/20 text-gold-700 text-[10px] font-mono rounded-none font-semibold">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{rev.tag}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-950/40 block">
                        {rev.date}
                      </span>
                    </div>

                    {/* Score gold stars */}
                    <div className="flex items-center space-x-0.5 text-gold-500 shrink-0">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${idx < rev.rating ? 'fill-current' : 'opacity-15'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-sans text-sm md:text-base text-emerald-950/80 leading-relaxed italic">
                    «{text}»
                  </p>
                </div>
              );
            })}

            {reviews.length === 0 && (
              <div className="text-center py-16 bg-white rounded-none border border-gold-500/15">
                <p className="font-sans text-emerald-950/60">
                  {currentLang === 'ru' ? 'Отзывов пока нет. Будьте первыми!' : 'Пікірлер әлі жоқ. Бірінші болыңыз!'}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
