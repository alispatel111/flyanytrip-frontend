import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  CheckCircle2, Shield, UserCircle2, Check, ArrowRight, Activity, Plane, FileText, Utensils, Train, Globe, Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const InputField = ({ icon: Icon, label, value, onChange, type = "text", placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <label className={`text-[10px] font-black uppercase tracking-widest mb-2 block transition-colors duration-300 ${isFocused ? 'text-brand-red' : 'text-brand-black/40'}`}>
        {label}
      </label>
      <div className="relative">
        <input 
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full h-14 bg-black/[0.02] focus:bg-white border-2 rounded-2xl pl-14 pr-6 outline-none transition-all duration-300 font-bold text-brand-black placeholder:text-brand-black/20 ${
            isFocused 
              ? 'border-brand-red shadow-[0_0_0_4px_rgba(230,30,42,0.1)]' 
              : 'border-transparent hover:border-black/5'
          }`}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
          <motion.div 
            animate={{ 
              backgroundColor: isFocused ? 'rgba(230,30,42,0.1)' : 'transparent',
              color: isFocused ? 'rgb(230,30,42)' : 'rgba(0,0,0,0.2)'
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
          >
            <Icon size={18} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SelectField = ({ icon: Icon, label, value, onChange, options, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <label className={`text-[10px] font-black uppercase tracking-widest mb-2 block transition-colors duration-300 ${isFocused ? 'text-brand-red' : 'text-brand-black/40'}`}>
        {label}
      </label>
      <div className="relative">
        <select 
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full h-14 bg-black/[0.02] focus:bg-white border-2 rounded-2xl pl-14 pr-6 outline-none transition-all duration-300 font-bold text-brand-black appearance-none ${
            isFocused 
              ? 'border-brand-red shadow-[0_0_0_4px_rgba(230,30,42,0.1)]' 
              : 'border-transparent hover:border-black/5'
          }`}
        >
          {placeholder && <option value="" disabled className="text-brand-black/40">{placeholder}</option>}
          {options.map((opt, i) => (
            <option key={i} value={typeof opt === 'object' ? opt.value : opt}>{typeof opt === 'object' ? opt.label : opt}</option>
          ))}
        </select>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2 pointer-events-none">
          <motion.div 
            animate={{ 
              backgroundColor: isFocused ? 'rgba(230,30,42,0.1)' : 'transparent',
              color: isFocused ? 'rgb(230,30,42)' : 'rgba(0,0,0,0.2)'
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
          >
            <Icon size={18} />
          </motion.div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-black/40">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const MyProfile = () => {
  const { user, updateProfile } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    nationality: user?.nationality || '',
    mealPreference: user?.mealPreference || '',
    trainBerthPreference: user?.trainBerthPreference || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    passportNo: user?.passportNo || '',
    passportExpiry: user?.passportExpiry || '',
    issuingCountry: user?.issuingCountry || '',
    airline: user?.airline || '',
    frequentFlyerNo: user?.frequentFlyerNo || '',
    gstin: user?.gstin || ''
  });

  // Calculate profile completion
  useEffect(() => {
    let completed = 0;
    const totalFields = Object.keys(formData).length;
    Object.values(formData).forEach(val => {
      if (val && val.trim() !== '') completed++;
    });
    setCompletionPercentage(Math.round((completed / totalFields) * 100));
  }, [formData]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate network request for premium feel
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProfile(formData);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <DashboardLayout 
      title="Personal Profile" 
      subtitle="Manage your identity and travel preferences"
      icon={User}
    >
      {/* Success Popup - Redesigned */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center text-center max-w-sm w-full"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6 relative"
              >
                <div className="absolute inset-0 rounded-full border-4 border-green-500/20" />
                <Check size={40} strokeWidth={3} />
              </motion.div>
              <h4 className="text-2xl font-black text-brand-black tracking-tight mb-2">Profile Updated</h4>
              <p className="text-[12px] font-bold text-brand-black/50 uppercase tracking-widest leading-relaxed">
                Your personal details have been securely saved
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl"
      >
        {/* Profile Completion Banner */}
        <motion.div variants={itemVariants} className="mb-10 relative overflow-hidden rounded-[32px] bg-gradient-to-r from-brand-black to-gray-800 text-white p-8 md:p-10 shadow-2xl shadow-brand-black/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Profile Status</h3>
              <p className="text-white/60 font-bold uppercase text-[11px] tracking-widest">
                Complete your profile to unlock faster bookings
              </p>
            </div>
            
            <div className="flex items-center gap-6 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                  <motion.circle 
                    cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" 
                    className="text-brand-red drop-shadow-[0_0_8px_rgba(230,30,42,0.5)]"
                    strokeDasharray={2 * Math.PI * 28}
                    initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - completionPercentage / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute text-sm font-black">{completionPercentage}%</span>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Completion</div>
                <div className="text-lg font-bold">{completionPercentage === 100 ? 'All Set!' : 'Keep Going'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Sections */}
        <div className="space-y-8">
          
          {/* Basic Info Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-black mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center"><User size={16} /></span>
              Basic Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField icon={User} label="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Enter your legal name" />
              <InputField icon={Calendar} label="Date of Birth" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} type="date" />
              <SelectField 
                icon={UserCircle2} 
                label="Gender" 
                value={formData.gender} 
                onChange={e => setFormData({...formData, gender: e.target.value})} 
                options={['Male', 'Female', 'Other']}
                placeholder="Select Gender"
              />
              <SelectField 
                icon={Globe} 
                label="Nationality" 
                value={formData.nationality} 
                onChange={e => setFormData({...formData, nationality: e.target.value})} 
                options={['Indian', 'American', 'British', 'Canadian', 'Australian', 'Other']}
                placeholder="Select Nationality"
              />
            </div>
          </motion.div>

          {/* Business Details Card (Only for Business Accounts) */}
          {user?.type === 'business' && (
            <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
              <h4 className="text-sm font-black uppercase tracking-widest text-brand-black mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center"><Briefcase size={16} /></span>
                Business Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField icon={Briefcase} label="GSTIN Number" value={formData.gstin} onChange={e => setFormData({...formData, gstin: e.target.value})} placeholder="Enter your 15-digit GSTIN" />
              </div>
            </motion.div>
          )}

          {/* Preferences Card (Hidden for Business Accounts) */}
          {user?.type !== 'business' && (
            <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-black mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center"><Utensils size={16} /></span>
              Travel Preferences
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SelectField 
                icon={Utensils} 
                label="Meal Preference" 
                value={formData.mealPreference} 
                onChange={e => setFormData({...formData, mealPreference: e.target.value})} 
                options={['Any', 'Vegetarian', 'Non-Vegetarian', 'Vegan', 'Halal', 'Kosher']}
                placeholder="Select Meal Preference"
              />
              <SelectField 
                icon={Train} 
                label="Train Berth Preference" 
                value={formData.trainBerthPreference} 
                onChange={e => setFormData({...formData, trainBerthPreference: e.target.value})} 
                options={['Any', 'Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']}
                placeholder="Select Berth Preference"
              />
            </div>
            </motion.div>
          )}

          {/* Contact Info Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-black mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center"><Phone size={16} /></span>
              Contact Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField icon={Mail} label="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="name@example.com" />
              <InputField icon={Phone} label="Mobile Number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} type="tel" placeholder="+1 (555) 000-0000" />
            </div>
          </motion.div>

          {/* Address Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-black mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center"><MapPin size={16} /></span>
              Location Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <InputField icon={MapPin} label="Full Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Street address, apartment, suite" />
              </div>
              <InputField icon={MapPin} label="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="City name" />
              <InputField icon={MapPin} label="State / Province" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} placeholder="State name" />
            </div>
          </motion.div>

          {/* Passport Details Card (Hidden for Business Accounts) */}
          {user?.type !== 'business' && (
            <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-black mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center"><FileText size={16} /></span>
              Passport Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField icon={FileText} label="Passport No." value={formData.passportNo} onChange={e => setFormData({...formData, passportNo: e.target.value})} placeholder="Enter passport number" />
              <InputField icon={Calendar} label="Expiry Date" value={formData.passportExpiry} onChange={e => setFormData({...formData, passportExpiry: e.target.value})} type="date" />
              <div className="md:col-span-2">
                <SelectField 
                  icon={Globe} 
                  label="Issuing Country" 
                  value={formData.issuingCountry} 
                  onChange={e => setFormData({...formData, issuingCountry: e.target.value})} 
                  options={['India', 'USA', 'UK', 'Canada', 'Australia', 'Other']}
                  placeholder="Select Issuing Country"
                />
              </div>
              </div>
            </motion.div>
          )}

          {/* Frequent Flyer Card (Hidden for Business Accounts) */}
          {user?.type !== 'business' && (
            <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-black mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center"><Plane size={16} /></span>
              Frequent Flyer Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SelectField 
                icon={Plane} 
                label="Airline" 
                value={formData.airline} 
                onChange={e => setFormData({...formData, airline: e.target.value})} 
                options={['Air India', 'IndiGo', 'Vistara', 'Emirates', 'Qatar Airways', 'Other']}
                placeholder="Select Airline"
              />
              <InputField icon={Activity} label="Frequent Flyer Number" value={formData.frequentFlyerNo} onChange={e => setFormData({...formData, frequentFlyerNo: e.target.value})} placeholder="Enter membership number" />
              </div>
            </motion.div>
          )}

        </div>

        {/* Action Button */}
        <motion.div variants={itemVariants} className="mt-10 flex justify-end">
          <motion.button 
            onClick={handleSave}
            disabled={isSaving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-16 px-10 bg-brand-black hover:bg-brand-red text-white rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-xl shadow-black/20 transition-all duration-500 flex items-center gap-4 overflow-hidden"
          >
            <motion.div 
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            {isSaving ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                Save Changes
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Security & Trust Badges */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-black/5">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-black/[0.03] text-brand-black/40 flex items-center justify-center group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all duration-300">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-brand-black">256-bit Secure</h3>
              <p className="text-[10px] font-bold text-brand-black/40">Data Encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-black/[0.03] text-brand-black/40 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all duration-300">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-brand-black">Verified Identity</h3>
              <p className="text-[10px] font-bold text-brand-black/40">Trusted Traveler</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-black/[0.03] text-brand-black/40 flex items-center justify-center group-hover:bg-green-500/10 group-hover:text-green-500 transition-all duration-300">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-brand-black">Active Monitoring</h3>
              <p className="text-[10px] font-bold text-brand-black/40">Account Protection</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
};

export default MyProfile;

