import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Coffee, Luggage, ShieldCheck, Check } from 'lucide-react';

const Addons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, fareQuote, travellers, selectedSeats, ssrData } = location.state || {};
  
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedBaggage, setSelectedBaggage] = useState([]);

  if (!flight) return null;

  return (
    <div className="min-h-screen bg-black/[0.02] py-12">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/30">✓</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Review</span>
          </div>
          <div className="flex-1 h-[2px] bg-brand-red mx-4" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/30">✓</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Traveller</span>
          </div>
          <div className="flex-1 h-[2px] bg-brand-red mx-4" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/30">✓</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Seats</span>
          </div>
          <div className="flex-1 h-[2px] bg-brand-red mx-4" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/30">4</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Add-ons</span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-brand-black mb-4 tracking-tight">Enhance your journey</h1>
        <p className="text-brand-black/50 font-medium mb-12">Add extra comfort and security to your flight.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Meal Addon */}
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Coffee size={28} />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-2">In-flight Meal</h3>
            <p className="text-brand-black/60 text-sm mb-6 leading-relaxed">
              {ssrData?.Meal?.[0]?.length > 0 ? "Choose from available meals for your flight." : "Choose from our curated menu of delicious hot meals and beverages."}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-black text-brand-black text-xl">₹ {ssrData?.Meal?.[0]?.[0]?.Price || 450}</span>
              <button 
                onClick={() => setSelectedMeals([...selectedMeals, ssrData?.Meal?.[0]?.[0] || { name: 'Standard Meal', price: 450 }])}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${selectedMeals.length > 0 ? 'bg-green-500 text-white' : 'bg-black/5 text-brand-black hover:bg-brand-red hover:text-white'}`}
              >
                {selectedMeals.length > 0 ? 'Added' : '+ Add Meal'}
              </button>
            </div>
          </div>

          {/* Excess Baggage */}
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Luggage size={28} />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-2">Excess Baggage</h3>
            <p className="text-brand-black/60 text-sm mb-6 leading-relaxed">
               {ssrData?.Baggage?.[0]?.length > 0 ? "Select extra baggage weight for your journey." : "Need more space? Pre-book extra baggage and save up to 20%."}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-black text-brand-black text-xl">₹ {ssrData?.Baggage?.[0]?.[0]?.Price || 1200}</span>
              <button 
                onClick={() => setSelectedBaggage([...selectedBaggage, ssrData?.Baggage?.[0]?.[0] || { weight: '5KG', price: 1200 }])}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${selectedBaggage.length > 0 ? 'bg-green-500 text-white' : 'bg-black/5 text-brand-black hover:bg-brand-red hover:text-white'}`}
              >
                {selectedBaggage.length > 0 ? 'Added' : '+ Add 5KG'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="px-6 py-4 font-bold text-brand-black/60 hover:text-brand-black transition-colors flex items-center gap-2">
            <ArrowLeft size={18} /> Back
          </button>
          <button 
            onClick={() => navigate('/booking-review', { 
              state: { 
                flight, 
                fareQuote, 
                travellers, 
                ssrSelections: {
                  seats: selectedSeats,
                  meals: selectedMeals,
                  baggage: selectedBaggage
                }
              } 
            })} 
            className="px-12 py-4 bg-brand-black text-white rounded-xl font-bold transition-all hover:bg-brand-red hover:shadow-lg active:scale-95 flex items-center gap-2"
          >
            Review & Pay <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Addons;
