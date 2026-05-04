/*
 * Flyanytrip
 * Authors: Gaurav Thakur, Milan Pandavadara
 *
 * Custom hook that manages all shared search state for the app.
 * This includes flight, tour, visa, activity, train, and PNR searches.
 * It also handles fetching airport data and running mock searches.
 */

import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { 
  tourDestinations, 
  visaDestinations, 
  activityDestinations, 
  allActivities 
} from '../utils/mockData';

/**
 * Custom hook that holds all search-related state and actions.
 * Used by SearchContext to share this data across the entire app.
 *
 * @returns An object with all state values, setters, and handler functions
 */
export const useSearchState = () => {
  const navigate = useNavigate();

  // --- Flight search state ---
  const [activeTab, setActiveTab] = useState('flights');
  const [from, setFrom] = useState({ iata: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India' });
  const [to, setTo] = useState({ iata: 'LHR', name: 'Heathrow', city: 'London', country: 'UK' });
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [showFromMenu, setShowFromMenu] = useState(false);
  const [showToMenu, setShowToMenu] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 4))
  ]);
  const [tripType, setTripType] = useState('one');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('Economy');
  const [showTravelersMenu, setShowTravelersMenu] = useState(false);

  // --- Other tab states (tours, visa, activity, train, pnr) ---
  const [tourDest, setTourDest] = useState('');
  const [showTourMenu, setShowTourMenu] = useState(false);
  const [visaCountry, setVisaCountry] = useState('Thailand');
  const [visaType, setVisaType] = useState('Digital Arrival Card');
  const [showVisaMenu, setShowVisaMenu] = useState(false);
  const [activityCity, setActivityCity] = useState('');
  const [showActivityMenu, setShowActivityMenu] = useState(false);
  const [trainNumber, setTrainNumber] = useState('');
  const [pnrNumber, setPnrNumber] = useState('');

  // --- Calendar Fares state ---
  const [calendarFares, setCalendarFares] = useState([]);
  const [fetchingFares, setFetchingFares] = useState(false);

  // Holds any validation error message shown to the user
  const [searchError, setSearchError] = useState('');

  /**
   * Fetches the lowest fares for the month based on the current selection.
   */
  const fetchCalendarFares = async (date = departureDate) => {
    if (!from?.iata || !to?.iata) return;
    setFetchingFares(true);
    try {
      const formattedDate = date instanceof Date ? date.toISOString().split('T')[0] : date;
      const response = await api.get('/api/flights/calendar-fare', {
        params: {
          origin: from.iata,
          destination: to.iata,
          departureDate: formattedDate,
          cabinClass: travelClass
        }
      });
      if (response.data.success) {
        setCalendarFares(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching calendar fares:", error);
    } finally {
      setFetchingFares(false);
    }
  };

  // Removed local mock fetchAirports

  /**
   * Filters the airports list based on the user's typed query.
   * Matches against IATA code, airport name, city, and country.
   *
   * @param query - The text the user typed in the airport search box
   */
  const handleAirportSearch = async (query) => {
    if (!query || query.length < 2) {
      setFilteredAirports(airports);
      return;
    }
    try {
      const response = await api.get('/api/flights/locations', {
        params: { term: query }
      });
      if (response.data.success && response.data.data.airports) {
        const mappedAirports = response.data.data.airports.map(a => ({
          iata: a.code,
          name: a.name,
          city: a.CityName,
          country: a.CountryName
        }));
        setFilteredAirports(mappedAirports);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  /**
   * Sets the selected airport for either the "from" or "to" field
   * and closes the corresponding dropdown menu.
   *
   * @param type    - Either 'from' or 'to'
   * @param airport - The airport object the user clicked on
   */
  const selectAirport = (type, airport) => {
    if (type === 'from') { 
      setFrom(airport); 
      setShowFromMenu(false); 
    } else { 
      setTo(airport); 
      setShowToMenu(false); 
    }
  };

  /**
   * Swaps the "from" and "to" airports with each other.
   * Uses a temporary variable to avoid overwriting one before the other is saved.
   */
  const swapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  /**
   * Validates the search inputs for the currently active tab,
   * then simulates a search with mock data after a short delay.
   * Navigates to the results page when complete.
   */
  const handleSearch = async () => {
    setSearchError('');
    let isValid = true;

    // Validate required fields depending on which tab is active
    if (activeTab === 'flights') {
      if (!from || !to) isValid = false;
      if (tripType === 'round' && (!dateRange[0] || !dateRange[1])) isValid = false;
      if (tripType === 'one' && !departureDate) isValid = false;
    } else if (activeTab === 'tours') {
      if (!tourDest) isValid = false;
    } else if (activeTab === 'visa') {
      if (!visaCountry || !visaType) isValid = false;
    } else if (activeTab === 'activity') {
      if (!activityCity) isValid = false;
    } else if (activeTab === 'train') {
      if (!trainNumber || trainNumber.trim() === '') isValid = false;
    } else if (activeTab === 'pnr') {
      if (!pnrNumber || pnrNumber.trim() === '') isValid = false;
    }

    // Show an error and stop if any required field is missing
    if (!isValid) {
      setSearchError("Fill all the details first");
      return;
    }

    setSearching(true);
    setResults([]);
    navigate('/results'); // Instantly redirect so skeleton loads while fetching

    if (activeTab === 'flights') {
      try {
        const response = await api.get('/api/flights/search', {
          params: {
            origin: from.iata,
            destination: to.iata,
            departureDate: tripType === 'one' ? departureDate : dateRange[0],
            returnDate: tripType === 'round' ? dateRange[1] : '',
            adults,
            children,
            infants,
            cabinClass: travelClass,
            tripType
          }
        });
        
        if (response.data.success && response.data.data && response.data.data.flights) {
          setResults(response.data.data.flights);
        } else {
          setSearchError('No flights found or error fetching data.');
        }
      } catch (error) {
        setSearchError(error.response?.data?.message || 'Error communicating with the flight API');
        console.error("Flight Search Error:", error);
      }
      setSearching(false);
      return;
    }

    // Simulate a network delay of 1.2 seconds before showing mock results
    setTimeout(() => {
      let mockResults = [];
      if (activeTab === 'tours') {
        const dest = tourDest || 'Thailand';
        mockResults = [
          { id: 1, type: 'tour', name: `${dest} Quick Getaway`, duration: '3 Days / 2 Nights', price: '25,000', rating: 4.6, img: 'https://images.unsplash.com/photo-1590454316824-006f238290ab?q=80&w=1000&auto=format&fit=crop' },
          { id: 2, type: 'tour', name: `Classic ${dest} Experience`, duration: '5 Days / 4 Nights', price: '42,500', rating: 4.8, img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop' },
          { id: 3, type: 'tour', name: `Ultimate ${dest} Explorer`, duration: '8 Days / 7 Nights', price: '68,000', rating: 4.9, img: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop' }
        ];
      } else if (activeTab === 'visa') {
        mockResults = [{ id: 1, type: 'info', title: 'Visa Assistance Started', desc: `Our experts will contact you for ${visaCountry} ${visaType} Visa shortly.` }];
      } else if (activeTab === 'train') {
        mockResults = [{ id: 1, type: 'status', title: 'Train Status: On Time', desc: `Train ${trainNumber} is currently at Kanpur Central. Expected arrival: 04:30 PM.` }];
      } else if (activeTab === 'pnr') {
        mockResults = [{ id: 1, type: 'status', title: 'PNR Status: Confirmed', desc: `PNR ${pnrNumber} - Seat S4, 22. Passenger: Gaurav Thakur.` }];
      } else if (activeTab === 'activity') {
        // Filter real activity data by the chosen city
        mockResults = allActivities.filter(activity => activity.city === activityCity);
      }
      setResults(mockResults);
      setSearching(false);
      navigate('/results');
    }, 1200);
  };

  // Return all state values and handler functions for use throughout the app
  return {
    activeTab, setActiveTab,
    from, setFrom,
    to, setTo,
    searching,
    results,
    airports,
    filteredAirports,
    showFromMenu, setShowFromMenu,
    showToMenu, setShowToMenu,
    departureDate, setDepartureDate,
    dateRange, setDateRange,
    tripType, setTripType,
    adults, setAdults,
    children, setChildren,
    infants, setInfants,
    travelClass, setTravelClass,
    showTravelersMenu, setShowTravelersMenu,
    tourDest, setTourDest,
    showTourMenu, setShowTourMenu,
    tourDestinations,
    visaCountry, setVisaCountry,
    visaType, setVisaType,
    showVisaMenu, setShowVisaMenu,
    visaDestinations,
    activityCity, setActivityCity,
    showActivityMenu, setShowActivityMenu,
    activityDestinations,
    trainNumber, setTrainNumber,
    pnrNumber, setPnrNumber,
    calendarFares, fetchingFares, fetchCalendarFares,
    searchError, setSearchError,
    handleAirportSearch, selectAirport, swapAirports, handleSearch
  };
};
