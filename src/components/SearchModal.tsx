import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onCategoryFilter: (category: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onCategoryFilter,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.occasion?.some((occ) => occ.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = [
    'Shagun Envelopes',
    'Pure Cotton Bedsheets',
    'Jaipuri Prints',
    'Brass Diya',
    'Wedding Gifting',
    'Potli Bags',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ECE3D4] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#ECE3D4] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#245A3E] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search envelopes, bedsheets, festive decor, gifts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#112E1F] placeholder-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {!query.trim() ? (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#245A3E] block mb-3">
                Popular Searches & Collections
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F5EFE6] border border-[#ECE3D4] text-xs text-stone-700 rounded-lg transition-colors"
                  >
                    <Tag className="w-3 h-3 text-[#C5A059]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#ECE3D4]">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2.5">
                  Browse by Category
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      onCategoryFilter('shagun');
                      onClose();
                    }}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#F5EFE6] rounded-lg border border-[#ECE3D4] text-left text-xs font-semibold text-[#112E1F]"
                  >
                    Shagun Envelopes
                  </button>
                  <button
                    onClick={() => {
                      onCategoryFilter('bedsheets');
                      onClose();
                    }}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#F5EFE6] rounded-lg border border-[#ECE3D4] text-left text-xs font-semibold text-[#112E1F]"
                  >
                    Bedsheets & Linen
                  </button>
                  <button
                    onClick={() => {
                      onCategoryFilter('seasonal');
                      onClose();
                    }}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#F5EFE6] rounded-lg border border-[#ECE3D4] text-left text-xs font-semibold text-[#112E1F]"
                  >
                    Seasonal & Festive
                  </button>
                  <button
                    onClick={() => {
                      onCategoryFilter('lifestyle');
                      onClose();
                    }}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#F5EFE6] rounded-lg border border-[#ECE3D4] text-left text-xs font-semibold text-[#112E1F]"
                  >
                    Home & Lifestyle
                  </button>
                </div>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-sm">No products found matching "{query}"</p>
              <p className="text-xs text-stone-400 mt-1">
                Try searching for "shagun", "cotton", "diya", or "potli".
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#ECE3D4]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#245A3E] block pb-2">
                Found {searchResults.length} Products
              </span>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] px-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#ECE3D4] bg-[#FAF8F5] shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-[#112E1F] group-hover:text-[#245A3E] truncate">
                        {product.name}
                      </h4>
                      <span className="text-[11px] text-stone-500 block">
                        {product.categoryLabel} · ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#112E1F] shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
