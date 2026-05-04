import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const BookingReview = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black/[0.02] py-12">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/30">1</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Review</span>
          </div>
          <div className="flex-1 h-[2px] bg-black/10 mx-4" />
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-black/20 text-brand-black flex items-center justify-center font-bold">2</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Traveller</span>
          </div>
          <div className="flex-1 h-[2px] bg-black/10 mx-4" />
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-black/20 text-brand-black flex items-center justify-center font-bold">3</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Seats</span>
          </div>
          <div className="flex-1 h-[2px] bg-black/10 mx-4" />
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-black/20 text-brand-black flex items-center justify-center font-bold">4</div>
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Payment</span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-brand-black mb-8 tracking-tight">Review Your Flight</h1>

        <div className="flex gap-8 items-start">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Flight Itinerary Card */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5">
                <div className="w-12 h-12 bg-brand-red/5 text-brand-red rounded-xl flex items-center justify-center">
                  <Plane size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-black">New Delhi (DEL) to London (LHR)</h3>
                  <div className="flex items-center gap-4 text-brand-black/60 font-medium text-sm mt-1">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> 25 Oct, 2026</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> 9h 15m Non-Stop</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-black/[0.02] p-6 rounded-2xl">
                <div>
                  <div className="text-3xl font-black text-brand-black mb-1">02:30</div>
                  <div className="text-sm font-bold text-brand-black/50">DEL - New Delhi</div>
                </div>
                <div className="flex flex-col items-center flex-1 mx-8 relative">
                  <div className="w-full border-t-2 border-dashed border-black/20 absolute top-1/2 -translate-y-1/2" />
                  <Plane size={24} className="text-brand-red bg-white relative z-10 p-1 rounded-full" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-brand-black mb-1">07:15</div>
                  <div className="text-sm font-bold text-brand-black/50">LHR - London</div>
                </div>
              </div>
            </div>

            {/* Baggage Info */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-black mb-1">Included Baggage</h3>
                <p className="text-brand-black/60 text-sm">Cabin: 7kg (1 piece) • Check-in: 25kg (1 piece)</p>
              </div>
            </div>

          </div>

          {/* Right Sidebar - Fare Summary */}
          <div className="w-[350px] bg-white rounded-3xl p-8 border border-black/5 shadow-lg sticky top-24">
            <h3 className="text-xl font-extrabold text-brand-black mb-6">Fare Summary</h3>
            
            <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-black/5 text-sm font-semibold text-brand-black/70">
              <div className="flex justify-between items-center">
                <span>Base Fare (1 Adult)</span>
                <span className="text-brand-black font-bold">₹42,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxes & Fees</span>
                <span className="text-brand-black font-bold">₹6,000</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span>Promotional Discount</span>
                <span>- ₹1,500</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest mb-1">Total Amount</div>
                <div className="text-3xl font-black text-brand-black tracking-tight">₹46,500</div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/traveller-details')}
              className="w-full bg-brand-black text-white h-14 rounded-xl font-bold transition-all hover:bg-brand-red active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={18} />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-brand-black/40">
              <ShieldCheck size={16} /> 100% Safe & Secure Booking
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingReview;
