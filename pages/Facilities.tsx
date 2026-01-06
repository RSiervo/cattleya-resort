
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Waves, Layout, Coffee, Car, ShieldCheck, MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { FACILITIES_DATA } from '../constants';

const Facilities: React.FC = () => {
  useEffect(() => {
    if ((window as any).reObserve) (window as any).reObserve();
  }, []);

  const icons: Record<string, any> = {
    Waves: <Waves size={24} />,
    Layout: <Layout size={24} />,
    Coffee: <Coffee size={24} />,
    Car: <Car size={24} />,
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920" alt="Bg" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-8xl font-bold mb-6 tracking-tighter">
            Elevated <span className="text-emerald-400 italic font-serif">Experiences</span>
          </h1>
          <p className="text-sm md:text-xl opacity-80 max-w-2xl mx-auto">
            Beyond standard stays—premium facilities designed for relaxation.
          </p>
        </div>
      </section>

      {/* Facilities List */}
      <section className="py-16 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {FACILITIES_DATA.map((facility, idx) => (
              <div key={facility.id} className="reveal group bg-white rounded-[2rem] md:rounded-[3.5rem] p-3 flex flex-col sm:flex-row gap-6 md:gap-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 overflow-hidden">
                <div className="w-full sm:w-1/2 h-48 md:h-auto overflow-hidden rounded-2xl md:rounded-[2.5rem]">
                  <img src={`${facility.image}?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover" alt={facility.name} />
                </div>
                <div className="w-full sm:w-1/2 py-4 md:py-8 md:pr-8 flex flex-col justify-center px-4">
                  <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">{icons[facility.icon]}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{facility.name}</h3>
                  <p className="text-slate-500 text-xs mb-6">{facility.desc}</p>
                  <Link to="/tour" className="text-emerald-600 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">View Tour <ArrowRight size={14} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Antipolo Section */}
      <section className="py-20 md:py-32 bg-resort-green text-white relative px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter">Explore <span className="text-emerald-400 italic font-serif">Antipolo</span></h2>
              <div className="space-y-4 max-w-sm mx-auto lg:mx-0">
                {[{ name: "Pinto Art Museum", dist: "15 mins" }, { name: "Antipolo Cathedral", dist: "10 mins" }].map((spot, i) => (
                  <div key={i} className="bg-white/10 p-4 rounded-xl flex justify-between items-center text-xs">
                    <span className="font-bold">{spot.name}</span>
                    <span className="text-emerald-400 uppercase font-black">{spot.dist}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
               <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=1000" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl" alt="Area" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
