import React from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface OffersPageProps {
  onSelectProduct: (product: Product) => void;
  onExploreShop: () => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onSelectProduct, onExploreShop }) => {
  const { applyCoupon, showToast } = useCart();

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    showToast(`Copied & Applied coupon code "${code}"!`);
  };

  const discountedProducts = PRODUCTS.filter((p) => p.originalPrice && p.originalPrice > p.price);

  return (
    <div className="space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Offers Banner */}
      <div className="bg-gradient-to-r from-[#112E1F] via-[#173B28] to-[#204B34] rounded-2xl p-8 sm:p-12 text-white border border-[#DFB76C]/40 shadow-xl">
        <span className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold flex items-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Festive Savings & VIP Coupons</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-3">
          Special Offers & Festive Deals
        </h1>
        <p className="text-xs sm:text-sm text-stone-200 max-w-xl leading-relaxed mb-8">
          Save on our signature Shagun envelope packs, luxury cotton bedsheets, and festive gifting sets with active promotional codes.
        </p>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Coupon 1 */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Site-Wide Festive
                </span>
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white font-medium">
                  10% OFF
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold">FESTIVE10</h3>
              <p className="text-[11px] text-stone-300 mt-1">
                10% instant discount on any order value across all categories.
              </p>
            </div>
            <button
              onClick={() => handleCopyCoupon('FESTIVE10')}
              className="mt-4 w-full py-2 bg-[#DFB76C] hover:bg-[#EAD098] text-[#112E1F] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy & Apply Code</span>
            </button>
          </div>

          {/* Coupon 2 */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  VIP Linen & Decor
                </span>
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white font-medium">
                  15% OFF
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold">RADHYAA15</h3>
              <p className="text-[11px] text-stone-300 mt-1">
                15% off on luxury bedsheets & decor cart values above ₹1,499.
              </p>
            </div>
            <button
              onClick={() => handleCopyCoupon('RADHYAA15')}
              className="mt-4 w-full py-2 bg-[#DFB76C] hover:bg-[#EAD098] text-[#112E1F] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy & Apply Code</span>
            </button>
          </div>

          {/* Coupon 3 */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Shagun Special
                </span>
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white font-medium">
                  Flat ₹50 OFF
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold">SHAGUN50</h3>
              <p className="text-[11px] text-stone-300 mt-1">
                Flat ₹50 off on envelope multi-packs on orders above ₹499.
              </p>
            </div>
            <button
              onClick={() => handleCopyCoupon('SHAGUN50')}
              className="mt-4 w-full py-2 bg-[#DFB76C] hover:bg-[#EAD098] text-[#112E1F] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy & Apply Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Discounted Products Grid */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#ECE3D4] mb-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#112E1F]">
              Handcrafted Items on Special Offer
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Save up to 36% off our curated Indian retail collection
            </p>
          </div>
          <button
            onClick={onExploreShop}
            className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] hover:text-[#245A3E] flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {discountedProducts.map((product) => (
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
