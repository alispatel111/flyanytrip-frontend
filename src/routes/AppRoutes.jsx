import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import FlightHome from '../pages/FlightHome';
import HotelHome from '../pages/HotelHome';
import TourHome from '../pages/TourHome';
import SearchResults from '../pages/SearchResults';
import TourDetails from '../pages/TourDetails';

// Flight Flow
import FlightDetails from '../pages/FlightDetails';
import BookingReview from '../pages/BookingReview';
import TravellerDetails from '../pages/TravellerDetails';
import SeatSelection from '../pages/SeatSelection';
import Addons from '../pages/Addons';
import Payment from '../pages/Payment';
import BookingSuccess from '../pages/BookingSuccess';
import BookingFailed from '../pages/BookingFailed';
import TicketConfirmation from '../pages/TicketConfirmation';
import ManageBooking from '../pages/ManageBooking';
import CheckIn from '../pages/CheckIn';
import FlightStatus from '../pages/FlightStatus';
import FareCalendar from '../pages/FareCalendar';

// Public Pages
import Offers from '../pages/Offers';
import PopularDestinations from '../pages/PopularDestinations';
import Blog from '../pages/Blog';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import FAQ from '../pages/FAQ';
import Terms from '../pages/Terms';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import RefundPolicy from '../pages/RefundPolicy';

// Auth Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import OtpVerification from '../pages/OtpVerification';

// User Dashboard
import MyProfile from '../pages/MyProfile';
import MyBookings from '../pages/MyBookings';
import CoTravellers from '../pages/CoTravellers';
import Notifications from '../pages/Notifications';
import SupportTickets from '../pages/SupportTickets';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flights" element={<FlightHome />} />
      <Route path="/hotels" element={<HotelHome />} />
      <Route path="/tours" element={<TourHome />} />
      <Route path="/results" element={<SearchResults />} />
      <Route path="/flights/search" element={<SearchResults />} />
      <Route path="/flights/:route" element={<SearchResults />} />
      <Route path="/tours/:id" element={<TourDetails />} />

      {/* Flight Flow Routes */}
      <Route path="/flight-details" element={<FlightDetails />} />
      <Route path="/booking-review" element={<BookingReview />} />
      <Route path="/traveller-details" element={<TravellerDetails />} />
      <Route path="/seat-selection" element={<SeatSelection />} />
      <Route path="/addons" element={<Addons />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/booking-failed" element={<BookingFailed />} />
      <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
      <Route path="/manage-booking" element={<ManageBooking />} />
      <Route path="/check-in" element={<CheckIn />} />
      <Route path="/flight-status" element={<FlightStatus />} />
      <Route path="/fare-calendar" element={<FareCalendar />} />

      {/* Public Routes */}
      <Route path="/offers" element={<Offers />} />
      <Route path="/destinations" element={<PopularDestinations />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />

      {/* User Dashboard Routes */}
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/dashboard/profile" element={<MyProfile />} />
      <Route path="/dashboard/bookings" element={<MyBookings />} />
      <Route path="/dashboard/co-travellers" element={<CoTravellers />} />
      <Route path="/dashboard/notifications" element={<Notifications />} />
      <Route path="/dashboard/support" element={<SupportTickets />} />
      <Route path="/dashboard/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;
