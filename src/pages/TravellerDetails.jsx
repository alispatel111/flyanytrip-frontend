import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, ArrowRight, ArrowLeft, Info, AlertTriangle, ShieldCheck, Check, Lock, ChevronDown, BaggageClaim, Clock, MapPin } from 'lucide-react';

const TravellerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, fareQuote } = location.state || {};
  
  const [tripSecure, setTripSecure] = useState('yes');
  const [hasGST, setHasGST] = useState(false);

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

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            
            {/* Important Information */}
            <div className="bg-amber-50/50 rounded-3xl border border-amber-200/50 overflow-hidden">
              <div className="bg-amber-100/50 px-6 py-4 flex items-center gap-3">
                <AlertTriangle className="text-amber-600" size={20} />
                <h2 className="text-lg font-bold text-amber-900">Important Information</h2>
              </div>
              <div className="p-6 text-sm text-brand-black/80 space-y-6">
                <div>
                  <h3 className="font-bold text-brand-black mb-2 flex items-center gap-2"><MapPin size={16}/> Nearby Airport</h3>
                  <div className="space-y-4">
                    <p className="bg-white p-3 rounded-xl border border-black/5">Your Flight goes from <strong>Ghaziabad</strong>, near Indira Gandhi International Airport. Please note, this is not the airport you originally searched for. Kindly check all the routes to your desired destination to avoid any hassles in your journey.</p>
                    <p className="bg-white p-3 rounded-xl border border-black/5">Your Flight goes to <strong>Navi Mumbai</strong>, near Chhatrapati Shivaji International Airport. Please note, this is not the airport you originally searched for. Kindly check all the routes to your desired destination to avoid any hassles in your journey.</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-brand-black mb-2">Check travel guidelines and baggage information below:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-brand-black mb-2">Availability of Boarding Pass:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Once web check-in is completed, your boarding pass will be available within 6 hours of your flight departure.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-brand-black mb-2">Unaccompanied Minors Travelling:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>An unaccompanied minor usually refers to a child traveling without an adult aged 18 or older.</li>
                    <li>Please check with the airline for their rules and regulations regarding unaccompanied minors, as these can differ between airlines.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trip Secure */}
            <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-green-50 text-green-600 px-4 py-1.5 rounded-bl-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck size={14}/> Recommended for your travel within India
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-brand-black">Trip Secure</h2>
                    <p className="text-sm font-bold text-brand-black/60">₹ 299 /Traveller (18% GST included)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
                  <div className="bg-black/[0.02] p-4 rounded-xl text-center">
                    <div className="font-bold text-brand-black text-sm mb-1">24x7 support</div>
                  </div>
                  <div className="bg-black/[0.02] p-4 rounded-xl text-center">
                    <div className="font-bold text-brand-black text-sm mb-1">Delayed/lost baggage Assistance</div>
                    <div className="text-xs text-brand-black/50 font-semibold">Flat ₹ 50,000</div>
                  </div>
                  <div className="bg-black/[0.02] p-4 rounded-xl text-center">
                    <div className="font-bold text-brand-black text-sm mb-1">Personal Accident</div>
                    <div className="text-xs text-brand-black/50 font-semibold">Flat ₹ 2,000</div>
                  </div>
                  <div className="bg-black/[0.02] p-4 rounded-xl text-center flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
                    <div className="font-bold text-blue-600 text-sm">View All Benefits</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${tripSecure === 'yes' ? 'border-green-500 bg-green-50/30' : 'border-black/5 hover:border-black/20'}`}>
                    <input type="radio" name="tripSecure" value="yes" checked={tripSecure === 'yes'} onChange={(e) => setTripSecure(e.target.value)} className="w-5 h-5 accent-green-600" />
                    <span className="font-bold text-brand-black">Yes, Secure my trip.</span>
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${tripSecure === 'no' ? 'border-brand-black bg-black/[0.02]' : 'border-black/5 hover:border-black/20'}`}>
                    <input type="radio" name="tripSecure" value="no" checked={tripSecure === 'no'} onChange={(e) => setTripSecure(e.target.value)} className="w-5 h-5 accent-brand-black" />
                    <span className="font-bold text-brand-black">No, I will book without trip secure.</span>
                  </label>
                </div>

                <div className="bg-black/[0.02] p-6 rounded-2xl mb-6">
                  <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest mb-4">Preferred by millions of travellers</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm text-sm">
                      <p className="italic text-brand-black/80 mb-2">"Your willingness to go above and beyond what was expected made a significant difference in my abilit..."</p>
                      <div className="font-bold text-brand-black/60">~ Amit Paul</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm text-sm">
                      <p className="italic text-brand-black/80 mb-2">"Wow, the claim settlement was incredibly fast. Thank you so much! Such a smooth experience. Apprecia..."</p>
                      <div className="font-bold text-brand-black/60">~ Prateek Keshari</div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-black/50 font-medium">Trip Secure is non-refundable. By selecting it, I confirm all travelers are Indian nationals, aged 6 months to 90 years, and accept the T&Cs</p>
              </div>
            </div>

            {/* IndiGo Fast Forward */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold mb-1">IndiGo Fast Forward</h2>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    APPLY CODE: PRIORITY TO GET 250 OFF
                  </div>
                  <p className="text-white/80 text-sm max-w-md leading-relaxed">
                    A service that provides you a hassle free and comfortable check-in experience at the airport with our priority check-in counter.
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm text-center min-w-[200px]">
                  <div className="text-xs font-bold text-white/60 mb-2 uppercase tracking-widest">Priority Check-in + Any Time Boarding</div>
                  <div className="text-3xl font-black mb-4">₹ 330</div>
                  <button className="w-full bg-white text-blue-900 font-bold py-2 rounded-xl hover:bg-gray-100 transition-colors shadow-lg active:scale-95">
                    + ADD
                  </button>
                </div>
              </div>
            </div>

            {/* Traveller Details */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-black/5 gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-brand-black mb-1">Traveller Details</h2>
                  <p className="text-sm font-semibold text-brand-black/60">Log in to view your saved traveller list, unlock amazing deals & much more!</p>
                </div>
                <button className="px-6 py-2.5 bg-brand-red/10 text-brand-red rounded-xl font-bold hover:bg-brand-red hover:text-white transition-all">
                  LOGIN NOW
                </button>
              </div>

              <div className="mb-6 flex items-center justify-between bg-black/[0.02] p-4 rounded-xl border border-black/5">
                <span className="font-bold text-brand-black">ADULT (12 yrs+)</span>
                <span className="text-sm font-bold text-brand-black/50">0/1 added</span>
              </div>

              <div className="bg-blue-50 text-blue-800 text-xs font-semibold p-4 rounded-xl mb-6 border border-blue-100 flex items-start gap-3">
                <Info size={16} className="shrink-0 mt-0.5" />
                <p>Important: Enter name as mentioned on your passport or Government approved IDs. Please ensure that the Frequent Flyer No entered here is against the same passenger name otherwise the points will not be updated by the airline.</p>
              </div>
              
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-black/[0.02] rounded-full flex items-center justify-center mx-auto mb-4 text-brand-black/20">
                  <User size={32} />
                </div>
                <p className="text-brand-black/60 font-semibold mb-6">You have not added any adults to the list</p>
                <button className="px-8 py-3 bg-brand-black text-white rounded-xl font-bold hover:bg-brand-red transition-colors inline-flex items-center gap-2 shadow-lg active:scale-95">
                  + ADD NEW ADULT
                </button>
              </div>
            </div>

            {/* Booking Details / Contact */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">Booking details will be sent to</h2>
              <p className="text-sm font-semibold text-brand-black/60 mb-6">Your ticket and flight updates will be sent here.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Country Code</label>
                  <select className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all appearance-none">
                    <option>India(91)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Mobile No</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
                    <input type="tel" placeholder="Mobile No" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
                    <input type="email" placeholder="Email Address" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                  </div>
                </div>
              </div>

              {/* GST Section */}
              <div className="border-t border-black/5 pt-8">
                <label className="flex items-center gap-3 cursor-pointer mb-6 group w-max">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${hasGST ? 'bg-brand-red border-brand-red' : 'border-black/20 group-hover:border-black/40 bg-black/[0.02]'}`}>
                    {hasGST && <Check size={14} className="text-white" />}
                  </div>
                  <span className="font-bold text-brand-black">I have a GST number (Optional)</span>
                  <input type="checkbox" className="hidden" checked={hasGST} onChange={(e) => setHasGST(e.target.checked)} />
                </label>

                {hasGST && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 opacity-0 fade-in duration-200 fill-mode-forwards mb-6">
                    <div>
                      <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">GST Number</label>
                      <input type="text" placeholder="Enter GST Number" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all uppercase" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Company Name</label>
                      <input type="text" placeholder="Enter Company Name" className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 px-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Your State <span className="text-[10px] lowercase normal-case opacity-70">(Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section.)</span></label>
                  <div className="relative">
                    <select className="w-full bg-black/[0.02] border border-black/10 rounded-xl py-4 pl-4 pr-10 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:bg-white transition-all appearance-none cursor-pointer">
                      <option value="" disabled selected>Select the State</option>
                      <option>Gujarat</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-black/40 pointer-events-none" size={20} />
                  </div>
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer mt-6 group">
                  <div className="w-5 h-5 rounded border-2 border-brand-red bg-brand-red flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="font-semibold text-brand-black/80 text-sm">Confirm and save billing details to your profile</span>
                </label>
              </div>
            </div>

            {/* Lock Price */}
            <div className="bg-brand-black rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Lock className="text-brand-red" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold mb-1">Still unsure about this trip?</h2>
                  <p className="text-white/60 font-semibold">Lock this price and decide later.</p>
                </div>
              </div>
              <button className="relative z-10 px-8 py-4 bg-brand-red text-white rounded-xl font-bold hover:bg-white hover:text-brand-red transition-colors shadow-lg shadow-brand-red/20 active:scale-95 whitespace-nowrap">
                LOCK NOW
              </button>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button onClick={() => navigate(-1)} className="px-6 py-4 font-bold text-brand-black/60 hover:text-brand-black transition-colors flex items-center gap-2">
                <ArrowLeft size={18} /> Back
              </button>
              <button onClick={() => navigate('/seat-selection', { state: { flight, fareQuote } })} className="px-12 py-4 bg-brand-black text-white rounded-xl font-bold transition-all hover:bg-brand-red hover:shadow-lg active:scale-95 flex items-center gap-2">
                Continue to Seats <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Sidebar Mini Fare */}
          <div className="w-full md:w-[350px] bg-white rounded-3xl p-8 border border-black/5 shadow-lg sticky top-24 shrink-0">
            <h4 className="text-xl font-extrabold text-brand-black mb-6">Fare Summary</h4>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-bold text-brand-black/60">{flight?.from || 'DEL'} → {flight?.to || 'LHR'}</div>
              <div className="text-xs font-bold text-brand-black/40 uppercase bg-black/[0.02] px-2 py-1 rounded">1 Adult</div>
            </div>
            
            <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-black/5 text-sm font-semibold text-brand-black/70">
              <div className="flex justify-between items-center">
                <span>Base Fare</span>
                <span className="text-brand-black font-bold">₹{flight?.price || '46,500'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxes & Fees</span>
                <span className="text-brand-black font-bold">₹0</span>
              </div>
              {tripSecure === 'yes' && (
                <div className="flex justify-between items-center text-green-600 animate-in fade-in slide-in-from-right-2">
                  <span className="flex items-center gap-1"><ShieldCheck size={14}/> Trip Secure</span>
                  <span>+ ₹299</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest mb-1">Total Amount</div>
                <div className="text-3xl font-black text-brand-black tracking-tight">
                  ₹{tripSecure === 'yes' ? 
                     (parseInt(String(flight?.price || '46500').replace(/,/g, '')) + 299).toLocaleString('en-IN') : 
                     (flight?.price || '46,500')}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TravellerDetails;

