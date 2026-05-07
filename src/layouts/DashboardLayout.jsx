import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Shield, Bell, CheckCircle2, 
  LogOut, ChevronRight, Camera, Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children, title, subtitle, icon: TitleIcon }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User, path: '/profile' },
    { id: 'bookings', label: 'My Bookings', icon: CheckCircle2, path: '/my-bookings' },
    { id: 'cotravellers', label: user?.type === 'business' ? 'Travellers' : 'Co-Travellers', icon: Users, path: '/dashboard/co-travellers' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { id: 'security', label: 'Security', icon: Shield, path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black/[0.02] pt-32 pb-20 px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-red/10 transition-colors duration-500" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-[30px] bg-brand-red text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-brand-red/20 uppercase">
                  {user?.initials || 'U'}
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center text-brand-black hover:bg-brand-red hover:text-white transition-all duration-300">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-xl font-black text-brand-black mb-1">
                {user?.name || 'Traveler'}
              </h2>
              <p className="text-[11px] font-bold text-brand-black/40 uppercase tracking-widest">
                {user?.type === 'business' ? 'Business Partner' : 'Personal Account'}
              </p>
            </div>

            <div className="mt-10 space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                      isActive 
                      ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' 
                      : 'text-brand-black/50 hover:bg-brand-red/5 hover:text-brand-red'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} />
                      <span className="text-[13px] font-black uppercase tracking-tight">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className={`${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-black/5">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-brand-black/40 hover:bg-black/5 hover:text-brand-black transition-all duration-300"
              >
                <LogOut size={20} />
                <span className="text-[13px] font-black uppercase tracking-tight">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] p-10 shadow-sm border border-black/5"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-3xl font-black text-brand-black tracking-tight mb-2">{title}</h1>
                <p className="text-brand-black/40 font-bold text-[11px] uppercase tracking-widest">{subtitle}</p>
              </div>
              {TitleIcon && (
                <div className="w-12 h-12 bg-brand-red/5 rounded-2xl flex items-center justify-center text-brand-red">
                  <TitleIcon size={24} />
                </div>
              )}
            </div>

            {children}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
