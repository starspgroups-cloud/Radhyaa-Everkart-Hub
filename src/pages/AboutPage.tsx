import React from 'react';
import { ShieldCheck, Heart, Sparkles, Compass, CheckCircle, Leaf } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { ASSETS } from '../data/assets';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Brand Story Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <BrandLogo size="xl" emblemOnly={true} className="w-24 h-24" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
          Our Heritage & Story
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#112E1F] mt-2 mb-4 leading-tight">
          Thoughtfully Curated for Every Season, Occasion & Need
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Radhyaa Everkart Hub was founded with a clear, heartfelt purpose: to create a trusted Indian retail destination that brings together useful, elegant, and authentic products for daily life and life’s most cherished celebrations.
        </p>
      </div>

      {/* Two Column Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 sm:aspect-5/4">
            <img
              src={ASSETS.heroBanner}
              alt="Radhyaa Everkart Hub Living Heritage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 p-4 bg-[#112E1F] text-white rounded-xl shadow-xl max-w-xs border border-[#DFB76C]/40 hidden sm:block">
            <span className="text-[10px] uppercase tracking-wider text-[#DFB76C] font-semibold block">
              Our Guiding Philosophy
            </span>
            <p className="font-serif text-sm mt-1 leading-snug">
              “Every Season. Every Occasion. Every Need.”
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#112E1F]">
            Rooted in Indian Warmth, Crafted for Modern Living
          </h2>
          <p>
            In Indian households, no celebration is too small. From greeting a new season and lighting diyas on auspicious evenings to blessing newlyweds with Shagun lifafas and relaxing on crisp, breathable cotton sheets at the close of day — each moment deserves thoughtfulness.
          </p>
          <p>
            Too often, shoppers are forced to navigate endless confusing marketplaces filled with disposable, synthetic items. At <strong>Radhyaa Everkart Hub</strong>, we do the careful work of selecting, testing, and verifying every single item.
          </p>
          <p>
            Whether it’s ensuring that our Shagun envelopes are crafted from heavy 300+ GSM papers that keep currency crisp and flat, or guaranteeing that our bedsheets are woven from 100% pure combed cotton without polyester adulteration — our standards are uncompromising.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE3D4]">
              <h4 className="font-serif text-base font-semibold text-[#112E1F]">Artisan Direct</h4>
              <p className="text-[11px] text-stone-500 mt-1">
                Collaborating with traditional block printers, brass smiths & paper crafters.
              </p>
            </div>
            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE3D4]">
              <h4 className="font-serif text-base font-semibold text-[#112E1F]">Customer First</h4>
              <p className="text-[11px] text-stone-500 mt-1">
                Responsive WhatsApp concierge support, easy exchanges, and prompt delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Core Values */}
      <div className="bg-[#FAF8F5] p-8 sm:p-14 rounded-2xl border border-[#ECE3D4]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
            Our Foundation
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#112E1F] mt-1">
            Values That Guide Every Selection
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#ECE3D4] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#ECE3D4] flex items-center justify-center text-[#245A3E] mb-4">
              <Leaf className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#112E1F] mb-2">
              Natural Botanical Quality
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We prioritize natural materials — breathable cotton, virgin brass, food-grade copper, and biodegradable textured papers that age gracefully.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#ECE3D4] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#ECE3D4] flex items-center justify-center text-[#245A3E] mb-4">
              <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#112E1F] mb-2">
              Trust & Transparency
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              What you see is what arrives at your doorstep. We guarantee zero hidden charges, fair pricing, and clear descriptions for every product dimension and fabric.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#ECE3D4] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#ECE3D4] flex items-center justify-center text-[#245A3E] mb-4">
              <Heart className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#112E1F] mb-2">
              Celebration of Heritage
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every festival, ritual, and token of love is sacred. We design our gifting stationery and festive products to uphold the beauty of Indian traditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
