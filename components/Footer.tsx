
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-12">
          {/* Brand & Mission - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Leaf className="text-emerald-500" size={28} />
              <span className="text-2xl font-serif font-bold">Cattleya Resort</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Experience the perfect blend of Filipino hospitality and natural beauty in the heart of Antipolo, Rizal. Your private sanctuary awaits.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-600 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links - One column on mobile */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/rooms" className="hover:text-emerald-500 transition-colors">Rooms & Rates</Link></li>
              <li><Link to="/gallery" className="hover:text-emerald-500 transition-colors">Photo Gallery</Link></li>
              <li><Link to="/facilities" className="hover:text-emerald-500 transition-colors">Facilities</Link></li>
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Booking & Inquiry</Link></li>
            </ul>
          </div>

          {/* Contact Info - One column on mobile */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="text-emerald-500 flex-shrink-0" size={18} />
                <span>Sitio Ibabaw, Colaique, Bo. San Roque, Antipolo, Rizal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-emerald-500 flex-shrink-0" size={18} />
                <span>0998 163 2946</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-emerald-500 flex-shrink-0" size={18} />
                <span>info@cattleyaresort.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA - Full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe for exclusive promos and packages.</p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button className="bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-center md:text-left">
          <p>© {new Date().getFullYear()} Cattleya Resort Antipolo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-emerald-500">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-emerald-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
