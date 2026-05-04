import React from 'react';
import { Building2, Calendar, Users, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const HotelSearch = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl"
    >
      <div className="flex flex-wrap gap-4">
        {/* Destination */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Destination</label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
            <input 
              type="text" 
              placeholder="City, Hotel, or Neighborhood" 
              className="w-full bg-white border border-black/10 rounded-xl py-3 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Check In - Check Out</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
            <input 
              type="text" 
              placeholder="Select dates" 
              className="w-full bg-white border border-black/10 rounded-xl py-3 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-brand-black/60 uppercase mb-2">Guests & Rooms</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/40" size={20} />
            <input 
              type="text" 
              placeholder="2 Guests, 1 Room" 
              className="w-full bg-white border border-black/10 rounded-xl py-3 pl-12 pr-4 text-brand-black font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button className="h-[50px] px-8 bg-brand-black text-white rounded-xl font-bold hover:bg-brand-red transition-colors flex items-center gap-2 shadow-lg shadow-black/10">
            <Search size={20} />
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelSearch;
