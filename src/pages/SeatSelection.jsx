import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Armchair, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import api from '../services/api';

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, fareQuote, travellers } = location.state || {};
  const [ssrData, setSsrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]); // Multiple travellers

  React.useEffect(() => {
    const fetchSSR = async () => {
      try {
        const res = await api.post('/api/flights/ssr', {
          traceId: flight.traceId,
          resultIndex: flight.resultIndex,
          tokenId: flight.tokenId
        });
        if (res.data.success) {
          setSsrData(res.data.data);
        }
      } catch (err) {
        console.error("SSR Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (flight) fetchSSR();
  }, [flight]);

  if (!flight) return null;

  const handleSeatClick = (seat, travellerIdx) => {
    const newSelected = [...selectedSeats];
    newSelected[travellerIdx] = seat;
    setSelectedSeats(newSelected);
  };

  return (
    <div className="min-h-screen bg-black/[0.02] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        
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
              <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Add-ons</span>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Seat Map Section */}
          <div className="flex-1 w-full">
            <h1 className="text-4xl font-extrabold text-brand-black mb-4 tracking-tight">Select Seats</h1>
            <p className="text-brand-black/50 font-medium mb-12">Choose seats for all travellers. Prices vary by location.</p>

            {loading ? (
              <div className="bg-white rounded-[40px] p-20 border border-black/5 flex flex-col items-center justify-center">
                 <Loader2 className="animate-spin text-brand-red mb-4" size={48} />
                 <p className="text-brand-black/40 font-black uppercase tracking-widest text-sm">Fetching Live Seat Map...</p>
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-xl overflow-x-auto">
                 <div className="min-w-[400px] flex flex-col items-center">
                    <div className="w-full max-w-[400px] h-24 bg-black/[0.03] rounded-t-[100px] mb-12 flex items-center justify-center border-t-4 border-brand-red/20">
                       <span className="text-[10px] font-black text-brand-black/20 uppercase tracking-[0.5em]">Cockpit</span>
                    </div>

                    <div className="flex flex-col gap-3">
                       {/* Simplified Seat Grid Logic - Adivaha SSR provides row-wise data */}
                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(row => (
                         <div key={row} className="flex gap-4 md:gap-8 items-center">
                            <div className="flex gap-2">
                               {['A', 'B', 'C'].map(col => {
                                 const seatId = `${row}${col}`;
                                 const isSelected = selectedSeats.includes(seatId);
                                 return (
                                   <button 
                                     key={col}
                                     onClick={() => {
                                        const travellerIdx = selectedSeats.length < travellers.length ? selectedSeats.length : 0;
                                        handleSeatClick(seatId, travellerIdx);
                                     }}
                                     className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2 ${isSelected ? 'bg-brand-red border-brand-red text-white' : 'bg-black/[0.02] border-black/5 text-brand-black/30 hover:border-brand-red/30'}`}
                                   >
                                      <Armchair size={16} />
                                   </button>
                                 );
                               })}
                            </div>
                            <div className="w-8 text-center text-xs font-black text-brand-black/20">{row}</div>
                            <div className="flex gap-2">
                               {['D', 'E', 'F'].map(col => {
                                 const seatId = `${row}${col}`;
                                 const isSelected = selectedSeats.includes(seatId);
                                 return (
                                   <button 
                                     key={col}
                                     onClick={() => {
                                        const travellerIdx = selectedSeats.length < travellers.length ? selectedSeats.length : 0;
                                        handleSeatClick(seatId, travellerIdx);
                                     }}
                                     className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2 ${isSelected ? 'bg-brand-red border-brand-red text-white' : 'bg-black/[0.02] border-black/5 text-brand-black/30 hover:border-brand-red/30'}`}
                                   >
                                      <Armchair size={16} />
                                   </button>
                                 );
                               })}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Selection Sidebar */}
          <div className="w-full lg:w-[380px] shrink-0 sticky top-24">
             <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-xl">
                <h3 className="text-xl font-black text-brand-black mb-8">Travellers</h3>
                <div className="space-y-4 mb-8">
                   {travellers.map((t, idx) => (
                     <div key={idx} className={`p-4 rounded-2xl border transition-all ${selectedSeats[idx] ? 'border-green-100 bg-green-50' : 'border-black/5 bg-black/[0.02]'}`}>
                        <div className="flex justify-between items-center">
                           <div className="text-sm font-bold text-brand-black/60">{t.firstName} {t.lastName}</div>
                           {selectedSeats[idx] ? (
                             <div className="text-sm font-black text-green-600">Seat {selectedSeats[idx]}</div>
                           ) : (
                             <div className="text-[10px] font-black text-brand-red uppercase tracking-widest animate-pulse">Select Seat</div>
                           )}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="bg-black/5 h-[1px] mb-8" />

                <div className="flex justify-between items-end mb-10">
                   <div>
                      <div className="text-[10px] font-black text-brand-black/30 uppercase tracking-widest mb-1">Total Seat Price</div>
                      <div className="text-3xl font-black text-brand-black tracking-tighter">₹0</div>
                   </div>
                </div>

                <button 
                  onClick={() => navigate('/addons', { state: { flight, fareQuote, travellers, selectedSeats, ssrData } })} 
                  disabled={selectedSeats.filter(Boolean).length < travellers.length}
                  className="w-full bg-brand-black text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-brand-black/20 hover:bg-brand-red hover:shadow-brand-red/20 active:scale-95 transition-all disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center gap-3"
                >
                  Continue <ArrowRight size={20} />
                </button>

                <button onClick={() => navigate(-1)} className="w-full mt-4 py-3 text-xs font-black text-brand-black/30 uppercase tracking-widest hover:text-brand-black transition-colors">
                   Back to Travellers
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
