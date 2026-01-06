
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TravelAssistant from './components/TravelAssistant';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import ResortTour from './pages/ResortTour';
import Facilities from './pages/Facilities';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import BookingModal from './components/BookingModal';
import { Room } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = (room?: Room) => {
    if (room) {
      setBookingRoom(room);
    } else {
      setBookingRoom(null); // General booking
    }
    setIsBookingOpen(true);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <ScrollToTop />
        <Navbar onBookNow={() => handleOpenBooking()} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms onBookRoom={(room) => handleOpenBooking(room)} />} />
            <Route path="/tour" element={<ResortTour />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/facilities" element={<Facilities />} /> 
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
        <TravelAssistant />
        
        {isBookingOpen && (
          <BookingModal 
            initialRoom={bookingRoom} 
            onClose={() => setIsBookingOpen(false)} 
          />
        )}
      </div>
    </Router>
  );
};

export default App;
