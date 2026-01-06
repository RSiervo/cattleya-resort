
import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { X, ZoomIn, Instagram, ChevronLeft, ChevronRight, Filter, Sparkles } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if ((window as any).reObserve) (window as any).reObserve();
  }, [filter]);

  const categories = ['All', 'Pools', 'Rooms', 'Events', 'Nature'];
  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const nextImg = () => {
    if (selectedImg !== null) {
      setSelectedImg((selectedImg + 1) % filteredItems.length);
    }
  };

  const prevImg = () => {
    if (selectedImg !== null) {
      setSelectedImg((selectedImg - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0]">
      {/* Immersive Header */}
      <section className="relative pt-44 pb-24 bg-resort-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[size:30px_30px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-white/20">
            <Sparkles size={14} className="text-emerald-400" />
            Visual Narrative
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
            Our <span className="text-emerald-400 italic font-serif">Oasis</span> in Frames
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium">
            Explore the curated moments of serenity and joy captured across our sanctuary in Antipolo.
          </p>
        </div>
      </section>

      {/* Filter Controls */}
      <div className="sticky top-20 z-40 px-4 -mt-8">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-2xl rounded-full shadow-2xl border border-slate-100 p-2 flex justify-center items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-resort-green text-white shadow-lg' 
                  : 'text-slate-400 hover:text-resort-green hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredItems.map((item, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImg(i)}
                className="reveal group relative rounded-[2.5rem] overflow-hidden shadow-sm cursor-zoom-in transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <img 
                  src={`${item.url}?auto=format&fit=crop&q=80&w=800`} 
                  alt={item.title} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300 mb-2 block">{item.category}</span>
                    <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center reveal">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Stay Connected with us</h3>
            <button className="magnetic bg-white text-resort-green border-2 border-resort-green px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all flex items-center gap-4 mx-auto shadow-xl">
              <Instagram size={20} />
              @CattleyaResortAntipolo
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImg !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-500">
          <button 
            onClick={() => setSelectedImg(null)}
            className="absolute top-10 right-10 text-white/50 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full z-[110]"
          >
            <X size={32} />
          </button>

          <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-5 hover:bg-white/10 rounded-full">
            <ChevronLeft size={48} />
          </button>

          <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-5 hover:bg-white/10 rounded-full">
            <ChevronRight size={48} />
          </button>

          <div className="relative max-w-6xl w-full h-[80vh] flex flex-col items-center justify-center p-4">
            <img 
              src={`${filteredItems[selectedImg].url}?auto=format&fit=crop&q=90&w=1600`} 
              alt="Expanded"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl animate-in zoom-in-95 duration-500"
            />
            <div className="mt-8 text-center text-white/60">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">{filteredItems[selectedImg].category}</span>
              <h4 className="text-2xl font-bold text-white mt-1">{filteredItems[selectedImg].title}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
