import React from 'react';
import { Bell, Info, Tag, AlertCircle, Calendar } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'Flight Delayed',
      message: 'Your flight B123456 from Mumbai to Dubai has been delayed by 30 minutes.',
      time: '2 hours ago',
      type: 'alert',
      icon: AlertCircle,
      color: 'text-amber-500',
      bg: 'bg-amber-500/5'
    },
    {
      id: 2,
      title: 'Exclusive Offer!',
      message: 'Get up to 20% off on your next hotel booking in Dubai. Use code DUBAI20.',
      time: '5 hours ago',
      type: 'promo',
      icon: Tag,
      color: 'text-brand-red',
      bg: 'bg-brand-red/5'
    },
    {
      id: 3,
      title: 'Booking Confirmed',
      message: 'Your booking B123456 has been successfully confirmed. Have a great trip!',
      time: '1 day ago',
      type: 'info',
      icon: Info,
      color: 'text-blue-500',
      bg: 'bg-blue-500/5'
    }
  ];

  return (
    <DashboardLayout 
      title="Notifications" 
      subtitle="Stay updated with your travel alerts"
      icon={Bell}
    >
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-6 bg-black/[0.02] border border-black/5 rounded-[32px] hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group">
            <div className="flex gap-6">
              <div className={`w-14 h-14 rounded-2xl ${notif.bg} ${notif.color} flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110`}>
                <notif.icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className="text-[15px] font-black text-brand-black tracking-tight">{notif.title}</h3>
                  <div className="flex items-center gap-1.5 text-brand-black/30">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{notif.time}</span>
                  </div>
                </div>
                <p className="text-[13px] font-bold text-brand-black/50 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-black/[0.03] rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell size={32} className="text-brand-black/20" />
            </div>
            <h3 className="text-xl font-black text-brand-black mb-2">No notifications</h3>
            <p className="text-brand-black/40 font-bold text-sm">We'll notify you when something important happens.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;

