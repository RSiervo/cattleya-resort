
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-nature">
      <section className="pt-32 pb-20 bg-resort-green text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            How we protect and manage your personal data at Cattleya Resort.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="prose prose-slate lg:prose-lg bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
            <h2 className="text-2xl font-bold text-resort-green mb-6">1. Information We Collect</h2>
            <p className="text-slate-600 mb-8">
              When you book a stay at Cattleya Resort, we collect personal information such as your name, email address, phone number, and payment details to process your reservation.
            </p>

            <h2 className="text-2xl font-bold text-resort-green mb-6">2. How We Use Your Data</h2>
            <p className="text-slate-600 mb-8">
              Your information is used exclusively for confirming bookings, sending stay-related updates, and providing customer support. We do not sell your data to third parties.
            </p>

            <h2 className="text-2xl font-bold text-resort-green mb-6">3. Security</h2>
            <p className="text-slate-600 mb-8">
              We implement industry-standard security measures to protect your personal information during transmission and storage.
            </p>

            <h2 className="text-2xl font-bold text-resort-green mb-6">4. Contact Us</h2>
            <p className="text-slate-600">
              If you have any questions about our privacy practices, please reach out to us at <span className="font-bold">privacy@cattleyaresort.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
