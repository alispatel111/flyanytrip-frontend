import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');

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
            <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Payment</span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-brand-black mb-8 tracking-tight">Secure Payment</h1>

        <div className="flex gap-8 items-start">
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h3 className="text-xl font-bold text-brand-black mb-6">Payment Method</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <button 
                  onClick={() => setMethod('card')}
                  className={`py-4 flex flex-col items-center gap-2 rounded-xl border-2 font-bold transition-all ${method === 'card' ? 'border-brand-red text-brand-red bg-brand-red/5' : 'border-black/5 text-brand-black/60 hover:border-black/20'}`}
                >
                  <CreditCard /> Credit/Debit
                </button>
                <button 
                  onClick={() => setMethod('upi')}
                  className={`py-4 flex flex-col items-center gap-2 rounded-xl border-2 font-bold transition-all ${method === 'upi' ? 'border-brand-red text-brand-red bg-brand-red/5' : 'border-black/5 text-brand-black/60 hover:border-black/20'}`}
                >
                  <Wallet /> UPI
                </button>
                <button 
                  onClick={() => setMethod('net')}
                  className={`py-4 flex flex-col items-center gap-2 rounded-xl border-2 font-bold transition-all ${method === 'net' ? 'border-brand-red text-brand-red bg-brand-red/5' : 'border-black/5 text-brand-black/60 hover:border-black/20'}`}
                >
                  <Building /> Net Banking
                </button>
              </div>

              {method === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">CVV</label>
                      <input type="password" placeholder="123" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Name on Card</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white" />
                  </div>
                </div>
              )}

              {method === 'upi' && (
                <div className="py-8 text-center border-2 border-dashed border-black/10 rounded-xl bg-black/[0.02]">
                  <p className="font-bold text-brand-black/60 mb-4">Enter your VPA / UPI ID</p>
                  <input type="text" placeholder="username@bank" className="w-2/3 bg-white border border-black/10 rounded-xl py-4 px-4 text-center text-brand-black font-semibold focus:outline-none focus:border-brand-red mx-auto block" />
                </div>
              )}

              {method === 'net' && (
                <div className="py-8 text-center border-2 border-dashed border-black/10 rounded-xl bg-black/[0.02]">
                  <p className="font-bold text-brand-black/60">Select your bank from the dropdown</p>
                  <select className="mt-4 w-2/3 bg-white border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red mx-auto block appearance-none">
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}

            </div>
          </div>

          <div className="w-[350px] bg-white rounded-3xl p-8 border border-black/5 shadow-lg sticky top-24">
            <h3 className="text-xl font-extrabold text-brand-black mb-6">Payment Details</h3>
            
            <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-black/5 text-sm font-semibold text-brand-black/70">
              <div className="flex justify-between items-center">
                <span>Total Fare</span>
                <span className="text-brand-black font-bold">₹46,500</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span>Seat Selection</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest mb-1">To Pay</div>
                <div className="text-3xl font-black text-brand-black tracking-tight">₹46,500</div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/booking-success')}
              className="w-full bg-brand-red text-white h-14 rounded-xl font-bold transition-all hover:bg-red-600 active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} /> Pay ₹46,500
            </button>

            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <ShieldCheck size={16} /> AES-256 Bit Encryption
              </div>
              <p className="text-[10px] text-brand-black/40 font-medium">By proceeding, you agree to our Terms of Service & Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
