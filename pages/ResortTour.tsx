
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Map as MapIcon, 
  Navigation, 
  Eye, 
  Info, 
  Play, 
  MapPin, 
  Compass, 
  Search, 
  ChevronRight, 
  Layers, 
  Maximize, 
  Plus, 
  Minus, 
  LocateFixed,
  Waves,
  Home as HomeIcon,
  ChefHat,
  Monitor
} from 'lucide-react';

interface TourSpot {
  id: string;
  name: string;
  sublabel: string;
  description: string;
  x: number; // Satellite Map X %
  y: number; // Satellite Map Y %
  groundImage: string;
  category: 'Pool' | 'Facility' | 'Accommodation';
  coordinates: string;
}

const TOUR_SPOTS: TourSpot[] = [
  { 
    id: 'p1', 
    name: 'Pool 1 (Corazon)', 
    sublabel: 'Main Infinity Pool', 
    description: 'Our most iconic infinity pool with panoramic views of the Rizal mountains.',
    x: 34, y: 44, 
    groundImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200',
    category: 'Pool',
    coordinates: '14.5894° N, 121.1718° E'
  },
  { 
    id: 'p4', 
    name: 'Pool 4 (Dominique)', 
    sublabel: 'Private Oasis', 
    description: 'A secluded dipping pool surrounded by lush tropical ferns and private lounge areas.',
    x: 22, y: 48, 
    groundImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    category: 'Pool',
    coordinates: '14.5892° N, 121.1715° E'
  },
  { 
    id: 'p12', 
    name: 'Pools 12 & 14', 
    sublabel: 'Family Cluster', 
    description: 'Interconnected family pools designed for safe and fun swimming for all ages.',
    x: 78, y: 35, 
    groundImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200',
    category: 'Pool',
    coordinates: '14.5898° N, 121.1725° E'
  },
  { 
    id: 'pavilion', 
    name: 'Garden Pavilion', 
    sublabel: 'Event Space', 
    description: 'A grand open-air space perfect for weddings and large corporate teambuilding events.',
    x: 55, y: 55, 
    groundImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    category: 'Facility',
    coordinates: '14.5890° N, 121.1720° E'
  },
  { 
    id: 'villa-1', 
    name: 'Presidential Villa', 
    sublabel: 'Luxury Stay', 
    description: 'Our most premium accommodation featuring private balconies and direct pool access.',
    x: 40, y: 30, 
    groundImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    category: 'Accommodation',
    coordinates: '14.5900° N, 121.1719° E'
  },
  { 
    id: 'entrance', 
    name: 'Lobby & Reception', 
    sublabel: 'Main Entrance', 
    description: 'The starting point of your Cattleya experience. Check in and get oriented.',
    x: 10, y: 75, 
    groundImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
    category: 'Facility',
    coordinates: '14.5885° N, 121.1710° E'
  }
];

const ResortTour: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'street'>('map');
  const [activeSpot, setActiveSpot] = useState<TourSpot | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpots = TOUR_SPOTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpotSelect = (spot: TourSpot) => {
    setActiveSpot(spot);
    setViewMode('street');
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(0.8, Math.min(2.5, prev + delta)));
  };

  return (
    <div className="h-screen w-full bg-[#e5e3df] overflow-hidden flex flex-col pt-16 md:pt-20 font-sans relative">
      
      {/* Google Maps Styled Sidebar */}
      <div className={`absolute left-0 top-16 md:top-20 bottom-0 z-[70] w-full md:w-96 bg-white shadow-2xl transition-transform duration-500 ease-in-out border-r border-slate-200 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 flex items-center bg-slate-100 rounded-full px-4 py-2">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none w-full ml-2 text-sm text-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {window.innerWidth < 768 && (
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="relative h-40 md:h-48">
            <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Banner" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex items-end p-4 md:p-6">
              <h2 className="text-white text-xl md:text-2xl font-bold">Cattleya Resort</h2>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {filteredSpots.map(spot => (
              <button 
                key={spot.id}
                onClick={() => handleSpotSelect(spot)}
                className={`w-full text-left p-3 md:p-4 rounded-xl flex items-center gap-4 transition-all ${activeSpot?.id === spot.id ? 'bg-emerald-50 border-l-4 border-emerald-600' : 'hover:bg-slate-50'}`}
              >
                <div className={`p-2 rounded-lg ${spot.category === 'Pool' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {spot.category === 'Pool' ? <Waves size={18} /> : <MapPin size={18} />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-sm">{spot.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black">{spot.sublabel}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative bg-[#e5e3df]">
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${viewMode === 'street' ? 'blur-md opacity-20' : 'opacity-100'}`}
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=2400')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${zoom})`
          }}
        >
          {viewMode === 'map' && TOUR_SPOTS.map((spot) => (
            <div 
              key={spot.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-20 group"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onClick={() => handleSpotSelect(spot)}
            >
              <MapPin size={window.innerWidth < 768 ? 32 : 42} fill="#059669" stroke="white" strokeWidth={1} />
            </div>
          ))}
        </div>

        {/* Street View Mode */}
        {viewMode === 'street' && activeSpot && (
          <div className="absolute inset-0 z-[60] bg-black">
            <img src={activeSpot.groundImage} className="w-full h-full object-cover" alt="View" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
            
            <div className="absolute top-4 left-4 flex items-center gap-3">
              <button onClick={() => setViewMode('map')} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white"><X size={20} /></button>
              <h2 className="text-white text-lg md:text-2xl font-bold">{activeSpot.name}</h2>
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-xs bg-white/95 p-5 rounded-2xl shadow-2xl">
              <p className="text-slate-800 text-xs leading-relaxed mb-4">{activeSpot.description}</p>
              <button className="w-full bg-emerald-600 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Reserve Area</button>
            </div>
          </div>
        )}

        {/* HUD Controls */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-[80] flex flex-col gap-2">
          <div className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden">
            <button onClick={() => handleZoom(0.2)} className="p-3 hover:bg-slate-50 text-slate-600 border-b"><Plus size={16} /></button>
            <button onClick={() => handleZoom(-0.2)} className="p-3 hover:bg-slate-50 text-slate-600"><Minus size={16} /></button>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-white p-3 rounded-lg shadow-xl text-slate-600"
          >
            <MapIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResortTour;
