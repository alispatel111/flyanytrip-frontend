import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight, X, ShieldAlert, Check, Info, Luggage, Armchair, Coffee, Zap, Plane } from 'lucide-react';

export const FareUpdateModal = ({ isOpen, onClose, onAccept, oldFare, newFare }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
        >
          <div className="p-8">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <AlertCircle size={32} className="text-amber-500" />
            </div>
            
            <h3 className="text-2xl font-black text-brand-black mb-2 tracking-tight">Fare Updated!</h3>
            <p className="text-brand-black/60 font-medium mb-8">
              The airline has updated the fare for this flight. Please review the updated pricing before proceeding.
            </p>

            <div className="bg-black/[0.02] rounded-2xl p-6 mb-8 border border-black/5">
              <div className="flex items-center justify-between gap-4">
                <div className="text-center flex-1">
                  <div className="text-[11px] font-bold text-brand-black/40 uppercase tracking-widest mb-1">Old Fare</div>
                  <div className="text-xl font-black text-brand-black/40 line-through">₹{oldFare}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5">
                  <ArrowRight size={20} className="text-brand-red" />
                </div>
                <div className="text-center flex-1">
                  <div className="text-[11px] font-bold text-brand-red uppercase tracking-widest mb-1">New Fare</div>
                  <div className="text-2xl font-black text-brand-black">₹{newFare}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 h-14 rounded-2xl font-bold text-brand-black border border-black/10 hover:bg-black/5 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={onAccept}
                className="flex-1 h-14 rounded-2xl font-bold text-white bg-brand-red shadow-lg shadow-brand-red/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const SoldOutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
        >
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShieldAlert size={40} className="text-red-500" />
            </div>
            
            <h3 className="text-2xl font-black text-brand-black mb-2 tracking-tight">Flight Sold Out!</h3>
            <p className="text-brand-black/60 font-medium mb-8">
              This flight is no longer available at the moment. This usually happens when the last few seats are booked by other travelers.
            </p>

            <button 
              onClick={onClose}
              className="w-full h-14 rounded-2xl font-bold text-white bg-brand-black hover:bg-brand-red transition-all active:scale-95 shadow-lg"
            >
              Search Other Flights
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const FlightFareModal = ({ isOpen, onClose, flight, onContinue, revalidating }) => {
  const [clickedOptionIdx, setClickedOptionIdx] = React.useState(null);

  useEffect(() => {
    if (!revalidating) {
      setClickedOptionIdx(null);
    }
  }, [revalidating]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !flight) return null;

  const getMiniRule = (type) => {
    // Check both PascalCase and camelCase
    const rules = (flight.MiniFareRules || flight.miniFareRules)?.[0] || [];
    const rule = rules.find(r => (r.Type || r.type || '').toLowerCase() === type.toLowerCase());
    return rule ? (rule.Details || rule.details) : null;
  };

  const cancelFee = getMiniRule('Cancellation') || '₹3,999';
  const changeFee = getMiniRule('Reissue') || '₹2,999';
  
  // Clean price for calculation
  const cleanPrice = Number(String(flight.price).replace(/,/g, '')) || 0;

  const fareBreakdown = flight.FareBreakdown || flight.fareBreakdown;
  const cabinBaggage = fareBreakdown?.[0]?.SegmentDetails?.[0]?.CabinBaggage?.FreeText || '7 KG';
  const checkInBaggage = fareBreakdown?.[0]?.SegmentDetails?.[0]?.CheckedInBaggage?.FreeText || '15 KG';

  const fareOptions = [
    {
      name: 'SAVER',
      price: flight.price,
      color: '#448AFF',
      benefits: [
        { icon: <Luggage size={14} />, text: `${cabinBaggage} Cabin Baggage` },
        { icon: <Luggage size={14} />, text: `${checkInBaggage} Check-in Baggage` },
        { icon: <Info size={14} />, text: `Cancellation fee starts at ${cancelFee}` },
        { icon: <Info size={14} />, text: `Date Change fee starts at ${changeFee}` },
        { icon: <Armchair size={14} />, text: 'Chargeable Seats' },
        { icon: <Coffee size={14} />, text: 'Chargeable Meals' },
      ]
    },
    {
      name: 'ANYTRIP SPECIAL',
      price: flight.price,
      color: '#E61E2D',
      isSpecial: true,
      benefits: [
        { icon: <Luggage size={14} />, text: `${cabinBaggage} Cabin Baggage` },
        { icon: <Luggage size={14} />, text: `${checkInBaggage} Check-in Baggage` },
        { icon: <Zap size={14} />, text: 'Exclusive Discount Applied' },
        { icon: <ShieldAlert size={14} />, text: 'Trip Secure Included' },
        { icon: <Armchair size={14} />, text: 'Chargeable Seats' },
        { icon: <Coffee size={14} />, text: 'Chargeable Meals' },
      ]
    },
    {
      name: 'FLEXI',
      price: flight.price,
      color: '#00B894',
      benefits: [
        { icon: <Luggage size={14} />, text: `${cabinBaggage} Cabin Baggage` },
        { icon: <Luggage size={14} />, text: `${checkInBaggage} Check-in Baggage` },
        { icon: <Info size={14} />, text: 'Lower Cancellation fee' },
        { icon: <Info size={14} />, text: 'Lower Date Change fee' },
        { icon: <Armchair size={14} />, text: 'Free Seats Included' },
        { icon: <Coffee size={14} />, text: 'Complimentary Meals' },
      ]
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative bg-[#F4F7F9] rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col mb-12"
        >
          {/* Modal Header */}
          <div className="p-6 bg-white border-b border-black/5 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
               <h3 className="text-xl font-black text-brand-black tracking-tight">Flight Details and Fare Options available for you!</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X size={24} className="text-brand-black/40" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-white rounded-2xl p-4 mb-6 border border-black/5 flex items-center gap-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center">
                     <Plane size={24} className="text-brand-red" />
                  </div>
                  <div>
                     <div className="text-sm font-black text-brand-black">{flight.from} → {flight.to}</div>
                     <div className="text-[11px] font-bold text-brand-black/40 uppercase tracking-widest">{flight.airline} • {flight.dur}</div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {fareOptions.map((option, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all flex flex-col ${option.isSpecial ? 'border-[#E61E2D] shadow-xl relative scale-105 z-10' : 'border-black/5 hover:border-black/10'}`}
                  >
                     {option.isSpecial && (
                        <div className="absolute top-0 right-0 bg-brand-black text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-lg">
                           AnyTrip Special
                        </div>
                     )}
                     
                     <div className="p-5 border-b border-black/5">
                        <div className="flex items-baseline gap-1 mb-1">
                           <span className="text-sm font-bold text-brand-black/60">₹</span>
                           <span className="text-2xl font-black text-brand-black tracking-tight">{option.price}</span>
                           <span className="text-[10px] font-bold text-brand-black/40 uppercase ml-1">per adult</span>
                        </div>
                        <div className="text-[11px] font-black tracking-widest uppercase" style={{ color: option.color }}>
                           {option.name}
                        </div>
                     </div>

                     <div className="p-5 flex-1 space-y-4">
                        {option.benefits.map((benefit, bIdx) => (
                           <div key={bIdx} className="flex items-start gap-3">
                              <div className="mt-0.5 text-green-500">
                                 {benefit.icon}
                              </div>
                              <span className="text-[11px] font-medium text-brand-black/70 leading-tight">{benefit.text}</span>
                           </div>
                        ))}
                     </div>

                     <div className="p-4 bg-black/[0.02]">
                        <button 
                          onClick={() => {
                            setClickedOptionIdx(idx);
                            onContinue({...flight, selectedFare: option.name, price: option.price});
                          }}
                          disabled={revalidating}
                          className={`w-full h-11 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${option.isSpecial ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20 hover:bg-[#CC1A28]' : 'bg-brand-black text-white hover:bg-brand-red'}`}
                        >
                           {revalidating && clickedOptionIdx === idx ? 'Validating...' : 'Book Now'}
                        </button>
                     </div>
                  </div>
               ))}
            </div>
          </div>

          <div className="p-6 bg-white border-t border-black/5 flex items-center justify-between text-[11px] font-bold text-brand-black/40 uppercase tracking-widest">
             <span>*Fare rules and baggage policies vary by airline and ticket type.</span>
             <div className="flex gap-4">
                <span className="cursor-pointer hover:text-brand-red">Fare Rules</span>
                <span className="cursor-pointer hover:text-brand-red">Baggage Policy</span>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
