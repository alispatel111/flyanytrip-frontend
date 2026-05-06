/*
 * Flyanytrip
 * Authors: Gaurav Thakur, Milan Pandavadara
 *
 * Sticky top navigation bar. On the home page, the search tab buttons
 * are hidden while the search card is in view, then smoothly slide in
 * once the user scrolls past it. On all other pages, tabs are always shown.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, UserCircle2, Plane, Building2, Compass, FileText, Mail, Phone, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// All tab identifiers used across the app
const TABS = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'tours', label: 'Packages', icon: Compass },
  { id: 'visa', label: 'Visa', icon: FileText }
];

/**
 * Unified Auth Modal for both Personal (B2C) and Business (B2B) accounts.
 */
const AuthModal = ({ isOpen, onClose, type = 'personal' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  
  if (!isOpen) return null;
  const isBusiness = type === 'business';

  const handleContinue = () => {
    if (!inputValue.trim()) return;
    
    const isEmail = inputValue.includes('@');
    
    // Categorize input based on whether it looks like an email
    const loginData = isBusiness 
      ? { 
          email: isEmail ? inputValue : '', 
          agentId: !isEmail ? inputValue : '', 
          type: 'business' 
        }
      : { 
          email: isEmail ? inputValue : '', 
          mobile: !isEmail ? inputValue : '', 
          type: 'personal' 
        };
      
    login(loginData);
    onClose();
    navigate('/profile');
  };

  return (
    <div className="fixed inset-0 z-[1100] overflow-y-auto no-scrollbar">
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden z-10"
        >
          {/* Close Button */}
          <div className="absolute top-6 right-6">
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors group">
              <X size={24} className="text-brand-black group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="p-10 pt-14">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className={`w-20 h-20 ${isBusiness ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-red/10 text-brand-red'} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                {isBusiness ? <ShieldCheck size={40} /> : <UserCircle2 size={40} />}
              </div>
              <h2 className="text-3xl font-black text-brand-black mb-2 tracking-tight">
                {isBusiness ? 'Business Account' : 'Personal Account'}
              </h2>
              <p className="text-brand-black/50 font-bold uppercase text-[11px] tracking-widest">
                {isBusiness ? 'Agent Portal Access' : 'Login or Create Account'}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-black/40 mb-2 block ml-1">
                  {isBusiness ? 'Agent ID or Registered Email' : 'Mobile Number or Email ID'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your details"
                    className={`w-full h-16 bg-black/[0.03] border-2 border-transparent focus:border-${isBusiness ? 'amber-500' : 'brand-red'}/30 focus:bg-white rounded-2xl px-6 outline-none transition-all duration-300 font-bold text-brand-black placeholder:text-brand-black/20`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-brand-black/20">
                      <Mail size={16} />
                    </div>
                    {isBusiness ? (
                      <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-brand-black/20">
                        <ShieldCheck size={16} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-brand-black/20">
                        <Phone size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleContinue}
                className={`w-full h-16 ${isBusiness ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20' : 'bg-brand-black hover:bg-brand-red shadow-black/20'} text-white rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-lg transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98]`}
              >
                Continue
                <ArrowRight size={20} />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-brand-black/30">
                  <span className="bg-white px-4">
                    {isBusiness ? 'Trusted by 500+ Agencies' : 'Trusted by 1M+ Travellers'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * The main navigation bar component.
 * Shows the logo, optional search tabs, and action buttons (bookings, account).
 * Uses IntersectionObserver to detect when the hero search card scrolls out of view.
 *
 * @param activeTab    - The currently selected search tab ID
 * @param setActiveTab - Function to change the active tab
 */
const Navbar = ({ activeTab, setActiveTab }) => {
  // Controls whether the tab row is shown inside the navbar
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNavTabs, setShowNavTabs] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isB2CModalOpen, setIsB2CModalOpen] = useState(false);
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Hide navbar when scrolling down past 80px, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // On results page always show nav tabs
    if (!isHome) {
      setShowNavTabs(true);
      return;
    }

    // On home page, watch the search-card tabs sentinel element
    const sentinel = document.getElementById('search-tabs');
    if (!sentinel) {
      setShowNavTabs(false);
      return;
    }

    // IntersectionObserver watches if the sentinel is visible on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is NOT intersecting → it has scrolled out of view → show nav tabs
        setShowNavTabs(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-64px 0px 0px 0px',
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  return (
    <>
      <nav className={`sticky z-[1000] h-[80px] bg-white/70 backdrop-blur-2xl border-b border-black/5 transition-all duration-300 ${isVisible ? 'top-0' : '-top-[80px]'}`}>
        <div className="max-w-[1400px] w-full mx-auto px-8 grid grid-cols-3 h-full items-center">

          {/* Left: Logo */}
          <div className="flex items-center justify-start">
            <Link to="/" className="group flex items-center">
              <div className="relative">
                <img src="/logos/logo.png" alt="FlyAnyTrip" className="h-11 w-auto cursor-pointer relative z-10" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/160x40/f8f9fa/a8a29e?text=FlyAnyTrip'; }} />
                <div className="absolute -inset-3 bg-brand-red/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </div>

          {/* Center: Nav Tabs */}
          <div className="flex justify-center items-stretch h-full">
            <AnimatePresence>
              {showNavTabs && (
                <motion.div
                  className="flex gap-10 h-full"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      className={`relative h-full flex items-center gap-2.5 text-[13px] font-black tracking-tight uppercase transition-all duration-500 group ${activeTab === tab.id
                          ? 'text-brand-red'
                          : 'text-brand-black/40 hover:text-brand-black'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (tab.id === 'visa') {
                          window.open('https://askvisa.in', '_blank');
                          return;
                        }
                        setActiveTab(tab.id);
                      }}
                    >
                      <tab.icon size={18} className={`transition-transform duration-500 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110 opacity-50 group-hover:opacity-100'}`} />
                      {tab.label}
                      {/* Animated indicator under the active tab */}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red rounded-t-full shadow-[0_-4px_12px_rgba(230,30,42,0.3)]"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center justify-end gap-8">
            <div className="flex items-center gap-2.5 text-[13px] font-black uppercase tracking-tight cursor-pointer text-brand-black/50 hover:text-brand-red transition-all duration-300 group">
              <CreditCard size={18} className="group-hover:scale-110 transition-transform" />
              <span>Bookings</span>
            </div>

            <div className="relative">
              {user ? (
                <div
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-3 pl-4 pr-1 py-1 rounded-full bg-brand-red/5 hover:bg-brand-red/10 border border-brand-red/10 transition-all duration-500 cursor-pointer shadow-sm group"
                >
                  <div className="flex flex-col items-end mr-1">
                    <span className="text-[12px] font-black text-brand-black leading-none mb-0.5">
                      {user.name || (user.email ? user.email.split('@')[0] : user.mobile || 'Traveler')}
                    </span>
                    <span className="text-[9px] font-bold text-brand-red uppercase tracking-widest leading-none">My Profile</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-black text-sm shadow-md shadow-brand-red/20 group-hover:scale-105 transition-transform">
                    {user.initials}
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-3 pl-5 pr-1 py-1 rounded-full bg-brand-black text-white hover:bg-brand-red transition-all duration-500 cursor-pointer shadow-lg hover:shadow-brand-red/20 group"
                >
                  <span className="text-[12px] font-black uppercase tracking-widest">Account</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <UserCircle2 size={22} className="text-white" />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAccountMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden z-50 p-3"
                    >
                      <div className="space-y-1">
                        {user ? (
                          <>
                            <Link
                              to="/profile"
                              onClick={() => setIsAccountMenuOpen(false)}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-red/[0.03] text-brand-black group transition-all"
                            >
                              <div className="w-12 h-12 rounded-xl bg-brand-red/5 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                                <UserCircle2 size={24} />
                              </div>
                              <div className="text-left">
                                <div className="text-[14px] font-black tracking-tight leading-none mb-1">My Profile</div>
                                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">View & Edit Details</div>
                              </div>
                            </Link>
                            <Link
                              to="/my-bookings"
                              onClick={() => setIsAccountMenuOpen(false)}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-red/[0.03] text-brand-black group transition-all"
                            >
                              <div className="w-12 h-12 rounded-xl bg-brand-red/5 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                                <CreditCard size={24} />
                              </div>
                              <div className="text-left">
                                <div className="text-[14px] font-black tracking-tight leading-none mb-1">My Bookings</div>
                                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">Travel History</div>
                              </div>
                            </Link>
                            <div className="h-px bg-black/5 mx-4" />
                            <button
                              onClick={() => {
                                logout();
                                setIsAccountMenuOpen(false);
                                navigate('/');
                              }}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-red/[0.03] text-brand-black group transition-all"
                            >
                              <div className="w-12 h-12 rounded-xl bg-black/5 text-brand-black/40 flex items-center justify-center group-hover:bg-brand-black group-hover:text-white transition-colors">
                                <X size={24} />
                              </div>
                              <div className="text-left">
                                <div className="text-[14px] font-black tracking-tight leading-none mb-1">Sign Out</div>
                                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">Logout of Account</div>
                              </div>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setIsAccountMenuOpen(false);
                                setIsB2CModalOpen(true);
                              }}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-red/[0.03] text-brand-black group transition-all"
                            >
                              <div className="w-12 h-12 rounded-xl bg-brand-red/5 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                                <UserCircle2 size={24} />
                              </div>
                              <div className="text-left">
                                <div className="text-[14px] font-black tracking-tight leading-none mb-1">Personal Account</div>
                                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">Login / Signup</div>
                              </div>
                            </button>

                            <div className="h-px bg-black/5 mx-4" />

                            <button
                              onClick={() => {
                                setIsAccountMenuOpen(false);
                                setIsB2BModalOpen(true);
                              }}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-amber-500/[0.03] text-brand-black group transition-all"
                            >
                              <div className="w-12 h-12 rounded-xl bg-amber-500/5 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <ShieldCheck size={24} />
                              </div>
                              <div className="text-left">
                                <div className="text-[14px] font-black tracking-tight leading-none mb-1">Business/Trade Account</div>
                                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">Agent Portal Login</div>
                              </div>
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modals */}
      <AnimatePresence>
        {isB2CModalOpen && (
          <AuthModal isOpen={isB2CModalOpen} onClose={() => setIsB2CModalOpen(false)} type="personal" />
        )}
        {isB2BModalOpen && (
          <AuthModal isOpen={isB2BModalOpen} onClose={() => setIsB2BModalOpen(false)} type="business" />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
