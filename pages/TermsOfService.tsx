
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-nature">
      <section className="pt-32 pb-20 bg-resort-green text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Rules and conditions for a safe and relaxing stay.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="prose prose-slate lg:prose-lg bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
            <h2 className="text-2xl font-bold text-resort-green mb-6">1. Booking and Reservation</h2>
            <p className="text-slate-600 mb-8">
              A 50% downpayment is required to secure your reservation. This deposit is non-refundable but can be rescheduled under specific conditions outlined in our cancellation policy.
            </p>

            <h2 className="text-2xl font-bold text-resort-green mb-6">2. Check-in and Check-out</h2>
            <p className="text-slate-600 mb-8">
              Check-in time is at 2:00 PM and Check-out is at 12:00 PM the following day. Early check-in or late check-out is subject to room availability and additional fees.
            </p>

            <h2 className="text-2xl font-bold text-resort-green mb-6">3. Resort Conduct</h2>
            <p className="text-slate-600 mb-8">
              Guests are expected to follow our house rules, including quiet hours after 10:00 PM. Any damage to resort property will be charged to the guest.
            </p>

            <h2 className="text-2xl font-bold text-resort-green mb-6">4. Liability</h2>
            <p className="text-slate-600">
              Cattleya Resort is not responsible for any lost or stolen items. Guests are encouraged to use provided storage or keep valuables with them at all times.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
