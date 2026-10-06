import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface WishlistDrawerProps {
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onSelectProduct }) => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#ECE3D4] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#ECE3D4] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif text-lg font-semibold text-[#112E1F]">
              Your Wishlist ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="p-1.5 rounded-full hover:bg-[#ECE3D4] text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#ECE3D4]">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#ECE3D4] flex items-center justify-center text-stone-400 mb-4">
                <Heart className="w-8 h-8 stroke-1" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#112E1F]">
                Your wishlist is empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mt-1 mb-6 leading-relaxed">
                Save your favorite festive items, Shagun envelopes, and luxury bedsheets for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-18 h-18 rounded-lg object-cover border border-[#ECE3D4] bg-[#FAF8F5] shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onSelectProduct(product);
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onSelectProduct(product);
                    }}
                    className="text-xs font-semibold text-[#112E1F] hover:text-[#245A3E] cursor-pointer truncate"
                  >
                    {product.name}
                  </h4>
                  <span className="text-xs font-bold text-[#112E1F] block mt-0.5 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-2.5 py-1 bg-[#112E1F] hover:bg-[#1C4832] text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#DFB76C]" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
