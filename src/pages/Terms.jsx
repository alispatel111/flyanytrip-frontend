import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-black text-brand-black mb-2">Terms of Service</h1>
          <p className="text-brand-black/50 mb-8">Last Updated: June 2026</p>
          
          <div className="prose prose-lg text-brand-black/70 max-w-none space-y-6">
            <p>
              Please read these Terms of Service carefully before using the FlyAnyTrip website or mobile application. By accessing or using our services, you agree to be bound by these terms.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">1. General Conditions</h2>
            <p>
              FlyAnyTrip provides a travel booking platform connecting you with airlines, hotels, tour operators, and other travel service providers. We act as an intermediary, and the ultimate contract for the travel service is between you and the respective provider.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">2. Bookings and Payments</h2>
            <p>
              When you make a booking through FlyAnyTrip, you agree to pay the total price presented, which includes the fare, taxes, and any applicable service fees. Fares and availability are not guaranteed until the booking is confirmed and ticketed.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payments are securely processed. We accept major credit cards and alternative payment methods.</li>
              <li>In the event of a payment failure or suspected fraud, we reserve the right to cancel the booking.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">3. Cancellations and Refunds</h2>
            <p>
              Cancellation and refund policies vary by travel provider (airline, hotel, etc.) and fare type. Please review the specific terms associated with your booking before confirming. FlyAnyTrip may charge a processing fee for facilitating cancellations or modifications.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">4. User Accounts</h2>
            <p>
              To access certain features, you must create a FlyAnyTrip account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
              FlyAnyTrip is not liable for any direct, indirect, incidental, or consequential damages arising out of your use of our platform or any services booked through us. This includes, but is not limited to, flight delays, cancellations, or issues caused by third-party providers.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by updating the "Last Updated" date at the top of this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
