
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

interface NavbarProps {
  onBookNow: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookNow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Tour', path: '/tour' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105">
            <Leaf className={`${scrolled ? 'text-emerald-700' : 'text-white'} transition-colors duration-300`} size={28} />
            <span className={`text-2xl font-serif font-bold transition-colors duration-300 ${scrolled ? 'text-resort-green' : 'text-white'}`}>
              Cattleya Resort
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold transition-all duration-300 pb-1 border-b-2 transform hover:scale-110 inline-block ${
                  scrolled 
                    ? (isActive(link.path) 
                        ? 'text-emerald-700 border-emerald-700' 
                        : 'text-slate-600 border-transparent hover:text-emerald-600 hover:border-emerald-400')
                    : (isActive(link.path) 
                        ? 'text-white border-white' 
                        : 'text-white/80 border-transparent hover:text-white hover:border-white/50')
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={onBookNow}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 ${
                scrolled 
                  ? 'bg-resort-green text-white hover:bg-emerald-800' 
                  : 'bg-white text-resort-green hover:bg-emerald-50'
              }`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-slate-800' : 'text-white'} focus:outline-none transition-colors p-2 hover:bg-black/5 rounded-full`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Now with glassmorphism effect */}
      {isOpen && (
        <div className="md:hidden bg-white/60 backdrop-blur-3xl shadow-2xl animate-in slide-in-from-top duration-500 border-t border-white/20">
          <div className="px-4 pt-2 pb-10 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-6 py-5 rounded-2xl text-lg font-bold transition-all ${
                  isActive(link.path) 
                    ? 'bg-emerald-600/10 text-emerald-800 border-l-4 border-emerald-700' 
                    : 'text-slate-800 hover:bg-white/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 px-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookNow();
                }}
                className="w-full bg-resort-green text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all hover:bg-emerald-800"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
