/*
 * Flyanytrip
 * Authors: Gaurav Thakur, Milan Pandavadara
 *
 * Root component of the app. Sets up the router, global search state,
 * and the main page layout (Navbar, page content, Footer).
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import AppRoutes from './routes/AppRoutes';
import { SearchProvider, useSearchContext } from './context/SearchContext';
import { 
  Plane, Compass, FileText, Activity, Train, ClipboardCheck,
  ShieldCheck, Headphones, Globe2
} from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * Inner layout component. Reads the active search tab from context
 * and renders the Navbar, the correct page, and the Footer.
 */
const AppContent = () => {
  const { activeTab, setActiveTab } = useSearchContext();

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';

/**
 * Top-level App component.
 * Wraps everything in the Router (for navigation) and SearchProvider
 * (so all child components can access shared search state).
 */
function App() {
  return (
    <Router>
      <LoadingProvider>
        <AuthProvider>
          <SearchProvider>
            <AppContent />
          </SearchProvider>
        </AuthProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
