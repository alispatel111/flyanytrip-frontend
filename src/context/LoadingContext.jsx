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
    </LoadingContext.Provider>
  );
};
