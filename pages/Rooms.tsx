
import React, { useEffect, useState, useMemo } from 'react';
import { ROOMS } from '../constants';
import { 
  Users, 
  Info, 
  Check, 
  ArrowRight, 
  Filter, 
  Sparkles, 
  BedDouble, 
  Coffee, 
  Wifi, 
  ShieldCheck,
  Search,
  Maximize2
} from 'lucide-react';
import { Room } from '../types';
import SmartImage from '../components/SmartImage';

interface RoomsProps {
  onBookRoom: (room: Room) => void;
}

const Rooms: React.FC<RoomsProps> = ({ onBookRoom }) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if ((window as any).reObserve) (window as any).reObserve();
  }, [filter, searchQuery]);

  const filteredRooms = useMemo(() => {
    return ROOMS.filter(room => {
      const matchesFilter = filter === 'All' || room.category === filter;
      const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           room.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const categories = ['All', 'Couple', 'Family', 'Barkada', 'Private'];

  return (
    <div className="min-h-screen bg-[#fdfcf0]">
      {/* Immersive Header */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 bg-resort-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-[80px] md:blur-[120px] translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
              <Sparkles size={12} className="text-emerald-400" />
              Accommodations
            </div>
            <h1 className="text-4xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight">
              Perfect <span className="text-emerald-400 italic font-serif">Sanctuary</span>
            </h1>
            <p className="text-sm md:text-xl opacity-80 max-w-2xl font-medium">
              Spaces designed to connect you back to nature.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 px-4 -mt-8">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 p-2 flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-resort-green text-white' 
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full md:w-64 relative px-1 pb-1 md:pb-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none"
            />
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {filteredRooms.map((room, idx) => (
              <div key={room.id} className="reveal group bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100">
                <div className="relative h-64 md:h-[450px] overflow-hidden">
                  <SmartImage 
                    localSrc={room.localImage}
                    fallbackSrc={room.imageUrl}
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 md:top-8 md:left-8">
                    <div className="bg-white/95 px-3 py-1 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest text-emerald-700 shadow-xl">
                      {room.category} Room
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
                    <div className="bg-resort-green text-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl">
                      <div className="text-xl md:text-3xl font-black">₱{room.price.toLocaleString()}</div>
                      <span className="text-[8px] md:text-[10px] font-bold opacity-60 uppercase">Per Night</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">{room.name}</h3>
                  <p className="text-slate-500 text-sm md:text-base mb-8">{room.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {room.inclusions.slice(0, 3).map((inc, i) => (
                      <span key={i} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-100">
                        {inc}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => onBookRoom(room)} className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                      Reserve <ArrowRight size={14} />
                    </button>
                    <button className="p-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all">
                      <Info size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Rooms;
