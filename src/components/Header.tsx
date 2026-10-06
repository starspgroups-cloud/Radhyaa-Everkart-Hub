import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  PhoneCall,
  MessageCircle,
  Sparkles,
  User,
  Crown,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';
import { useRewards } from '../context/RewardsContext';
import { PageView } from '../types';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onSearchOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen } = useCart();
  const { rewards, setIsAccountDrawerOpen } = useRewards();

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop All', page: 'shop' },
    { label: 'Seasonal Items', page: 'seasonal' },
    { label: 'Shagun Envelopes', page: 'shagun' },
    { label: 'Bedsheets', page: 'bedsheets' },
    { label: 'Offers & Deals', page: 'offers' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#112E1F] text-[#F5EFE6] text-xs py-2 px-4 border-b border-[#1C4832]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span className="font-medium tracking-wide">
              Festive Season Collection Online · Free Express Shipping on Orders Above ₹999
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#ECE3D4]">
            <a
              href="https://wa.me/919876543210?text=Hi%20Radhyaa%20Everkart%20Hub,%20I%20have%20an%20enquiry%20regarding%20your%20products"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#DFB76C] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Concierge: +91 98765 43210</span>
            </a>
            <span className="text-stone-500">·</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#DFB76C]" />
              <span>Mon-Sat 10am-8pm</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE3D4] transition-all duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark & Botanical Logo */}
          <div
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer transition-opacity hover:opacity-95 shrink-0"
          >
            <BrandLogo size="md" showTagline={true} />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#112E1F] font-semibold'
                      : 'text-stone-600 hover:text-[#112E1F]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onSearchOpen}
              aria-label="Search catalog"
              className="p-2 text-stone-700 hover:text-[#112E1F] hover:bg-[#F5EFE6] rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative p-2 text-stone-700 hover:text-[#112E1F] hover:bg-[#F5EFE6] rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1C4832] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account & Rewards Trigger */}
            <button
              onClick={() => setIsAccountDrawerOpen(true)}
              aria-label="My Account & Radhyaa Rewards"
              className="p-2 text-stone-700 hover:text-[#112E1F] hover:bg-[#F5EFE6] rounded-full transition-colors flex items-center gap-1.5"
              title="My Account & Radhyaa Rewards"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-semibold text-[#112E1F] bg-[#F5EFE6] px-2 py-0.5 rounded-full border border-[#ECE3D4]">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span className="tabular-nums">{rewards.points} pts</span>
              </span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 text-stone-700 hover:text-[#112E1F] hover:bg-[#F5EFE6] rounded-full transition-colors flex items-center gap-2"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-[#112E1F] text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleLinkClick('shop')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#112E1F] hover:bg-[#1C4832] rounded-md transition-colors shadow-xs whitespace-nowrap"
            >
              Shop Now
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="p-2 lg:hidden text-stone-700 hover:text-[#112E1F] hover:bg-[#F5EFE6] rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#112E1F]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#ECE3D4] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleLinkClick(link.page)}
                    className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#112E1F] text-[#FAF8F5]'
                        : 'text-stone-700 hover:bg-[#F5EFE6] hover:text-[#112E1F]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="mt-4 pt-4 border-t border-[#ECE3D4] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAccountDrawerOpen(true);
                  }}
                  className="flex items-center justify-between px-3 py-2.5 bg-[#F5EFE6] rounded-md text-xs font-semibold text-[#112E1F] border border-[#ECE3D4]"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#245A3E]" />
                    <span>Radhyaa Rewards Account</span>
                  </span>
                  <span className="bg-[#112E1F] text-amber-200 px-2 py-0.5 rounded-full text-[10px]">
                    {rewards.points} pts
                  </span>
                </button>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Radhyaa%20Everkart%20Hub,%20I%20would%20like%20to%20place%20an%20order"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <button
                  onClick={() => handleLinkClick('shop')}
                  className="w-full py-2.5 bg-[#112E1F] text-white rounded-md text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  Explore All Collections
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
