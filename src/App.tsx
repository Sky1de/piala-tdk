import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhilosophySection from './components/PhilosophySection';
import MenuSection from './components/MenuSection';
import BookingSection from './components/BookingSection';
import GallerySection from './components/GallerySection';
import MapSection from './components/MapSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Language, MenuItem } from './types';

export default function App() {
  const [currentLang, setLang] = useState<Language>('ru');
  const [preOrderedDish, setPreOrderedDish] = useState<MenuItem | null>(null);

  const handleOrderDishToTable = (dish: MenuItem) => {
    setPreOrderedDish(dish);
    // Scroll smoothly to the booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = bookingSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleClearPreOrder = () => {
    setPreOrderedDish(null);
  };

  return (
    <div id="piala-app" className="bg-white min-h-screen font-sans overflow-x-hidden antialiased">
      {/* Header & Sticky Navbar */}
      <Navbar currentLang={currentLang} setLang={setLang} />

      {/* Main Sections */}
      <main>
        {/* Full screen Hero section */}
        <Hero currentLang={currentLang} />

        {/* Philosophy, Heritage, and Vibe */}
        <PhilosophySection currentLang={currentLang} />

        {/* Exquisite categorized search-enabled Menu */}
        <MenuSection
          currentLang={currentLang}
          onOrderDish={handleOrderDishToTable}
        />

        {/* Interactive Floor Plan Reservation Widget */}
        <BookingSection
          currentLang={currentLang}
          preOrderedDish={preOrderedDish}
          onClearPreOrder={handleClearPreOrder}
        />

        {/* High-res Photos Gallery */}
        <GallerySection currentLang={currentLang} />

        {/* Custom styled Vector map + Route navigation */}
        <MapSection currentLang={currentLang} />

        {/* Guest testimonials and star ratings reviews */}
        <ReviewsSection currentLang={currentLang} />

        {/* Contact info, operating hours, and message feedback form */}
        <ContactSection currentLang={currentLang} />
      </main>

      {/* Premium Footer with socials */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
