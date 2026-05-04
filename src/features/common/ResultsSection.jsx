/*
 * Flyanytrip
 * Authors: Gaurav Thakur, Milan Pandavadara
 *
 * Renders the list of search result cards on the results page.
 * Handles four different card layouts depending on the result type:
 * - 'flight'       → Flight card with airline, times, price
 * - 'tour'         → Tour package card with image and rating
 * - 'activity'     → Activity card with image, city, and price
 * - 'status/info'  → Simple status card (used for train, PNR, visa)
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Compass, Globe2, MapPin, ShieldCheck, ArrowRightLeft, Search, X, ChevronUp } from 'lucide-react';
import FlightFilters from '../flights/FlightFilters';
import FlightSortBar from '../flights/FlightSortBar';

const FlightSkeleton = () => (
  <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all">
    <div className="flex flex-col md:flex-row">
      <div className="p-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl skeleton-shimmer" />
            <div className="space-y-2">
              <div className="h-[22px] w-[140px] rounded-lg skeleton-shimmer" />
              <div className="h-4 w-[60px] rounded-md skeleton-shimmer" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-12">
          <div className="text-center flex flex-col items-center">
            <div className="h-8 w-[80px] rounded-xl skeleton-shimmer mb-2" />
            <div className="h-[14px] w-[40px] rounded-md skeleton-shimmer" />
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="h-3 w-[60px] rounded-md skeleton-shimmer relative z-10" />
            <div className="w-full h-[2px] bg-black/5 relative flex justify-center items-center">
              <div className="w-2 h-2 rounded-full skeleton-shimmer" />
            </div>
            <div className="h-2.5 w-[50px] rounded-md skeleton-shimmer" />
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="h-8 w-[80px] rounded-xl skeleton-shimmer mb-2" />
            <div className="h-[14px] w-[40px] rounded-md skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div className="bg-black/[0.02] border-l border-black/5 p-8 w-full md:w-72 flex flex-col justify-center items-center text-center">
        <div className="h-[14px] w-[70px] rounded-md skeleton-shimmer mb-2" />
        <div className="h-[36px] w-[110px] rounded-xl skeleton-shimmer mb-6" />
        <div className="w-full h-[56px] rounded-xl skeleton-shimmer" />
      </div>
    </div>
  </div>
);

const ResultCard = ({ r, navigate }) => (
  <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-xl group hover:border-brand-red/20">
    {r.type === 'flight' && (
      <div className="flex flex-col h-full">
        <div className="flex flex-col md:flex-row flex-1">
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-red/5 text-brand-red rounded-xl flex items-center justify-center">
                  <Plane size={20} />
                </div>
                <div>
                  <div className="text-base font-bold text-brand-black">{r.airline}</div>
                  <div className="text-xs font-semibold text-brand-black/40 uppercase tracking-widest">{r.flight}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-black/5 text-brand-black/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{r.class}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6">
              <div className="text-right flex-1">
                <div className="text-xl font-black text-brand-black mb-0.5">{r.time}</div>
                <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest">{r.from}</div>
              </div>

              <div className="w-32 flex flex-col items-center gap-1.5">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-black/40 bg-white px-2 relative z-10">{r.dur}</div>
                <div className="w-full h-[2px] bg-black/10 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-brand-red after:rounded-full before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-brand-red/30 before:rounded-full" />
                <div className={`text-[10px] font-bold uppercase tracking-widest ${!r.stops || r.stops === 0 || r.stops === '0' ? 'text-green-600' : 'text-amber-500'}`}>
                  {!r.stops || r.stops === 0 || r.stops === '0' ? 'Non-stop' : r.stops === 1 || r.stops === '1' ? '1 Stop' : `${r.stops} Stops`}
                </div>
              </div>

              <div className="text-left flex-1">
                <div className="text-xl font-black text-brand-black mb-0.5">{r.arrival}</div>
                <div className="text-xs font-bold text-brand-black/40 uppercase tracking-widest">{r.to}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/[0.02] border-l border-black/5 p-6 w-full md:w-56 flex flex-col justify-center items-center text-center group-hover:bg-brand-red/[0.02] transition-colors">
            <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-wider mb-1">Per person</div>
            <div className="text-2xl font-black text-brand-black mb-4">₹{r.price}</div>
            <button 
              onClick={() => navigate('/booking-review')}
              className="w-full bg-brand-black text-white py-3 rounded-xl text-sm font-bold transition-all hover:bg-brand-red hover:shadow-lg active:scale-95"
            >
              Select Flight
            </button>
          </div>
        </div>
        <div className="bg-brand-red/5 px-6 py-2.5 flex flex-wrap gap-2 items-center justify-between border-t border-brand-red/10 mt-auto">
          <div className="text-[10px] font-bold text-brand-red uppercase tracking-wider">
            {r.promo || 'Use Code FLYNEW for 10% OFF'}
          </div>
          <div className="text-[10px] font-bold text-brand-black/50 uppercase tracking-wider flex gap-4">
            <span className="flex items-center gap-1.5">🧳 {r.baggage || '15 Kgs Check-in'}</span>
            <span className="flex items-center gap-1.5">🛡️ Partially Refundable</span>
          </div>
        </div>
      </div>
    )}

    {(r.type === 'tour' || r.type === 'tour_custom') && (
      <div className={`flex flex-col md:flex-row h-full md:h-64 bg-white rounded-3xl overflow-hidden border transition-all ${r.type === 'tour_custom' ? 'border-brand-red/30 shadow-lg relative' : 'border-black/5 shadow-sm hover:shadow-xl group hover:border-brand-red/20'}`}>
        {r.type === 'tour_custom' && (
          <div className="absolute top-4 -right-12 bg-white text-brand-red text-[10px] font-black uppercase shadow-xl tracking-widest py-1.5 px-12 rotate-45 z-20 pointer-events-none">
            Top Pick
          </div>
        )}
        <div 
          onClick={() => navigate(`/tours/${r.id}`)}
          className="w-full md:w-80 h-48 md:h-auto overflow-hidden relative cursor-pointer"
        >
          <img src={r.img} alt={r.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/f8f9fa/a8a29e?text=Image+Unavailable'; }} />
          {r.type === 'tour_custom' && <div className="absolute inset-0 bg-gradient-to-t from-brand-red/60 via-transparent to-transparent mix-blend-multiply" />}
        </div>
        <div className="p-8 flex-1 flex flex-col relative z-10 bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 
                onClick={() => navigate(`/tours/${r.id}`)}
                className={`text-2xl font-extrabold mb-2 cursor-pointer hover:underline ${r.type === 'tour_custom' ? 'text-brand-red' : 'text-brand-black'}`}
              >
                {r.name}
              </h3>
              <div className="flex items-center gap-4 text-brand-black/40 font-bold text-sm">
                <span className="flex items-center gap-1.5"><Compass size={16} /> {r.duration}</span>
                <span className="flex items-center gap-1.5 font-bold"><Globe2 size={16} /> ⭐ {r.rating}</span>
              </div>
            </div>
          </div>
          {r.desc && <p className="text-brand-black/60 font-medium text-sm leading-relaxed mb-4">{r.desc}</p>}
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
            <div>
              <div className="text-[11px] font-bold text-brand-black/40 uppercase tracking-wider mb-1">Package Price</div>
              <div className={`font-black ${r.type === 'tour_custom' ? 'text-brand-red text-2xl tracking-tight' : 'text-brand-black text-3xl'}`}>{r.type === 'tour_custom' ? r.price : `₹${r.price}`}</div>
            </div>
            <button 
              onClick={() => navigate(`/tours/${r.id}`)}
              className={`px-8 h-14 rounded-xl font-bold transition-all hover:bg-brand-black active:scale-95 flex items-center gap-2 border ${r.type === 'tour_custom' ? 'bg-brand-red text-white hover:text-white border-transparent shadow-md' : 'bg-transparent border-brand-black/20 text-brand-black hover:border-brand-black'}`}
            >
              {r.type === 'tour_custom' ? 'Start Customizing' : 'Book Tour Now'}
            </button>
          </div>
        </div>
      </div>
    )}

    {r.type === 'activity' && (
      <div className="flex bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm hover:shadow-xl transition-all h-[280px]">
        <div className="w-1/3 h-full relative overflow-hidden group">
          <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/f8f9fa/a8a29e?text=Image+Unavailable'; }} />
          <div className="absolute top-4 left-4">
            <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">
              {r.tag}
            </span>
          </div>
        </div>
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-black text-brand-black mb-2 tracking-tight">{r.name}</h3>
              <div className="flex items-center gap-4 text-brand-black/40 font-bold text-sm">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-brand-red" /> {r.city}</span>
                <span className="flex items-center gap-1.5 text-brand-black">⭐ <span className="text-brand-black/60">{r.rating}</span></span>
              </div>
            </div>
          </div>
          <p className="text-brand-black/60 font-medium text-sm leading-relaxed mb-6 line-clamp-2">{r.desc}</p>
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
            <div>
              <div className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest mb-1">Price per person</div>
              <div className="text-3xl font-black text-brand-black">₹{r.price}</div>
            </div>
            <button className="bg-brand-black text-white px-8 h-12 rounded-xl font-bold transition-all hover:bg-brand-red hover:shadow-lg active:scale-95 flex items-center gap-2">
              Book Now <ArrowRightLeft size={16} />
            </button>
          </div>
        </div>
      </div>
    )}

    {(r.type === 'status' || r.type === 'info') && (
      <div className="p-8 flex items-center gap-8 border-l-8 border-brand-red h-full">
        <div className="w-16 h-16 bg-brand-red/5 text-brand-red rounded-full flex items-center justify-center">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-brand-black mb-2 tracking-tight">{r.title}</h3>
          <p className="text-brand-black/60 font-medium text-lg leading-relaxed">{r.desc}</p>
        </div>
      </div>
    )}
  </div>
);

/**
 * Displays all search results as an animated, scrollable list.
 * Each result is rendered with a different card layout based on its type.
 *
 * @param results   - Array of result objects returned from the search
 * @param activeTab - The current search tab (e.g. 'flights', 'tours')
 * @param searching - Whether a search is currently in progress
 */
