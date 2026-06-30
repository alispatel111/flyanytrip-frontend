import axios from 'axios';

/**
 * Centralized API client for Flyanytrip.
 * Uses the VITE_API_URL environment variable if available,
 * otherwise defaults to localhost for development.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Dispatch event to show global loader unless disabled for this request
    if (config.hideLoader !== true) {
      window.dispatchEvent(new CustomEvent('showLoader'));
    }
    return config;
  },
  (error) => {
    window.dispatchEvent(new CustomEvent('hideLoader'));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.config.hideLoader !== true) {
      window.dispatchEvent(new CustomEvent('hideLoader'));
    }
    return response;
  },
  (error) => {
    window.dispatchEvent(new CustomEvent('hideLoader'));
    return Promise.reject(error);
  }
);

export default api;
