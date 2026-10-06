import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(3000);
  const [filterNewOnly, setFilterNewOnly] = useState<boolean>(false);
  const [filterBestSellerOnly, setFilterBestSellerOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'shagun', label: 'Shagun Envelopes' },
    { id: 'bedsheets', label: 'Bedsheets & Linen' },
    { id: 'seasonal', label: 'Seasonal & Festive' },
    { id: 'lifestyle', label: 'Home & Lifestyle' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'bestseller', label: 'Best Sellers' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory === 'shagun' && p.category !== 'shagun') return false;
      if (selectedCategory === 'bedsheets' && p.category !== 'bedsheets') return false;
      if (selectedCategory === 'seasonal' && p.category !== 'seasonal') return false;
      if (selectedCategory === 'lifestyle' && p.category !== 'lifestyle') return false;
      if (selectedCategory === 'new' && !p.isNewArrival) return false;
      if (selectedCategory === 'bestseller' && !p.isBestSeller) return false;

      // New / Best seller toggles
      if (filterNewOnly && !p.isNewArrival) return false;
      if (filterBestSellerOnly && !p.isBestSeller) return false;

      // Price filter
      if (p.price > priceMax) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSubcat = p.subcategory?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSubcat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured
    });
  }, [selectedCategory, searchQuery, sortBy, priceMax, filterNewOnly, filterBestSellerOnly]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceMax(3000);
    setFilterNewOnly(false);
    setFilterBestSellerOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="border-b border-[#ECE3D4] pb-8 mb-8 text-left">
        <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
          Curated Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#112E1F] mt-1">
          Explore All Products
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          Browse our complete selection of handcrafted Shagun envelopes, pure combed cotton bedsheets, festive brass diyas, and mindful lifestyle essentials.
        </p>

        {/* Category Pill Tabs (Functional segmented controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#112E1F] text-white shadow-xs'
                  : 'bg-[#F5EFE6] text-stone-700 hover:bg-[#FAF8F5] hover:text-[#112E1F]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#ECE3D4] mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#ECE3D4] rounded-lg bg-white focus:outline-hidden focus:border-[#112E1F]"
          />
        </div>

        {/* Quick Toggles & Sorters */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer bg-white px-3 py-2 rounded-lg border border-[#ECE3D4]">
            <input
              type="checkbox"
              checked={filterNewOnly}
              onChange={(e) => setFilterNewOnly(e.target.checked)}
              className="text-[#112E1F] rounded"
            />
            <span>New Arrivals Only</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer bg-white px-3 py-2 rounded-lg border border-[#ECE3D4]">
            <input
              type="checkbox"
              checked={filterBestSellerOnly}
              onChange={(e) => setFilterBestSellerOnly(e.target.checked)}
              className="text-[#112E1F] rounded"
            />
            <span>Best Sellers</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#ECE3D4] text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-stone-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-stone-800 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'all' || filterNewOnly || filterBestSellerOnly || sortBy !== 'featured') && (
            <button
              onClick={resetFilters}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-[#ECE3D4] rounded-lg transition-colors flex items-center gap-1 text-xs"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Products Count Info */}
      <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
        <span>
          Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items
        </span>
        <span>All products inclusive of GST & quality inspected</span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-[#ECE3D4] p-8">
          <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#ECE3D4] flex items-center justify-center text-stone-400 mx-auto mb-4">
            <SlidersHorizontal className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#112E1F]">
            No matching products found
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
            Try adjusting your search query, clearing filters, or browsing a different category.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
