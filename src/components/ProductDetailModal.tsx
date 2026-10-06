import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Heart,
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onProceedToCheckout?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProceedToCheckout,
}) => {
  if (!product) return null;

  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');

  const wishlisted = isInWishlist(product.id);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
    if (onProceedToCheckout) {
      onProceedToCheckout();
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Radhyaa Everkart Hub! I am interested in purchasing:\n- Product: ${product.name}\n- Price: ₹${product.price}\n- Variant: ${selectedSize || 'Standard'}\nCould you provide more details?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#ECE3D4] overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FAF8F5] text-stone-600 hover:text-stone-900 hover:bg-[#ECE3D4] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-[#FAF8F5] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ECE3D4]">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-[#ECE3D4] shadow-xs">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {discountPercent && (
                <span className="absolute top-3 left-3 bg-[#112E1F] text-amber-200 text-xs font-semibold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img
                        ? 'border-[#112E1F] shadow-xs'
                        : 'border-[#ECE3D4] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} preview ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#245A3E] font-medium">
                  {product.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  In Stock ({product.stockCount} available)
                </span>
              </div>

              {/* Product Title */}
              <h2 className="font-serif text-2xl font-semibold text-[#112E1F] leading-tight">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-2.5 text-xs text-stone-600">
                <div className="flex items-center gap-1 bg-[#F5EFE6] px-2 py-1 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-stone-800 tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span>·</span>
                <span className="text-stone-500">{product.reviewsCount} verified reviews</span>
                <span>·</span>
                <span className="text-[#245A3E] font-medium">Authentic Indian Craft</span>
              </div>

              {/* Price Block */}
              <div className="mt-4 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE3D4] flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#112E1F] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    You save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
                  </span>
                )}
                <span className="ml-auto text-[11px] text-stone-500">Inclusive of all taxes</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes / Pack Options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-[#112E1F] uppercase tracking-wider mb-2">
                    Select Option / Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                          selectedSize === sz
                            ? 'bg-[#112E1F] text-white border-[#112E1F]'
                            : 'bg-white text-stone-700 border-[#ECE3D4] hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-[#112E1F] uppercase tracking-wider mb-2">
                    Color / Finish: <span className="text-stone-600 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === color.name ? 'border-[#112E1F] scale-110' : 'border-stone-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-[#112E1F] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#ECE3D4] rounded-md bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-[#FAF8F5] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-[#FAF8F5] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Specifications Box */}
              {product.specifications && (
                <div className="mt-6 pt-4 border-t border-[#ECE3D4]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] mb-2.5">
                    Product Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-stone-400 text-[11px]">{key}</span>
                        <span className="text-stone-800 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Module */}
            <div className="mt-6 pt-5 border-t border-[#ECE3D4] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#FAF8F5] hover:bg-[#F5EFE6] text-[#112E1F] border border-[#ECE3D4] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#112E1F]" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 bg-[#112E1F] hover:bg-[#1C4832] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Zap className="w-4 h-4 text-[#DFB76C]" />
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product.id, product.name)}
                  aria-label="Wishlist toggle"
                  className={`p-3 rounded-lg border transition-colors ${
                    wishlisted
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-stone-600 border-[#ECE3D4] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Gifting Concierge */}
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Inquire or Order via WhatsApp
              </a>

              {/* Delivery info */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-stone-500 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#245A3E]" />
                  <span>Free shipping &gt; ₹999</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#245A3E]" />
                  <span>100% Inspected</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#245A3E]" />
                  <span>7-Day Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
