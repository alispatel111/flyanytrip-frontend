import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Wallet, Building, ShieldCheck, CheckCircle2, Loader2, ArrowLeft, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, grandTotal, travellers, ssrTotal } = location.state || {};
  
  const [method, setMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-black/5">
           <h2 className="text-2xl font-black text-brand-black mb-4">Payment Session Expired</h2>
           <button onClick={() => navigate('/')} className="text-brand-red font-bold underline uppercase tracking-widest text-xs">Go back home</button>
        </div>
      </div>
    );
  }

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      const mockBooking = {
        bookingId: "AT" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        pnr: "PNR" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        status: "Success",
        passengers: travellers.map(t => ({ 
          Title: t.title, 
          FirstName: t.firstName, 
          LastName: t.lastName,
          email: travellers[0].email,
          phone: travellers[0].phone
        }))
      };

      const finalData = { 
        booking: mockBooking,
        flight: flight
      };

      // Store in SessionStorage to avoid 431 Request Header Too Large error
      sessionStorage.setItem('lastBooking', JSON.stringify(finalData));

      // Use a short ID in URL for "secure" look without bloat
      const shortId = btoa(mockBooking.bookingId).substring(0, 12);
      navigate(`/booking-success?id=${shortId}`);
    }, 2500);
  };

  const formatPrice = (p) => Math.ceil(p || 0).toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-black/[0.02] py-12">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
           <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-brand-black/60 hover:text-brand-black transition-all shadow-sm">
              <ArrowLeft size={20} />
           </button>
           <div>
              <h1 className="text-2xl font-black text-brand-black tracking-tight">Secure Payment</h1>
              <p className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">Complete your booking for {flight.from} → {flight.to}</p>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full">
            <div className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-xl shadow-black/5">
              <h3 className="text-sm font-black text-brand-black uppercase tracking-widest mb-6 flex items-center gap-2">
                 <CreditCard size={16} className="text-brand-red" /> Select Payment Method
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button 
                  onClick={() => setMethod('card')}
                  className={`py-4 flex flex-col items-center gap-2 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${method === 'card' ? 'border-brand-red text-brand-red bg-brand-red/5' : 'border-black/5 text-brand-black/40 hover:border-black/20'}`}
                >
                  <CreditCard size={20} /> Credit/Debit Card
                </button>
                <button 
                  onClick={() => setMethod('upi')}
                  className={`py-4 flex flex-col items-center gap-2 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${method === 'upi' ? 'border-brand-red text-brand-red bg-brand-red/5' : 'border-black/5 text-brand-black/40 hover:border-black/20'}`}
                >
                  <Wallet size={20} /> UPI / VPA
                </button>
                <button 
                  onClick={() => setMethod('net')}
                  className={`py-4 flex flex-col items-center gap-2 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${method === 'net' ? 'border-brand-red text-brand-red bg-brand-red/5' : 'border-black/5 text-brand-black/40 hover:border-black/20'}`}
                >
                  <Building size={20} /> Net Banking
                </button>
              </div>

              <div className="bg-black/[0.02] p-6 rounded-2xl border border-black/5 mb-6">
                {method === 'card' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-brand-black/40 uppercase tracking-widest mb-1.5">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-black/10 rounded-xl py-3 px-4 text-xs font-black text-brand-black focus:outline-none focus:border-brand-red transition-all" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-brand-black/40 uppercase tracking-widest mb-1.5">Name on Card</label>
                        <input type="text" placeholder="HOLDER NAME" className="w-full bg-white border border-black/10 rounded-xl py-3 px-4 text-xs font-black text-brand-black focus:outline-none focus:border-brand-red transition-all uppercase" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-brand-black/40 uppercase tracking-widest mb-1.5">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-white border border-black/10 rounded-xl py-3 px-4 text-xs font-black text-brand-black focus:outline-none focus:border-brand-red transition-all" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-brand-black/40 uppercase tracking-widest mb-1.5">CVV Code</label>
                        <input type="password" placeholder="***" className="w-full bg-white border border-black/10 rounded-xl py-3 px-4 text-xs font-black text-brand-black focus:outline-none focus:border-brand-red transition-all" />
                      </div>
                    </div>
                  </div>
                )}

                {method === 'upi' && (
                  <div className="py-4 text-center">
                    <p className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest mb-4">Enter your VPA / UPI ID</p>
                    <input type="text" placeholder="username@bank" className="w-full max-w-sm bg-white border border-black/10 rounded-xl py-4 px-4 text-center text-sm font-black text-brand-black focus:outline-none focus:border-brand-red mx-auto block" />
                  </div>
                )}

                {method === 'net' && (
                  <div className="py-4 text-center">
                    <p className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest mb-4">Select your bank</p>
                    <select className="w-full max-w-sm bg-white border border-black/10 rounded-xl py-4 px-4 text-sm font-black text-brand-black focus:outline-none focus:border-brand-red mx-auto block appearance-none text-center">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                 <ShieldCheck size={20} className="text-green-600" />
                 <div className="text-[10px] font-bold text-green-700 leading-tight">
                    Your payment is secured with <span className="font-black">256-bit AES encryption</span>. We do not store your full card details.
                 </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[380px] shrink-0 sticky top-24">
            <div className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-xl shadow-black/5">
              <h3 className="text-sm font-black text-brand-black uppercase tracking-widest mb-6">Fare Summary</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-black/5">
                <div className="flex justify-between items-center text-xs font-bold text-brand-black/60">
                  <span>Base Fare ({travellers?.length || 1} Pax)</span>
                  <span className="text-brand-black font-black">₹{formatPrice(grandTotal - ssrTotal)}</span>
                </div>
                {ssrTotal > 0 && (
                  <div className="flex justify-between items-center text-xs font-bold text-brand-black/60">
                    <span>Add-ons (Seats/Meals)</span>
                    <span className="text-brand-black font-black">₹{formatPrice(ssrTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs font-bold text-brand-black/60">
                  <span>Convenience Fee</span>
                  <span className="text-green-600 font-black">FREE</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-black text-brand-black/30 uppercase tracking-widest mb-1">Total Amount</div>
                <div className="text-4xl font-black text-brand-black tracking-tight">₹{formatPrice(grandTotal)}</div>
              </div>

              <button 
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full bg-brand-red text-white h-16 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-brand-red/20 flex items-center justify-center gap-3 disabled:bg-brand-red/50 disabled:active:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    Pay ₹{formatPrice(grandTotal)}
                  </>
                )}
              </button>

              <div className="mt-6 flex flex-col items-center gap-4">
                 <div className="flex items-center gap-4 opacity-30 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/1200px-UPI-Logo.png" className="h-4" alt="UPI" />
                 </div>
                 <p className="text-[9px] text-brand-black/30 font-bold text-center">By clicking pay, you agree to our booking policies & conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
