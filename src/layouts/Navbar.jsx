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
import { CreditCard, UserCircle2, Plane, Building2, Compass, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// All tab identifiers used across the app
const TABS = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'tours', label: 'Packages', icon: Compass },
  { id: 'visa', label: 'Visa', icon: FileText }
];

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
  const [showNavTabs, setShowNavTabs] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    <nav className="sticky top-0 z-[1000] h-[80px] bg-white/70 backdrop-blur-2xl border-b border-black/5">
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
                    className={`relative h-full flex items-center gap-2.5 text-[13px] font-black tracking-tight uppercase transition-all duration-500 group ${
                      activeTab === tab.id
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
          <div className="flex items-center gap-3 pl-5 pr-1 py-1 rounded-full bg-brand-black text-white hover:bg-brand-red transition-all duration-500 cursor-pointer shadow-lg hover:shadow-brand-red/20 group">
            <span className="text-[12px] font-black uppercase tracking-widest">Account</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <UserCircle2 size={22} className="text-white" />
            </div>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
