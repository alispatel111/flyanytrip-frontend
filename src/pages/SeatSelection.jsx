import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Armchair, ArrowRight, ArrowLeft } from 'lucide-react';

const SeatSelection = () => {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(null);

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
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/30">3</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Seats</span>
          </div>
          <div className="flex-1 h-[2px] bg-black/10 mx-4" />
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-black/20 text-brand-black flex items-center justify-center font-bold">4</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Payment</span>
          </div>
        </div>

        <div className="flex gap-12 items-start">
          
          {/* Plane Mockup */}
          <div className="w-[300px] bg-white rounded-[40px] p-8 border border-black/5 shadow-md flex flex-col items-center mx-auto">
            <div className="text-center font-black text-brand-black/20 uppercase tracking-widest text-sm mb-8">Cockpit</div>
            
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6].map(row => (
                <div key={row} className="flex gap-6 items-center">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedSeat(`${row}A`)} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${selectedSeat === `${row}A` ? 'bg-brand-red text-white' : 'bg-black/5 text-brand-black/40 hover:bg-brand-red/10 hover:text-brand-red'}`}>
                      <Armchair size={16} />
                    </button>
                    <button onClick={() => setSelectedSeat(`${row}B`)} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${selectedSeat === `${row}B` ? 'bg-brand-red text-white' : 'bg-black/5 text-brand-black/40 hover:bg-brand-red/10 hover:text-brand-red'}`}>
                      <Armchair size={16} />
                    </button>
                  </div>
                  <div className="w-4 text-center text-[10px] font-black text-brand-black/20">{row}</div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedSeat(`${row}C`)} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${selectedSeat === `${row}C` ? 'bg-brand-red text-white' : 'bg-black/5 text-brand-black/40 hover:bg-brand-red/10 hover:text-brand-red'}`}>
                      <Armchair size={16} />
                    </button>
                    <button onClick={() => setSelectedSeat(`${row}D`)} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${selectedSeat === `${row}D` ? 'bg-brand-red text-white' : 'bg-black/5 text-brand-black/40 hover:bg-brand-red/10 hover:text-brand-red'}`}>
                      <Armchair size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center font-black text-brand-black/20 uppercase tracking-widest text-sm">Rear</div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-brand-black mb-4 tracking-tight">Select your seat</h1>
            <p className="text-brand-black/50 font-medium mb-12">Choose where you'd like to sit during your flight.</p>

            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-brand-black mb-6">Selection Summary</h3>
              {selectedSeat ? (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Armchair className="text-green-600" />
                    <div>
                      <div className="font-bold text-green-800">Seat {selectedSeat}</div>
                      <div className="text-xs font-semibold text-green-600/70">Window/Aisle (Free)</div>
                    </div>
                  </div>
                  <div className="font-black text-green-800">₹0</div>
                </div>
              ) : (
                <div className="text-center py-8 text-brand-black/40 font-bold bg-black/[0.02] rounded-xl border border-dashed border-black/10">
                  No seat selected yet. Click on the map to select.
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button onClick={() => navigate(-1)} className="px-6 py-4 font-bold text-brand-black/60 hover:text-brand-black transition-colors flex items-center gap-2">
                <ArrowLeft size={18} /> Back
              </button>
              <button 
                onClick={() => navigate('/payment')} 
                className="px-12 py-4 bg-brand-black text-white rounded-xl font-bold transition-all hover:bg-brand-red hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                Proceed to Payment <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
