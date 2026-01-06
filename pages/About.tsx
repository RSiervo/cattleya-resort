
import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Heart, Leaf, Award, Sparkles, ArrowRight, Quote } from 'lucide-react';

const About: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((window as any).reObserve) (window as any).reObserve();

    const handleScroll = () => {
      if (storyRef.current && window.innerWidth > 768) {
        const scrolled = window.scrollY;
        const speed = 0.2;
        storyRef.current.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    { icon: <Leaf size={28} />, title: "Eco-Conscious", desc: "Sustainable waste management and local plant preservation.", color: "bg-emerald-50 text-emerald-600" },
    { icon: <Heart size={28} />, title: "Hospitality", desc: "Traditional Filipino hospitality ensuring you feel like family.", color: "bg-rose-50 text-rose-600" },
    { icon: <ShieldCheck size={28} />, title: "Privacy First", desc: "Designed with seclusion in mind for your special moments.", color: "bg-blue-50 text-blue-600" },
    { icon: <Award size={28} />, title: "Excellence", desc: "Striving for perfection in every detail of your stay.", color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfcf0] overflow-hidden">
      {/* Immersive Header */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white">
        <div className="absolute inset-0" ref={storyRef}>
          <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1920" alt="Resort" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            Since 2012
          </div>
          <h1 className="text-5xl md:text-9xl font-bold mb-6 tracking-tighter">
            Our <span className="text-emerald-400 italic font-serif">Legacy</span>
          </h1>
          <p className="text-base md:text-2xl opacity-90 font-medium">
            From a private family sanctuary to an award-winning resort.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="reveal-left space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">The heart of a <br/><span className="text-emerald-600 italic font-serif">true getaway</span></h2>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed">
                Cattleya Resort was born from a simple dream: to create a space where the noise of the city fades away.
              </p>
              <div className="flex gap-8 pt-6 border-t border-slate-100">
                <div><h4 className="text-2xl md:text-4xl font-black text-emerald-600">12+</h4><p className="text-[8px] font-black uppercase text-slate-400">Years</p></div>
                <div><h4 className="text-2xl md:text-4xl font-black text-emerald-600">10k+</h4><p className="text-[8px] font-black uppercase text-slate-400">Guests</p></div>
              </div>
            </div>
            <div className="reveal grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800" className="rounded-2xl md:rounded-[3rem] mt-8" alt="Pool" />
               <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" className="rounded-2xl md:rounded-[3rem]" alt="Room" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="reveal bg-slate-50 p-8 rounded-[2rem] text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 ${v.color}`}>
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{v.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
