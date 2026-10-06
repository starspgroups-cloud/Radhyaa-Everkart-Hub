import React, { useState } from 'react';
import { BedDouble, Check, Feather, ShieldCheck, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ASSETS } from '../data/assets';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface BedsheetsPageProps {
  onSelectProduct: (product: Product) => void;
}

export const BedsheetsPage: React.FC<BedsheetsPageProps> = ({ onSelectProduct }) => {
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<'all' | 'king' | 'queen'>('all');

  const bedsheetProducts = PRODUCTS.filter((p) => p.category === 'bedsheets');

  const filtered = bedsheetProducts.filter((p) => {
    if (selectedSizeFilter === 'king') {
      return p.name.toLowerCase().includes('king') || p.sizes?.some(s => s.toLowerCase().includes('king'));
    }
    if (selectedSizeFilter === 'queen') {
      return p.name.toLowerCase().includes('queen') || p.sizes?.some(s => s.toLowerCase().includes('queen'));
    }
    return true;
  });

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Editorial Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1C4832] via-[#112E1F] to-[#0A1F14] text-white p-8 sm:p-12 lg:p-16 border border-[#DFB76C]/40 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold flex items-center gap-1.5 mb-2">
              <BedDouble className="w-4 h-4" />
              <span>100% Pure Combed Cotton · Breathable Living</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-4">
              Luxury Bedsheets & Bedroom Linen
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl mb-6">
              Experience the restorative serenity of botanical green and ivory bedding. Woven with long-staple Indian combed cotton (300 to 400 Thread Count), pre-washed for unmatched touch-softness, and guaranteed colorfast over 50+ machine washes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#DFB76C]" />
                <span>Zero Polyester Blends</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#DFB76C]" />
                <span>Fits 12" Mattresses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#DFB76C]" />
                <span>Pillow Shams Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#DFB76C]" />
                <span>Guaranteed No-Fade</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
            <img
              src={ASSETS.categoryBedsheets}
              alt="Luxury Bedsheet Collection"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#ECE3D4]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSizeFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedSizeFilter === 'all'
                  ? 'bg-[#112E1F] text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#ECE3D4] text-stone-700 hover:bg-[#F5EFE6]'
              }`}
            >
              All Bed Sizes
            </button>
            <button
              onClick={() => setSelectedSizeFilter('king')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedSizeFilter === 'king'
                  ? 'bg-[#112E1F] text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#ECE3D4] text-stone-700 hover:bg-[#F5EFE6]'
              }`}
            >
              Super King (108 x 108 in)
            </button>
            <button
              onClick={() => setSelectedSizeFilter('queen')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedSizeFilter === 'queen'
                  ? 'bg-[#112E1F] text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#ECE3D4] text-stone-700 hover:bg-[#F5EFE6]'
              }`}
            >
              Queen / Double (90 x 108 in)
            </button>
          </div>
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
