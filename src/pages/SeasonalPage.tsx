import React from 'react';
import { Calendar, Sparkles, Sun, Moon, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ASSETS } from '../data/assets';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface SeasonalPageProps {
  onSelectProduct: (product: Product) => void;
}

export const SeasonalPage: React.FC<SeasonalPageProps> = ({ onSelectProduct }) => {
  const seasonalProducts = PRODUCTS.filter(
    (p) => p.category === 'seasonal' || p.categoryLabel.toLowerCase().includes('seasonal')
  );

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#112E1F] text-white p-8 sm:p-12 lg:p-16 border border-[#DFB76C]/40 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Festivals & Auspicious Seasons</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-4">
              Seasonal Items & Festive Collections
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-lg mb-6">
              Welcome divine warmth, prosperity, and joyous celebrations into your abode. Explore solid virgin brass peacock diyas, fragrant temple incense, traditional marigold torans, and festive potli gifts.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-amber-200">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Diwali & Pooja Essentials
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Wedding & Family Celebrations
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                Karwa Chauth & Auspicious Nights
              </span>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
            <img
              src={ASSETS.categorySeasonal}
              alt="Seasonal Festive Decor"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#ECE3D4] pb-4 mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#112E1F]">
              Handcrafted Seasonal Essentials
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {seasonalProducts.length} festive curated creations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {seasonalProducts.map((product) => (
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
