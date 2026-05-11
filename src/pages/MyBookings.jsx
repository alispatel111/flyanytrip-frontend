import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Plane, Calendar, MapPin, X, User } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const MyBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: 'B123456',
      type: 'Flight',
      from: 'Mumbai (BOM)',
      to: 'Dubai (DXB)',
      date: '15 May 2026',
      status: 'Confirmed',
      amount: '₹24,500'
    },
    {
      id: 'B789012',
      type: 'Flight',
      from: 'London (LHR)',
      to: 'New York (JFK)',
      date: '20 June 2026',
      status: 'Upcoming',
      amount: '₹85,200'
    }
  ];

  return (
    <DashboardLayout 
      title="My Bookings" 
      subtitle="View and manage your travel history"
      icon={CheckCircle2}
    >
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-black/[0.02] border border-black/5 rounded-3xl p-6 hover:border-brand-red/20 transition-all duration-300 group">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-red/5 text-brand-red flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Plane size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Booking ID: {booking.id}</span>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-md">{booking.status}</span>
                  </div>
                  <h3 className="text-lg font-black text-brand-black tracking-tight">{booking.from} → {booking.to}</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-brand-black/40 mb-1">
                    <Calendar size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{booking.date}</span>
                  </div>
                  <p className="text-lg font-black text-brand-black">{booking.amount}</p>
                </div>
                <button 
                  onClick={() => setSelectedBooking(booking)}
                  className="h-12 px-6 bg-white border border-black/10 hover:border-brand-red hover:text-brand-red rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-black/[0.03] rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane size={32} className="text-brand-black/20" />
            </div>
            <h3 className="text-xl font-black text-brand-black mb-2">No bookings found</h3>
            <p className="text-brand-black/40 font-bold text-sm">You haven't made any bookings yet.</p>
          </div>
        )}

        {/* Modal for Booking Details */}
        <AnimatePresence>
          {selectedBooking && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBooking(null)}
                className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-2xl p-8 md:p-12 max-w-2xl w-full z-10 overflow-hidden border border-white"
              >
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-black/5 hover:bg-brand-red/10 hover:text-brand-red rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-widest rounded-lg">{selectedBooking.type}</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg">{selectedBooking.status}</span>
                  </div>
                  <h2 className="text-3xl font-black text-brand-black tracking-tight">{selectedBooking.from} → {selectedBooking.to}</h2>
                  <p className="text-[13px] font-bold text-brand-black/40 mt-1">Booking ID: {selectedBooking.id} • {selectedBooking.date}</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-black/[0.03] rounded-[24px]">
                    <h3 className="text-[12px] font-black text-brand-black uppercase tracking-widest mb-4">Passenger Details</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-black/10 flex items-center justify-center">
                        <User size={18} className="text-brand-black" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-brand-black">John Doe</p>
                        <p className="text-[11px] font-bold text-brand-black/40 uppercase tracking-widest">Adult • Seat 14A</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-black/[0.03] rounded-[24px]">
                    <h3 className="text-[12px] font-black text-brand-black uppercase tracking-widest mb-4">Payment Summary</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] font-bold text-brand-black/60">Base Fare</span>
                      <span className="text-[13px] font-bold text-brand-black">₹20,000</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[13px] font-bold text-brand-black/60">Taxes & Fees</span>
                      <span className="text-[13px] font-bold text-brand-black">₹4,500</span>
                    </div>
                    <div className="pt-4 border-t border-black/10 flex justify-between items-center">
                      <span className="text-[14px] font-black text-brand-black">Total Amount</span>
                      <span className="text-[18px] font-black text-brand-red">{selectedBooking.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button className="h-12 px-6 bg-black/5 hover:bg-black/10 text-brand-black rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">
                    Download Ticket
                  </button>
                  <button className="h-12 px-6 bg-brand-red hover:bg-[#D4101A] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-red/20">
                    Manage Booking
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;

