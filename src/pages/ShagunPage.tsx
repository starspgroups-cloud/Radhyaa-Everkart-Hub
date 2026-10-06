import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle, ShieldCheck, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ASSETS } from '../data/assets';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface ShagunPageProps {
  onSelectProduct: (product: Product) => void;
}

export const ShagunPage: React.FC<ShagunPageProps> = ({ onSelectProduct }) => {
  const [filterSubcat, setFilterSubcat] = useState<string>('all');

  const shagunProducts = PRODUCTS.filter((p) => p.category === 'shagun');

  const filtered = filterSubcat === 'all'
    ? shagunProducts
    : shagunProducts.filter((p) => p.subcategory?.toLowerCase().includes(filterSubcat.toLowerCase()));

  const subcategories = [
    { id: 'all', label: 'All Shagun Lifafas' },
    { id: 'festive', label: 'Festive Signature Series' },
    { id: 'jaipuri', label: 'Jaipuri Bandhani' },
    { id: 'embroidered', label: 'Raw Silk & Zari Embroidery' },
    { id: 'bridal', label: 'Jeweled & Kundan Bridal' },
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Editorial Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#173B28] via-[#112E1F] to-[#0A1F14] text-white p-8 sm:p-12 lg:p-16 border border-[#DFB76C]/40 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold flex items-center gap-1.5 mb-2">
              <Gift className="w-4 h-4" />
              <span>Sacred Blessings · Auspicious Gifting</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-4">
              Designer Shagun Envelopes & Lifafas
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl mb-6">
              In Indian tradition, a Shagun envelope conveys heartfelt blessings and honor. Our collection brings together dupion silk, handcrafted gota patti lace, authentic Jaipuri bandhani, and sparkling kundan brooches — sized perfectly to hold ₹500 currency notes flat.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#DFB76C]" />
                <span>Fits Currency Flat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#DFB76C]" />
                <span>Peel & Seal Flaps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#DFB76C]" />
                <span>Reusable Clutches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#DFB76C]" />
                <span>Bridal Bulk Packs</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
            <img
              src={ASSETS.prodCurvedKundan}
              alt="Luxury Shagun Envelopes"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#ECE3D4] no-scrollbar">
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setFilterSubcat(sub.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterSubcat === sub.id
                  ? 'bg-[#112E1F] text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#ECE3D4] text-stone-700 hover:bg-[#F5EFE6]'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
