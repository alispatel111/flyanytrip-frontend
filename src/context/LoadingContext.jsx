import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    const handleShow = () => setLoadingCount((c) => c + 1);
    const handleHide = () => setLoadingCount((c) => Math.max(0, c - 1));

    window.addEventListener('showLoader', handleShow);
    window.addEventListener('hideLoader', handleHide);

    return () => {
      window.removeEventListener('showLoader', handleShow);
      window.removeEventListener('hideLoader', handleHide);
    };
  }, []);

  useEffect(() => {
    setIsLoading(loadingCount > 0);
  }, [loadingCount]);

  const showLoader = () => setLoadingCount((c) => c + 1);
  const hideLoader = () => setLoadingCount((c) => Math.max(0, c - 1));

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="relative flex justify-center items-center w-20 h-20">
              <div className="absolute inset-0 rounded-full border-[4px] border-blue-100"></div>
              <div className="absolute inset-0 rounded-full border-[4px] border-blue-600 border-t-transparent animate-spin"></div>
              <svg className="w-8 h-8 text-blue-600 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-blue-700 font-semibold tracking-wide"
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};
