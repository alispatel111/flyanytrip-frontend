import React from 'react';
import { CheckCircle2, Plane, Calendar, MapPin } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const MyBookings = () => {
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
                <button className="h-12 px-6 bg-white border border-black/10 hover:border-brand-red hover:text-brand-red rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300">
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
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;

