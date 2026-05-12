import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Download, Home, Share2, Plane, MapPin, Calendar, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, flight } = location.state || {};

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Booking Found</h2>
          <button onClick={() => navigate('/')} className="text-brand-red font-bold underline">Go back home</button>
        </div>
      </div>
    );
  }

  const pnr = booking.pnr || "FL-PENDING";

  return (
    <div className="min-h-screen bg-[#f4f7f9] py-20 px-6">
      <div className="max-w-[800px] mx-auto">
        
        {/* Success Banner */}
        <div className="bg-white rounded-[40px] p-12 border border-black/5 shadow-2xl text-center relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <CheckCircle size={48} strokeWidth={2.5} />
          </motion.div>

          <h1 className="text-4xl font-black text-brand-black mb-4 tracking-tight">Booking Confirmed!</h1>
          <p className="text-brand-black/50 font-medium mb-8 text-lg">
            Pack your bags! Your flight to <span className="text-brand-black font-bold">{flight?.to || 'destination'}</span> has been successfully booked.
          </p>

          <div className="bg-black/[0.02] border border-black/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <div className="text-xs font-black text-brand-black/30 uppercase tracking-widest mb-1">Airline PNR</div>
              <div className="text-4xl font-black text-brand-red tracking-widest uppercase">{pnr}</div>
            </div>
            <div className="h-12 w-[1px] bg-black/10 hidden md:block" />
            <div className="text-left">
              <div className="text-xs font-black text-brand-black/30 uppercase tracking-widest mb-1">Booking ID</div>
              <div className="text-xl font-bold text-brand-black uppercase">{booking.bookingId}</div>
            </div>
            <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-black/60 hover:text-brand-black hover:shadow-xl transition-all border border-black/5 shadow-md">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Flight Details Card */}
        <div className="bg-white rounded-[40px] border border-black/5 shadow-xl overflow-hidden mb-8">
           <div className="bg-black/[0.02] px-10 py-6 border-b border-black/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <Plane size={20} className="text-brand-red" />
                 <h3 className="text-sm font-black text-brand-black uppercase tracking-widest">Flight Details</h3>
              </div>
              <span className="text-xs font-bold text-brand-black/40">{flight?.airline} • {flight?.flight}</span>
           </div>
           <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                 <div className="flex-1">
                    <div className="text-4xl font-black text-brand-black mb-1">{flight?.time}</div>
                    <div className="text-lg font-bold text-brand-black/40">{flight?.from}</div>
                 </div>
                 <div className="flex-[2] flex flex-col items-center px-8 text-center">
                    <div className="text-[10px] font-black text-brand-black/30 uppercase tracking-widest mb-2">{flight?.dur}</div>
                    <div className="w-full h-[2px] bg-black/5 relative flex items-center justify-center">
                       <div className="w-3 h-3 rounded-full bg-brand-red" />
                    </div>
                 </div>
                 <div className="flex-1 text-right">
                    <div className="text-4xl font-black text-brand-black mb-1">{flight?.arrival}</div>
                    <div className="text-lg font-bold text-brand-black/40">{flight?.to}</div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/5">
                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-brand-black/30 uppercase tracking-widest">Travellers</h4>
                    <div className="space-y-2">
                       {booking.passengers?.map((p, idx) => (
                         <div key={idx} className="flex items-center gap-3 text-sm font-bold text-brand-black">
                            <User size={16} className="text-brand-red" />
                            {p.Title} {p.FirstName} {p.LastName}
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-brand-black/30 uppercase tracking-widest">Booking Status</h4>
                    <div className="flex items-center gap-2 text-green-600 font-black">
                       <CheckCircle size={18} /> CONFIRMED
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-brand-black text-white h-16 rounded-3xl font-black uppercase tracking-widest transition-all hover:bg-brand-red active:scale-95 shadow-xl flex items-center justify-center gap-3">
            <Download size={20} /> Download Ticket
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex-1 bg-white text-brand-black border border-black/10 h-16 rounded-3xl font-black uppercase tracking-widest transition-all hover:bg-black/[0.02] active:scale-95 flex items-center justify-center gap-3 shadow-lg"
          >
            <Home size={20} /> Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingSuccess;
