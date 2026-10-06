import React from 'react';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onBuyNow,
}) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const wishlisted = isInWishlist(product.id);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-[#ECE3D4] overflow-hidden hover:shadow-md hover:border-[#DFB76C]/50 transition-all duration-300">
      {/* Image Container with Badges */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#F7F5F0] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.discountBadge ? (
            <span className="bg-[#112E1F] text-amber-200 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              {product.discountBadge}
            </span>
          ) : discountPercent ? (
            <span className="bg-[#112E1F] text-amber-200 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              {discountPercent}% OFF
            </span>
          ) : null}

          {product.isNewArrival && (
            <span className="bg-[#FAF8F5] text-[#112E1F] border border-[#ECE3D4] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              New In
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button overlay */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-1.5 px-3 bg-white/95 backdrop-blur-xs text-[#112E1F] hover:bg-[#112E1F] hover:text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="tracking-wider uppercase text-[11px] font-medium text-[#245A3E]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-stone-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[11px] tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct?.(product)}
            className="font-serif text-base font-semibold text-[#112E1F] group-hover:text-[#2F7250] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Module */}
        <div className="mt-4 pt-3 border-t border-[#ECE3D4]/70">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-[#112E1F] font-sans tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-sans tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent && (
              <span className="text-[11px] text-emerald-700 font-medium">
                Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="py-2 px-2.5 bg-[#FAF8F5] hover:bg-[#F5EFE6] text-[#112E1F] border border-[#ECE3D4] rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#112E1F]" />
              Add to Cart
            </button>

            <button
              onClick={() => {
                if (onBuyNow) {
                  onBuyNow(product);
                } else {
                  addToCart(product, 1);
                }
              }}
              className="py-2 px-2.5 bg-[#112E1F] hover:bg-[#1C4832] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 text-[#DFB76C]" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