const ResultsSection = ({ results, activeTab, searching }) => {
  const navigate = useNavigate();
  const showSkeletons = searching && activeTab === 'flights';
  const skeletonArray = Array(6).fill(0);

  // Filter & Sort State
  const [filters, setFilters] = React.useState({
    priceRange: [0, 100000],
    airlines: [],
    depTime: [],
    arrTime: [],
    stops: [],
    duration: 100
  });
  const [sortOption, setSortOption] = React.useState('cheapest');
  const [quickFilters, setQuickFilters] = React.useState([]);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Memoized Filtering & Sorting Logic
  const displayResults = React.useMemo(() => {
    if (activeTab !== 'flights') return results;

    const parseHour = (timeStr) => {
      if (!timeStr) return 0;
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!match) return 0;
      let h = parseInt(match[1], 10);
      const ampm = match[3] ? match[3].toUpperCase() : null;
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return h;
    };

    const getSlot = (h) => {
      if (h >= 0 && h < 6) return 'early_morning';
      if (h >= 6 && h < 12) return 'morning';
      if (h >= 12 && h < 18) return 'afternoon';
      return 'evening';
    };

    const parseDur = (durStr) => {
      if (!durStr) return 0;
      const parts = durStr.match(/(\d+)h\s*(\d+)m/);
      if (parts) return parseInt(parts[1]) * 60 + parseInt(parts[2]);
      const hOnly = durStr.match(/(\d+)h/);
      if (hOnly) return parseInt(hOnly[1]) * 60;
      return 0;
    };

    // 1. Filter
    let filtered = results.filter(r => {
      if (r.type !== 'flight') return true;

      const p = parseInt(String(r.price).replace(/,/g, ''), 10) || 0;
      if (p < filters.priceRange[0] || p > filters.priceRange[1]) return false;

      if (filters.airlines.length > 0 && !filters.airlines.includes(r.airline)) return false;

      const numStops = r.raw && r.raw.Segments ? r.raw.Segments[0].length - 1 : 0;
      if (filters.stops.length > 0) {
        if (!filters.stops.includes(numStops) && !(filters.stops.includes(2) && numStops >= 2)) {
          return false;
        }
      }

      const depSlot = getSlot(parseHour(r.time));
      if (filters.depTime.length > 0 && !filters.depTime.includes(depSlot)) return false;

      const arrSlot = getSlot(parseHour(r.arrival));
      if (filters.arrTime.length > 0 && !filters.arrTime.includes(arrSlot)) return false;

      // Quick Filters
      if (quickFilters.includes('nonstop') && numStops !== 0) return false;
      if (quickFilters.includes('morning') && depSlot !== 'morning') return false;

      return true;
    });

    // 2. Sort
    filtered.sort((a, b) => {
      const pA = parseInt(String(a.price).replace(/,/g, ''), 10) || 0;
      const pB = parseInt(String(b.price).replace(/,/g, ''), 10) || 0;
      const durA = parseDur(a.dur);
      const durB = parseDur(b.dur);

      const activeSort = quickFilters.includes('cheapest') ? 'cheapest' : sortOption;

      if (activeSort === 'cheapest') return pA - pB;
      if (activeSort === 'fastest') return durA - durB;
      if (activeSort === 'best') return (pA * durA) - (pB * durB);
      if (activeSort === 'dep_early') return parseHour(a.time) - parseHour(b.time);
      if (activeSort === 'arr_early') return parseHour(a.arrival) - parseHour(b.arrival);

      return 0;
    });

    return filtered;
  }, [results, activeTab, filters, sortOption, quickFilters]);

  return (
    <AnimatePresence>
      {(results.length > 0 || showSkeletons) && (
        <motion.section key="results-main-section" id="search-results-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#FBFBFB] min-h-screen">
          <div className="w-full py-8 px-6 xl:px-10">
            <div className="flex justify-between items-end mb-6 border-b border-black/5 pb-3">
              <div>
                <h2 className="text-xl font-black text-brand-black mb-0.5">{
                  { flights: 'Flights', tours: 'Tours', visa: 'Visa', activity: 'Activity', train: 'Train Status', pnr: 'PNR Status' }[activeTab]
                }</h2>
                <p className="text-[11px] font-bold text-brand-black/40 uppercase tracking-wider">
                  {searching ? 'Searching available options...' : (
                    <>Showing <span className="text-brand-red">{displayResults.length}</span> professional results</>
                  )}
                </p>
              </div>
            </div>

            {activeTab === 'flights' ? (
              <div className="flex flex-col lg:flex-row gap-8 items-start relative">
                {/* Left Sidebar - Filters */}
                {/* On mobile, it acts as a full-screen drawer */}
                <div className={`w-full lg:w-[320px] shrink-0 transition-transform z-50 ${showMobileFilters ? 'fixed inset-0 bg-black/50 backdrop-blur-sm p-4 flex flex-col justify-end' : 'hidden lg:block lg:sticky lg:top-[88px] lg:h-[calc(100vh-88px)]'}`}>
                  {showMobileFilters && (
                    <div className="absolute inset-0" onClick={() => setShowMobileFilters(false)} />
                  )}
                  <div className={`relative bg-white rounded-3xl lg:border border-black/5 p-6 shadow-xl lg:shadow-sm w-full h-full max-h-[85vh] lg:max-h-full overflow-y-auto no-scrollbar`}>
                    {showMobileFilters && (
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5 lg:hidden sticky top-0 bg-white z-10 pt-2">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setShowMobileFilters(false)} className="bg-black/5 p-2 rounded-full">
                            <X size={20} />
                          </button>
                          <h3 className="text-xl font-extrabold text-brand-black tracking-tight">Filters</h3>
                        </div>
                        <button 
                          onClick={() => setFilters({ priceRange: [0, 100000], airlines: [], depTime: [], arrTime: [], stops: [], duration: 100 })} 
                          className="text-sm font-bold text-brand-red hover:underline"
                        >
                          Reset All
                        </button>
                      </div>
                    )}
                    <FlightFilters results={results} filters={filters} setFilters={setFilters} />
                    
                    {showMobileFilters && (
                      <div className="mt-6 pt-4 border-t border-black/5 sticky bottom-0 bg-white lg:hidden">
                        <button 
                          onClick={() => setShowMobileFilters(false)}
                          className="w-full bg-brand-red text-white py-4 rounded-xl font-bold shadow-lg"
                        >
                          Show {displayResults.length} Flights
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Content - Sort Bar & Flight Cards */}
                <div className="flex-1 w-full min-w-0">
                  <FlightSortBar 
                    sortOption={sortOption} setSortOption={setSortOption} 
                    totalResults={displayResults.length}
                    setShowMobileFilters={setShowMobileFilters}
                  />
                  
                  <div className="flex flex-col gap-6">
                    {showSkeletons ? (
                      skeletonArray.map((_, idx) => <FlightSkeleton key={`skeleton-${idx}`} />)
                    ) : displayResults.length === 0 ? (
                      <div className="text-center py-20 bg-white rounded-3xl border border-black/5">
                        <Plane size={48} className="mx-auto text-brand-black/20 mb-4" />
                        <h3 className="text-xl font-bold text-brand-black mb-2">No Flights Found</h3>
                        <p className="text-brand-black/50">Try adjusting your filters or search criteria.</p>
                      </div>
                    ) : (
                      displayResults.map((r, idx) => (
                        <ResultCard key={`flight-${idx}-${r.id || 'new'}`} r={r} navigate={navigate} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {results.map((r, idx) => (
                  <ResultCard key={`tour-${idx}-${r.id || 'new'}`} r={r} navigate={navigate} />
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            key="scroll-top-button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-brand-black text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-brand-red hover:shadow-brand-red/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default ResultsSection;
