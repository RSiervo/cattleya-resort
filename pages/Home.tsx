
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, MapPin, Users, Waves, Wifi, Utensils, Car, ShieldCheck, 
  ArrowRight, Compass, Sparkles, Moon, Leaf, ChevronDown, 
  Instagram, MessageCircle, Heart, Timer
} from 'lucide-react';
import { REVIEWS as STATIC_REVIEWS, PROMOS, JOURNEY_STEPS, NEARBY_SPOTS, FAQS, RESORT_ASSETS } from '../constants';
import { mongoService } from '../services/mongoService';
import { Review } from '../types';
import SmartImage from '../components/SmartImage';

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((window as any).reObserve) (window as any).reObserve();

    const loadReviews = async () => {
      const liveReviews = await mongoService.fetchReviews();
      if (liveReviews && liveReviews.length > 0) setReviews(liveReviews);
    };
    loadReviews();

    const handleScroll = () => {
      if (heroRef.current && window.innerWidth > 768) {
        const scroll = window.scrollY;
        heroRef.current.style.transform = `translateY(${scroll * 0.4}px)`;
        heroRef.current.style.opacity = `${1 - scroll / 800}`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const amenities = [
    { icon: <Waves size={24} />, label: 'Swimming Pool', color: 'bg-blue-50 text-blue-600' },
    { icon: <Wifi size={24} />, label: 'Fast Wi-Fi', color: 'bg-indigo-50 text-indigo-600' },
    { icon: <Utensils size={24} />, label: 'Resort Cafe', color: 'bg-amber-50 text-amber-600' },
    { icon: <Car size={24} />, label: 'Free Parking', color: 'bg-slate-50 text-slate-600' },
    { icon: <ShieldCheck size={24} />, label: '24/7 Security', color: 'bg-emerald-50 text-emerald-600' },
    { icon: <Users size={24} />, label: 'Family First', color: 'bg-rose-50 text-rose-600' },
  ];

  const journeyIcons: Record<string, any> = {
    Leaf: <Leaf size={28} />,
    Waves: <Waves size={28} />,
    Utensils: <Utensils size={28} />,
    Moon: <Moon size={28} />,
  };

  return (
    <div className="overflow-hidden bg-[#fdfcf0]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0" ref={heroRef}>
          <SmartImage 
            localSrc={RESORT_ASSETS.HERO.local}
            fallbackSrc={RESORT_ASSETS.HERO.remote}
            alt="Resort View" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles size={12} className="text-emerald-400" />
            Top Resort in Antipolo 2026
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Nature's <span className="text-emerald-400 font-serif italic">Serenity</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            A premium lush sanctuary in the heart of Antipolo. 
            Where every corner tells a story of peace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link to="/rooms" className="group bg-emerald-600 text-white px-10 py-4 md:px-12 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-2xl w-full sm:w-auto flex items-center justify-center gap-3">
              Book Your Escape
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/tour" className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-4 md:px-12 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white/20 transition-all w-full sm:w-auto flex items-center justify-center gap-3">
              <Compass size={18} className="animate-spin-slow" />
              Virtual Tour
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hidden sm:flex">
          <span className="text-[8px] font-black uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative z-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center gap-4 group">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-xl group-hover:rotate-12 transition-transform">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-black text-slate-800">4.4 / 5.0</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Guest Rating</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl group-hover:-rotate-12 transition-transform">
                <Users size={24} />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-black text-slate-800">10,000+</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Happy Families</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-black text-slate-800">Verified</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Official Resort</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Promos */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">Offers</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">Exclusive Packages</h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROMOS.map((promo, idx) => (
              <div key={idx} className="reveal group relative bg-slate-50 p-8 rounded-[2rem] border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-xl transition-all duration-500 overflow-hidden" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-1.5 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest">
                  {promo.tag}
                </div>
                <h3 className="text-emerald-600 text-2xl font-black mb-2">{promo.discount}</h3>
                <h4 className="text-lg font-bold text-slate-900 mb-4">{promo.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">{promo.desc}</p>
                <Link to="/rooms" className="inline-flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest group/btn">
                  Claim Deal <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-4 md:mb-8 tracking-tighter">Your Journey <br/> <span className="text-emerald-600 italic font-serif">Starts Here</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 border-t-2 border-dashed border-emerald-100 -z-10"></div>
            {JOURNEY_STEPS.map((step, idx) => (
              <div key={idx} className="reveal flex flex-col items-center text-center group" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg border border-slate-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  {journeyIcons[step.icon]}
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-20 md:py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-4 tracking-tighter">World-Class <br/> <span className="text-emerald-600 italic font-serif">Amenities</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {amenities.map((item, idx) => (
              <div key={idx} className="reveal group bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${item.color}`}>
                  {item.icon}
                </div>
                <h4 className="text-base md:text-xl font-black text-slate-800">{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Common Questions</h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-3 reveal">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-slate-800 text-sm">{faq.q}</span>
                  <ChevronDown size={18} className={`text-emerald-600 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-slate-500 text-xs leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-7xl font-bold mb-4 tracking-tighter">Guest <br/><span className="text-emerald-400 italic font-serif">Voices</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, idx) => (
              <div key={review.id} className="reveal bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all flex flex-col h-full" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="flex text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} fill={i < review.rating ? "currentColor" : "none"} size={14} />)}
                </div>
                <p className="text-sm font-medium italic mb-10 opacity-80 leading-relaxed flex-grow">"{review.comment}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-sm">
                    {review.author[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{review.author}</h5>
                    <p className="text-[8px] uppercase tracking-widest text-emerald-500">Verified Stay</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 md:py-40 relative px-4">
        <div className="max-w-5xl mx-auto text-center reveal space-y-8">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter leading-tight">Your paradise <br/> is <span className="text-emerald-600 italic font-serif">one click away</span></h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/rooms" className="bg-resort-green text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl w-full sm:w-auto">
              Reserve My Stay
            </Link>
            <Link to="/contact" className="bg-white text-resort-green border-2 border-resort-green px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
