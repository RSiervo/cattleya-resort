
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Send, CheckCircle, Navigation } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const openInGoogleMaps = () => {
    const destination = encodeURIComponent("Cattleya Resort, Sitio Ibabaw, Colaique, Bo. San Roque, Antipolo, Rizal");
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-nature">
      {/* Header - Added pt-32 to accommodate navbar */}
      <section className="pt-32 pb-20 bg-resort-green text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Have questions about our rates or want to book a special event? 
            Our friendly team is here to help you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Contact Info & Map */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-700">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Our Location</h4>
                      <p className="text-slate-600 text-sm">Sitio Ibabaw, Colaique, Bo. San Roque, Antipolo, Rizal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-700">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Call Us</h4>
                      <p className="text-slate-600 text-sm">0998 163 2946</p>
                      <p className="text-slate-400 text-xs mt-1">Available 8 AM - 8 PM daily</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-700">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Email Support</h4>
                      <p className="text-slate-600 text-sm">bookings@cattleyaresort.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">Find Us on Google Maps</h2>
                  <button 
                    onClick={openInGoogleMaps}
                    className="flex items-center space-x-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors text-sm"
                  >
                    <Navigation size={18} />
                    <span>Open in Maps</span>
                  </button>
                </div>
                <div className="relative group w-full h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                   <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.161747881776!2d121.1718136!3d14.5894119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c77c611488c9%3A0x67b9319965b82226!2sCattleya%20Resort!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Cattleya Resort Location"
                  ></iframe>
                  
                  {/* Overlay for mobile interactivity */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                  
                  <button 
                    onClick={openInGoogleMaps}
                    className="absolute bottom-4 right-4 bg-white text-resort-green px-4 py-2 rounded-xl font-bold shadow-lg flex items-center space-x-2 hover:bg-emerald-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Navigation size={16} />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 self-start">
              {submitted ? (
                <div className="text-center py-20 animate-in zoom-in-95 duration-500">
                  <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} className="text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. Our team will get back to you via email or phone within 24 hours.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-10 text-emerald-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-4">Send a Message</h2>
                  <p className="text-slate-500 mb-10">Use the form below for inquiries about event packages or long-term stays.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                        <input type="text" required className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input type="email" required className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Your email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Subject</label>
                      <select className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none">
                        <option>General Inquiry</option>
                        <option>Wedding Package</option>
                        <option>Corporate Teambuilding</option>
                        <option>Pool Day Pass</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Message</label>
                      <textarea rows={5} required className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="How can we help you?"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-resort-green text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-emerald-800 transition-all active:scale-95 flex items-center justify-center space-x-2">
                      <span>Send Message</span>
                      <Send size={20} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Support */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Connect With Us</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="flex items-center space-x-3 bg-emerald-50 text-emerald-700 px-8 py-4 rounded-2xl hover:bg-emerald-100 transition-colors">
              <Facebook size={24} />
              <span className="font-bold">Facebook Page</span>
            </a>
            <a href="#" className="flex items-center space-x-3 bg-sky-50 text-sky-600 px-8 py-4 rounded-2xl hover:bg-sky-100 transition-colors">
              <MessageCircle size={24} />
              <span className="font-bold">Messenger Chat</span>
            </a>
            <a href="#" className="flex items-center space-x-3 bg-pink-50 text-pink-600 px-8 py-4 rounded-2xl hover:bg-pink-100 transition-colors">
              <Instagram size={24} />
              <span className="font-bold">Instagram Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
