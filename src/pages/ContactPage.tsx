import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { FaqAccordion } from '../components/FaqAccordion';
import { useCart } from '../context/CartContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our customer concierge!');
  };

  const whatsappDirectMessage = encodeURIComponent(
    'Hello Radhyaa Everkart Hub! I would like to make an inquiry regarding your products and custom orders.'
  );

  return (
    <div className="space-y-16 py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
          We Are Here For You
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#112E1F] mt-2 mb-3">
          Contact Radhyaa Everkart Hub
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Whether you have a question about Shagun envelope customization, bedsheet sizes, bulk wedding gifting, or tracking your parcel — our team is glad to assist you.
        </p>
      </div>

      {/* Contact Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & WhatsApp Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prominent WhatsApp Card */}
          <div className="bg-[#112E1F] text-white p-6 sm:p-8 rounded-2xl border border-[#DFB76C]/40 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-700/80 flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                  Fastest Response
                </span>
                <h3 className="font-serif text-xl font-semibold">WhatsApp Concierge</h3>
              </div>
            </div>

            <p className="text-xs text-stone-200 leading-relaxed mb-6">
              Chat directly with our retail experts for instant product queries, bridal custom packs, and live order tracking.
            </p>

            <a
              href={`https://wa.me/919876543210?text=${whatsappDirectMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Chat (+91 98765 43210)</span>
            </a>
          </div>

          {/* Business Details Card */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#ECE3D4] space-y-5 text-xs text-stone-700">
            <h4 className="font-serif text-lg font-semibold text-[#112E1F] border-b border-[#ECE3D4] pb-3">
              Retail Office & Support Details
            </h4>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-medium">Fulfillment & Studio Address</strong>
                <span>Sector 14, Main Commercial Complex, New Delhi 110001, India</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <strong className="block text-stone-900 font-medium">Customer Phone Support</strong>
                <span>+91 98765 43210</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <strong className="block text-stone-900 font-medium">Official Email</strong>
                <span>care@radhyaaeverkart.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <strong className="block text-stone-900 font-medium">Operating Hours</strong>
                <span>Monday – Saturday: 10:00 AM – 8:00 PM IST (Closed Sundays)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#ECE3D4] shadow-xs">
          <h3 className="font-serif text-2xl font-semibold text-[#112E1F] mb-1">
            Send Us a Message
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            We typically respond to web inquiries within 2–4 business hours.
          </p>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
              <h4 className="font-serif text-xl font-semibold text-emerald-900">
                Message Received!
              </h4>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto mt-1 mb-6">
                Thank you, {formData.name}. Our concierge team will reach out to your phone or email shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
                }}
                className="px-5 py-2 bg-[#112E1F] text-white text-xs font-semibold rounded-lg uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-[#ECE3D4] rounded-lg bg-white focus:outline-hidden focus:border-[#112E1F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-[#ECE3D4] rounded-lg bg-white focus:outline-hidden focus:border-[#112E1F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="radhika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-[#ECE3D4] rounded-lg bg-white focus:outline-hidden focus:border-[#112E1F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-[#ECE3D4] rounded-lg bg-white focus:outline-hidden focus:border-[#112E1F]"
                  >
                    <option value="General Enquiry">General Product Enquiry</option>
                    <option value="Shagun Bulk">Shagun Envelopes & Wedding Bulk</option>
                    <option value="Bedsheets Sizing">Bedsheets & Thread Count Query</option>
                    <option value="Order Tracking">Order Status & Tracking</option>
                    <option value="Exchange">Exchange or Return Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">
                  Your Message or Product Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you're looking for, occasion date, required pack quantities, etc."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#ECE3D4] rounded-lg bg-white focus:outline-hidden focus:border-[#112E1F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#112E1F] hover:bg-[#1C4832] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Send className="w-4 h-4 text-[#DFB76C]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Maps Interactive Section */}
      <div className="bg-white rounded-2xl border border-[#ECE3D4] overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 bg-[#FAF8F5] border-b border-[#ECE3D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
              Visit or Dispatch Center
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#112E1F]">
              Radhyaa Everkart Hub Logistics & Studio
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Sector 14, Main Commercial Complex, New Delhi 110001
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=New+Delhi+Connaught+Place"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#ECE3D4] hover:bg-[#FAF8F5] text-xs font-semibold text-[#112E1F] rounded-lg transition-colors shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Styled Simulated Interactive Map Canvas */}
        <div className="relative h-64 sm:h-80 w-full bg-[#E5E0D8] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#112E1F_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Stylized Map Roads */}
          <div className="absolute w-full h-8 bg-white/70 -rotate-12 top-1/3" />
          <div className="absolute h-full w-8 bg-white/70 rotate-45 left-1/2" />
          <div className="absolute w-3/4 h-6 bg-white/60 rotate-6 bottom-1/4" />

          {/* Map Pin Card */}
          <div className="relative z-10 bg-white p-4 rounded-xl shadow-xl border border-[#ECE3D4] flex items-center gap-3 max-w-sm mx-4">
            <div className="w-10 h-10 rounded-full bg-[#112E1F] text-[#DFB76C] flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h5 className="font-serif text-sm font-semibold text-[#112E1F]">
                Radhyaa Everkart Hub
              </h5>
              <p className="text-[11px] text-stone-500">
                Central Logistics Hub · Express Pickups & Despatches
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive FAQ Accordion Component requested by user */}
      <div id="faq-section">
        <FaqAccordion />
      </div>
    </div>
  );
};
