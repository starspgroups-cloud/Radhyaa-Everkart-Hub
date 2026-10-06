import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Search,
  Package,
  ArrowRight,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenPolicy: (policy: 'privacy' | 'terms' | 'shipping' | 'refund') => void;
  onOpenTracking: (orderId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy, onOpenTracking }) => {
  const currentYear = new Date().getFullYear();
  const [trackingInput, setTrackingInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onOpenTracking(trackingInput.trim());
    } else {
      onOpenTracking('REH-98421');
    }
  };

  return (
    <footer className="bg-[#0A1F14] text-[#ECE3D4] border-t border-[#1C4832] pt-16 pb-12">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#1C4832]/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#173B28] flex items-center justify-center shrink-0 text-[#DFB76C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">100% Authentic Quality</h4>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Hand-inspected cotton, solid brass, and 300+ GSM papers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#173B28] flex items-center justify-center shrink-0 text-[#DFB76C]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Pan-India Express Dispatch</h4>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Free tracked shipping on all orders over ₹999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#173B28] flex items-center justify-center shrink-0 text-[#DFB76C]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Hassle-Free Exchanges</h4>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Prompt 7-day exchange support for damaged or missing items.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#173B28] flex items-center justify-center shrink-0 text-[#DFB76C]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Direct WhatsApp Concierge</h4>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Instant help for customization, sizes, and tracking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <BrandLogo size="lg" light={true} showTagline={true} />
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm mt-2">
              Radhyaa Everkart Hub is a stylish, trusted Indian retail brand offering carefully
              selected seasonal essentials, Shagun envelopes, pure cotton bedsheets, and curated lifestyle
              items designed to bring grace and celebration into every home.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-amber-200/90 font-medium tracking-wider uppercase">
                Tagline:
              </span>
              <span className="text-xs font-serif italic text-white text-sm">
                “Every Season. Every Occasion. Every Need.”
              </span>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Hi%20Radhyaa%20Everkart%20Hub,%20I%20have%20an%20enquiry"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md text-xs font-medium transition-colors border border-emerald-600/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Chat with our Gifting Concierge</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold mb-4">
              Quick Links
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Shop Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-white transition-colors"
                >
                  Special Offers & Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Our Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Store Info
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold mb-4">
              Collections
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('seasonal')}
                  className="hover:text-white transition-colors"
                >
                  Seasonal & Festival Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shagun')}
                  className="hover:text-white transition-colors"
                >
                  Designer Shagun Envelopes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bedsheets')}
                  className="hover:text-white transition-colors"
                >
                  Pure Cotton Bedsheets (King/Queen)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Copper & Ayurvedic Living
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  New Festive Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Contact */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold">
              Customer Support
            </h5>

            {/* Live Order Status Lookup Component */}
            <div className="p-3.5 rounded-xl bg-[#0E291C] border border-[#1C4832] shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-1">
                <Truck className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>Order Status Lookup</span>
              </div>
              <p className="text-[11px] text-stone-400 mb-2.5 leading-snug">
                Enter your Order ID for real-time shipping status & courier tracking updates.
              </p>
              <form onSubmit={handleTrackSubmit} className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. REH-98421"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="flex-1 min-w-0 px-2.5 py-1.5 bg-[#07160E] border border-[#1C4832] text-xs text-white placeholder-stone-500 rounded focus:outline-hidden focus:border-[#DFB76C] uppercase font-mono tracking-wider"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#DFB76C] hover:bg-[#EDD49E] text-[#112E1F] text-xs font-bold rounded transition-colors uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <Search className="w-3 h-3 text-[#112E1F]" />
                  <span>Track</span>
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1C4832]/60 text-[10px] text-stone-400">
                <span>Sample live orders:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenTracking('REH-98421')}
                    className="text-amber-300 hover:underline font-mono"
                  >
                    REH-98421
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => onOpenTracking('REH-78210')}
                    className="text-amber-300 hover:underline font-mono"
                  >
                    REH-78210
                  </button>
                </div>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5 text-xs text-stone-300 pt-1">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFB76C] shrink-0 mt-0.5" />
                <span>Sector 14, Main Commercial Complex, New Delhi 110001, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <span>care@radhyaaeverkart.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Policy Modals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#1C4832]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <div>
          © {currentYear} Radhyaa Everkart Hub. All rights reserved. Registered Indian Retail Enterprise.
        </div>

        <div className="flex flex-wrap items-center gap-4 text-stone-400">
          <button
            onClick={() => onOpenPolicy('privacy')}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            onClick={() => onOpenPolicy('terms')}
            className="hover:text-white transition-colors"
          >
            Terms & Conditions
          </button>
          <span>·</span>
          <button
            onClick={() => onOpenPolicy('shipping')}
            className="hover:text-white transition-colors"
          >
            Shipping Policy
          </button>
          <span>·</span>
          <button
            onClick={() => onOpenPolicy('refund')}
            className="hover:text-white transition-colors"
          >
            Return & Refund Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
