import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

const TravellerDetails = () => {
  const navigate = useNavigate();

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
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/30">2</div>
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

        <div className="flex gap-8 items-start">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h2 className="text-2xl font-extrabold text-brand-black mb-6">Adult 1 (Primary Contact)</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">First & Middle Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
                    <input type="text" placeholder="John Doe" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Last Name</label>
                  <input type="text" placeholder="Smith" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Date of Birth</label>
                  <input type="date" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Gender</label>
                  <select className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all appearance-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-brand-black mb-4 mt-8 pt-8 border-t border-black/5">Contact Information</h3>
              <p className="text-sm text-brand-black/60 mb-6 font-medium">Your e-ticket and flight updates will be sent here.</p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
                    <input type="email" placeholder="john@example.com" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
                    <input type="tel" placeholder="+91 9876543210" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button onClick={() => navigate(-1)} className="px-6 py-4 font-bold text-brand-black/60 hover:text-brand-black transition-colors flex items-center gap-2">
                <ArrowLeft size={18} /> Back
              </button>
              <button onClick={() => navigate('/seat-selection')} className="px-12 py-4 bg-brand-black text-white rounded-xl font-bold transition-all hover:bg-brand-red hover:shadow-lg active:scale-95 flex items-center gap-2">
                Continue to Seats <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Sidebar Mini Fare */}
          <div className="w-[300px] bg-white rounded-3xl p-6 border border-black/5 shadow-md sticky top-24">
            <h4 className="font-extrabold text-brand-black mb-4">Itinerary</h4>
            <div className="text-sm font-bold text-brand-black/60 mb-2">DEL → LHR</div>
            <div className="text-xs text-brand-black/40 font-semibold mb-6">25 Oct • 1 Adult</div>
            <div className="border-t border-black/5 pt-4 flex justify-between items-center">
              <span className="font-bold text-brand-black/60 text-sm">Total</span>
              <span className="text-xl font-black text-brand-black">₹46,500</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TravellerDetails;
