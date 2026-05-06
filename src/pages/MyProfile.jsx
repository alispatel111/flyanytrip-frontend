import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  Camera, Shield, CreditCard, Bell, 
  LogOut, ChevronRight, CheckCircle2, UserCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MyProfile = () => {
  const { user, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    gender: user?.gender || '',
    dob: user?.dob || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || ''
  });

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: CheckCircle2 },
    { id: 'wallet', label: 'My Wallet', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    updateProfile(formData);
    // Add success toast or notification here if available
    alert('Profile updated successfully!');
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
                {user?.name || (user?.email ? user.email.split('@')[0] : user?.mobile || 'Traveler')}
              </h2>
              <p className="text-[11px] font-bold text-brand-black/40 uppercase tracking-widest">{user?.type === 'business' ? 'Business Partner' : 'Personal Account'}</p>
            </div>

            <div className="mt-10 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                    activeSection === item.id 
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' 
                    : 'text-brand-black/50 hover:bg-brand-red/5 hover:text-brand-red'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} />
                    <span className="text-[13px] font-black uppercase tracking-tight">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={`${activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-black/5">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-brand-black/40 hover:bg-black/5 hover:text-brand-black transition-all duration-300">
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
                <h1 className="text-3xl font-black text-brand-black tracking-tight mb-2">Personal Details</h1>
                <p className="text-brand-black/40 font-bold text-[11px] uppercase tracking-widest">Manage your profile information</p>
              </div>
              <div className="w-12 h-12 bg-brand-red/5 rounded-2xl flex items-center justify-center text-brand-red">
                <User size={24} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-black/20 group-focus-within:text-brand-red transition-colors" size={18} />
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter full name"
                    className="w-full h-14 bg-black/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-red/20 rounded-2xl pl-14 pr-6 outline-none transition-all duration-300 font-bold text-brand-black"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-black/20 group-focus-within:text-brand-red transition-colors" size={18} />
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                    className="w-full h-14 bg-black/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-red/20 rounded-2xl pl-14 pr-6 outline-none transition-all duration-300 font-bold text-brand-black"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 ml-1">Mobile Number</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-black/20 group-focus-within:text-brand-red transition-colors" size={18} />
                  <input 
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="Enter mobile number"
                    className="w-full h-14 bg-black/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-red/20 rounded-2xl pl-14 pr-6 outline-none transition-all duration-300 font-bold text-brand-black"
                  />
                </div>
              </div>

              {/* Birthday */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 ml-1">Date of Birth</label>
                <div className="relative group">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-black/20 group-focus-within:text-brand-red transition-colors" size={18} />
                  <input 
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full h-14 bg-black/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-red/20 rounded-2xl pl-14 pr-6 outline-none transition-all duration-300 font-bold text-brand-black"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 ml-1">Full Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-black/20 group-focus-within:text-brand-red transition-colors" size={18} />
                  <input 
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Street address, building, etc."
                    className="w-full h-14 bg-black/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-red/20 rounded-2xl pl-14 pr-6 outline-none transition-all duration-300 font-bold text-brand-black"
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 ml-1">City</label>
                <input 
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="Enter city"
                  className="w-full h-14 bg-black/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-red/20 rounded-2xl px-6 outline-none transition-all duration-300 font-bold text-brand-black"
                />
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 ml-1">State</label>
                <input 
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="Enter state"
                  className="w-full h-14 bg-black/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-red/20 rounded-2xl px-6 outline-none transition-all duration-300 font-bold text-brand-black"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button 
                onClick={handleSave}
                className="h-16 px-12 bg-brand-black hover:bg-brand-red text-white rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-red/5 text-brand-red flex items-center justify-center mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-tight text-brand-black mb-1">Email Verified</h3>
              <p className="text-[11px] font-bold text-green-500 uppercase tracking-widest">Active Status</p>
            </div>
            
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/5 text-amber-500 flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-tight text-brand-black mb-1">2FA Secure</h3>
              <p className="text-[11px] font-bold text-brand-black/40 uppercase tracking-widest">Not Enabled</p>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/5 text-blue-500 flex items-center justify-center mb-4">
                <UserCircle2 size={24} />
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-tight text-brand-black mb-1">Travel Profile</h3>
              <p className="text-[11px] font-bold text-brand-black/40 uppercase tracking-widest">80% Complete</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;
