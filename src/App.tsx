/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, CheckCircle, AlertCircle, Info, RotateCcw, X, Heart } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { RewardsProvider } from './context/RewardsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PolicyModal } from './components/PolicyModal';
import { AiChatbot } from './components/AiChatbot';
import { AccountDrawer } from './components/AccountDrawer';
import { OrderStatusModal } from './components/OrderStatusModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { SeasonalPage } from './pages/SeasonalPage';
import { ShagunPage } from './pages/ShagunPage';
import { BedsheetsPage } from './pages/BedsheetsPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { PageView, Product } from './types';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'shipping' | 'refund' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('all');
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');

  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    quickViewProduct,
    setQuickViewProduct,
    toast,
    dismissToast,
  } = useCart();

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryShortcut = (cat: string) => {
    if (cat === 'seasonal') {
      handleNavigate('seasonal');
    } else if (cat === 'shagun') {
      handleNavigate('shagun');
    } else if (cat === 'bedsheets') {
      handleNavigate('bedsheets');
    } else {
      setShopCategoryFilter(cat);
      handleNavigate('shop');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-[#112E1F] selection:text-white">
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}
        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={shopCategoryFilter}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}
        {currentPage === 'seasonal' && (
          <SeasonalPage
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}
        {currentPage === 'shagun' && (
          <ShagunPage
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}
        {currentPage === 'bedsheets' && (
          <BedsheetsPage
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}
        {currentPage === 'offers' && (
          <OffersPage
            onSelectProduct={(p) => setSelectedProduct(p)}
            onExploreShop={() => handleNavigate('shop')}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onOpenTracking={(orderId) => {
          setTrackingOrderId(orderId || '');
          setIsTrackingOpen(true);
        }}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreProducts={() => handleNavigate('shop')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(orderId) => {
          console.log('Order generated:', orderId);
        }}
        onTrackOrder={(orderId) => {
          setTrackingOrderId(orderId);
          setIsTrackingOpen(true);
        }}
      />

      <WishlistDrawer
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onCategoryFilter={handleCategoryShortcut}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct || quickViewProduct}
        onClose={() => {
          setSelectedProduct(null);
          setQuickViewProduct(null);
        }}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Account & Rewards Drawer */}
      <AccountDrawer
        onBrowseShop={() => handleNavigate('shop')}
      />

      {/* Legal & Policies Modal */}
      <PolicyModal
        policy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Real-Time Order Status & Tracking Modal */}
      <OrderStatusModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />

      {/* Floating WhatsApp Quick Action Button (Bottom Left) */}
      <aside aria-label="WhatsApp Support Concierge" className="fixed bottom-6 left-6 z-30">
        <a
          href="https://wa.me/919876543210?text=Hello%20Radhyaa%20Everkart%20Hub!%20I%20would%20like%20to%20inquire%20about%20your%20products"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Radhyaa Everkart Hub Concierge on WhatsApp"
          className="group flex items-center gap-2 px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 border border-white/80"
        >
          <MessageCircle className="w-4 h-4 text-emerald-200 fill-emerald-200" />
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider pr-1">
            WhatsApp Support
          </span>
        </a>
      </aside>

      {/* Radhyaa AI Chatbot (Bottom Right) */}
      <AiChatbot />

      {/* Toast Notification Container with Wishlist 'Undo' Support */}
      {toast && (
        <div className="fixed top-20 right-4 sm:top-24 sm:right-6 z-50 max-w-sm sm:max-w-md w-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl text-xs font-medium border backdrop-blur-md transition-all ${
              toast.type === 'error'
                ? 'bg-rose-950/95 text-rose-100 border-rose-700/80'
                : toast.type === 'info'
                ? 'bg-stone-900/95 text-stone-100 border-stone-700/80'
                : 'bg-[#0E291C]/95 text-[#F5EFE6] border-[#DFB76C]/60 shadow-[#112E1F]/20'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-stone-300 shrink-0" />
              ) : toast.action ? (
                <Heart className="w-4 h-4 text-[#DFB76C] fill-[#DFB76C] shrink-0 animate-pulse" />
              ) : (
                <CheckCircle className="w-4 h-4 text-[#DFB76C] shrink-0" />
              )}
              <span className="leading-snug break-words">{toast.message}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action?.onClick();
                  }}
                  className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#112E1F] bg-[#DFB76C] hover:bg-[#EDD49E] active:scale-95 rounded-md shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-[#112E1F]" />
                  <span>{toast.action.label}</span>
                </button>
              )}
              <button
                type="button"
                onClick={dismissToast}
                aria-label="Dismiss notification"
                className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <RewardsProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </RewardsProvider>
  );
}
