import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plane, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import api from '../services/api';

const BookingReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight } = location.state || {};

  const [fareQuote, setFareQuote] = useState(null);
  const [fareRule, setFareRule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!flight) {
      navigate('/');
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [quoteRes, ruleRes] = await Promise.all([
          api.post('/api/flights/fare-quote', { traceId: flight.traceId, resultIndex: flight.resultIndex }),
          api.post('/api/flights/fare-rule', { traceId: flight.traceId, resultIndex: flight.resultIndex })
        ]);

        if (quoteRes.data.success) {
          const quoteData = quoteRes.data.data?.Response?.Results || quoteRes.data.data?.responseData?.Response?.Results;
          setFareQuote(quoteData);
        }
        if (ruleRes.data.success) {
          const ruleData = ruleRes.data.data?.Response?.FareRules || ruleRes.data.data?.responseData?.Response?.FareRules;
          setFareRule(ruleData);
        }
      } catch (err) {
        console.error("Error fetching fare details:", err);
        setError("Failed to fetch latest fare rules and quote.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [flight, navigate]);

  if (!flight) return null;

  const fareData = fareQuote?.Fare || flight.raw?.Fare || {};
  const publishedFare = fareData.PublishedFare || parseInt(String(flight.price).replace(/,/g, ''));
  const baseFare = fareData.BaseFare || 0;
  const tax = fareData.Tax || 0;
  const otherCharges = fareData.OtherCharges || 0;
  const discount = fareData.Discount || 0;

  const formatPrice = (p) => Math.ceil(p || 0).toLocaleString('en-IN');

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

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            
            {/* Flight Itinerary Card */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5">
                <div className="w-12 h-12 bg-brand-red/5 text-brand-red rounded-xl flex items-center justify-center">
                  <Plane size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-black">{flight.from} to {flight.to}</h3>
                  <div className="flex items-center gap-4 text-brand-black/60 font-medium text-sm mt-1">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {flight.time}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {flight.dur} {flight.layover || 'Non-Stop'}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-black/[0.02] p-6 rounded-2xl">
                <div>
                  <div className="text-3xl font-black text-brand-black mb-1">{flight.time?.split(' ')[0] || flight.time}</div>
                  <div className="text-sm font-bold text-brand-black/50">{flight.from}</div>
                </div>
                <div className="flex flex-col items-center flex-1 mx-8 relative">
                  <div className="w-full border-t-2 border-dashed border-black/20 absolute top-1/2 -translate-y-1/2" />
                  <Plane size={24} className="text-brand-red bg-white relative z-10 p-1 rounded-full" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-brand-black mb-1">{flight.arrival?.split(' ')[0] || flight.arrival}</div>
                  <div className="text-sm font-bold text-brand-black/50">{flight.to}</div>
                </div>
              </div>
            </div>

            {/* Baggage Info */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-black mb-1">Included Baggage</h3>
                <p className="text-brand-black/60 text-sm">
                  {fareQuote && fareQuote.Segments && fareQuote.Segments[0] && fareQuote.Segments[0][0]?.Baggage 
                    ? `Check-in: ${fareQuote.Segments[0][0].Baggage} • Cabin: ${fareQuote.Segments[0][0].CabinBaggage || '7kg'}` 
                    : 'Cabin: 7kg (1 piece) • Check-in: 15kg (1 piece)'}
                </p>
              </div>
            </div>



          </div>

          {/* Right Sidebar - Fare Summary */}
          <div className="w-full md:w-[350px] bg-white rounded-3xl p-8 border border-black/5 shadow-lg md:sticky md:top-24 shrink-0">
            <h3 className="text-xl font-extrabold text-brand-black mb-6">Fare Summary</h3>
            
            {loading ? (
              <div className="animate-pulse space-y-4 mb-6">
                <div className="h-4 bg-black/10 rounded w-full"></div>
                <div className="h-4 bg-black/10 rounded w-full"></div>
                <div className="h-4 bg-black/10 rounded w-full"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-black/5 text-sm font-semibold text-brand-black/70">
                <div className="flex justify-between items-center">
                  <span>Base Fare</span>
                  <span className="text-brand-black font-bold">₹{formatPrice(baseFare)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Taxes & Fees</span>
                  <span className="text-brand-black font-bold">₹{formatPrice(tax + otherCharges)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount</span>
                    <span>- ₹{formatPrice(discount)}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest mb-1">Total Amount</div>
                <div className="text-3xl font-black text-brand-black tracking-tight">₹{formatPrice(publishedFare)}</div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/traveller-details', { state: { flight, fareQuote } })}
              disabled={loading}
              className={`w-full text-white h-14 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${loading ? 'bg-black/20 cursor-not-allowed' : 'bg-brand-black hover:bg-brand-red active:scale-95'}`}
            >
              {loading ? 'Fetching Best Fare...' : 'Continue'} <ArrowRight size={18} />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-brand-black/40">
              <ShieldCheck size={16} /> 100% Safe & Secure Booking
            </div>
          </div>
        </div>

        {/* Fare Rules - Full Width */}
        <div className="mt-8">
          {fareRule && (
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-black">Fare Rules</h3>
              </div>
              <div className="text-base text-brand-black/80 space-y-6">
                {Array.isArray(fareRule) ? fareRule.map((rule, idx) => (
                  <div key={idx} className="bg-black/[0.02] p-6 rounded-xl border border-black/5">
                    <div className="text-lg font-bold text-brand-black mb-1">{rule.Origin} - {rule.Destination}</div>
                    <div className="text-sm font-semibold text-brand-black/60 mb-4">Airline: {rule.Airline}</div>
                    <div dangerouslySetInnerHTML={{ __html: rule.FareRuleDetail }} className="fare-rule-html text-sm md:text-base opacity-90 leading-relaxed" />
                  </div>
                )) : (
                  <div className="bg-black/[0.02] p-6 rounded-xl border border-black/5">
                    <div dangerouslySetInnerHTML={{ __html: fareRule.FareRuleDetail || JSON.stringify(fareRule) }} className="fare-rule-html text-sm md:text-base opacity-90 leading-relaxed" />
                  </div>
                )}
              </div>
            </div>
          )}

          {loading && !fareRule && (
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm animate-pulse">
              <div className="h-6 bg-black/10 rounded w-1/3 mb-4"></div>
              <div className="h-20 bg-black/5 rounded w-full"></div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingReview;
