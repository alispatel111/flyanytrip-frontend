import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Home, Share2 } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();

  // Generate a mock PNR
  const pnr = "FL" + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-black/[0.02] flex items-center justify-center py-20 px-6">
      <div className="bg-white rounded-[40px] p-12 border border-black/5 shadow-2xl max-w-[600px] w-full text-center relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-red" />
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-brand-red/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle size={48} strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl font-black text-brand-black mb-4 tracking-tight">Booking Confirmed!</h1>
        <p className="text-brand-black/50 font-medium mb-8 text-lg">
          Your flight to London has been successfully booked. We've sent the e-ticket to your email.
        </p>

        <div className="bg-black/[0.02] border border-black/5 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div className="text-left">
            <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest mb-1">Booking Reference (PNR)</div>
            <div className="text-3xl font-black text-brand-red tracking-widest">{pnr}</div>
          </div>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-black/60 hover:text-brand-black hover:shadow-md transition-all border border-black/5">
            <Share2 size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <button className="w-full bg-brand-black text-white h-14 rounded-xl font-bold transition-all hover:bg-brand-red active:scale-95 shadow-lg flex items-center justify-center gap-2">
            <Download size={18} /> Download E-Ticket
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white text-brand-black border border-black/10 h-14 rounded-xl font-bold transition-all hover:bg-black/[0.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <Home size={18} /> Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingSuccess;
